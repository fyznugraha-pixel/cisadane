"use client";

import { useEffect, useRef } from "react";

export default function Fireworks({ isExpired }: { isExpired: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!isExpired) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener("resize", handleResize);

    const colors = ['#2654A4', '#38BBCA', '#FDB715', '#EC3A24', '#ffffff'];

    class Particle {
      x: number;
      y: number;
      color: string;
      velocity: { x: number; y: number };
      alpha: number;
      friction: number;
      gravity: number;
      history: {x: number, y: number}[];
      isRocket: boolean;

      constructor(x: number, y: number, color: string, isRocket: boolean = false) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.isRocket = isRocket;
        this.history = [];
        
        if (isRocket) {
          this.velocity = {
            x: (Math.random() - 0.5) * 1.5,
            y: Math.random() * -3 - 6 // Slower vertical velocity (even slower)
          };
          this.gravity = 0.04; // Even lower gravity for very floaty feel
          this.friction = 0.995;
        } else {
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 10 + 4;
          this.velocity = {
            x: Math.cos(angle) * speed,
            y: Math.sin(angle) * speed
          };
          this.gravity = 0.05;
          this.friction = 0.94;
        }
        this.alpha = 1;
      }

      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        // Draw trail
        if (this.history.length > 0) {
          ctx.moveTo(this.history[0].x, this.history[0].y);
          for (let i = 1; i < this.history.length; i++) {
            ctx.lineTo(this.history[i].x, this.history[i].y);
          }
          ctx.lineTo(this.x, this.y);
          ctx.strokeStyle = this.color;
          ctx.lineWidth = this.isRocket ? 4 : 3;
          ctx.lineCap = "round";
          ctx.stroke();
        } else {
          ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
          ctx.fillStyle = this.color;
          ctx.fill();
        }
        ctx.restore();
      }

      update() {
        this.history.push({ x: this.x, y: this.y });
        if (this.history.length > (this.isRocket ? 8 : 4)) { // Reduce trail length for performance
          this.history.shift();
        }

        this.velocity.x *= this.friction;
        this.velocity.y *= this.friction;
        this.velocity.y += this.gravity;
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        
        if (!this.isRocket) {
          this.alpha -= 0.012; // Faster fade out to reduce particle count on screen
        }
      }
    }

    let rockets: Particle[] = [];
    let particles: Particle[] = [];

    const shootRocket = () => {
      // Limit total particles on screen to prevent lag
      if (particles.length > 300) return;
      
      const x = Math.random() * (width * 0.8) + (width * 0.1);
      const y = height;
      const color = colors[Math.floor(Math.random() * colors.length)];
      rockets.push(new Particle(x, y, color, true));
    };

    let animationFrameId: number;
    let rocketInterval: any;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, width, height);

      rockets.forEach((rocket, index) => {
        if (rocket.velocity.y >= -1.0) {
          // Explode with fewer particles for performance
          for (let i = 0; i < 40; i++) {
            particles.push(new Particle(rocket.x, rocket.y, rocket.color));
          }
          rockets.splice(index, 1);
        } else {
          rocket.update();
          rocket.draw();
        }
      });

      particles.forEach((particle, index) => {
        if (particle.alpha <= 0) {
          particles.splice(index, 1);
        } else {
          particle.update();
          particle.draw();
        }
      });
    };

    animate();
    rocketInterval = setInterval(shootRocket, 500); // Shoot less frequently
    
    // Initial massive burst (reduced)
    setTimeout(shootRocket, 100);
    setTimeout(shootRocket, 300);
    setTimeout(shootRocket, 500);

    // Stop shooting after 15 seconds
    setTimeout(() => {
      clearInterval(rocketInterval);
    }, 15000);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      clearInterval(rocketInterval);
    };
  }, [isExpired]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[100] h-full w-full"
      style={{ opacity: isExpired ? 1 : 0 }}
    />
  );
}
