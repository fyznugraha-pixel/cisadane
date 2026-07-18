"use client";

import { useState } from "react";
import Reveal from "@/components/Reveal";
import { ChevronDown, Check, User, Mail, Phone, Hash, Loader2, AlertCircle, Store, Search, QrCode, ArrowLeft } from "lucide-react";
import { registerVisitor, findTicketByEmail } from "@/actions/register";
import { tenants } from "@/lib/data/tenants";
import QRCode from "react-qr-code";

export default function RegisterForm({ dict }: { dict: any }) {
  const [mode, setMode] = useState<"register" | "search">("register");
  const [visitorData, setVisitorData] = useState<any>(null);
  const [successMsg, setSuccessMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [tncAccepted, setTncAccepted] = useState(false);
  const [visitorType, setVisitorType] = useState<"general" | "booth">("general");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedBooth, setSelectedBooth] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTenants = tenants.filter(t => t.name.toLowerCase().includes(searchQuery.toLowerCase()));
  const isRegistrationOpen = true;

  const handleRegisterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    const formData = new FormData(e.currentTarget);
    const result = await registerVisitor(formData);

    setIsLoading(false);

    if (!result.success) {
      setErrorMsg(result.error || "Terjadi kesalahan saat menyimpan data. Silakan coba lagi.");
    } else {
      setSuccessMsg(result.message || "Berhasil!");
      setVisitorData(result.data);
    }
  };

  const handleSearchSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    const formData = new FormData(e.currentTarget);
    const result = await findTicketByEmail(formData);

    setIsLoading(false);

    if (!result.success) {
      setErrorMsg(result.error || "Tiket tidak ditemukan.");
    } else {
      setSuccessMsg(result.message || "Tiket ditemukan!");
      setVisitorData(result.data);
    }
  };

  if (!isRegistrationOpen) {
    return (
      <Reveal>
        <div className="mx-auto max-w-xl overflow-hidden rounded-[2.5rem] border border-[#2654A4]/10 bg-white/90 p-12 text-center shadow-[0_20px_60px_-15px_rgba(38,84,164,0.1)] backdrop-blur-xl relative">
          <div className="relative mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-[#2654A4] to-[#38BBCA] shadow-xl">
            <div className="absolute inset-0 rounded-full bg-white opacity-20 animate-pulse" />
            <Loader2 className="h-10 w-10 text-white relative z-10 animate-spin" strokeWidth={2.5} />
          </div>
          <h3 className="mb-4 text-3xl font-black text-[#2654A4] tracking-tight">Sistem Update</h3>
          <p className="text-[#041020]/70 leading-relaxed text-lg max-w-md mx-auto">
            Mohon maaf, sistem registrasi saat ini sedang dalam pembaruan untuk memberikan pengalaman yang lebih baik. Silakan kembali lagi nanti!
          </p>
        </div>
      </Reveal>
    );
  }

  // SUCCESS SCREEN WITH QR CODE
  if (visitorData) {
    return (
      <Reveal>
        <div className="mx-auto max-w-md overflow-hidden rounded-[2.5rem] border border-[#2654A4]/10 bg-white p-8 text-center shadow-[0_20px_60px_-15px_rgba(38,84,164,0.1)] backdrop-blur-xl relative">
          <div className="relative mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#2654A4] to-[#38BBCA] shadow-xl">
            <div className="absolute inset-0 rounded-full bg-white opacity-20 animate-ping" />
            <Check className="h-10 w-10 text-white relative z-10" strokeWidth={3} />
          </div>
          
          <h3 className="mb-2 text-2xl font-black text-[#2654A4] tracking-tight">{successMsg}</h3>
          
          {visitorData.visitor_type === "booth" ? (
            <>
              <p className="text-[#041020]/70 text-sm mb-6">
                Tunjukkan QR Code ini kepada panitia atau penjaga booth saat kedatangan. (Screenshot halaman ini)
              </p>
              
              <div className="bg-[#FDFBF7] p-6 rounded-3xl border-2 dashed border-[#2654A4]/30 mb-6 flex flex-col items-center">
                <div className="bg-white p-4 rounded-2xl shadow-sm mb-4">
                  <QRCode value={visitorData.id} size={200} />
                </div>
                <p className="text-[#2654A4] font-mono font-bold text-sm tracking-wider">{visitorData.id}</p>
              </div>
            </>
          ) : (
            <div className="bg-[#FDFBF7] p-6 rounded-3xl border border-[#2654A4]/10 mb-6 mt-4">
              <div className="flex items-center justify-center mb-4">
                <div className="h-12 w-12 rounded-full bg-[#2654A4]/10 flex items-center justify-center">
                  <Mail className="h-6 w-6 text-[#2654A4]" />
                </div>
              </div>
              <p className="text-[#041020] font-medium mb-2">Pendaftaran Berhasil!</p>
              <p className="text-[#041020]/70 text-sm">
                Kami telah mengirimkan email konfirmasi ke <strong>{visitorData.email}</strong>. 
                Silakan periksa kotak masuk (atau folder spam) Anda.
              </p>
            </div>
          )}

          <div className="bg-[#2654A4]/5 rounded-2xl p-4 text-left space-y-3 mb-6">
            <div>
              <p className="text-xs font-bold text-[#2654A4]/60 uppercase tracking-widest">Nama</p>
              <p className="font-bold text-[#041020]">{visitorData.full_name}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-[#2654A4]/60 uppercase tracking-widest">Kategori</p>
              <p className="font-bold text-[#041020]">
                {visitorData.visitor_type === 'booth' ? 'Kunjungan Booth' : 'Pengunjung Umum'}
                {visitorData.booth_name && ` - ${visitorData.booth_name}`}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setVisitorData(null);
              setMode("register");
            }}
            className="text-sm font-bold text-[#2654A4] hover:text-[#38BBCA] transition-colors"
          >
            Kembali ke Beranda
          </button>
        </div>
      </Reveal>
    );
  }

  return (
    <Reveal>
      <div className="mx-auto max-w-2xl overflow-hidden rounded-[2.5rem] border border-[#2654A4]/10 bg-white/80 shadow-[0_20px_60px_-15px_rgba(38,84,164,0.1)] backdrop-blur-xl transition-all duration-300 relative">
        {/* Subtle decorative glow */}
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-[#38BBCA]/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-[#38BBCA]/10 blur-3xl pointer-events-none" />

        <div className="flex bg-[#FDFBF7] border-b border-[#2654A4]/10 p-2 gap-2">
          <button
            onClick={() => setMode("register")}
            className={`flex-1 py-3 px-4 rounded-2xl font-bold text-sm transition-all ${mode === "register" ? "bg-white text-[#2654A4] shadow-sm" : "text-[#041020]/50 hover:text-[#041020]"}`}
          >
            Daftar Baru
          </button>
          <button
            onClick={() => setMode("search")}
            className={`flex-1 py-3 px-4 rounded-2xl font-bold text-sm transition-all ${mode === "search" ? "bg-white text-[#2654A4] shadow-sm" : "text-[#041020]/50 hover:text-[#041020]"}`}
          >
            Cari Tiket Saya
          </button>
        </div>
        
        <div className="p-8 sm:p-12 relative z-10">
          
          {mode === "search" ? (
            <form onSubmit={handleSearchSubmit} className="space-y-6">
              <div className="text-center mb-8">
                <div className="mx-auto w-16 h-16 bg-[#2654A4]/5 text-[#2654A4] rounded-full flex items-center justify-center mb-4">
                  <QrCode size={32} />
                </div>
                <h3 className="text-2xl font-black text-[#041020]">Lupa Screenshot Tiket?</h3>
                <p className="text-[#041020]/60 text-sm mt-2">Masukkan alamat email yang Anda gunakan saat mendaftar untuk melihat kembali QR Code Anda.</p>
              </div>

              <div>
                <label htmlFor="searchEmail" className="mb-2.5 ml-1 block text-sm font-bold text-[#041020]/70">
                  Email Pendaftaran <span className="text-[#EC3A24]">*</span>
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#2654A4]/40 group-focus-within:text-[#2654A4] transition-colors">
                    <Mail className="h-5 w-5" />
                  </div>
                  <input
                    type="email"
                    id="searchEmail"
                    name="email"
                    required
                    className="w-full rounded-2xl border border-[#2654A4]/15 bg-[#FDFBF7]/60 py-4 pl-12 pr-4 text-[#041020] placeholder:text-[#041020]/30 transition-all hover:bg-[#FDFBF7] focus:border-[#2654A4] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#2654A4]/10"
                    placeholder="email@example.com"
                  />
                </div>
              </div>

              {errorMsg && (
                <div className="flex items-center gap-3 rounded-2xl border border-red-500/20 bg-red-50/80 p-4 text-sm text-red-600 animate-in fade-in zoom-in-95">
                  <AlertCircle size={18} className="shrink-0" />
                  <p>{errorMsg}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full overflow-hidden rounded-2xl bg-[#2654A4] px-8 py-5 text-center font-black text-white shadow-lg transition-all hover:bg-[#1c4285] hover:-translate-y-1 active:translate-y-0 disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-lg mt-4"
              >
                <div className="relative flex items-center justify-center gap-2">
                  {isLoading ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      <span className="tracking-widest uppercase text-sm">Mencari...</span>
                    </>
                  ) : (
                    <>
                      <Search size={18} />
                      <span className="tracking-widest uppercase text-sm">Cari Tiket</span>
                    </>
                  )}
                </div>
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegisterSubmit} className="space-y-7">
              {/* Category Selection */}
              <div>
                <label className="mb-3 ml-1 block text-sm font-bold text-[#041020]/70">
                  Kategori Kunjungan <span className="text-[#EC3A24]">*</span>
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setVisitorType("general")}
                    className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all ${
                      visitorType === "general"
                        ? "border-[#2654A4] bg-[#2654A4]/5 text-[#2654A4]"
                        : "border-[#2654A4]/10 bg-transparent text-[#041020]/60 hover:bg-[#FDFBF7]"
                    }`}
                  >
                    <User className="h-6 w-6 mb-2" />
                    <span className="font-bold text-sm">Pengunjung Umum</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setVisitorType("booth")}
                    className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all ${
                      visitorType === "booth"
                        ? "border-[#2654A4] bg-[#2654A4]/5 text-[#2654A4]"
                        : "border-[#2654A4]/10 bg-transparent text-[#041020]/60 hover:bg-[#FDFBF7]"
                    }`}
                  >
                    <Store className="h-6 w-6 mb-2" />
                    <span className="font-bold text-sm">Kunjungan Booth</span>
                  </button>
                </div>
                <input type="hidden" name="visitorType" value={visitorType} />
              </div>

              {/* Booth Selection (Only show if visitorType is booth) */}
              {visitorType === "booth" && (
                <Reveal delay={0.1}>
                  <div>
                    <label className="mb-2.5 ml-1 block text-sm font-bold text-[#041020]/70">
                      Pilih Booth <span className="text-[#EC3A24]">*</span>
                    </label>
                    <div className="relative group">
                      <button
                        type="button"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="w-full flex items-center justify-between rounded-2xl border border-[#2654A4]/15 bg-[#FDFBF7]/60 py-4 pl-12 pr-4 text-[#041020] transition-all hover:bg-[#FDFBF7] focus:border-[#2654A4] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#2654A4]/10 text-left"
                      >
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#2654A4]/40 group-focus-within:text-[#2654A4] transition-colors">
                          <Store className="h-5 w-5" />
                        </div>
                        <span className={selectedBooth ? "text-[#041020]" : "text-[#041020]/30"} style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {selectedBooth || "-- Pilih Booth --"}
                        </span>
                        <ChevronDown className={`h-5 w-5 flex-shrink-0 ml-2 text-[#041020]/40 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                      </button>
                      
                      {isDropdownOpen && (
                        <div className="absolute z-50 w-full mt-2 rounded-2xl border border-[#2654A4]/10 bg-white shadow-xl max-h-[450px] overflow-hidden flex flex-col">
                          <div className="p-3 border-b border-[#2654A4]/5 bg-white">
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#2654A4]/40">
                                <Search className="h-4 w-4" />
                              </div>
                              <input 
                                type="text" 
                                placeholder="Cari nama booth..." 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full rounded-xl border border-[#2654A4]/10 bg-[#FDFBF7] py-2.5 pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#2654A4]/20 focus:border-[#2654A4]/40"
                                autoFocus
                              />
                            </div>
                          </div>
                          <div className="overflow-y-auto flex-1">
                            {filteredTenants.length > 0 ? (
                              filteredTenants.map((tenant) => {
                                const origIndex = tenants.findIndex(t => t.id === tenant.id);
                                return (
                                  <button
                                    key={tenant.id}
                                    type="button"
                                    onClick={() => {
                                      setSelectedBooth(tenant.name);
                                      setIsDropdownOpen(false);
                                      setSearchQuery("");
                                    }}
                                    className={`w-full text-left px-4 py-3 text-sm flex items-start gap-3 border-b border-[#2654A4]/5 last:border-0 transition-colors ${
                                      selectedBooth === tenant.name ? 'bg-[#2654A4]/10 text-[#2654A4] font-semibold' : 'hover:bg-[#2654A4]/5'
                                    }`}
                                  >
                                    <span className={`font-mono text-xs mt-0.5 ${selectedBooth === tenant.name ? 'text-[#2654A4]/70' : 'text-[#2654A4]/50'}`}>
                                      {origIndex + 1}.
                                    </span>
                                    <span>{tenant.name}</span>
                                  </button>
                                );
                              })
                            ) : (
                              <div className="p-6 text-center text-sm text-[#041020]/40">Booth tidak ditemukan</div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                    <input type="hidden" name="boothName" value={selectedBooth} />
                  </div>
                </Reveal>
              )}

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

              {/* Domicile */}
              <div>
                <label htmlFor="domicile" className="mb-2.5 ml-1 block text-sm font-bold text-[#041020]/70">
                  {dict.domicile} <span className="text-[#EC3A24]">*</span>
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#2654A4]/40 group-focus-within:text-[#2654A4] transition-colors">
                    <Hash className="h-5 w-5" />
                  </div>
                  <input
                    type="text"
                    id="domicile"
                    name="domicile"
                    required
                    className="w-full rounded-2xl border border-[#2654A4]/15 bg-[#FDFBF7]/60 py-4 pl-12 pr-4 text-[#041020] placeholder:text-[#041020]/30 transition-all hover:bg-[#FDFBF7] focus:border-[#2654A4] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#2654A4]/10"
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
            </form>
          )}

        </div>
      </div>
    </Reveal>
  );
}
