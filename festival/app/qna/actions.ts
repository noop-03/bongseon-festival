"use server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { getServerClient } from "@/lib/supabase/server-client";

const schema = z.object({ content: z.string().min(3).max(300) });

export async function submitQuestion(formData: FormData) {
  const supabase = getServerClient();
  const { data: userRes } = await supabase.auth.getUser();
  const user = userRes.user;
  if (!user) throw new Error("로그인이 필요합니다");

  const parse = schema.safeParse({ content: formData.get("content") });
  if (!parse.success) throw new Error("질문 형식 오류");

  const { error } = await supabase.from("questions").insert({
    user_id: user.id,
    content: parse.data.content,
    approved: false,
  });
  if (error) throw error;
  revalidatePath("/qna");
}
