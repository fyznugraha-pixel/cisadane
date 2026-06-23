import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  
  // Basic security check against env variable
  if (!process.env.ADMIN_PASSWORD || authHeader !== `Bearer ${process.env.ADMIN_PASSWORD}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Fetch visitors data, ordered by created_at descending
    const { data, error } = await supabase
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
