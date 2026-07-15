"use client";

import { useEffect } from "react";

export default function ScrollRevealObserver() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const observeCards = () => {
      const cards = document.querySelectorAll(".card:not(.is-observed)");
      cards.forEach((card, i) => {
        card.classList.add("is-observed");
        if (!(card as HTMLElement).style.transitionDelay) {
           (card as HTMLElement).style.transitionDelay = `${(i % 10) * 80}ms`;
        }
        observer.observe(card);
      });
    };

    observeCards();
    const interval = setInterval(observeCards, 1000);

    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, []);

  return null;
}
