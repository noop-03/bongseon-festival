"use client";
import Link from "next/link";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import { differenceInSeconds } from "date-fns";
import { useEffect, useState } from "react";

const FESTIVAL_TIME = new Date("2025-10-24T08:30:00+09:00");

function useCountdown(target: Date) {
  const [secondsLeft, setSecondsLeft] = useState(() =>
    Math.max(0, differenceInSeconds(target, new Date()))
  );

  useEffect(() => {
    let mounted = true;
    let timeoutId: ReturnType<typeof setTimeout>;

    function tick() {
      if (!mounted) return;
      setSecondsLeft(Math.max(0, differenceInSeconds(target, new Date())));
      const msToNextSecond = 1000 - (Date.now() % 1000);
      timeoutId = setTimeout(tick, msToNextSecond);
    }

    // start aligned to the next full second
    timeoutId = setTimeout(tick, 1000 - (Date.now() % 1000));
    return () => {
      mounted = false;
      clearTimeout(timeoutId);
    };
  }, [target]);

  const d = Math.floor(secondsLeft / (3600 * 24));
  const h = Math.floor((secondsLeft % (3600 * 24)) / 3600);
  const m = Math.floor((secondsLeft % 3600) / 60);
  const s = secondsLeft % 60;
  return { d, h, m, s };
}

export default function Home() {
  const { d, h, m, s } = useCountdown(FESTIVAL_TIME);

  const cards = [
    { title: "프로그램", href: "/program", desc: "1부 · 2부 · 3부 전체 일정" },
    { title: "부스목록", href: "/booths", desc: "게임/먹거리 부스 안내" },
    { title: "갤러리", href: "/gallery", desc: "실시간 사진과 영상" },
    { title: "Q&A", href: "/qna", desc: "문의 질의 · 요청 남기기" },
    { title: "관리자", href: "/admin", desc: "컨텐츠 운영 대시보드" },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <section className="text-center space-y-6">
        <TypeAnimation
          sequence={["青春, 지금 여기서 빛나다!", 2000, "제 48회 봉선의 메아리", 2000]}
          wrapper="h1"
          className="block text-3xl sm:text-5xl font-extrabold"
          repeat={Infinity}
        />
        <p className="text-foreground/70">2025.10.24.(금) 08:30~16:30</p>

        <div className="grid grid-flow-col auto-cols-max gap-4 justify-center text-center" aria-live="polite">
          {[
            { label: "일", value: d },
            { label: "시간", value: h },
            { label: "분", value: m },
            { label: "초", value: s },
          ].map((k) => (
            <motion.div
              key={k.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 120 }}
              className="rounded-lg border border-foreground/10 px-4 py-3"
              aria-label={`남은 ${k.label}: ${k.value}`}
            >
              <div className="text-3xl font-bold tabular-nums">{k.value}</div>
              <div className="text-xs text-foreground/60">{k.label}</div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-8 text-sm text-foreground/70"
        >
          주최: 광주대동고등학교 학생회 • 축제준비위원회 · 후원: 광주대동고등학교 총동창회
        </motion.div>
      </section>

      <section className="mt-16 grid sm:grid-cols-3 gap-4">
        {cards.map((c) => (
          <Link key={c.href} href={c.href} className="block">
            <motion.div whileHover={{ scale: 1.02 }} className="border rounded-lg p-4 hover:shadow-sm">
              <div className="font-semibold">{c.title}</div>
              <div className="text-sm text-foreground/70">{c.desc}</div>
            </motion.div>
          </Link>
        ))}
      </section>
    </div>
  );
}
