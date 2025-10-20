import { createBrowserClient } from "@supabase/ssr";

export function getBrowserClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name: string) => {
          if (typeof document === "undefined") return "";
          const match = document.cookie.match(`(^|;)\s*${name}\s*=\s*([^;]+)`);
          return match ? match.pop() ?? "" : "";
        },
      },
    }
  );
}
