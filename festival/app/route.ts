import { NextRequest, NextResponse } from "next/server";
import { getServerClient } from "@/lib/supabase/server-client";

export async function GET(req: NextRequest) {
  const supabase = await getServerClient();

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .limit(5);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}
