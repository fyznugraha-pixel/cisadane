"use client";

import { useState, useRef, useEffect } from "react";
import Reveal from "@/components/Reveal";
import { supabase } from "@/lib/supabase";
import { ChevronDown, Check } from "lucide-react";

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
        <div className="flex h-[300px] flex-col items-center justify-center rounded-2xl border border-[#2654A4]/15 bg-white p-8 text-center shadow-lg">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#38BBCA]/20 text-[#38BBCA]">
            <svg
              className="h-8 w-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <p className="text-lg font-bold text-[#2654A4]">{dict.success}</p>
        </div>
      </Reveal>
    );
  }

  return (
    <Reveal>
      <form
        onSubmit={handleSubmit}
        className="mx-auto max-w-2xl overflow-hidden rounded-2xl border border-[#2654A4]/15 bg-white shadow-xl"
      >
        <div className="bg-gradient-to-r from-[#2654A4] to-[#38BBCA] p-1" />
        <div className="p-8 md:p-10">
          <div className="space-y-6">
            <div>
              <label
                htmlFor="fullName"
                className="mb-2 block text-sm font-bold text-[#041020]/80"
              >
                {dict.fullName} <span className="text-[#EC3A24]">*</span>
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                required
                className="w-full border-b-2 border-[#2654A4]/20 bg-[#FDFBF7] px-4 py-3 text-[#041020] transition focus:border-[#FDB715] focus:outline-none focus:ring-0"
                placeholder={dict.fullName}
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-bold text-[#041020]/80"
              >
                {dict.email} <span className="text-[#EC3A24]">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full border-b-2 border-[#2654A4]/20 bg-[#FDFBF7] px-4 py-3 text-[#041020] transition focus:border-[#FDB715] focus:outline-none focus:ring-0"
                placeholder="email@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="mb-2 block text-sm font-bold text-[#041020]/80"
              >
                {dict.phone} <span className="text-[#EC3A24]">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                className="w-full border-b-2 border-[#2654A4]/20 bg-[#FDFBF7] px-4 py-3 text-[#041020] transition focus:border-[#FDB715] focus:outline-none focus:ring-0"
                placeholder="+62 812 3456 7890"
              />
            </div>

            <div ref={dropdownRef} className="relative">
              <label
                className="mb-2 block text-sm font-bold text-[#041020]/80"
              >
                {dict.category} <span className="text-[#EC3A24]">*</span>
              </label>
              
              {/* Visually hidden text input for native validation */}
              <input 
                type="text" 
                name="category" 
                value={selectedCategory} 
                onChange={() => {}} 
                required 
                className="absolute bottom-0 left-1/2 h-0 w-0 opacity-0" 
              />
              
              <button
                type="button"
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                className="flex w-full items-center justify-between border-b-2 border-[#2654A4]/20 bg-[#FDFBF7] px-4 py-3 text-[#041020] transition focus:border-[#FDB715] focus:outline-none focus:ring-0"
              >
                <span className={selectedCategory ? "text-[#041020]" : "text-[#041020]/50"}>
                  {selectedCategory 
                    ? dict.categories[selectedCategory as keyof typeof dict.categories] 
                    : `-- ${dict.category} --`}
                </span>
                <ChevronDown
                  size={18}
                  className={`text-[#2654A4] transition-transform duration-300 ${isCategoryOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isCategoryOpen && (
                <div className="absolute left-0 z-50 mt-1 w-full overflow-hidden rounded-md border border-[#2654A4]/15 bg-white shadow-lg">
                  {["general", "student", "community", "media"].map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => {
                        setSelectedCategory(cat);
                        setIsCategoryOpen(false);
                      }}
                      className="flex w-full items-center justify-between px-4 py-3 text-left text-sm text-[#041020] transition hover:bg-[#FDB715]/10 hover:text-[#2654A4]"
                    >
                      {dict.categories[cat as keyof typeof dict.categories]}
                      {selectedCategory === cat && (
                        <Check size={16} className="text-[#2654A4]" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {errorMsg && (
              <div className="rounded-md bg-red-50 p-4 text-sm text-red-600">
                {errorMsg}
              </div>
            )}

            <div className="flex items-start gap-3 pt-2">
              <div className="flex h-5 items-center">
                <button
                  type="button"
                  role="checkbox"
                  aria-checked={tncAccepted}
                  onClick={() => setTncAccepted(!tncAccepted)}
                  className={`flex h-5 w-5 items-center justify-center border transition ${
                    tncAccepted
                      ? "border-[#2654A4] bg-[#2654A4]"
                      : "border-[#2654A4]/30 bg-white hover:border-[#2654A4]"
                  }`}
                >
                  {tncAccepted && <Check size={14} className="text-white" />}
                </button>
                {/* Visually hidden input to ensure required validation works natively */}
                <input 
                  type="checkbox" 
                  className="absolute opacity-0 h-0 w-0" 
                  checked={tncAccepted} 
                  required 
                  readOnly 
                />
              </div>
              <label 
                className="cursor-pointer text-xs leading-relaxed text-[#041020]/70 select-none"
                onClick={() => setTncAccepted(!tncAccepted)}
              >
                {dict.tnc} <span className="text-[#EC3A24]">*</span>
              </label>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#FDB715] px-8 py-4 text-center font-black uppercase tracking-[0.18em] text-[#041020] shadow-[5px_5px_0_rgba(38,84,164,0.3)] transition hover:-translate-y-1 hover:bg-[#2654A4] hover:text-white hover:shadow-[5px_5px_0_rgba(253,183,21,0.5)] disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:bg-[#FDB715] disabled:hover:text-[#041020]"
              >
                {isLoading ? "Memproses..." : dict.submit}
              </button>
            </div>
          </div>
        </div>
      </form>
    </Reveal>
  );
}
