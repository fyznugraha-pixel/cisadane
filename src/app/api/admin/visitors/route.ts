import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  
  // Basic security check against env variable
  if (!process.env.ADMIN_PASSWORD || authHeader !== `Bearer ${process.env.ADMIN_PASSWORD}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;
    const adminSupabase = supabase; // Fallback to regular client
    
    // Create a new client specifically with the service key if we have it
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const { createClient } = require('@supabase/supabase-js');
    const db = process.env.SUPABASE_SERVICE_ROLE_KEY 
      ? createClient(supabaseUrl, process.env.SUPABASE_SERVICE_ROLE_KEY) 
      : supabase;

    // Fetch visitors data, ordered by created_at descending (Paginated to bypass 1000 limit)
    let allData: any[] = [];
    let hasMore = true;
    let start = 0;
    const limit = 1000;

    while (hasMore) {
      const { data, error } = await db
        .from("visitors")
        .select("*")
        .order("created_at", { ascending: false })
        .range(start, start + limit - 1);

      if (error) {
        console.error("Supabase fetch error:", error);
        return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
      }

      if (data && data.length > 0) {
        allData = allData.concat(data);
      }

      if (!data || data.length < limit) {
        hasMore = false;
      } else {
        start += limit;
      }
    }

    return NextResponse.json({ data: allData });
  } catch (err) {
    console.error("Unexpected error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const authHeader = request.headers.get("authorization");
  
  // Basic security check against env variable
  if (!process.env.ADMIN_PASSWORD || authHeader !== `Bearer ${process.env.ADMIN_PASSWORD}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await request.json();
    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const { createClient } = require('@supabase/supabase-js');
    const db = process.env.SUPABASE_SERVICE_ROLE_KEY 
      ? createClient(supabaseUrl, process.env.SUPABASE_SERVICE_ROLE_KEY) 
      : supabase;

    const { error } = await db.from("visitors").delete().eq("id", id);

    if (error) {
      console.error("Supabase delete error:", error);
      return NextResponse.json({ error: "Failed to delete data" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Unexpected error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
