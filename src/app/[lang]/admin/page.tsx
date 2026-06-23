"use client";

import { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import { Download, Lock, Users, LogOut } from "lucide-react";

export default function AdminDashboard() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [visitors, setVisitors] = useState<any[]>([]);

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
      const res = await fetch("/api/admin/visitors", {
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

  const handleExportExcel = () => {
    if (visitors.length === 0) return;

    // Prepare data for Excel
    const dataForExport = visitors.map((v, i) => ({
      No: i + 1,
      "Nama Lengkap": v.full_name,
      Email: v.email,
      "Nomor HP": v.phone,
      "Tanggal Daftar": new Date(v.created_at).toLocaleString("id-ID", {
        dateStyle: "medium",
        timeStyle: "short",
      }),
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
      { wch: 25 }, // Tanggal
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
            <div>
              <input
                type="password"
                placeholder="Kata Sandi Admin"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-[#2654A4]/20 bg-[#FDFBF7] px-4 py-3 text-[#041020] transition focus:border-[#FDB715] focus:outline-none focus:ring-2 focus:ring-[#FDB715]/50"
                required
              />
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
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-black leading-tight text-[#041020]">
              Daftar Pendaftar Festival
            </h2>
            <p className="mt-1 text-[#041020]/60">
              Total {visitors.length} orang telah mendaftar.
            </p>
          </div>

          <button
            onClick={handleExportExcel}
            disabled={visitors.length === 0}
            className="flex items-center justify-center gap-2 rounded-xl bg-[#FDB715] px-6 py-3 font-bold text-[#041020] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#ECA705] hover:shadow-md disabled:opacity-50 disabled:hover:translate-y-0"
          >
            <Download size={18} />
            Download Excel
          </button>
        </div>

        {/* Table Container */}
        <div className="overflow-hidden rounded-2xl border border-[#2654A4]/10 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#F9F7F1] text-xs uppercase text-[#2654A4]">
                <tr>
                  <th className="px-6 py-4 font-black">No</th>
                  <th className="px-6 py-4 font-black">Nama Lengkap</th>
                  <th className="px-6 py-4 font-black">Email</th>
                  <th className="px-6 py-4 font-black">Nomor HP</th>
                  <th className="px-6 py-4 font-black">Tanggal Daftar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2654A4]/10">
                {visitors.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-10 text-center text-gray-500">
                      Belum ada pendaftar.
                    </td>
                  </tr>
                ) : (
                  visitors.map((v, i) => (
                    <tr
                      key={v.id}
                      className="transition-colors hover:bg-[#FDFBF7]"
                    >
                      <td className="px-6 py-4 font-medium">{i + 1}</td>
                      <td className="px-6 py-4 font-semibold text-[#041020]">
                        {v.full_name}
                      </td>
                      <td className="px-6 py-4 text-[#041020]/80">{v.email}</td>
                      <td className="px-6 py-4 text-[#041020]/80">{v.phone}</td>
                      <td className="px-6 py-4 text-[#041020]/70">
                        {new Date(v.created_at).toLocaleString("id-ID", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
