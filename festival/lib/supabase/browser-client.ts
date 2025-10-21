import { createBrowserClient } from "@supabase/ssr";

export function getBrowserClient() {
  const cookies = {
    // Supabase SDK가 기대하는 타입: { name, value }[]
    getAll(): { name: string; value: string }[] {
      const cookiesArray: { name: string; value: string }[] = [];
      document.cookie.split("; ").forEach((cookie) => {
        const [name, value] = cookie.split("=");
        if (name && value) {
          cookiesArray.push({ name: name.trim(), value: decodeURIComponent(value) });
        }
      });
      return cookiesArray;
    },

    setAll(cookies: { name: string; value: string }[]) {
      cookies.forEach(({ name, value }) => {
        document.cookie = `${name}=${encodeURIComponent(value)}; path=/`;
      });
    },
  };

  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies }
  );
}
