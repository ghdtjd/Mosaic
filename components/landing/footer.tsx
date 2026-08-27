"use client";

import Link from "next/link";
import { useAuth } from "@/context/auth-context";

export function Footer() {
  const { user, signOut } = useAuth();

  return (
    <footer className="border-t-2 border-zinc-900 bg-white py-8 px-4 sm:px-6 text-xs text-zinc-600">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="font-jua text-base font-bold text-zinc-950">
            치카미치 (CHIKAMICHI)
          </span>
          <span>•</span>
          <span>출발부터 도착까지 다중 사진 기반 지하 꿀루트 내비게이션</span>
        </div>

        <div className="flex items-center gap-4 font-bold text-zinc-800">
          <a href="#leaderboard" className="hover:underline">
            주간 랭킹
          </a>
          <a href="#visual-guide" className="hover:underline">
            사진 가이드
          </a>
          <Link href="/generate" className="hover:underline text-amber-700">
            스튜디오(/generate)
          </Link>
          {!user ? (
            <Link href="/login" className="hover:underline">
              로그인
            </Link>
          ) : (
            <button onClick={() => signOut()} className="hover:underline text-red-600">
              로그아웃
            </button>
          )}
        </div>

        <div className="text-zinc-500 text-[11px]">
          © 2026 CHIKAMICHI Project. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
