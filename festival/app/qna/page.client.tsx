"use client";
import { useEffect, useState } from "react";
import { getBrowserClient } from "@/lib/supabase/browser-client";

type Q = { id: string; content: string; approved: boolean };

export default function QnaClient() {
  const [qs, setQs] = useState<Q[]>([]);

  useEffect(() => {
    const supabase = getBrowserClient();
    supabase
      .from("questions")
      .select("id,content,approved")
      .eq("approved", true)
      .order("created_at", { ascending: false })
      .then(({ data }) => setQs(data ?? []));

    const ch = supabase
      .channel("realtime:qna")
      .on("postgres_changes", { event: "UPDATE", schema: "public", table: "questions" }, (payload) => {
        const updated = payload.new as unknown as Q;
        setQs((prev) => {
          const idx = prev.findIndex((q) => q.id === updated.id);
          if (idx >= 0) {
            const next = prev.slice();
            next[idx] = updated;
            return next;
          }
          return prev;
        });
      })
      .subscribe();

    return () => {
      supabase.removeChannel(ch);
    };
  }, []);

  return (
    <ul className="space-y-2">
      {qs.map((q) => (
        <li key={q.id} className="border rounded p-3 text-sm">
          {q.content}
        </li>
      ))}
    </ul>
  );
}
