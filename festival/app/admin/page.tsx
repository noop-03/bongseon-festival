import { getServerClient } from "@/lib/supabase/server-client";
import { approveGallery, approveQuestion } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const supabase = getServerClient();
  const { data: me } = await supabase.auth.getUser();
  const { data: profile } = await supabase
    .from("profiles")
    .select("role, display_name")
    .eq("id", me.user?.id ?? "")
    .maybeSingle();

  if (!me.user || profile?.role !== "admin") {
    return (
      <div className="mx-auto max-w-4xl px-4 py-12">
        <h1 className="text-2xl font-bold">관리자</h1>
        <p className="text-sm text-foreground/70">접근 권한이 없습니다.</p>
      </div>
    );
  }

  const { data: gallery } = await supabase
    .from("gallery_items")
    .select("id, caption, url, approved")
    .order("created_at", { ascending: false });
  const { data: qs } = await supabase
    .from("questions")
    .select("id, content, approved")
    .order("created_at", { ascending: false });

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 grid gap-8 md:grid-cols-2">
      <section>
        <h2 className="text-xl font-semibold mb-3">갤러리 승인</h2>
        <ul className="space-y-3">
          {(gallery ?? []).map((g) => (
            <li key={g.id} className="border rounded p-3 flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={g.url} alt="preview" className="w-16 h-16 object-cover rounded" />
              <div className="text-sm flex-1">
                <div className="font-medium">{g.caption}</div>
                <div className="text-foreground/60">{g.approved ? "승인됨" : "대기"}</div>
              </div>
              <form action={async () => approveGallery(g.id, !g.approved)}>
                <button className="border rounded px-3 py-1 text-sm">
                  {g.approved ? "취소" : "승인"}
                </button>
              </form>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">Q&A 승인</h2>
        <ul className="space-y-3">
          {(qs ?? []).map((q) => (
            <li key={q.id} className="border rounded p-3 flex items-center gap-3">
              <div className="text-sm flex-1">
                <div>{q.content}</div>
                <div className="text-foreground/60">{q.approved ? "승인됨" : "대기"}</div>
              </div>
              <form action={async () => approveQuestion(q.id, !q.approved)}>
                <button className="border rounded px-3 py-1 text-sm">
                  {q.approved ? "취소" : "승인"}
                </button>
              </form>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
