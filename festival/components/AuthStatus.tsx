"use client";
import { useEffect, useState } from "react";
import { getBrowserClient } from "@/lib/supabase/browser-client";

export default function AuthStatus() {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const supabase = getBrowserClient();
    supabase.auth.getUser().then(({ data }) => setEmail(data.user?.email ?? null));
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setEmail(session?.user?.email ?? null);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  return (
    <div className="text-xs text-foreground/60">
      {email ? `로그인: ${email}` : "로그인 안 됨"}
    </div>
  );
}
