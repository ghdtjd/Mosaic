import type { Metadata } from "next";
import { Jua, Noto_Sans_KR, Gaegu } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/auth-context";

const jua = Jua({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-jua",
  display: "swap",
});

const notoSansKr = Noto_Sans_KR({
  weight: ["400", "500", "700", "800"],
  subsets: ["latin"],
  variable: "--font-noto",
  display: "swap",
});

const gaegu = Gaegu({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-gaegu",
  display: "swap",
});

export const metadata: Metadata = {
  title: "치카미치 (CHIKAMICHI) | 사진·영상으로 한눈에 보는 일본 지하길 내비",
  description:
    "비·눈 오는 날, 폭염에도 우산 없이 쾌적하게! 사진과 영상으로 쉽게 찾아가는 일본 주요 도심 지하 연결 통로 & 꿀루트 랭킹 커뮤니티",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${notoSansKr.variable} ${jua.variable} ${gaegu.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col font-sans bg-[#FAF9F6] text-zinc-900 selection:bg-amber-300 selection:text-zinc-950">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
