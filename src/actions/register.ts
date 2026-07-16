"use server";

import { supabase } from "@/lib/supabase";

export async function registerVisitor(formData: FormData) {
  try {
    const fullName = formData.get("fullName") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const domicile = formData.get("domicile") as string;

    if (!fullName || !email || !phone || !domicile) {
      return { success: false, error: "Semua kolom wajib diisi" };
    }

    console.log("🟡 Mulai insert:", { fullName, email, phone, domicile });

    const { error } = await supabase.from("visitors").insert({
      full_name: fullName,
      email,
      phone,
      domicile,
    });

    if (error) {
      console.error("🔴 Supabase insert error:", error);
      if (error.code === "23505") {
        return { success: false, error: "Email ini sudah terdaftar sebelumnya." };
      }
      return { success: false, error: "Terjadi kesalahan saat menyimpan data. Silakan coba lagi." };
    }

    console.log("🟢 Insert berhasil");
    return { success: true };
  } catch (err) {
    console.error("🔴 Unexpected error:", err);
    return { success: false, error: "Terjadi kesalahan tak terduga." };
  }
}