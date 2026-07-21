import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "panitiacisadane2026";

export async function GET(request: Request) {
  const authHeader = request.headers.get("Authorization");
  if (!authHeader || authHeader !== `Bearer ${ADMIN_PASSWORD}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { data, error } = await supabaseAdmin.from("settings").select("*");
    
    if (error) {
      if (error.code === '42P01') {
        // Table doesn't exist yet, return defaults
        return NextResponse.json({
          data: {
            doorprize_quota_trashbin: "300",
            doorprize_quota_phone_holder: "200"
          }
        });
      }
      throw error;
    }

    const settingsMap: Record<string, string> = {};
    data.forEach((row) => {
      settingsMap[row.key] = row.value;
    });

    // Fallbacks if empty
    if (!settingsMap.doorprize_quota_trashbin) settingsMap.doorprize_quota_trashbin = "300";
    if (!settingsMap.doorprize_quota_phone_holder) settingsMap.doorprize_quota_phone_holder = "200";

    return NextResponse.json({ data: settingsMap });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const authHeader = request.headers.get("Authorization");
  if (!authHeader || authHeader !== `Bearer ${ADMIN_PASSWORD}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { trashbin, phoneHolder } = body;

    // Upsert into settings table
    const updates = [
      { key: "doorprize_quota_trashbin", value: String(trashbin) },
      { key: "doorprize_quota_phone_holder", value: String(phoneHolder) }
    ];

    const { error } = await supabaseAdmin.from("settings").upsert(updates);
    
    if (error) {
      throw error;
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
