"use server";

import { prisma } from "@/lib/prisma";

export async function registerVisitor(formData: FormData) {
  try {
    const fullName = formData.get("fullName") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const domicile = formData.get("domicile") as string;

    if (!fullName || !email || !phone || !domicile) {
      return { success: false, error: "Semua kolom wajib diisi" };
    }

    await prisma.visitor.create({
      data: {
        full_name: fullName,
        email: email,
        phone: phone,
        domicile: domicile,
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Error inserting visitor:", error);
    return { success: false, error: "Terjadi kesalahan saat menyimpan data. Silakan coba lagi." };
  }
}
