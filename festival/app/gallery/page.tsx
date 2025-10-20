export const dynamic = "force-dynamic";
import GalleryClient from "./page.client";
import { uploadImage } from "./actions";

export default function GalleryPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 space-y-6">
      <h1 className="text-2xl font-bold">실시간 갤러리</h1>
      <form action={uploadImage} className="flex gap-2 items-center text-sm">
        <input name="file" type="file" accept="image/*" className="text-xs" />
        <input name="caption" placeholder="캡션 (선택)" className="border rounded px-2 py-1" />
        <button className="border rounded px-3 py-1">업로드</button>
      </form>
      <GalleryClient />
    </div>
  );
}
