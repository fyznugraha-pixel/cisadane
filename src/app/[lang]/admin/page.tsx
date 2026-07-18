"use client";

import { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import { Download, Lock, Users, LogOut, Eye, EyeOff, Store, User, Trophy, Trash2 } from "lucide-react";

export default function AdminDashboard() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [visitors, setVisitors] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [filterBooth, setFilterBooth] = useState("");
  const [visitorToDelete, setVisitorToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Simple session persistence using sessionStorage
  useEffect(() => {
    const savedPassword = sessionStorage.getItem("admin_password");
    if (savedPassword) {
      setPassword(savedPassword);
      handleLogin(savedPassword);
    }
  }, []);

  const handleLogin = async (passStr?: string) => {
    const pwd = passStr || password;
    if (!pwd) return;

    setIsLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/festivalcisadane/api/admin/visitors", {
        headers: {
          Authorization: `Bearer ${pwd}`,
        },
      });

      if (!res.ok) {
        throw new Error("Kata sandi salah atau tidak diizinkan.");
      }

      const { data } = await res.json();
      setVisitors(data);
      setIsAuthenticated(true);
      sessionStorage.setItem("admin_password", pwd);
    } catch (err: any) {
      setErrorMsg(err.message || "Terjadi kesalahan saat login.");
      setIsAuthenticated(false);
      sessionStorage.removeItem("admin_password");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword("");
    setVisitors([]);
    sessionStorage.removeItem("admin_password");
  };

  const handleDeleteVisitor = (id: string) => {
    setVisitorToDelete(id);
  };

  const confirmDeleteVisitor = async () => {
    if (!visitorToDelete) return;
    
    setIsDeleting(true);
    try {
      const res = await fetch("/festivalcisadane/api/admin/visitors", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("admin_password")}`,
        },
        body: JSON.stringify({ id: visitorToDelete }),
      });

      if (!res.ok) {
        throw new Error("Gagal menghapus data");
      }

      setVisitors((prev) => prev.filter((v) => v.id !== visitorToDelete));
      setVisitorToDelete(null);
    } catch (err: any) {
      alert(err.message || "Terjadi kesalahan saat menghapus data.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleExportExcel = () => {
    if (visitors.length === 0) return;

    const dataForExport = visitors.map((v, i) => ({
      No: i + 1,
      "Nama Lengkap": v.full_name,
      Email: v.email,
      "Nomor HP": v.phone,
      "Kategori": v.visitor_type === "booth" ? "Kunjungan Booth" : "Pengunjung Umum",
      "Nama Booth": v.booth_name || "-",
    }));

    // Create a workbook and a worksheet
    const worksheet = XLSX.utils.json_to_sheet(dataForExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Visitors");

    // Adjust column widths
    worksheet["!cols"] = [
      { wch: 5 }, // No
      { wch: 30 }, // Nama
      { wch: 35 }, // Email
      { wch: 20 }, // Phone
      { wch: 20 }, // Kategori
      { wch: 30 }, // Booth
    ];

    // Download the file
    XLSX.writeFile(workbook, "Data_Pengunjung_Cisadane.xlsx");
  };

  // If not authenticated, show login screen
  if (!isAuthenticated) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#FDFBF7] p-5">
        <div className="w-full max-w-md rounded-2xl border border-[#2654A4]/10 bg-white p-8 shadow-xl">
          <div className="mb-8 flex flex-col items-center justify-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#2654A4]/10 text-[#2654A4]">
              <Lock size={32} />
            </div>
            <h1 className="text-2xl font-black text-[#041020]">Admin Portal</h1>
            <p className="mt-2 text-sm text-[#041020]/60">
              Masukkan kata sandi untuk melihat data pendaftar.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
            className="flex flex-col gap-4"
          >
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Kata Sandi Admin"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-[#2654A4]/20 bg-[#FDFBF7] px-4 py-3 pr-12 text-[#041020] transition focus:border-[#FDB715] focus:outline-none focus:ring-2 focus:ring-[#FDB715]/50"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center px-4 text-[#041020]/40 hover:text-[#041020]/70"
                aria-label={showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {errorMsg && (
              <p className="text-sm font-medium text-red-500">{errorMsg}</p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="mt-2 flex w-full items-center justify-center rounded-xl bg-[#2654A4] px-4 py-3 font-bold text-white transition hover:bg-[#1E4384] disabled:opacity-70"
            >
              {isLoading ? "Memeriksa..." : "Masuk"}
            </button>
          </form>
        </div>
      </main>
    );
  }

  // Authenticated Dashboard
  return (
    <main className="min-h-screen bg-[#FDFBF7] pb-20 text-[#041020]">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-[#2654A4]/10 bg-white/80 px-6 py-4 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div className="flex items-center gap-3 text-[#2654A4]">
            <Users size={24} />
            <h1 className="text-xl font-black">Data Pengunjung</h1>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-red-500 transition hover:bg-red-50"
          >
            <LogOut size={16} />
            Keluar
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="mx-auto mt-10 max-w-6xl px-6">
        
        {/* Metric Cards */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {/* Total Registrasi */}
          <div className="rounded-2xl border border-[#2654A4]/10 bg-white p-6 shadow-sm">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#2654A4]/10 text-[#2654A4]">
              <Users size={24} />
            </div>
            <p className="text-sm font-medium text-[#041020]/60">Total Registrasi</p>
            <h3 className="mt-1 text-3xl font-black text-[#041020]">{visitors.length}</h3>
          </div>

          {/* Kategori Breakdown */}
          <div className="rounded-2xl border border-[#2654A4]/10 bg-white p-6 shadow-sm">
            <div className="mb-4 flex gap-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/10 text-blue-500">
                <User size={24} />
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10 text-green-500">
                <Store size={24} />
              </div>
            </div>
            <p className="text-sm font-medium text-[#041020]/60">Umum vs Booth</p>
            <div className="mt-1 flex items-baseline gap-2">
              <h3 className="text-3xl font-black text-[#041020]">
                {visitors.filter(v => v.visitor_type !== 'booth').length}
              </h3>
              <span className="text-[#041020]/40">/</span>
              <h3 className="text-3xl font-black text-[#041020]">
                {visitors.filter(v => v.visitor_type === 'booth').length}
              </h3>
            </div>
          </div>

          {/* Top Booth */}
          <div className="rounded-2xl border border-[#2654A4]/10 bg-white p-6 shadow-sm">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#FDB715]/20 text-[#ECA705]">
              <Trophy size={24} />
            </div>
            <p className="text-sm font-medium text-[#041020]/60">Top Booth</p>
            <div className="mt-2 space-y-1">
              {(() => {
                const topBooths = (Object.entries(
                  visitors
                    .filter(v => v.visitor_type === 'booth' && v.booth_name)
                    .reduce((acc, v) => {
                      acc[v.booth_name] = (acc[v.booth_name] || 0) + 1;
                      return acc;
                    }, {} as Record<string, number>)
                ) as [string, number][]).sort((a, b) => b[1] - a[1]).slice(0, 3);

                if (topBooths.length === 0) return <p className="text-sm text-[#041020]/40">-</p>;
                return topBooths.map(([name, count], idx) => (
                  <div key={name} className="flex justify-between items-center text-sm">
                    <span className="truncate pr-2 font-medium text-[#041020]">{idx + 1}. {name}</span>
                    <span className="font-bold text-[#2654A4] bg-[#2654A4]/10 px-2 py-0.5 rounded-full text-xs">{count}</span>
                  </div>
                ));
              })()}
            </div>
          </div>
        </div>

        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-black leading-tight text-[#041020]">
              Daftar Pendaftar Festival
            </h2>
            <p className="mt-1 text-[#041020]/60">
              Total {visitors.length} orang telah mendaftar.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:flex-wrap sm:justify-end">
            <select
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="rounded-xl border border-[#2654A4]/20 bg-white px-4 py-2.5 text-sm text-[#041020] focus:border-[#FDB715] focus:outline-none focus:ring-2 focus:ring-[#FDB715]/50"
            >
              <option value="">Semua Tanggal</option>
              {Array.from(new Set(visitors.map(v => {
                const d = new Date(v.created_at);
                const wib = new Date(d.getTime() + (7 * 60 * 60 * 1000));
                return wib.toISOString().split('T')[0];
              }))).sort((a, b) => (b > a ? 1 : -1)).map(date => (
                <option key={date} value={date}>
                  {new Date(date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                </option>
              ))}
            </select>

            <select
              value={filterBooth}
              onChange={(e) => setFilterBooth(e.target.value)}
              className="rounded-xl border border-[#2654A4]/20 bg-white px-4 py-2.5 text-sm text-[#041020] focus:border-[#FDB715] focus:outline-none focus:ring-2 focus:ring-[#FDB715]/50"
            >
              <option value="">Semua Kategori/Booth</option>
              <option value="general">Pengunjung Umum (General)</option>
              {Array.from(new Set(visitors.filter(v => v.visitor_type === 'booth' && v.booth_name).map(v => v.booth_name as string))).sort().map(booth => (
                <option key={booth} value={booth}>
                  Booth: {booth}
                </option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Cari nama, email, hp..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="rounded-xl border border-[#2654A4]/20 bg-white px-4 py-2.5 text-sm text-[#041020] placeholder:text-[#041020]/40 focus:border-[#FDB715] focus:outline-none focus:ring-2 focus:ring-[#FDB715]/50 min-w-[200px]"
            />
            <button
              onClick={handleExportExcel}
              disabled={visitors.length === 0}
              className="flex items-center justify-center gap-2 rounded-xl bg-[#FDB715] px-6 py-2.5 font-bold text-[#041020] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#ECA705] hover:shadow-md disabled:opacity-50 disabled:hover:translate-y-0"
            >
              <Download size={18} />
              Download Excel
            </button>
          </div>
        </div>

        {/* Table Container */}
        <div className="overflow-hidden rounded-2xl border border-[#2654A4]/10 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#F9F7F1] text-xs uppercase text-[#2654A4]">
                <tr>
                  <th className="px-6 py-4 font-black">No</th>
                  <th className="px-6 py-4 font-black">Nama Lengkap</th>
                  <th className="px-6 py-4 font-black">Kategori</th>
                  <th className="px-6 py-4 font-black">Nama Booth</th>
                  <th className="px-6 py-4 font-black">Email</th>
                  <th className="px-6 py-4 font-black">No HP</th>
                  <th className="px-6 py-4 font-black text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2654A4]/10">
                {visitors.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-10 text-center text-gray-500">
                      Belum ada pendaftar.
                    </td>
                  </tr>
                ) : (
                  (() => {
                    const filteredVisitors = visitors.filter(v => {
                      const matchesSearch = v.full_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                            v.email.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                            v.phone.includes(searchTerm) || 
                                            (v.booth_name && v.booth_name.toLowerCase().includes(searchTerm.toLowerCase()));
                      
                      let matchesBooth = true;
                      if (filterBooth === "general") {
                        matchesBooth = v.visitor_type === "general";
                      } else if (filterBooth !== "") {
                        matchesBooth = v.visitor_type === "booth" && v.booth_name === filterBooth;
                      }

                      let matchesDate = true;
                      if (filterDate) {
                        const d = new Date(v.created_at);
                        const wib = new Date(d.getTime() + (7 * 60 * 60 * 1000));
                        const vDate = wib.toISOString().split('T')[0];
                        matchesDate = vDate === filterDate;
                      }

                      return matchesSearch && matchesBooth && matchesDate;
                    });

                    if (filteredVisitors.length === 0) {
                      return (
                        <tr>
                          <td colSpan={6} className="px-6 py-10 text-center text-gray-500">
                            Pendaftar tidak ditemukan.
                          </td>
                        </tr>
                      );
                    }

                    return filteredVisitors.map((v, i) => (
                      <tr
                        key={v.id}
                        className="transition-colors hover:bg-[#FDFBF7]"
                      >
                        <td className="px-6 py-4 font-medium">{i + 1}</td>
                        <td className="px-6 py-4 font-semibold text-[#041020]">
                          {v.full_name}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${
                            v.visitor_type === 'booth' 
                              ? 'bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20' 
                              : 'bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-700/10'
                          }`}>
                            {v.visitor_type === 'booth' ? 'Booth' : 'Umum'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-[#041020]/80 font-medium">
                          {v.visitor_type === 'booth' ? (v.booth_name || "-") : "-"}
                        </td>
                        <td className="px-6 py-4 text-[#041020]/80 font-medium">
                          {v.email}
                        </td>
                        <td className="px-6 py-4 text-[#041020]/80 font-medium">
                          {v.phone}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => handleDeleteVisitor(v.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors"
                            title="Hapus Data"
                          >
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ));
                  })()
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Custom Delete Confirmation Modal */}
      {visitorToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-500 mx-auto">
              <Trash2 size={28} strokeWidth={2.5} />
            </div>
            <h3 className="text-xl font-bold text-center text-[#041020] mb-2">
              Hapus Data Pendaftar?
            </h3>
            <p className="text-center text-[#041020]/70 mb-8 text-sm">
              Tindakan ini tidak dapat dibatalkan. Apakah Anda yakin ingin menghapus data ini?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setVisitorToDelete(null)}
                disabled={isDeleting}
                className="flex-1 rounded-xl bg-gray-100 px-4 py-2.5 font-semibold text-gray-700 transition hover:bg-gray-200 disabled:opacity-50"
              >
                Batal
              </button>
              <button
                onClick={confirmDeleteVisitor}
                disabled={isDeleting}
                className="flex-1 flex items-center justify-center rounded-xl bg-red-500 px-4 py-2.5 font-semibold text-white transition hover:bg-red-600 shadow-sm shadow-red-500/30 disabled:opacity-50"
              >
                {isDeleting ? (
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : (
                  "Ya, Hapus"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
