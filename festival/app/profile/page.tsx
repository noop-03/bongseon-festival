/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useState, useEffect } from "react";
import { getBrowserClient } from "@/lib/supabase/browser-client";

export default function ProfilePage() {
  const supabase = getBrowserClient();
  const [user, setUser] = useState<any>(null);
  const [username, setUsername] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  useEffect(() => {
    async function fetchUser() {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      // 기존 프로필 정보 가져오기
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (data) {
        setUsername(data.username || "");
        setAvatarUrl(data.avatar_url || "");
      }
    }
    fetchUser();
  }, []);

  async function handleSave() {
    if (!user) return;
    const { error } = await supabase.from("profiles").upsert({
      id: user.id,
      username,
      avatar_url: avatarUrl,
    });
    if (error) alert("저장 실패: " + error.message);
    else alert("저장 완료!");
  }

  if (!user) return <div>Loading...</div>;

  return (
    <div className="mx-auto max-w-md px-4 py-12 space-y-6">
      <h1 className="text-2xl font-bold">프로필 편집</h1>

      <div>
        <label>아이디</label>
        <input
          className="w-full border p-2 rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div>
        <label>프로필 사진 URL</label>
        <input
          className="w-full border p-2 rounded"
          value={avatarUrl}
          onChange={(e) => setAvatarUrl(e.target.value)}
        />
      </div>

      <button
        onClick={handleSave}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        저장
      </button>
    </div>
  );
}
