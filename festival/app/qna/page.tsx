export const dynamic = "force-dynamic";
import QnaClient from "./page.client";
import { submitQuestion } from "./actions";

export default function QnAPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 space-y-6">
      <h1 className="text-2xl font-bold">Q&A</h1>
      <form action={submitQuestion} className="flex gap-2 items-center text-sm">
        <input name="content" placeholder="질문을 입력하세요" className="border rounded px-2 py-1 flex-1" />
        <button className="border rounded px-3 py-1">등록</button>
      </form>
      <QnaClient />
    </div>
  );
}
