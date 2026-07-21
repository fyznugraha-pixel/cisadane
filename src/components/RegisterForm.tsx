"use client";

import { useState, useEffect } from "react";
import Reveal from "@/components/Reveal";
import { ChevronDown, Check, User, Mail, Phone, Hash, Loader2, AlertCircle, Store, Search, QrCode, ArrowLeft, Smartphone, Download } from "lucide-react";
import { registerVisitor, findTicketByEmail } from "@/actions/register";
import { tenants } from "@/lib/data/tenants";
import QRCode from "react-qr-code";
import Image from "next/image";
import { toPng } from "html-to-image";

export default function RegisterForm({ dict, initialVisitorType = null }: { dict: any, initialVisitorType?: "general" | "booth" | "telkomsel" | null }) {
  const [mode, setMode] = useState<"register" | "search">("register");
  const [visitorData, setVisitorData] = useState<any>(null);
  const [successMsg, setSuccessMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [tncAccepted, setTncAccepted] = useState(false);
  const [visitorType, setVisitorType] = useState<"general" | "booth" | "telkomsel" | null>(initialVisitorType);
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
    try {
      const result = await registerVisitor(formData);

      if (!result.success) {
        setErrorMsg(result.error || "Terjadi kesalahan saat menyimpan data. Silakan coba lagi.");
      } else {
        setSuccessMsg(result.message || "Berhasil!");
        setVisitorData(result.data);
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Terjadi kesalahan pada server. Pastikan koneksi internet Anda stabil.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadTicket = async (ticketId: string) => {
    const element = document.getElementById(`ticket-${ticketId}`);
    if (!element) return;
    
    try {
      const dataUrl = await toPng(element, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: '#ffffff'
      });
      const link = document.createElement("a");
      link.download = `E-Ticket-${ticketId.substring(0, 8)}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Failed to download ticket", err);
    }
  };

  const handleSearchSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    const formData = new FormData(e.currentTarget);
    try {
      const result = await findTicketByEmail(formData);

      if (!result.success) {
        setErrorMsg(result.error || "Tiket tidak ditemukan.");
      } else {
        setSuccessMsg(result.message || "Tiket ditemukan!");
        setVisitorData(result.data);
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Terjadi kesalahan pada server. Pastikan koneksi internet Anda stabil.");
    } finally {
      setIsLoading(false);
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
    const tickets = Array.isArray(visitorData) ? visitorData : [visitorData];
    const isTelkomselTicket = tickets[0]?.visitor_type === 'telkomsel';

    return (
      <Reveal>
        <div className={`mx-auto max-w-3xl overflow-hidden rounded-[2.5rem] border bg-white/90 p-8 sm:p-10 text-center shadow-[0_20px_60px_-15px_rgba(38,84,164,0.1)] backdrop-blur-xl relative ${isTelkomselTicket ? 'border-[#EC3A24]/20' : 'border-[#2654A4]/10'}`}>
          {isTelkomselTicket && (
            <div className="mb-8 flex justify-center">
              <Image src="/festivalcisadane/partners/sponsored/sponsored_4.webp" alt="Telkomsel Logo" width={120} height={60} className="object-contain" />
            </div>
          )}
          <div className={`relative mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full shadow-xl ${isTelkomselTicket ? 'bg-gradient-to-br from-[#EC3A24] to-[#ff5238]' : 'bg-gradient-to-br from-[#2654A4] to-[#38BBCA]'}`}>
            <div className="absolute inset-0 rounded-full bg-white opacity-20 animate-ping" />
            <Check className="h-10 w-10 text-white relative z-10" strokeWidth={3} />
          </div>
          
          <h3 className={`mb-2 text-2xl sm:text-3xl font-black tracking-tight ${isTelkomselTicket ? 'text-[#EC3A24]' : 'text-[#2654A4]'}`}>{successMsg}</h3>
          <p className="text-[#041020]/70 text-sm mb-8">
            {tickets.length > 1 
              ? `Anda memiliki ${tickets.length} tiket yang terdaftar pada email ini.`
              : "Tunjukkan QR Code ini kepada panitia saat kedatangan. (Screenshot halaman ini)"
            }
          </p>
          
          <div className={`grid gap-6 text-left ${tickets.length > 1 ? 'md:grid-cols-2' : 'max-w-md mx-auto'}`}>
            {tickets.map((ticket, index) => (
              <div key={ticket.id || index} className="flex flex-col gap-3">
                {/* The Ticket Itself */}
                <div id={`ticket-${ticket.id}`} className={`flex flex-col bg-white border rounded-3xl p-6 shadow-sm relative overflow-hidden transition-all group ${isTelkomselTicket ? 'border-[#EC3A24]/10 hover:shadow-md hover:border-[#EC3A24]/30' : 'border-[#2654A4]/10 hover:shadow-md hover:border-[#2654A4]/30'}`}>
                  <div className={`absolute -right-10 -top-10 h-32 w-32 rounded-full blur-2xl pointer-events-none transition-colors ${isTelkomselTicket ? 'bg-[#EC3A24]/5 group-hover:bg-[#EC3A24]/10' : 'bg-[#38BBCA]/5 group-hover:bg-[#38BBCA]/10'}`} />
                
                {/* Header Ticket */}
                <div className={`flex items-center justify-between mb-4 border-b pb-4 ${isTelkomselTicket ? 'border-[#EC3A24]/10' : 'border-[#2654A4]/10'}`}>
                  <div className="flex items-center gap-2">
                    <div className={`p-2 rounded-xl ${ticket.visitor_type === 'booth' ? 'bg-green-50 text-green-600' : ticket.visitor_type === 'telkomsel' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'}`}>
                      {ticket.visitor_type === 'booth' ? <Store size={18} /> : ticket.visitor_type === 'telkomsel' ? <Smartphone size={18} /> : <User size={18} />}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#041020]/50 uppercase tracking-wider">Kategori</p>
                      <p className="font-bold text-[#041020] text-sm">
                        {ticket.visitor_type === 'booth' ? 'Booth' : ticket.visitor_type === 'telkomsel' ? 'Telkomsel' : 'Umum'}
                      </p>
                    </div>
                  </div>
                  {(ticket.visitor_type === 'booth' || ticket.visitor_type === 'telkomsel') && ticket.booth_name && (
                    <div className="text-right flex-shrink-0 ml-2">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold text-center ${ticket.visitor_type === 'telkomsel' ? 'bg-[#EC3A24]/10 text-[#EC3A24]' : 'bg-[#FDB715]/10 text-[#FDB715]'}`}>
                        {ticket.booth_name}
                      </span>
                    </div>
                  )}
                </div>

                {/* QR Code */}
                <div className="flex-grow flex flex-col items-center justify-center mb-6">
                  <div className={`bg-[#FDFBF7] p-4 rounded-3xl border-2 dashed w-full flex flex-col items-center transition-colors ${isTelkomselTicket ? 'border-[#EC3A24]/20 group-hover:border-[#EC3A24]/40' : 'border-[#2654A4]/20 group-hover:border-[#2654A4]/40'}`}>
                    <div className="bg-white p-4 rounded-3xl shadow-sm mb-3">
                      <QRCode value={ticket.id} size={220} />
                    </div>
                    <p className={`font-mono font-bold text-xs tracking-wider ${isTelkomselTicket ? 'text-[#EC3A24]' : 'text-[#2654A4]'}`}>{ticket.id.split('-')[0]}</p>
                  </div>
                </div>

                {/* Footer Ticket */}
                <div className="bg-[#FDFBF7] rounded-2xl p-4 text-left space-y-2 mt-auto">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className={`text-[10px] font-bold uppercase tracking-widest ${isTelkomselTicket ? 'text-[#EC3A24]/60' : 'text-[#2654A4]/60'}`}>Nama</p>
                      <p className="font-bold text-[#041020] text-sm line-clamp-1">{ticket.full_name}</p>
                    </div>
                    <div className="text-right">
                      <p className={`text-[10px] font-bold uppercase tracking-widest ${isTelkomselTicket ? 'text-[#EC3A24]/60' : 'text-[#2654A4]/60'}`}>Tanggal</p>
                      <p className="font-bold text-[#041020] text-xs">
                        {new Date(ticket.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                      </p>
                    </div>
                  </div>
                </div>
                </div>

                {/* Download Button */}
                <button
                  onClick={() => handleDownloadTicket(ticket.id)}
                  className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors ${isTelkomselTicket ? 'bg-[#EC3A24]/10 text-[#EC3A24] hover:bg-[#EC3A24]/20' : 'bg-[#2654A4]/10 text-[#2654A4] hover:bg-[#2654A4]/20'}`}
                >
                  <Download size={18} />
                  Download E-Ticket
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={() => {
              setVisitorData(null);
              setVisitorType(null);
              setMode("register");
            }}
            className={`mt-8 flex items-center justify-center gap-2 mx-auto text-sm font-bold transition-colors ${isTelkomselTicket ? 'text-[#EC3A24] hover:text-[#d12a15]' : 'text-[#2654A4] hover:text-[#38BBCA]'}`}
          >
            <ArrowLeft size={16} />
            Kembali ke Beranda
          </button>
        </div>
      </Reveal>
    );
  }

  return (
    <Reveal>
      <div className={`mx-auto overflow-hidden rounded-[2.5rem] border border-[#2654A4]/10 bg-white/80 shadow-[0_20px_60px_-15px_rgba(38,84,164,0.1)] backdrop-blur-xl transition-all duration-500 relative ${
        visitorType === "telkomsel" && mode === "register" && !visitorData 
          ? "w-full max-w-full" 
          : "max-w-4xl"
      }`}>
        {/* Subtle decorative glow */}
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-[#38BBCA]/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-[#38BBCA]/10 blur-3xl pointer-events-none" />

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

              <button
                type="button"
                onClick={() => setMode("register")}
                className="w-full mt-4 flex items-center justify-center gap-2 text-sm font-bold text-[#2654A4] hover:text-[#38BBCA] transition-colors"
              >
                <ArrowLeft size={16} />
                Kembali ke Pilihan Registrasi
              </button>
            </form>
          ) : visitorType === null ? (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-black text-[#2654A4]">Pilih Kategori Registrasi</h3>
                <p className="text-[#041020]/60 text-sm mt-2">Silakan pilih kategori kunjungan Anda untuk melanjutkan pendaftaran.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <button
                  type="button"
                  onClick={() => setVisitorType("general")}
                  className="flex flex-col items-center justify-center p-6 rounded-3xl border-2 border-[#2654A4]/10 bg-white hover:border-[#2654A4] hover:bg-[#2654A4]/5 transition-all group h-full"
                >
                  <div className="w-16 h-16 rounded-full bg-[#2654A4]/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <User className="h-8 w-8 text-[#2654A4]" />
                  </div>
                  <span className="font-bold text-[#041020] group-hover:text-[#2654A4]">Pengunjung Umum</span>
                  <span className="text-xs text-[#041020]/50 text-center mt-2">Akses festival gratis untuk umum</span>
                </button>

                <button
                  type="button"
                  onClick={() => setVisitorType("booth")}
                  className="flex flex-col items-center justify-center p-6 rounded-3xl border-2 border-[#2654A4]/10 bg-white hover:border-[#2654A4] hover:bg-[#2654A4]/5 transition-all group h-full"
                >
                  <div className="w-16 h-16 rounded-full bg-[#2654A4]/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Store className="h-8 w-8 text-[#2654A4]" />
                  </div>
                  <span className="font-bold text-[#041020] group-hover:text-[#2654A4]">Kunjungan Booth</span>
                  <span className="text-xs text-[#041020]/50 text-center mt-2">Daftar pengunjung booth tenant</span>
                </button>

                <button
                  type="button"
                  onClick={() => setVisitorType("telkomsel")}
                  className="flex flex-col items-center justify-center p-6 rounded-3xl border-2 border-[#EC3A24]/10 bg-white hover:border-[#EC3A24] hover:bg-[#EC3A24]/5 transition-all group h-full"
                >
                  <div className="h-16 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform mix-blend-multiply">
                    <Image src="/festivalcisadane/partners/sponsored/sponsored_4.webp" alt="Telkomsel" width={80} height={40} className="object-contain" />
                  </div>
                  <span className="font-bold text-[#041020] group-hover:text-[#EC3A24]">Promo Telkomsel</span>
                  <span className="text-xs text-[#041020]/50 text-center mt-2">Berkesempatan mendapatkan merchandise langsung</span>
                </button>
              </div>

              <div className="pt-6 border-t border-[#2654A4]/10 mt-6 text-center">
                <button
                  onClick={() => setMode("search")}
                  className="inline-flex items-center justify-center gap-2 text-sm font-bold text-[#2654A4] hover:text-[#38BBCA] transition-colors bg-[#2654A4]/5 px-6 py-3 rounded-xl hover:bg-[#2654A4]/10"
                >
                  <Search size={16} />
                  Cari Tiket Saya (Lupa Screenshot)
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleRegisterSubmit} className={`animate-in fade-in slide-in-from-bottom-4 duration-300 ${
              visitorType === "telkomsel" ? "flex flex-col md:flex-row gap-10" : "space-y-7"
            }`}>
              
              {/* Poster Kiri untuk Telkomsel */}
              {visitorType === "telkomsel" && (
                <div className="md:w-7/12 hidden md:flex flex-col rounded-3xl overflow-hidden border-2 border-[#EC3A24]/10 shadow-sm relative">
                  <Image 
                    src="/festivalcisadane/images/register/telkom2.webp" 
                    alt="Telkomsel Giveaway Poster" 
                    width={800} 
                    height={1000} 
                    className="w-full h-full object-cover object-top" 
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#041020]/90 via-[#041020]/20 to-transparent pointer-events-none flex flex-col justify-end p-8">
                    <p className="text-white font-black text-3xl tracking-tight leading-tight">Telkomsel<br/><span className="text-[#EC3A24]">Merchandise</span></p>
                    <p className="text-white/80 text-sm mt-3 font-medium">Khusus pengunjung Festival Cisadane 2026. Pilih hadiah incaran Anda sekarang sebelum kehabisan!</p>
                  </div>
                </div>
              )}

              {/* Kolom Kanan: Isi Form */}
              <div className={`flex-1 space-y-7 ${visitorType === "telkomsel" ? "md:w-5/12 py-2" : ""}`}>
              
              <div className="flex items-center justify-between mb-2">
                <button
                  type="button"
                  onClick={() => setVisitorType(null)}
                  className={`flex items-center gap-2 text-sm font-bold text-[#041020]/50 transition-colors bg-[#FDFBF7] px-4 py-2 rounded-full border ${visitorType === 'telkomsel' ? 'hover:text-[#EC3A24] border-[#EC3A24]/10 hover:border-[#EC3A24]/30' : 'hover:text-[#2654A4] border-[#2654A4]/10 hover:border-[#2654A4]/30'}`}
                >
                  <ArrowLeft size={16} />
                  Kembali
                </button>
                <div className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider ${
                  visitorType === "telkomsel" ? "bg-[#EC3A24]/10 text-[#EC3A24]" : "bg-[#2654A4]/10 text-[#2654A4]"
                }`}>
                  {visitorType === 'general' ? 'Pengunjung Umum' : visitorType === 'booth' ? 'Kunjungan Booth' : 'Promo Telkomsel'}
                </div>
              </div>

              <input type="hidden" name="visitorType" value={visitorType} />

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

              {/* Merchandise Selection (Only show if visitorType is telkomsel) */}
              {visitorType === "telkomsel" && (
                <Reveal delay={0.1}>
                  <div className="flex flex-col justify-center">
                    <div className="p-5 rounded-2xl bg-[#EC3A24]/5 border border-[#EC3A24]/20 text-center relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-[#EC3A24]/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
                      <p className="text-[#041020]/70 text-sm mb-1">Terima kasih telah berpartisipasi!</p>
                      <p className="text-[#EC3A24] font-black text-base sm:text-lg leading-tight">Pengisian ini untuk mendapatkan merchandise langsung berupa Trash Bin dan Phone Holder supported by Telkomsel <span className="text-green-600">JagaBumi</span></p>
                      <div className="mt-4 text-left space-y-1.5 bg-white/60 p-3 rounded-xl border border-[#EC3A24]/10">
                        <p className="text-xs text-[#041020]/80 font-semibold flex items-start gap-1.5">
                          <span className="text-[#EC3A24] font-black">*</span> 
                          <span>Persediaan Terbatas</span>
                        </p>
                        <p className="text-xs text-[#041020]/80 font-semibold flex items-start gap-1.5">
                          <span className="text-[#EC3A24] font-black">*</span> 
                          <span>Scan Barcode di Booth Telkomsel untuk pengambilan Merchandise</span>
                        </p>
                      </div>
                    </div>
                    <input type="hidden" name="boothName" value="Merchandise Jaga Bumi" />
                  </div>
                </Reveal>
              )}

              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="mb-2.5 ml-1 block text-sm font-bold text-[#041020]/70">
                  {dict.fullName} <span className="text-[#EC3A24]">*</span>
                </label>
                <div className="relative group">
                  <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors ${visitorType === 'telkomsel' ? 'text-[#EC3A24]/40 group-focus-within:text-[#EC3A24]' : 'text-[#2654A4]/40 group-focus-within:text-[#2654A4]'}`}>
                    <User className="h-5 w-5" />
                  </div>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    required
                    className={`w-full rounded-2xl border bg-[#FDFBF7]/60 py-4 pl-12 pr-4 text-[#041020] placeholder:text-[#041020]/30 transition-all hover:bg-[#FDFBF7] focus:bg-white focus:outline-none focus:ring-4 ${
                      visitorType === "telkomsel" ? "border-[#EC3A24]/15 focus:border-[#EC3A24] focus:ring-[#EC3A24]/10" : "border-[#2654A4]/15 focus:border-[#2654A4] focus:ring-[#2654A4]/10"
                    }`}
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
                  <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors ${visitorType === 'telkomsel' ? 'text-[#EC3A24]/40 group-focus-within:text-[#EC3A24]' : 'text-[#2654A4]/40 group-focus-within:text-[#2654A4]'}`}>
                    <Mail className="h-5 w-5" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className={`w-full rounded-2xl border bg-[#FDFBF7]/60 py-4 pl-12 pr-4 text-[#041020] placeholder:text-[#041020]/30 transition-all hover:bg-[#FDFBF7] focus:bg-white focus:outline-none focus:ring-4 ${
                      visitorType === "telkomsel" ? "border-[#EC3A24]/15 focus:border-[#EC3A24] focus:ring-[#EC3A24]/10" : "border-[#2654A4]/15 focus:border-[#2654A4] focus:ring-[#2654A4]/10"
                    }`}
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
                  <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors ${visitorType === 'telkomsel' ? 'text-[#EC3A24]/40 group-focus-within:text-[#EC3A24]' : 'text-[#2654A4]/40 group-focus-within:text-[#2654A4]'}`}>
                    <Phone className="h-5 w-5" />
                  </div>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    className={`w-full rounded-2xl border bg-[#FDFBF7]/60 py-4 pl-12 pr-4 text-[#041020] placeholder:text-[#041020]/30 transition-all hover:bg-[#FDFBF7] focus:bg-white focus:outline-none focus:ring-4 ${
                      visitorType === "telkomsel" ? "border-[#EC3A24]/15 focus:border-[#EC3A24] focus:ring-[#EC3A24]/10" : "border-[#2654A4]/15 focus:border-[#2654A4] focus:ring-[#2654A4]/10"
                    }`}
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
                  <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors ${visitorType === 'telkomsel' ? 'text-[#EC3A24]/40 group-focus-within:text-[#EC3A24]' : 'text-[#2654A4]/40 group-focus-within:text-[#2654A4]'}`}>
                    <Hash className="h-5 w-5" />
                  </div>
                  <input
                    type="text"
                    id="domicile"
                    name="domicile"
                    required
                    className={`w-full rounded-2xl border bg-[#FDFBF7]/60 py-4 pl-12 pr-4 text-[#041020] placeholder:text-[#041020]/30 transition-all hover:bg-[#FDFBF7] focus:bg-white focus:outline-none focus:ring-4 ${
                      visitorType === "telkomsel" ? "border-[#EC3A24]/15 focus:border-[#EC3A24] focus:ring-[#EC3A24]/10" : "border-[#2654A4]/15 focus:border-[#2654A4] focus:ring-[#2654A4]/10"
                    }`}
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
                        ? visitorType === "telkomsel" 
                          ? "border-[#EC3A24] bg-[#EC3A24] shadow-[0_0_10px_rgba(236,58,36,0.4)] scale-105"
                          : "border-[#2654A4] bg-[#2654A4] shadow-[0_0_10px_rgba(38,84,164,0.4)] scale-105"
                        : (visitorType === "telkomsel" ? "border-[#EC3A24]/30 bg-white hover:border-[#EC3A24]/60" : "border-[#2654A4]/30 bg-white hover:border-[#2654A4]/60")
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
                  className={`group relative w-full overflow-hidden rounded-2xl px-8 py-5 text-center font-bold text-white shadow-lg transition-all hover:-translate-y-1 active:translate-y-0 disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-lg ${
                    visitorType === "telkomsel" 
                      ? "bg-gradient-to-r from-[#EC3A24] to-[#f56654] hover:shadow-[0_10px_40px_-10px_rgba(236,58,36,0.6)]" 
                      : "bg-gradient-to-r from-[#2654A4] to-[#38BBCA] hover:shadow-[0_10px_40px_-10px_rgba(38,84,164,0.6)]"
                  }`}
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
            </form>
          )}

        </div>
      </div>
    </Reveal>
  );
}
