"use client";

import { useState, useEffect } from "react";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { Download, Lock, Users, LogOut, Eye, EyeOff } from "lucide-react";

export default function AdminDashboard() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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

  const handleExportExcel = async () => {
    if (visitors.length === 0) return;

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Data Pengunjung");

    // Add Title
    worksheet.mergeCells("A1:E1");
    const titleCell = worksheet.getCell("A1");
    titleCell.value = "DATA PENDAFTAR FESTIVAL CISADANE 2026";
    titleCell.font = { name: "Arial", size: 16, bold: true, color: { argb: "FF2654A4" } };
    titleCell.alignment = { vertical: "middle", horizontal: "center" };
    
    // Add subtitle / date generated
    worksheet.mergeCells("A2:E2");
    const subTitleCell = worksheet.getCell("A2");
    subTitleCell.value = `Diunduh pada: ${new Date().toLocaleString("id-ID")}`;
    subTitleCell.font = { name: "Arial", size: 10, italic: true, color: { argb: "FF666666" } };
    subTitleCell.alignment = { vertical: "middle", horizontal: "center" };

    worksheet.addRow([]); // Empty row

    // Define columns
    worksheet.columns = [
      { header: "No", key: "no", width: 8 },
      { header: "Nama Lengkap", key: "nama", width: 35 },
      { header: "Email", key: "email", width: 40 },
      { header: "Nomor HP", key: "hp", width: 25 },
      { header: "Tanggal Daftar", key: "tanggal", width: 30 },
    ];

    // Style the header row
    const headerRow = worksheet.getRow(4);
    headerRow.eachCell((cell) => {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FF2654A4" }, // Blue background
      };
      cell.font = { color: { argb: "FFFFFFFF" }, bold: true, name: "Arial" };
      cell.alignment = { vertical: "middle", horizontal: "center" };
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    });
    headerRow.height = 30;

    // Add data rows
    visitors.forEach((v, index) => {
      const row = worksheet.addRow({
        no: index + 1,
        nama: v.full_name,
        email: v.email,
        hp: v.phone,
        tanggal: new Date(v.created_at).toLocaleString("id-ID", {
          dateStyle: "medium",
          timeStyle: "short",
        }),
      });

      // Style data cells
      row.eachCell((cell) => {
        cell.font = { name: "Arial", size: 11 };
        cell.alignment = { vertical: "middle", horizontal: cell.col === 1 ? "center" : "left" };
        cell.border = {
          top: { style: "thin", color: { argb: "FFDDDDDD" } },
          left: { style: "thin", color: { argb: "FFDDDDDD" } },
          bottom: { style: "thin", color: { argb: "FFDDDDDD" } },
          right: { style: "thin", color: { argb: "FFDDDDDD" } },
        };
      });
      
      // Alternating row colors
      if (index % 2 === 1) {
        row.eachCell((cell) => {
          cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFF9F7F1" } };
        });
      }
      row.height = 25;
    });

    // Freeze header
    worksheet.views = [{ state: "frozen", ySplit: 4 }];

    // Generate blob and download
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    saveAs(blob, "Data_Pengunjung_Cisadane.xlsx");
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
