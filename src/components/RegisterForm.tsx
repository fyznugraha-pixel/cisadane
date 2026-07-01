"use client";

import { useState, useRef, useEffect } from "react";
import Reveal from "@/components/Reveal";
import { supabase } from "@/lib/supabase";
import { ChevronDown, Check, User, Mail, Phone, Hash, Loader2, AlertCircle } from "lucide-react";

export default function RegisterForm({ dict }: { dict: any }) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [tncAccepted, setTncAccepted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsCategoryOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    const formData = new FormData(e.currentTarget);
    const fullName = formData.get("fullName") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const category = formData.get("category") as string;

    const { error } = await supabase.from("visitors").insert([
      {
        full_name: fullName,
        email: email,
        phone: phone,
        category: category,
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
        className="mx-auto max-w-2xl overflow-hidden rounded-[2.5rem] border border-[#2654A4]/10 bg-white/80 shadow-[0_20px_60px_-15px_rgba(38,84,164,0.1)] backdrop-blur-xl transition-all duration-300 relative"
      >
        {/* Subtle decorative glow */}
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-[#38BBCA]/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-[#FDB715]/10 blur-3xl pointer-events-none" />

        <div className="h-2 w-full bg-gradient-to-r from-[#2654A4] via-[#38BBCA] to-[#FDB715]" />
        
        <div className="p-8 sm:p-12 relative z-10">
          <div className="space-y-7">
            
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="mb-2.5 ml-1 block text-sm font-bold text-[#041020]/70">
                {dict.fullName} <span className="text-[#EC3A24]">*</span>
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#2654A4]/40 group-focus-within:text-[#2654A4] transition-colors">
                  <User className="h-5 w-5" />
                </div>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  required
                  className="w-full rounded-2xl border border-[#2654A4]/15 bg-[#FDFBF7]/60 py-4 pl-12 pr-4 text-[#041020] placeholder:text-[#041020]/30 transition-all hover:bg-[#FDFBF7] focus:border-[#2654A4] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#2654A4]/10"
                  placeholder="Mis. John Doe"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="mb-2.5 ml-1 block text-sm font-bold text-[#041020]/70">
                {dict.email} <span className="text-[#EC3A24]">*</span>
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#2654A4]/40 group-focus-within:text-[#2654A4] transition-colors">
                  <Mail className="h-5 w-5" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full rounded-2xl border border-[#2654A4]/15 bg-[#FDFBF7]/60 py-4 pl-12 pr-4 text-[#041020] placeholder:text-[#041020]/30 transition-all hover:bg-[#FDFBF7] focus:border-[#2654A4] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#2654A4]/10"
                  placeholder="email@example.com"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="mb-2.5 ml-1 block text-sm font-bold text-[#041020]/70">
                {dict.phone} <span className="text-[#EC3A24]">*</span>
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#2654A4]/40 group-focus-within:text-[#2654A4] transition-colors">
                  <Phone className="h-5 w-5" />
                </div>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  className="w-full rounded-2xl border border-[#2654A4]/15 bg-[#FDFBF7]/60 py-4 pl-12 pr-4 text-[#041020] placeholder:text-[#041020]/30 transition-all hover:bg-[#FDFBF7] focus:border-[#2654A4] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#2654A4]/10"
                  placeholder="+62 812 3456 7890"
                />
              </div>
            </div>

            {/* Category Dropdown */}
            <div ref={dropdownRef} className="relative">
              <label className="mb-2.5 ml-1 block text-sm font-bold text-[#041020]/70">
                {dict.category} <span className="text-[#EC3A24]">*</span>
              </label>
              
              <input 
                type="text" 
                name="category" 
                value={selectedCategory} 
                onChange={() => {}} 
                required 
                className="absolute bottom-0 left-1/2 h-0 w-0 opacity-0 pointer-events-none" 
              />
              
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#2654A4]/40 group-focus-within:text-[#2654A4] transition-colors">
                  <Hash className="h-5 w-5" />
                </div>
                <button
                  type="button"
                  onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                  className={`flex w-full items-center justify-between rounded-2xl border border-[#2654A4]/15 py-4 pl-12 pr-4 text-left transition-all hover:bg-[#FDFBF7] focus:border-[#2654A4] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#2654A4]/10 ${
                    isCategoryOpen ? "bg-white border-[#2654A4] ring-4 ring-[#2654A4]/10" : "bg-[#FDFBF7]/60"
                  }`}
                >
                  <span className={selectedCategory ? "text-[#041020] font-medium" : "text-[#041020]/30"}>
                    {selectedCategory 
                      ? dict.categories[selectedCategory as keyof typeof dict.categories] 
                      : `-- ${dict.category} --`}
                  </span>
                  <ChevronDown
                    size={20}
                    className={`text-[#2654A4]/50 transition-transform duration-300 ${isCategoryOpen ? "rotate-180 text-[#2654A4]" : ""}`}
                  />
                </button>
              </div>

              {isCategoryOpen && (
                <div className="absolute left-0 z-50 mt-2 w-full origin-top transform overflow-hidden rounded-2xl border border-[#2654A4]/10 bg-white/95 backdrop-blur-xl shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="p-2 space-y-1">
                    {["general", "student", "community", "media"].map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => {
                          setSelectedCategory(cat);
                          setIsCategoryOpen(false);
                        }}
                        className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm transition-all ${
                          selectedCategory === cat 
                            ? "bg-[#2654A4]/10 text-[#2654A4] font-bold" 
                            : "text-[#041020]/80 hover:bg-[#FDFBF7] hover:text-[#2654A4]"
                        }`}
                      >
                        {dict.categories[cat as keyof typeof dict.categories]}
                        {selectedCategory === cat && (
                          <Check size={18} className="text-[#2654A4]" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
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
                      ? "border-[#2654A4] bg-[#2654A4] shadow-[0_0_10px_rgba(38,84,164,0.4)] scale-105"
                      : "border-[#2654A4]/30 bg-white hover:border-[#2654A4]/60"
                  }`}
                >
                  {tncAccepted && <Check size={16} strokeWidth={3} className="text-white" />}
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
                className="cursor-pointer text-sm leading-relaxed text-[#041020]/70 select-none hover:text-[#041020] transition-colors"
                onClick={() => setTncAccepted(!tncAccepted)}
              >
                {dict.tnc} <span className="text-[#EC3A24]">*</span>
              </label>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-[#2654A4] to-[#38BBCA] px-8 py-5 text-center font-bold text-white shadow-lg transition-all hover:shadow-[0_10px_40px_-10px_rgba(38,84,164,0.6)] hover:-translate-y-1 active:translate-y-0 disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-lg"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full transition-transform duration-300 group-hover:translate-y-0" />
                <div className="relative flex items-center justify-center gap-2">
                  {isLoading ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      <span className="tracking-widest uppercase text-sm">Memproses...</span>
                    </>
                  ) : (
                    <>
                      <span className="tracking-widest uppercase text-sm">{dict.submit}</span>
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
