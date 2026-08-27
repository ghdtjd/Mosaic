"use client";

import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { RouteData } from "@/app/page";

interface LightboxModalProps {
  activeIndex: number | null;
  currentRoute: RouteData;
  onClose: () => void;
  onSelectIndex: (idx: number) => void;
}

export function LightboxModal({
  activeIndex,
  currentRoute,
  onClose,
  onSelectIndex,
}: LightboxModalProps) {
  if (activeIndex === null || !currentRoute.steps[activeIndex]) return null;

  const currentStep = currentRoute.steps[activeIndex];

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xs cursor-pointer animate-in fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="cute-card bg-white max-w-3xl w-full p-5 sm:p-7 relative overflow-hidden"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full border-2 border-zinc-900 bg-zinc-100 hover:bg-zinc-200 text-zinc-900 z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Step Counter Badge */}
        <div className="flex items-center justify-between mb-3">
          <span className="bg-zinc-900 text-amber-300 text-xs font-bold px-3 py-1 rounded-full font-mono">
            STEP {activeIndex + 1} / {currentRoute.steps.length} 단계
          </span>
          <span className="text-xs text-zinc-500 font-bold hidden sm:inline">
            키보드 ◀ ▶ 키로 이전/다음 사진 이동 가능
          </span>
        </div>

        {/* Large Photo with Prev / Next Navigation Arrows */}
        <div className="relative w-full h-80 sm:h-96 rounded-2xl border-2 border-zinc-900 overflow-hidden mb-4 bg-zinc-100 flex items-center justify-center">
          <img
            src={currentStep.photoUrl}
            alt={currentStep.photoAlt}
            className="w-full h-full object-cover"
          />

          {/* Prev Button */}
          {activeIndex > 0 && (
            <button
              onClick={() => onSelectIndex(activeIndex - 1)}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white border-2 border-zinc-900 flex items-center justify-center shadow-[2px_2px_0px_#18181b] transition hover:scale-105"
              title="이전 사진"
            >
              <ChevronLeft className="w-6 h-6 text-zinc-950" />
            </button>
          )}

          {/* Next Button */}
          {activeIndex < currentRoute.steps.length - 1 && (
            <button
              onClick={() => onSelectIndex(activeIndex + 1)}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white border-2 border-zinc-900 flex items-center justify-center shadow-[2px_2px_0px_#18181b] transition hover:scale-105"
              title="다음 사진"
            >
              <ChevronRight className="w-6 h-6 text-zinc-950" />
            </button>
          )}
        </div>

        {/* Step Explanation in Lightbox */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <h4 className="font-jua text-xl text-zinc-950">
              {currentStep.title}
            </h4>
            <span className="bg-amber-100 text-amber-900 text-xs font-bold px-2 py-0.5 rounded border border-amber-300">
              🔍 {currentStep.landmark}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed font-medium">
            {currentStep.description}
          </p>
          <div className="p-2 rounded-xl bg-amber-50 border border-amber-300 text-xs text-amber-950 font-bold mt-2">
            💡 <strong>길잡이 팁:</strong> {currentStep.tip}
          </div>
        </div>

        {/* Thumbnail Strip Below */}
        <div className="flex items-center gap-2 mt-4 pt-3 border-t-2 border-zinc-100 overflow-x-auto">
          {currentRoute.steps.map((s, idx) => (
            <div
              key={idx}
              onClick={() => onSelectIndex(idx)}
              className={`w-16 h-12 rounded-lg border-2 overflow-hidden cursor-pointer shrink-0 transition ${
                idx === activeIndex
                  ? "border-amber-500 ring-2 ring-amber-400 scale-105"
                  : "border-zinc-300 opacity-60 hover:opacity-100"
              }`}
            >
              <img
                src={s.photoUrl}
                alt={s.title}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
