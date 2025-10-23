"use client";

import { getBrowserClient } from "@/lib/browser-client";

export default function LoginPage() {
  const supabase = getBrowserClient();

  async function handleGoogleLogin() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/`, // 로그인 후 리디렉션 경로임
      },
    });
    if (error) alert("로그인 실패: " + error.message);
  }

  return (
    <div className="mx-auto max-w-md px-4 py-12 space-y-8 text-center">
      <h1 className="text-3xl font-bold">로그인</h1>
      <p className="text-sm text-gray-500">Google 계정으로 로그인하세요.</p>

      <button
        onClick={handleGoogleLogin}
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Google로 로그인
      </button>
    </div>
  );
}
