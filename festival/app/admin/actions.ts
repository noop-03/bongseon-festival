"use server";
import { revalidatePath } from "next/cache";
import { getServerClient } from "@/lib/supabase/server-client";

export async function approveGallery(id: string, approved: boolean) {
  const supabase = getServerClient();
  const { data: me } = await supabase.auth.getUser();
  if (!me.user) throw new Error("로그인이 필요합니다");
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", me.user.id)
    .single();
  if (profile?.role !== "admin") throw new Error("권한이 없습니다");
  await supabase.from("gallery_items").update({ approved }).eq("id", id);
  revalidatePath("/admin");
}

export async function approveQuestion(id: string, approved: boolean) {
  const supabase = getServerClient();
  const { data: me } = await supabase.auth.getUser();
  if (!me.user) throw new Error("로그인이 필요합니다");
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", me.user.id)
    .single();
  if (profile?.role !== "admin") throw new Error("권한이 없습니다");
  await supabase.from("questions").update({ approved }).eq("id", id);
  revalidatePath("/admin");
}
