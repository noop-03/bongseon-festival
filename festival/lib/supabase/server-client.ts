import { createServerClient, type CookieOptionsWithName } from "@supabase/ssr";

export function getServerClient() {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (_name: string) => undefined,
        set: (_name: string, _value: string, _options: CookieOptionsWithName) => {},
        remove: (_name: string, _options: CookieOptionsWithName) => {},
      },
    }
  );
}
