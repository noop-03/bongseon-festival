import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "제48회 봉선의 메아리 | 광주대동고 축제",
  description:
    "학생과 교사가 함께하는 화합의 한마당 — 2025.10.24 08:30~16:30",
  metadataBase: new URL("https://example.com"),
  openGraph: {
    title: "제48회 봉선의 메아리",
    description:
      "학생과 교사가 함께하는 화합의 한마당 — 2025.10.24 08:30~16:30",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <header className="sticky top-0 z-50 bg-background/80 backdrop-blur border-b border-foreground/10">
          <nav className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
            <Link href="/" className="font-semibold">
              제48회 봉선의 메아리
            </Link>
            <ul className="flex gap-4 text-sm">
              <li>
                <Link href="/program" className="hover:underline">
                  프로그램
                </Link>
              </li>
              <li>
                <Link href="/esports" className="hover:underline">
                  E-Sports
                </Link>
              </li>
              <li>
                <Link href="/booths" className="hover:underline">
                  부스맵
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:underline">
                  갤러리
                </Link>
              </li>
              <li>
                <Link href="/qna" className="hover:underline">
                  Q&A
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:underline">
                  관리자
                </Link>
              </li>
            </ul>
          </nav>
        </header>
        <main>{children}</main>
        <footer className="border-t border-foreground/10 mt-16">
          <div className="mx-auto max-w-6xl px-4 py-8 text-xs text-foreground/70 flex items-center justify-between">
            <p>© 2025 광주대동고등학교 학생회 • 축제준비위원회</p>
            <p>후원: 광주대동고등학교 총동창회</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
