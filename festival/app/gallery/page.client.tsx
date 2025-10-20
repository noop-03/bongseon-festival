"use client";
import { useEffect, useState } from "react";
import { getBrowserClient } from "@/lib/supabase/browser-client";

type Item = {
  id: string;
  url: string;
  caption: string | null;
};

export default function GalleryClient() {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const supabase = getBrowserClient();
    supabase
      .from("gallery_items")
      .select("id,url,caption")
      .eq("approved", true)
      .order("created_at", { ascending: false })
      .then(({ data }) => setItems(data ?? []));

    const channel = supabase
      .channel("realtime:gallery")
      .on("postgres_changes", { event: "UPDATE", schema: "public", table: "gallery_items" }, (payload) => {
        const updated = payload.new as unknown as Item;
        setItems((prev) => {
          const idx = prev.findIndex((i) => i.id === updated.id);
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
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
      {items.map((i) => (
        <figure key={i.id} className="border rounded-lg overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={i.url} alt={i.caption ?? "갤러리 이미지"} className="aspect-square object-cover w-full" />
          {i.caption && <figcaption className="text-xs p-2 text-foreground/70">{i.caption}</figcaption>}
        </figure>
      ))}
    </div>
  );
}
