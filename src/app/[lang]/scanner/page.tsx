"use client";

import { useState, useEffect, useRef } from "react";
import { Camera, CheckCircle2, XCircle, User, Store } from "lucide-react";
import { Html5Qrcode } from "html5-qrcode";
import { validateTicket } from "@/actions/validate";
import Image from "next/image";

export default function ScannerPage() {
  const [isScanning, setIsScanning] = useState(false);
  const [manualCode, setManualCode] = useState("");
  const [isChecking, setIsChecking] = useState(false);

  const [scanResult, setScanResult] = useState<{
    success: boolean;
    message?: string;
    error?: string;
    data?: any;
  } | null>(null);

  const [camError, setCamError] = useState("");

  const scannerRef = useRef<Html5Qrcode | null>(null);

  // Initialize Scanner when isScanning is true
  useEffect(() => {
    if (isScanning && !scanResult) {
      setCamError("");
      const html5QrCode = new Html5Qrcode("qr-reader");
      
      html5QrCode.start(
        { facingMode: "environment" }, // Prefer back camera
        {
          fps: 10,
          qrbox: { width: 250, height: 250 }
        },
        async (decodedText) => {
          if (html5QrCode.isScanning) {
            html5QrCode.pause();
          }
          await handleValidate(decodedText);
        },
        (err) => {
          // Ignore frequent scan errors
        }
      ).catch((err) => {
        console.error("Failed to start camera:", err);
        setCamError("Gagal mengakses kamera. Mohon izinkan akses kamera di browser Anda.");
        setIsScanning(false);
      });

      scannerRef.current = html5QrCode;

      return () => {
        if (html5QrCode.isScanning) {
          html5QrCode.stop().then(() => html5QrCode.clear()).catch(console.error);
        }
      };
    }
  }, [isScanning, scanResult]);

  const playBeep = () => {
    try {
      const audio = new Audio('/festivalcisadane/musik/beep.mp3');
      audio.play().catch(e => console.log('Audio play failed:', e));
    } catch (err) {
      console.log('Audio not supported', err);
    }
  };

  const handleValidate = async (id: string) => {
    if (!id) return;
    
    // Play beep immediately upon successful QR decode
    playBeep();
    
    setIsChecking(true);
    try {
      const result = await validateTicket(id);
      setScanResult(result);
    } catch (err) {
      setScanResult({ success: false, error: "Gagal menghubungi server." });
    } finally {
      setIsChecking(false);
    }
  };

  const resetScanner = () => {
    setScanResult(null);
    if (scannerRef.current) {
      scannerRef.current.resume();
    }
  };

  return (
    <main className="min-h-screen bg-[#FDFBF7] text-[#041020] flex flex-col items-center py-12 px-4 font-sans">
      
      {/* Header */}
      <div className="text-center mb-10 mt-4">
        <h1 className="text-3xl sm:text-4xl font-black mb-3">
          Scanner <span className="text-[#2654A4]">Kehadiran</span>
        </h1>
        <p className="text-[#041020]/60 text-sm sm:text-base max-w-sm mx-auto">
          Scan QR Code E-Ticket untuk validasi dan klaim kehadiran pengunjung secara realtime.
        </p>
      </div>

      <div className="w-full max-w-md">

        {/* Scanner Area */}
        {!scanResult ? (
          <div className={`bg-white border border-[#2654A4]/10 rounded-3xl ${!isScanning ? 'p-8' : 'p-0 overflow-hidden'} text-center shadow-lg relative`}>
            {!isScanning ? (
              <div className="flex flex-col items-center justify-center py-4">
                <div className="w-20 h-20 rounded-full border border-[#2654A4]/10 flex items-center justify-center bg-[#2654A4]/5 text-[#2654A4] mb-6">
                  <Camera size={32} />
                </div>
                <h2 className="text-xl font-black text-[#041020] mb-2">Kamera Siap</h2>
                <p className="text-[#041020]/60 text-sm mb-8 px-4">
                  Mulai kamera untuk memindai tiket pengunjung dari HP mereka.
                </p>
                {camError && (
                  <div className="bg-red-500/10 border border-red-500/30 text-red-500 text-sm p-3 rounded-lg mb-6 text-left">
                    {camError}
                  </div>
                )}
                <button
                  onClick={() => setIsScanning(true)}
                  className="w-full bg-[#2654A4] hover:bg-[#1c4285] text-white font-black text-lg py-4 rounded-2xl transition-all shadow-md active:scale-95"
                >
                  Mulai Scanner
                </button>
              </div>
            ) : (
              <div className="w-full relative bg-black flex flex-col items-center justify-center min-h-[300px]">
                <div id="qr-reader" className="w-full [&>video]:w-full [&>video]:object-cover"></div>
                <button
                  onClick={() => setIsScanning(false)}
                  className="absolute bottom-4 z-50 bg-black/60 border border-white/20 text-white px-5 py-2 rounded-full text-xs hover:bg-black/80 backdrop-blur-sm transition font-medium"
                >
                  Tutup Kamera
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className={`bg-white border ${scanResult.success ? 'border-green-500/30' : 'border-red-500/30'} rounded-[2rem] overflow-hidden shadow-xl animate-in zoom-in-95`}>
            <div className={`p-8 text-center border-b ${scanResult.success ? 'border-green-500/20 bg-green-500/5' : 'border-red-500/20 bg-red-500/5'}`}>
              <div className="flex justify-center mb-4">
                {scanResult.success ? (
                  <CheckCircle2 size={64} className="text-green-500 drop-shadow-md" />
                ) : (
                  <XCircle size={64} className="text-red-500 drop-shadow-md" />
                )}
              </div>
              <h2 className={`text-2xl font-black ${scanResult.success ? 'text-green-500' : 'text-red-500'}`}>
                {scanResult.success ? scanResult.message : scanResult.error}
              </h2>
            </div>
            
            {scanResult.data && (
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-3 p-4 rounded-xl bg-[#FDFBF7] border border-[#2654A4]/5">
                  <User className="text-[#2654A4] w-5 h-5 flex-shrink-0" />
                  <div className="text-left">
                    <p className="text-xs text-[#041020]/50 font-medium">Nama Pengunjung</p>
                    <p className="font-bold text-[#041020]">{scanResult.data.full_name}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-4 rounded-xl bg-[#FDFBF7] border border-[#2654A4]/5">
                  <Store className="text-[#2654A4] w-5 h-5 flex-shrink-0" />
                  <div className="text-left">
                    <p className="text-xs text-[#041020]/50 font-medium">Kategori</p>
                    <p className="font-bold text-[#041020]">
                      {scanResult.data.visitor_type === 'booth' ? 'Kunjungan Booth' : 'Pengunjung Umum'}
                      {scanResult.data.booth_name ? ` - ${scanResult.data.booth_name}` : ''}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="p-6 pt-2">
              <button 
                onClick={resetScanner}
                className="w-full py-4 rounded-xl bg-[#2654A4] text-white font-black hover:bg-[#1c4285] transition-colors shadow-lg active:scale-95"
              >
                Scan Tiket Berikutnya
              </button>
            </div>
          </div>
        )}

        {/* Manual Input */}
        <div className="mt-8">
          <label className="block text-sm text-[#041020]/60 mb-2 pl-1 font-medium text-left">Atau masukkan kode manual:</label>
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="ID UUID Pendaftaran"
              value={manualCode}
              onChange={(e) => setManualCode(e.target.value)}
              className="flex-1 bg-white border border-[#2654A4]/20 rounded-xl px-4 py-3.5 text-[#041020] placeholder:text-[#041020]/40 focus:outline-none focus:border-[#2654A4] focus:ring-2 focus:ring-[#2654A4]/20 transition shadow-sm"
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleValidate(manualCode);
              }}
            />
            <button
              onClick={() => handleValidate(manualCode)}
              disabled={!manualCode || isChecking}
              className="bg-[#2654A4] text-white font-black px-6 rounded-xl hover:bg-[#1c4285] transition disabled:opacity-50 disabled:active:scale-100 active:scale-95"
            >
              {isChecking ? '...' : 'Cek'}
            </button>
          </div>
        </div>

        {/* Tactlink Sponsor Card */}
        <div className="mt-12 bg-white border border-[#2654A4]/10 rounded-3xl p-6 flex flex-col relative overflow-hidden group shadow-sm">
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center p-1 border border-[#2654A4]/10">
                <Image src="/festivalcisadane/patnership/tactlink.webp" alt="Tactlink Logo" width={60} height={60} className="object-contain w-full h-full" />
              </div>
              <div className="text-left">
                <p className="text-[10px] font-bold text-[#FDB715] tracking-widest uppercase mb-1">Website Supported By</p>
                <h3 className="text-sm font-black text-[#041020] leading-tight">Connect smarter with <span className="text-[#2654A4]">Tactlink</span></h3>
              </div>
            </div>
            <a href="https://tactlink.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#2654A4]/10 bg-[#2654A4]/5 text-[10px] font-bold text-[#2654A4] hover:bg-[#2654A4]/10 transition">
              Visit <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
            </a>
          </div>
          
          <p className="text-[11px] text-[#041020]/60 mb-5 relative z-10 text-left font-medium">
            This official website is supported by Tactlink.<br/>Download the app to experience smarter digital networking.
          </p>
          
          <div className="flex flex-wrap items-center justify-between gap-4 mt-2 relative z-10">
            <div className="flex gap-2">
              <a href="https://apps.apple.com/id/app/tactlink/id1469516661" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-[#FDFBF7] border border-[#2654A4]/10 rounded-lg px-3 py-1.5 hover:bg-[#2654A4]/5 transition">
                <svg className="w-4 h-4 text-black" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.04 2.26-.79 3.59-.76 1.54.04 2.76.67 3.53 1.7-3.04 1.77-2.55 5.86.35 7.07-.63 1.63-1.44 3.08-2.55 4.16zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
                <div className="flex flex-col items-start text-left">
                  <span className="text-[7px] text-black leading-none font-medium">Download on the</span>
                  <span className="text-[10px] text-black leading-none font-bold">App Store</span>
                </div>
              </a>
              <a href="https://play.google.com/store/apps/details?id=com.tactlink.app" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-[#FDFBF7] border border-[#2654A4]/10 rounded-lg px-3 py-1.5 hover:bg-[#2654A4]/5 transition">
                <svg className="w-4 h-4 text-black" viewBox="0 0 24 24" fill="currentColor"><path d="M3.609 1.814L13.792 12 3.61 22.186c-.165-.164-.265-.436-.265-.783V2.597c0-.347.1-.619.264-.783zM14.53 12.738l2.678 2.678-11.895 6.868 9.217-9.546zM4.095 1.517l11.896 6.867-2.679 2.678-9.217-9.545zM17.842 16.05l3.203-1.849c.928-.536.928-1.415 0-1.951l-3.203-1.85-3.415 3.415 3.415 3.414z" fill="#000"/></svg>
                <div className="flex flex-col items-start text-left">
                  <span className="text-[7px] text-black leading-none font-medium">GET IT ON</span>
                  <span className="text-[10px] text-black leading-none font-bold">Google Play</span>
                </div>
              </a>
            </div>

            <div className="flex flex-col text-[9px] text-[#041020]/50 font-bold sm:text-right">
              <span>10,000+ Cards Shared</span>
              <div className="flex items-center gap-1 sm:justify-end mt-0.5">
                <span className="w-1 h-1 rounded-full bg-[#041020]/40"></span>
                <span>Available in 8 Countries</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-xs text-[#041020]/50 font-medium pb-8">
          Made by <a href="https://www.byfayiz.web.id/portofolio" target="_blank" rel="noopener noreferrer" className="text-[#2654A4] hover:underline font-bold transition-colors hover:text-[#38BBCA]">Fayiz Apriwansyah Nugraha</a>
        </div>

      </div>
    </main>
  );
}
