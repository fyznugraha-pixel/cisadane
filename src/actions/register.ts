"use server";

import { supabase, supabaseAdmin } from "@/lib/supabase";
import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY?.replace(/\s/g, "");
const resend = resendApiKey ? new Resend(resendApiKey) : null;

async function fetchQuotaLimits() {
  const { data, error } = await supabaseAdmin.from("settings").select("*");
  let trashbinMax = 300;
  let phoneHolderMax = 200;
  
  if (!error && data) {
    data.forEach(row => {
      if (row.key === "doorprize_quota_trashbin") trashbinMax = parseInt(row.value) || 300;
      if (row.key === "doorprize_quota_phone_holder") phoneHolderMax = parseInt(row.value) || 200;
    });
  }
  return { trashbinMax, phoneHolderMax };
}

export async function registerVisitor(formData: FormData) {
  try {
    const fullName = formData.get("fullName") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const domicile = formData.get("domicile") as string;
    const visitorType = formData.get("visitorType") as string || "general";
    const boothName = formData.get("boothName") as string;

    if (!email) {
      return { success: false, error: "Email wajib diisi" };
    }

    // Ambil semua riwayat pendaftaran untuk email ini
    const { data: existingVisitors } = await supabaseAdmin
      .from("visitors")
      .select("*")
      .eq("email", email);

    if (existingVisitors && existingVisitors.length > 0) {
      if (visitorType === "general") {
        const existingGeneral = existingVisitors.find((v: any) => v.visitor_type === "general");
        if (existingGeneral) {
          return {
            success: true,
            message: "Email Anda sudah terdaftar sebagai Pengunjung Umum! Berikut adalah tiket Anda.",
            data: existingGeneral
          };
        }
      } else if (visitorType === "booth") {
        const now = new Date();
        const wibDate = new Date(now.getTime() + (7 * 60 * 60 * 1000));
        const todayStr = wibDate.toISOString().split('T')[0];

        const alreadyRegisteredToday = existingVisitors.find((v: any) => {
          if (v.visitor_type === "booth" && v.booth_name === boothName) {
            const vDate = new Date(v.created_at);
            const vWibDate = new Date(vDate.getTime() + (7 * 60 * 60 * 1000));
            const vTodayStr = vWibDate.toISOString().split('T')[0];
            return vTodayStr === todayStr;
          }
          return false;
        });

        if (alreadyRegisteredToday) {
          return {
            success: false,
            error: `Anda sudah mendaftar di booth ${boothName} hari ini. Silakan coba lagi besok atau daftar di booth lain.`
          };
        }
      } else if (visitorType === "telkomsel") {
        const existingTelkomsel = existingVisitors.find((v: any) => v.visitor_type === "telkomsel");
        if (existingTelkomsel) {
          return {
            success: true,
            message: "Email Anda sudah terdaftar sebagai pengunjung khusus Telkomsel! Berikut adalah tiket Anda.",
            data: existingTelkomsel
          };
        }
      }
    }

    if (!fullName || !phone || !domicile) {
      return { success: false, error: "Semua kolom wajib diisi" };
    }

    if (visitorType === "booth" && !boothName) {
      return { success: false, error: "Silakan pilih booth yang Anda kunjungi." };
    }

    if (visitorType === "telkomsel") {
      if (!boothName) {
        return { success: false, error: "Silakan pilih doorprize Anda." };
      }
      
      const [quotaDataRes, limits] = await Promise.all([
        supabaseAdmin
          .from("visitors")
          .select("id")
          .eq("visitor_type", "telkomsel")
          .eq("booth_name", boothName),
        fetchQuotaLimits()
      ]);

      if (quotaDataRes.error) {
        return { success: false, error: "Gagal memvalidasi kuota." };
      }

      const currentCount = quotaDataRes.data.length;
      const maxQuota = boothName === "Trashbin" ? limits.trashbinMax : limits.phoneHolderMax;

      if (currentCount >= maxQuota) {
        return { success: false, error: `Maaf, kuota untuk ${boothName} sudah habis. Silakan pilih opsi lain.` };
      }
    }

    const { data: insertedData, error } = await supabaseAdmin.from("visitors").insert({
      full_name: fullName,
      email,
      phone,
      domicile,
      visitor_type: visitorType,
      booth_name: (visitorType === "booth" || visitorType === "telkomsel") ? boothName : null,
    }).select("*").single();

    if (error) {
      console.error("Supabase error:", error);
      return { success: false, error: "Terjadi kesalahan saat menyimpan data." };
    }

    return { 
      success: true, 
      message: "Registrasi berhasil!",
      data: insertedData 
    };
  } catch (err) {
    console.error("Unexpected error:", err);
    return { success: false, error: "Terjadi kesalahan tak terduga." };
  }
}

export async function findTicketByEmail(formData: FormData) {
  try {
    const email = formData.get("email") as string;
    if (!email) return { success: false, error: "Email wajib diisi" };
    
    const { data, error } = await supabaseAdmin
      .from("visitors")
      .select("*")
      .eq("email", email)
      .order("created_at", { ascending: false });
    
    if (error || !data || data.length === 0) {
       return { success: false, error: "Tiket dengan email tersebut tidak ditemukan." };
    }
    
    return { success: true, message: "Tiket ditemukan!", data };
  } catch (err) {
    return { success: false, error: "Terjadi kesalahan." };
  }
}

export async function getDoorprizeQuota() {
  try {
    const [visitorsRes, limits] = await Promise.all([
      supabaseAdmin
        .from("visitors")
        .select("booth_name")
        .eq("visitor_type", "telkomsel"),
      fetchQuotaLimits()
    ]);

    if (visitorsRes.error) {
      console.error("Error fetching quota:", visitorsRes.error);
      return { success: false, error: "Gagal mengambil kuota." };
    }

    let trashbinCount = 0;
    let phoneHolderCount = 0;

    visitorsRes.data.forEach(v => {
      if (v.booth_name === "Trashbin") trashbinCount++;
      if (v.booth_name === "Phone Holder") phoneHolderCount++;
    });

    return {
      success: true,
      data: {
        trashbin: Math.max(0, limits.trashbinMax - trashbinCount),
        phoneHolder: Math.max(0, limits.phoneHolderMax - phoneHolderCount)
      }
    };
  } catch (err) {
    console.error("Unexpected error fetching quota:", err);
    return { success: false, error: "Terjadi kesalahan sistem." };
  }
}