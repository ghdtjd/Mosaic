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
  MapPin,
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
              4대 도시 오픈
            </span>
            <span className="font-medium text-zinc-200">
              도쿄 · 오사카 · 후쿠오카 · 삿포로 4대 거점 도시 전용 지름길 허브 오픈!
            </span>
          </div>

          <div className="flex items-center gap-3 text-zinc-300 text-[11px]">
            <Link
              href="/city/tokyo"
              className="hover:text-amber-300 transition flex items-center gap-1"
            >
              <span>🗼 도쿄</span>
            </Link>
            <span className="text-zinc-600">·</span>
            <Link
              href="/city/osaka"
              className="hover:text-amber-300 transition flex items-center gap-1"
            >
              <span>🏯 오사카</span>
            </Link>
            <span className="text-zinc-600">·</span>
            <Link
              href="/city/fukuoka"
              className="hover:text-amber-300 transition flex items-center gap-1"
            >
              <span>🍜 후쿠오카</span>
            </Link>
            <span className="text-zinc-600">·</span>
            <Link
              href="/city/sapporo"
              className="hover:text-amber-300 transition flex items-center gap-1"
            >
              <span>❄️ 삿포로</span>
            </Link>
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
                비·폭염·눈길 없는 일본 4대 도시 지하 지름길 내비게이션
              </p>
            </div>
          </Link>
        </div>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-5 text-sm font-bold text-zinc-800">
          <Link
            href="/city/tokyo"
            className="hover:text-amber-600 transition flex items-center gap-1"
          >
            <span>🗼 도쿄</span>
          </Link>
          <Link
            href="/city/osaka"
            className="hover:text-amber-600 transition flex items-center gap-1"
          >
            <span>🏯 오사카</span>
          </Link>
          <Link
            href="/city/fukuoka"
            className="hover:text-amber-600 transition flex items-center gap-1"
          >
            <span>🍜 후쿠오카</span>
          </Link>
          <Link
            href="/city/sapporo"
            className="hover:text-amber-600 transition flex items-center gap-1"
          >
            <span>❄️ 삿포로</span>
          </Link>
          <a
            href="/#how-it-works"
            className="hover:text-amber-600 transition flex items-center gap-1 text-zinc-500 font-normal"
          >
            소개
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
                <span className="hidden sm:inline">꿀루트 작성</span>
                <span className="sm:hidden">작성</span>
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
