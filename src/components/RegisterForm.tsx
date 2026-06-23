"use client";

import { useState } from "react";
import Reveal from "@/components/Reveal";

export default function RegisterForm({ dict }: { dict: any }) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/festivalcisadane/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to register");
      }

      setIsSubmitted(true);
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setIsLoading(false);
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
                value={formData.fullName}
                onChange={handleChange}
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
                value={formData.email}
                onChange={handleChange}
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
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full border-b-2 border-[#2654A4]/20 bg-[#FDFBF7] px-4 py-3 text-[#041020] transition focus:border-[#FDB715] focus:outline-none focus:ring-0"
                placeholder="+62 812 3456 7890"
              />
            </div>

            {errorMsg && (
              <div className="rounded border border-[#EC3A24]/40 bg-[#EC3A24]/10 p-3 text-sm font-medium text-[#EC3A24]">
                {errorMsg}
              </div>
            )}

            <div className="pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#FDB715] px-8 py-4 text-center font-black uppercase tracking-[0.18em] text-[#041020] shadow-[5px_5px_0_rgba(38,84,164,0.3)] transition hover:-translate-y-1 hover:bg-[#2654A4] hover:text-white hover:shadow-[5px_5px_0_rgba(253,183,21,0.5)] disabled:opacity-70 disabled:hover:translate-y-0"
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
