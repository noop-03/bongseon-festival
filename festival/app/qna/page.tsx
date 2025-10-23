"use client";

import { useState, useEffect } from "react";
import { getBrowserClient } from "@/lib/supabase/browser-client";

export default function QnAPage() {
  const supabase = getBrowserClient();
  const [user, setUser] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [newQuestion, setNewQuestion] = useState("");

  // 유저 정보 가져오기
  useEffect(() => {
    async function fetchUser() {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    }
    fetchUser();
  }, []);

  // 질문 목록 가져오기
  useEffect(() => {
    async function fetchQuestions() {
      const { data, error } = await supabase
        .from("questions")
        .select("*")
        .order("created_at", { ascending: false });
      if (data) setQuestions(data);
    }
    fetchQuestions();
  }, []);

  // 질문 작성
  async function handlePost() {
    if (!user) {
      alert("로그인 후 작성 가능합니다.");
      return;
    }
    const { error } = await supabase.from("questions").insert({
      user_id: user.id,
      username: user.user_metadata.full_name || user.email,
      content: newQuestion,
    });
    if (error) alert("작성 실패: " + error.message);
    else setNewQuestion("");
    // 질문 다시 가져오기
    const { data } = await supabase.from("questions").select("*").order("created_at", { ascending: false });
    if (data) setQuestions(data);
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 space-y-6">
      <h1 className="text-2xl font-bold">Q&A</h1>
      {!user && <p className="text-sm text-gray-500">로그인 후 질문을 작성할 수 있습니다.</p>}

      {user && (
        <div className="space-y-2">
          <textarea
            className="w-full border p-2 rounded"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            placeholder="질문 내용을 입력하세요..."
          />
          <button
            onClick={handlePost}
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            질문 작성
          </button>
        </div>
      )}

      <div className="space-y-4 mt-8">
        {questions.map((q) => (
          <div key={q.id} className="border-b pb-2">
            <p className="font-semibold">{q.username}</p>
            <p>{q.content}</p>
            <p className="text-xs text-gray-400">{new Date(q.created_at).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
