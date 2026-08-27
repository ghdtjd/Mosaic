"use client";

import { Sparkles } from "lucide-react";

export function WhySection() {
  return (
    <section
      id="how-it-works"
      className="max-w-6xl mx-auto px-4 sm:px-6 py-14 border-t-2 border-zinc-900"
    >
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 border-2 border-zinc-900 text-xs font-bold text-zinc-900 mb-2">
          <Sparkles className="w-4 h-4 text-purple-600" />
          Visual Route Power
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-zinc-950 font-jua">
          출발부터 도착까지, 연속 사진의 힘!
        </h2>
        <p className="text-xs sm:text-sm text-zinc-600 mt-2">
          중간에 길을 잃지 않도록 모든 분기점 사진과 랜드마크를 연속으로 확인하세요.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="cute-card bg-white p-6">
          <div className="w-12 h-12 rounded-2xl bg-amber-300 border-2 border-zinc-900 flex items-center justify-center text-xl mb-4 font-bold">
            🚩
          </div>
          <h3 className="font-jua text-xl text-zinc-950 mb-2">
            1. 출발 개찰구 표지판 사진
          </h3>
          <p className="text-xs text-zinc-600 leading-relaxed">
            역에서 내리자마자 어느 개찰구로 나가야 비를 안 맞는지 첫 출발점 사진으로 확인합니다.
          </p>
        </div>

        <div className="cute-card bg-white p-6">
          <div className="w-12 h-12 rounded-2xl bg-cyan-300 border-2 border-zinc-900 flex items-center justify-center text-xl mb-4 font-bold">
            🚶
          </div>
          <h3 className="font-jua text-xl text-zinc-950 mb-2">
            2. 중간 분기점 랜드마크 사진
          </h3>
          <p className="text-xs text-zinc-600 leading-relaxed">
            복잡한 갈림길에서 분수대, 빨간 간판, 무빙워크 등 시각적 랜드마크 사진을 보고 1초 만에 길을 찾습니다.
          </p>
        </div>

        <div className="cute-card bg-white p-6">
          <div className="w-12 h-12 rounded-2xl bg-rose-300 border-2 border-zinc-900 flex items-center justify-center text-xl mb-4 font-bold">
            🎯
          </div>
          <h3 className="font-jua text-xl text-zinc-950 mb-2">
            3. 도착 빌딩 직결 게이트 사진
          </h3>
          <p className="text-xs text-zinc-600 leading-relaxed">
            지상으로 나가지 않고 건물 지하 로비로 직통 연결되는 최종 게이트 사진으로 완벽하게 골인!
          </p>
        </div>
      </div>
    </section>
  );
}
