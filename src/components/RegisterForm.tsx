"use client";

import { useState, useRef, useEffect } from "react";
import Reveal from "@/components/Reveal";
import { supabase } from "@/lib/supabase";
import { ChevronDown, Check, User, Mail, Phone, Hash, Loader2, AlertCircle } from "lucide-react";

export default function RegisterForm({ dict }: { dict: any }) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [tncAccepted, setTncAccepted] = useState(false);

  const isRegistrationOpen = true; // Set to true to open registration

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    const formData = new FormData(e.currentTarget);
    const fullName = formData.get("fullName") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const domicile = formData.get("domicile") as string;

    const { error } = await supabase.from("visitors").insert([
      {
        full_name: fullName,
        email: email,
        phone: phone,
        domicile: domicile,
      },
    ]);

    setIsLoading(false);

    if (error) {
      setErrorMsg("Terjadi kesalahan saat menyimpan data. Silakan coba lagi.");
      console.error(error);
    } else {
      setIsSubmitted(true);
    }
  };

  if (!isRegistrationOpen) {
    return (
      <Reveal>
        <div className="mx-auto max-w-xl overflow-hidden rounded-[2.5rem] border border-[#2654A4]/10 bg-white/90 p-12 text-center shadow-[0_20px_60px_-15px_rgba(38,84,164,0.1)] backdrop-blur-xl relative">
          <div className="relative mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-[#2654A4] to-[#38BBCA] shadow-xl">
            <div className="absolute inset-0 rounded-full bg-white opacity-20 animate-pulse" />
            <AlertCircle className="h-10 w-10 text-white relative z-10" strokeWidth={2.5} />
          </div>
          <h3 className="mb-4 text-3xl font-black text-[#2654A4] tracking-tight">Segera Hadir</h3>
          <p className="text-[#041020]/70 leading-relaxed text-lg max-w-md mx-auto">
            Mohon maaf, pendaftaran umum Festival Cisadane 2026 saat ini belum dibuka. Pantau terus informasi selanjutnya!
          </p>
        </div>
      </Reveal>
    );
  }

  if (isSubmitted) {
    return (
      <Reveal>
        <div className="mx-auto max-w-xl overflow-hidden rounded-[2.5rem] border border-[#2654A4]/10 bg-white/90 p-12 text-center shadow-[0_20px_60px_-15px_rgba(38,84,164,0.1)] backdrop-blur-xl relative">
          <div className="relative mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-[#2654A4] to-[#38BBCA] shadow-xl">
            <div className="absolute inset-0 rounded-full bg-white opacity-20 animate-ping" />
            <Check className="h-10 w-10 text-white relative z-10" strokeWidth={3} />
          </div>
          <h3 className="mb-4 text-3xl font-black text-[#2654A4] tracking-tight">{dict.success || "Berhasil!"}</h3>
          <p className="text-[#041020]/70 leading-relaxed text-lg max-w-md mx-auto">
            Terima kasih telah mendaftar. Tiket dan informasi lengkap telah dikirimkan ke email Anda.
          </p>
        </div>
      </Reveal>
    );
  }

  return (
    <Reveal>
      <form
        onSubmit={handleSubmit}
        className="mx-auto max-w-2xl overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#041020] shadow-[0_30px_100px_-15px_rgba(4,16,32,0.5)] backdrop-blur-2xl transition-all duration-300 relative"
      >
        {/* Subtle decorative glow */}
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-[#38BBCA]/20 blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-[#FDB715]/20 blur-[100px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[120%] w-full bg-[url('/images/texture-noise.png')] opacity-[0.03] pointer-events-none mix-blend-overlay" />

        <div className="h-1.5 w-full bg-gradient-to-r from-[#2654A4] via-[#38BBCA] to-[#FDB715]" />
        
        <div className="p-8 sm:p-12 relative z-10">
          <div className="space-y-7">
            
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="mb-2.5 ml-1 block text-sm font-bold text-white/90">
                {dict.fullName} <span className="text-[#FDB715]">*</span>
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/30 group-focus-within:text-[#FDB715] transition-colors">
                  <User className="h-5 w-5" />
                </div>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  required
                  className="w-full rounded-2xl border border-white/10 bg-white/5 py-4 pl-12 pr-4 text-white placeholder:text-white/30 transition-all hover:bg-white/10 hover:border-white/20 focus:border-[#FDB715] focus:bg-white/10 focus:outline-none focus:ring-4 focus:ring-[#FDB715]/10 backdrop-blur-md"
                  placeholder="Mis. John Doe"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="mb-2.5 ml-1 block text-sm font-bold text-white/90">
                {dict.email} <span className="text-[#FDB715]">*</span>
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/30 group-focus-within:text-[#38BBCA] transition-colors">
                  <Mail className="h-5 w-5" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full rounded-2xl border border-white/10 bg-white/5 py-4 pl-12 pr-4 text-white placeholder:text-white/30 transition-all hover:bg-white/10 hover:border-white/20 focus:border-[#38BBCA] focus:bg-white/10 focus:outline-none focus:ring-4 focus:ring-[#38BBCA]/10 backdrop-blur-md"
                  placeholder="email@example.com"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="mb-2.5 ml-1 block text-sm font-bold text-white/90">
                {dict.phone} <span className="text-[#FDB715]">*</span>
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/30 group-focus-within:text-[#38BBCA] transition-colors">
                  <Phone className="h-5 w-5" />
                </div>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  className="w-full rounded-2xl border border-white/10 bg-white/5 py-4 pl-12 pr-4 text-white placeholder:text-white/30 transition-all hover:bg-white/10 hover:border-white/20 focus:border-[#38BBCA] focus:bg-white/10 focus:outline-none focus:ring-4 focus:ring-[#38BBCA]/10 backdrop-blur-md"
                  placeholder="+62 812 3456 7890"
                />
              </div>
            </div>

            {/* Domicile */}
            <div>
              <label htmlFor="domicile" className="mb-2.5 ml-1 block text-sm font-bold text-white/90">
                {dict.domicile} <span className="text-[#FDB715]">*</span>
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/30 group-focus-within:text-[#FDB715] transition-colors">
                  <Hash className="h-5 w-5" />
                </div>
                <input
                  type="text"
                  id="domicile"
                  name="domicile"
                  required
                  className="w-full rounded-2xl border border-white/10 bg-white/5 py-4 pl-12 pr-4 text-white placeholder:text-white/30 transition-all hover:bg-white/10 hover:border-white/20 focus:border-[#FDB715] focus:bg-white/10 focus:outline-none focus:ring-4 focus:ring-[#FDB715]/10 backdrop-blur-md"
                  placeholder={dict.domicilePlaceholder || "Kota tempat tinggal"}
                />
              </div>
            </div>

            {/* Error Message */}
            {errorMsg && (
              <div className="flex items-center gap-3 rounded-2xl border border-red-500/20 bg-red-50/80 p-4 text-sm text-red-600 animate-in fade-in zoom-in-95">
                <AlertCircle size={18} className="shrink-0" />
                <p>{errorMsg}</p>
              </div>
            )}

            {/* T&C */}
            <div className="flex items-start gap-4 pt-4 pb-2">
              <div className="flex h-6 items-center mt-0.5">
                <button
                  type="button"
                  role="checkbox"
                  aria-checked={tncAccepted}
                  onClick={() => setTncAccepted(!tncAccepted)}
                  className={`flex h-6 w-6 items-center justify-center rounded-md border-2 transition-all duration-300 ${
                    tncAccepted
                      ? "border-[#FDB715] bg-[#FDB715] shadow-[0_0_15px_rgba(253,183,21,0.4)] scale-105"
                      : "border-white/30 bg-white/5 hover:border-white/60 hover:bg-white/10"
                  }`}
                >
                  {tncAccepted && <Check size={16} strokeWidth={3} className="text-[#041020]" />}
                </button>
                <input 
                  type="checkbox" 
                  className="absolute opacity-0 h-0 w-0 pointer-events-none" 
                  checked={tncAccepted} 
                  required 
                  readOnly 
                />
              </div>
              <label 
                className="cursor-pointer text-sm leading-relaxed text-white/70 select-none hover:text-white transition-colors"
                onClick={() => setTncAccepted(!tncAccepted)}
              >
                {dict.tnc} <span className="text-[#FDB715]">*</span>
              </label>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-[#FDB715] via-[#F7951E] to-[#FDB715] bg-[length:200%_auto] hover:bg-[100%_auto] px-8 py-5 text-center font-black uppercase text-[#041020] shadow-[0_10px_30px_-10px_rgba(253,183,21,0.5)] transition-all hover:shadow-[0_15px_40px_-5px_rgba(253,183,21,0.7)] hover:-translate-y-1 active:translate-y-0 disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-lg"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full transition-transform duration-300 group-hover:translate-y-0" />
                <div className="relative flex items-center justify-center gap-3">
                  {isLoading ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      <span className="tracking-widest text-sm">Memproses...</span>
                    </>
                  ) : (
                    <>
                      <span className="tracking-[0.18em] text-[15px]">{dict.submit}</span>
                    </>
                  )}
                </div>
              </button>
            </div>

          </div>
        </div>
      </form>
    </Reveal>
  );
}
