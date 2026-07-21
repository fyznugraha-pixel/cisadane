"use server";

import { supabaseAdmin } from "@/lib/supabase";

export async function validateTicket(ticketId: string) {
  try {
    if (!ticketId) {
      return { success: false, error: "ID Tiket tidak valid." };
    }

    // Cari tiket di database
    const { data: visitor, error: fetchError } = await supabaseAdmin
      .from("visitors")
      .select("*")
      .eq("id", ticketId)
      .single();

    if (fetchError || !visitor) {
      return { success: false, error: "Tiket tidak ditemukan atau ID salah." };
    }

    // Cek apakah sudah pernah check-in
    if (visitor.is_checked_in) {
      return { 
        success: false, 
        error: "Tiket ini sudah pernah di-scan sebelumnya!",
        data: visitor
      };
    }

    // Tandai sebagai checked-in
    const { error: updateError } = await supabaseAdmin
      .from("visitors")
      .update({
        is_checked_in: true,
        checked_in_at: new Date().toISOString(),
      })
      .eq("id", ticketId);

    if (updateError) {
      console.error("Gagal update check-in:", updateError);
      return { success: false, error: "Gagal menyimpan data check-in." };
    }

    return { 
      success: true, 
      message: "Tiket Valid! Berhasil Check-in.",
      data: visitor 
    };

  } catch (err) {
    console.error("Unexpected error in validateTicket:", err);
    return { success: false, error: "Terjadi kesalahan sistem." };
  }
}
