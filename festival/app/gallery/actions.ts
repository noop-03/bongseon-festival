"use server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { getServerClient } from "@/lib/supabase/server-client";

const schema = z.object({ caption: z.string().max(120).optional() });

export async function uploadImage(formData: FormData) {
  const supabase = getServerClient();
  const { data: userRes } = await supabase.auth.getUser();
  const user = userRes.user;
  if (!user) throw new Error("로그인이 필요합니다");

  const parse = schema.safeParse({ caption: formData.get("caption") ?? undefined });
  if (!parse.success) throw new Error("캡션 형식 오류");

  const file = formData.get("file") as File | null;
  if (!file) throw new Error("파일을 선택하세요");

  const filename = `${user.id}/${Date.now()}-${file.name}`;
  const { error: upErr } = await supabase.storage.from("gallery").upload(filename, file, {
    cacheControl: "3600",
    upsert: false,
  });
  if (upErr) throw upErr;

  const { data: urlData } = await supabase.storage.from("gallery").getPublicUrl(filename);
  const { error: insErr } = await supabase.from("gallery_items").insert({
    user_id: user.id,
    caption: parse.data.caption ?? null,
    url: urlData.publicUrl,
    approved: false,
  });
  if (insErr) throw insErr;

  revalidatePath("/gallery");
}
