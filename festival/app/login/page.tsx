"use client";
import { FormEvent, useState } from "react";
import { getBrowserClient } from "@/lib/supabase/browser-client";

export const dynamic = "force-static";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const supabase = getBrowserClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: typeof window !== "undefined" ? window.location.origin : undefined },
    });
    if (!error) setSent(true);
  }

  return (
    <div className="mx-auto max-w-md px-4 py-12 space-y-4">
      <h1 className="text-2xl font-bold">로그인</h1>
      <form onSubmit={onSubmit} className="flex gap-2 items-center">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일 주소"
          className="border rounded px-3 py-2 flex-1"
          required
        />
        <button className="border rounded px-4 py-2">링크 전송</button>
      </form>
      {sent && <p className="text-sm text-foreground/70">로그인 링크를 이메일로 전송했습니다.</p>}

      <div>
        <button
          onClick={async () => {
            const supabase = getBrowserClient();
            await supabase.auth.signInWithOAuth({ provider: "google" });
          }}
          className="border rounded px-4 py-2 text-sm"
        >
          Google로 로그인
        </button>
      </div>

      <div>
        <button
          onClick={async () => {
            const supabase = getBrowserClient();
            await supabase.auth.signOut();
          }}
          className="border rounded px-4 py-2 text-sm"
        >
          로그아웃
        </button>
      </div>
    </div>
  );
}
