"use server";

import { supabase, supabaseAdmin } from "@/lib/supabase";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY?.replace(/\s/g, "") || "re_bZYnGuVG_PM4wCzcqfhwJv3tLSvM9rmHs");

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

    // Cek apakah email sudah terdaftar
    const { data: existingVisitor } = await supabaseAdmin
      .from("visitors")
      .select("*")
      .eq("email", email)
      .single();

    if (existingVisitor) {
      return {
        success: true,
        message: "Email Anda sudah terdaftar! Berikut adalah tiket Anda.",
        data: existingVisitor
      };
    }

    if (!fullName || !phone || !domicile) {
      return { success: false, error: "Semua kolom wajib diisi" };
    }

    if (visitorType === "booth" && !boothName) {
      return { success: false, error: "Silakan pilih booth yang Anda kunjungi." };
    }

    const { data: insertedData, error } = await supabaseAdmin.from("visitors").insert({
      full_name: fullName,
      email,
      phone,
      domicile,
      visitor_type: visitorType,
      booth_name: visitorType === "booth" ? boothName : null,
    }).select("*").single();

    if (error) {
      console.error("Supabase error:", error);
      return { success: false, error: "Terjadi kesalahan saat menyimpan data." };
    }

    // Kirim email khusus untuk pengunjung umum
    if (visitorType === "general") {
      try {
        await resend.emails.send({
          from: "Festival Cisadane <onboarding@resend.dev>",
          to: email,
          subject: "Konfirmasi Registrasi - Festival Cisadane 2026",
          html: `
            <div style="font-family: sans-serif; padding: 20px;">
              <h2>Halo, ${fullName}!</h2>
              <p>Terima kasih telah mendaftar sebagai Pengunjung Umum di <strong>Festival Cisadane 2026</strong>.</p>
              <p>Berikut adalah rincian registrasi Anda:</p>
              <ul>
                <li><strong>Nama:</strong> ${fullName}</li>
                <li><strong>Email:</strong> ${email}</li>
                <li><strong>Nomor HP:</strong> ${phone}</li>
                <li><strong>Domisili:</strong> ${domicile}</li>
              </ul>
              <p>Sampai jumpa di festival!</p>
            </div>
          `,
        });
      } catch (emailErr) {
        console.error("Gagal mengirim email:", emailErr);
        // Jangan gagalkan registrasi hanya karena email gagal
      }
    }

    return { 
      success: true, 
      message: visitorType === "general" ? "Registrasi berhasil! Silakan cek email Anda." : "Registrasi berhasil!",
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
    
    const { data, error } = await supabase.from("visitors").select("*").eq("email", email).single();
    
    if (error || !data) {
       return { success: false, error: "Tiket dengan email tersebut tidak ditemukan." };
    }
    
    return { success: true, message: "Tiket ditemukan!", data };
  } catch (err) {
    return { success: false, error: "Terjadi kesalahan." };
  }
}