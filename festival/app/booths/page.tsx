"use client";
import { useState } from "react";

type Booth = {
  id: string;
  grade: number;
  classNo: number;
  type: "game" | "food" | "student";
  x: number; // 0..100 relative position
  y: number; // 0..100 relative position
};

const BOOTHS: Booth[] = [
  { id: "2-1", grade: 2, classNo: 1, type: "game", x: 20, y: 40 },
  { id: "2-6", grade: 2, classNo: 6, type: "game", x: 35, y: 42 },
  { id: "2-2", grade: 2, classNo: 2, type: "food", x: 50, y: 60 },
  { id: "2-3", grade: 2, classNo: 3, type: "food", x: 60, y: 58 },
  { id: "1-8", grade: 1, classNo: 8, type: "food", x: 68, y: 55 },
  { id: "2-8", grade: 2, classNo: 8, type: "food", x: 75, y: 53 },
  { id: "1-7", grade: 1, classNo: 7, type: "food", x: 80, y: 50 },
  { id: "1-2", grade: 1, classNo: 2, type: "food", x: 85, y: 48 },
  { id: "student-popcorn", grade: 0, classNo: 0, type: "student", x: 30, y: 65 },
];

export default function BoothsPage() {
  const [active, setActive] = useState<Booth | null>(null);
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-2xl font-bold mb-4">부스 맵</h1>
      <div className="relative border rounded-xl overflow-hidden h-[520px] bg-gradient-to-b from-foreground/5 to-transparent">
        <div className="absolute left-2 top-2 text-xs text-foreground/60">식수대쪽</div>
        <div className="absolute right-2 bottom-2 text-xs text-foreground/60">운동장쪽</div>
        {BOOTHS.map((b) => (
          <button
            key={b.id}
            className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full border px-2 py-1 text-xs shadow-sm hover:shadow transition-colors ${
              b.type === "game" ? "bg-blue-50 border-blue-200" : b.type === "food" ? "bg-amber-50 border-amber-200" : "bg-green-50 border-green-200"
            }`}
            style={{ left: `${b.x}%`, top: `${b.y}%` }}
            onMouseEnter={() => setActive(b)}
            onFocus={() => setActive(b)}
            onMouseLeave={() => setActive((a) => (a?.id === b.id ? null : a))}
            onBlur={() => setActive((a) => (a?.id === b.id ? null : a))}
            onClick={() => setActive(b)}
            aria-label={`${b.grade ? `${b.grade}학년 ${b.classNo}반` : "학생회"} ${b.type === "food" ? "먹거리" : b.type === "game" ? "게임" : "부스"}`}
          >
            {b.grade ? `${b.grade}-${b.classNo}` : "학생회"}
          </button>
        ))}
        {active && (
          <div
            className="absolute left-4 bottom-4 bg-background/90 backdrop-blur rounded-lg border p-3 text-sm max-w-[80%]"
            role="dialog"
            aria-live="polite"
          >
            <div className="font-semibold mb-1">
              {active.grade ? `${active.grade}학년 ${active.classNo}반` : "학생회 팝콘 부스"}
            </div>
            <div className="text-foreground/70">
              유형: {active.type === "food" ? "먹거리" : active.type === "game" ? "게임" : "기타"}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
