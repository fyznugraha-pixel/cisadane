import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  
  // Basic security check against env variable
  if (!process.env.ADMIN_PASSWORD || authHeader !== `Bearer ${process.env.ADMIN_PASSWORD}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // We need to bypass RLS to read all visitors, so we try to use the Service Role Key if provided.
    // Otherwise, we use the regular client (which will return empty array if RLS is on and blocks it).
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;
    const adminSupabase = supabase; // Fallback to regular client
    
    // Create a new client specifically with the service key if we have it
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const { createClient } = require('@supabase/supabase-js');
    const db = process.env.SUPABASE_SERVICE_ROLE_KEY 
      ? createClient(supabaseUrl, process.env.SUPABASE_SERVICE_ROLE_KEY) 
      : supabase;

    // Fetch visitors data, ordered by created_at descending
    const { data, error } = await db
      .from("visitors")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase fetch error:", error);
      return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (err) {
    console.error("Unexpected error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
