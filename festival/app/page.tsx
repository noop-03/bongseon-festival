"use client";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import { differenceInSeconds } from "date-fns";
import { useEffect, useMemo, useState } from "react";

const FESTIVAL_TIME = new Date("2025-10-24T08:30:00+09:00");

function useCountdown(target: Date) {
  const [secondsLeft, setSecondsLeft] = useState(() =>
    Math.max(0, differenceInSeconds(target, new Date()))
  );

  useEffect(() => {
    const id = setInterval(() => {
      setSecondsLeft(Math.max(0, differenceInSeconds(target, new Date())));
    }, 1000);
    return () => clearInterval(id);
  }, [target]);

  const parts = useMemo(() => {
    const d = Math.floor(secondsLeft / (3600 * 24));
    const h = Math.floor((secondsLeft % (3600 * 24)) / 3600);
    const m = Math.floor((secondsLeft % 3600) / 60);
    const s = secondsLeft % 60;
    return { d, h, m, s };
  }, [secondsLeft]);

  return parts;
}

export default function Home() {
  const { d, h, m, s } = useCountdown(FESTIVAL_TIME);

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <section className="text-center space-y-6">
        <TypeAnimation
          sequence={["青春, 지금 여기서 빛나다!", 2000, "봉선의 메아리", 2000]}
          wrapper="h1"
          className="block text-3xl sm:text-5xl font-extrabold"
          repeat={Infinity}
        />
        <p className="text-foreground/70">2025.10.24.(금) 08:30~16:30</p>

        <div className="grid grid-flow-col auto-cols-max gap-4 justify-center text-center">
          {[{ label: "일", value: d }, { label: "시간", value: h }, { label: "분", value: m }, { label: "초", value: s }].map(
            (k) => (
              <motion.div
                key={k.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 120 }}
                className="rounded-lg border border-foreground/10 px-4 py-3"
              >
                <div className="text-3xl font-bold tabular-nums">{k.value}</div>
                <div className="text-xs text-foreground/60">{k.label}</div>
              </motion.div>
            )
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-8 text-sm text-foreground/70"
        >
          주최: 광주대동고등학교 학생회 • 축제준비위원회 · 후원: 총동창회
        </motion.div>
      </section>

      <section className="mt-16 grid sm:grid-cols-3 gap-4">
        {[
          { title: "프로그램", href: "/program", desc: "1부·2부·3부 전 일정" },
          { title: "E-Sports", href: "/esports", desc: "LOL, FIFA, Valorant" },
          { title: "부스맵", href: "/booths", desc: "게임/먹거리 부스 안내" },
          { title: "갤러리", href: "/gallery", desc: "실시간 사진과 영상" },
          { title: "Q&A", href: "/qna", desc: "무대 질문·요청 남기기" },
          { title: "관리자", href: "/admin", desc: "콘텐츠 운영 대시보드" },
        ].map((c) => (
          <motion.a
            key={c.href}
            href={c.href}
            whileHover={{ scale: 1.02 }}
            className="border rounded-lg p-4 hover:shadow-sm"
          >
            <div className="font-semibold">{c.title}</div>
            <div className="text-sm text-foreground/70">{c.desc}</div>
          </motion.a>
        ))}
      </section>
    </div>
  );
}
