"use client";

import {
  Camera,
  Heart,
  Umbrella,
  Thermometer,
  Clock,
  Accessibility,
  Maximize2,
  MapPin,
} from "lucide-react";
import type { RouteData, VisualStep } from "@/lib/routes-data";

interface VisualGuideSectionProps {
  currentRoute: RouteData;
  availableCityRoutes: RouteData[];
  selectedRouteId: string;
  onSelectRoute: (routeId: string) => void;
  onLikeRoute: (routeId: string, e: React.MouseEvent) => void;
  onOpenLightbox: (stepIndex: number) => void;
}

export function VisualGuideSection({
  currentRoute,
  availableCityRoutes,
  selectedRouteId,
  onSelectRoute,
  onLikeRoute,
  onOpenLightbox,
}: VisualGuideSectionProps) {
  return (
    <section
      id="visual-guide"
      className="max-w-6xl mx-auto px-4 sm:px-6 py-10 scroll-mt-16"
    >
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-100 border-2 border-zinc-900 text-xs font-bold text-zinc-900 mb-2">
          <Camera className="w-4 h-4 text-cyan-600" />
          Full Route Photo Journey
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-zinc-950 font-jua">
          📸 출발부터 도착까지 단계별 사진 & 설명 가이드
        </h2>
        <p className="text-xs sm:text-sm text-zinc-600 mt-1 max-w-xl mx-auto">
          출발지 ➡️ 중간 분기점 ➡️ 도착지까지 실제 현장 사진과 꿀팁을 확인하세요. (사진 클릭 시 전체화면 확대)
        </p>

        {/* Quick route switcher among available routes in the filtered city */}
        {availableCityRoutes.length > 1 && (
          <div className="flex flex-wrap items-center justify-center gap-2 mt-5">
            <span className="text-xs font-bold text-zinc-500 mr-1 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" /> 이 도시의 다른 루트:
            </span>
            {availableCityRoutes.map((r) => (
              <button
                key={r.id}
                onClick={() => onSelectRoute(r.id)}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition border-2 border-zinc-900 ${
                  r.id === selectedRouteId
                    ? "bg-amber-300 text-zinc-950 shadow-[2px_2px_0px_#18181b]"
                    : "bg-white text-zinc-700 hover:bg-zinc-100"
                }`}
              >
                {r.title.length > 22 ? r.title.substring(0, 22) + "..." : r.title}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main Visual Display Card */}
      <div className="cute-card bg-white p-5 sm:p-8">
        {/* Header of Active Route */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b-2 border-zinc-900">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="bg-amber-300 border-2 border-zinc-900 text-zinc-950 text-xs font-bold px-2.5 py-0.5 rounded-full font-mono">
                {currentRoute.cityName}
              </span>
              <span className="bg-zinc-100 text-zinc-700 text-xs font-medium px-2 py-0.5 rounded-md border border-zinc-300">
                작성자: {currentRoute.author.name} ({currentRoute.author.badge})
              </span>
              <span className="bg-cyan-100 text-cyan-900 text-xs font-bold px-2 py-0.5 rounded-md border border-cyan-300">
                사진 {currentRoute.steps.length}단계 수록
              </span>
            </div>

            <h3 className="text-xl sm:text-3xl font-extrabold text-zinc-950 font-jua">
              {currentRoute.title}
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 mt-1">
              <strong>{currentRoute.origin}</strong> ➡️{" "}
              <strong>{currentRoute.destination}</strong>
            </p>
          </div>

          {/* Quick like button */}
          <div className="flex items-center gap-3">
            <button
              onClick={(e) => onLikeRoute(currentRoute.id, e)}
              className="cute-btn-primary px-4 py-2.5 text-xs sm:text-sm flex items-center gap-2 text-rose-700"
            >
              <Heart className="w-4 h-4 fill-rose-600 text-rose-600" />
              <span className="font-bold text-zinc-950">
                이 루트 추천 ({currentRoute.likes})
              </span>
            </button>
          </div>
        </div>

        {/* Condition Matrix Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6">
          <div className="p-3 rounded-2xl bg-cyan-50 border-2 border-zinc-900 text-center">
            <div className="text-xs font-bold text-cyan-800 flex items-center justify-center gap-1">
              <Umbrella className="w-4 h-4" /> 우천 노출도
            </div>
            <div className="text-base font-extrabold text-zinc-950 font-jua mt-0.5">
              {currentRoute.rainShieldPercent === 100
                ? "0m (100% 실내)"
                : "일부 야외"}
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-amber-50 border-2 border-zinc-900 text-center">
            <div className="text-xs font-bold text-amber-800 flex items-center justify-center gap-1">
              <Thermometer className="w-4 h-4" /> 냉방 체감
            </div>
            <div className="text-base font-extrabold text-zinc-950 font-jua mt-0.5">
              {currentRoute.tempBenefit}
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-emerald-50 border-2 border-zinc-900 text-center">
            <div className="text-xs font-bold text-emerald-800 flex items-center justify-center gap-1">
              <Clock className="w-4 h-4" /> 예상 시간
            </div>
            <div className="text-base font-extrabold text-zinc-950 font-jua mt-0.5">
              {currentRoute.duration} ({currentRoute.distance})
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-purple-50 border-2 border-zinc-900 text-center">
            <div className="text-xs font-bold text-purple-800 flex items-center justify-center gap-1">
              <Accessibility className="w-4 h-4" /> 배리어프리
            </div>
            <div className="text-base font-extrabold text-zinc-950 font-jua mt-0.5">
              엘리베이터 완비
            </div>
          </div>
        </div>

        {/* Sequential Step-by-Step Multi-Photo Timeline Grid */}
        <div className="space-y-6 my-8">
          <div className="flex items-center justify-between">
            <h4 className="font-jua text-xl text-zinc-950 flex items-center gap-2">
              <Camera className="w-5 h-5 text-amber-500" />
              출발지 ➡️ 도착지 사진 순서대로 따라가기
            </h4>
            <span className="text-xs text-zinc-500 font-bold">
              각 사진 클릭 시 전체화면 넘겨보기 지원
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {currentRoute.steps.map((step: VisualStep, idx: number) => (
              <div
                key={idx}
                onClick={() => onOpenLightbox(idx)}
                className="cute-card bg-[#FAF9F6] p-4 cursor-pointer group hover:bg-white transition flex flex-col justify-between"
              >
                <div>
                  {/* Step Number Tag & Indicator */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="bg-zinc-900 text-amber-300 text-xs font-bold px-2.5 py-0.5 rounded-full font-mono">
                      {idx === 0
                        ? "🚩 출발점 (STEP 1)"
                        : idx === currentRoute.steps.length - 1
                        ? `🎯 도착점 (STEP ${idx + 1})`
                        : `🚶 경유지 (STEP ${idx + 1})`}
                    </span>
                    <span className="text-[11px] font-bold text-zinc-500 flex items-center gap-1">
                      <Maximize2 className="w-3 h-3" /> 크게 보기
                    </span>
                  </div>

                  {/* Photo Container */}
                  <div className="relative w-full h-48 rounded-xl border-2 border-zinc-900 overflow-hidden mb-3">
                    <img
                      src={step.photoUrl}
                      alt={step.photoAlt}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                    <div className="absolute bottom-2 left-2 bg-zinc-900/85 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur-xs">
                      🔍 {step.landmark}
                    </div>
                  </div>

                  {/* Step Title & Detailed Description */}
                  <h5 className="font-jua text-base text-zinc-950 mb-1">
                    {step.title}
                  </h5>
                  <p className="text-xs text-zinc-600 leading-relaxed mb-3">
                    {step.description}
                  </p>
                </div>

                {/* Step Tip */}
                <div className="p-2.5 rounded-xl bg-amber-100/80 border border-amber-300 text-[11px] text-amber-950 font-medium">
                  💡 <strong>구간 꿀팁:</strong> {step.tip}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Route Summary Highlight */}
        <div className="p-4 rounded-2xl bg-amber-300 border-2 border-zinc-900 shadow-[3px_3px_0px_#18181b] flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-zinc-950 text-amber-300 flex items-center justify-center shrink-0 font-bold">
            🐾
          </div>
          <div>
            <strong className="font-jua text-base text-zinc-950 block">
              전체 코스 핵심 요약
            </strong>
            <p className="text-xs sm:text-sm text-zinc-900 mt-0.5 leading-relaxed font-medium">
              {currentRoute.highlightTip}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
