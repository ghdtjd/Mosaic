"use client";

import Link from "next/link";
import { useAuth } from "@/context/auth-context";
import {
  Footprints,
  Trophy,
  Camera,
  Sparkles,
  Plus,
  LogOut,
  CloudRain,
  Sun,
} from "lucide-react";

interface HeaderProps {
  onOpenUploadModal?: () => void;
}

export function Header({ onOpenUploadModal }: HeaderProps) {
  const { user, profile, signOut } = useAuth();

  return (
    <>
      {/* 1. TOP CUTE ANNOUNCEMENT BAR */}
      <div className="w-full bg-zinc-900 text-white text-xs py-2 px-4 sticky top-0 z-40 shadow-sm">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="bg-amber-400 text-zinc-950 text-[10px] font-bold px-2 py-0.5 rounded-full">
              NEW
            </span>
            <span className="font-medium text-zinc-200">
              출발점부터 도착지까지! 단계별 다중 사진 & 랜드마크 설명 가이드 지원
            </span>
          </div>

          <div className="flex items-center gap-3 text-zinc-300 text-[11px]">
            <span className="flex items-center gap-1">
              <CloudRain className="w-3.5 h-3.5 text-cyan-400" /> 도쿄 비 80% (우산 0% 모드)
            </span>
            <span className="hidden sm:inline text-zinc-600">|</span>
            <span className="hidden sm:flex items-center gap-1">
              <Sun className="w-3.5 h-3.5 text-amber-400" /> 오사카 34°C (에어컨 루트 추천)
            </span>
          </div>
        </div>
      </div>

      {/* 2. NAVIGATION BAR */}
      <header className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between border-b-2 border-zinc-900">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-11 h-11 rounded-2xl bg-amber-400 border-2 border-zinc-900 flex items-center justify-center shadow-[3px_3px_0px_#18181b] group-hover:rotate-6 transition">
              <Footprints className="w-6 h-6 text-zinc-950" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-extrabold tracking-tight font-jua text-zinc-950">
                  치카미치
                </span>
                <span className="bg-zinc-900 text-amber-300 text-[10px] font-bold px-1.5 py-0.5 rounded-md font-mono">
                  CHIKAMICHI
                </span>
              </div>
              <p className="text-[11px] text-zinc-600 font-medium">
                출발~도착 다중 사진으로 쉽게 찾는 일본 지하 지름길
              </p>
            </div>
          </Link>
        </div>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-bold text-zinc-800">
          <a
            href="#leaderboard"
            className="hover:text-amber-600 transition flex items-center gap-1.5"
          >
            <Trophy className="w-4 h-4 text-amber-500" />
            주간 랭킹
          </a>
          <a
            href="#visual-guide"
            className="hover:text-amber-600 transition flex items-center gap-1.5"
          >
            <Camera className="w-4 h-4 text-cyan-600" />
            사진 스텝 가이드
          </a>
          <a
            href="#how-it-works"
            className="hover:text-amber-600 transition flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4 text-purple-600" />
            서비스 소개
          </a>
          <a href="#faq" className="hover:text-amber-600 transition">
            FAQ
          </a>
        </nav>

        {/* Right Nav: Upload Button OR Logged-In User Profile */}
        <div className="flex items-center gap-2.5">
          {user ? (
            /* Logged-In User Profile and Generate Studio Shortcut */
            <div className="flex items-center gap-2">
              <Link
                href="/generate"
                className="cute-btn-primary px-3 sm:px-3.5 py-2 text-xs sm:text-sm flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">내 꿀루트 등록</span>
                <span className="sm:hidden">등록</span>
              </Link>

              {/* My Profile Badge */}
              <div className="flex items-center gap-2 bg-white border-2 border-zinc-900 rounded-2xl px-3 py-1.5 shadow-[2px_2px_0px_#18181b]">
                <div className="w-6 h-6 rounded-full bg-amber-300 border border-zinc-900 text-zinc-950 font-bold text-xs flex items-center justify-center">
                  {(profile?.name || user.email || "U")[0].toUpperCase()}
                </div>
                <div className="hidden sm:block text-left">
                  <span className="text-xs font-bold text-zinc-900 block leading-tight max-w-[90px] truncate">
                    {profile?.name || user.email?.split("@")[0]}
                  </span>
                  <span className="text-[10px] text-amber-700 font-bold">
                    길잡이 탐험가
                  </span>
                </div>
                <button
                  onClick={() => signOut()}
                  title="로그아웃"
                  className="p-1 text-zinc-400 hover:text-red-500 transition ml-0.5"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : (
            /* Guest Buttons */
            <div className="flex items-center gap-1.5">
              <Link
                href="/login"
                className="cute-btn-secondary px-3 py-2 text-xs font-bold"
              >
                로그인
              </Link>
              <Link
                href="/signup"
                className="hidden sm:inline-flex cute-btn-primary px-3 py-2 text-xs font-bold"
              >
                가입하기
              </Link>
            </div>
          )}
        </div>
      </header>
    </>
  );
}
