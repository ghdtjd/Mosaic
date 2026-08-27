"use client";

import Link from "next/link";
import { useAuth } from "@/context/auth-context";
import { Plus } from "lucide-react";

export function UserDashboardBanner() {
  const { user, profile, signOut } = useAuth();

  if (!user) return null;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6">
      <div className="cute-card bg-amber-200/85 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-zinc-950 text-amber-300 flex items-center justify-center font-bold text-xl border-2 border-zinc-950 shadow-[2px_2px_0px_#18181b]">
            {(profile?.name || user.email || "U")[0].toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-jua text-lg sm:text-xl text-zinc-950">
                {profile?.name || user.email?.split("@")[0]} 님의 길잡이 공간 🐾
              </h3>
              <span className="bg-zinc-950 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full font-mono">
                인증회원
              </span>
            </div>
            <p className="text-xs text-zinc-800 font-medium mt-0.5">
              관심 도시: <strong>{profile?.preferred_city === "osaka" ? "오사카" : profile?.preferred_city === "sapporo" ? "삿포로" : profile?.preferred_city === "fukuoka" ? "후쿠오카" : "도쿄"}</strong> • 내가 아는 지하 지름길을 사진으로 등록해 보세요!
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Link
            href="/generate"
            className="flex-1 sm:flex-initial cute-btn-primary px-4 py-2.5 text-xs font-bold flex items-center justify-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>새 꿀루트 작성 스튜디오</span>
          </Link>
          <button
            onClick={() => signOut()}
            className="cute-btn-secondary px-3 py-2.5 text-xs font-bold text-zinc-700 hover:text-red-600 bg-white"
          >
            로그아웃
          </button>
        </div>
      </div>
    </div>
  );
}
