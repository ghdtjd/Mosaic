"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion, stagger, useAnimate } from "motion/react";
import Floating, { FloatingElement } from "@/components/ui/parallax-floating";
import {
  MapPin,
  Plus,
  Sparkles,
  ShieldCheck,
  Compass,
  Zap,
} from "lucide-react";

const heroFloatingImages = [
  {
    url: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=600&q=80",
    title: "신주쿠 서쪽 통로",
    tag: "📍 신주쿠역 B1F",
    sub: "도쿄도청 무빙워크",
  },
  {
    url: "https://images.unsplash.com/photo-1590559899731-a382839e5549?auto=format&fit=crop&w=600&q=80",
    title: "우메다 화이티 분수대",
    tag: "🏯 오사카 우메다",
    sub: "디아모르 직결",
  },
  {
    url: "https://images.unsplash.com/photo-1538332576228-eb5b4c4de6f5?auto=format&fit=crop&w=600&q=80",
    title: "텐진 지하상가 거리",
    tag: "🍜 후쿠오카 텐치카",
    sub: "백화점 4곳 연결",
  },
  {
    url: "https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=600&q=80",
    title: "삿포로 치카호 회랑",
    tag: "❄️ 삿포로 1.9km",
    sub: "빙판길 0%",
  },
  {
    url: "https://images.unsplash.com/photo-1508807526345-15e9b5f4eaff?auto=format&fit=crop&w=600&q=80",
    title: "도쿄역 마루노우치",
    tag: "🏢 도쿄역 평지길",
    sub: "캐리어 무계단",
  },
  {
    url: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=600&q=80",
    title: "도쿄도청 지하 로비",
    tag: "🎯 목적지 게이트",
    sub: "100% 실내",
  },
];

export function HeroSection() {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    animate(
      ".floating-card",
      { opacity: [0, 1], scale: [0.9, 1] },
      { duration: 0.6, delay: stagger(0.1) }
    );
  }, [animate]);

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-4 pb-8">
      {/* Outer rounded frame preserving background color */}
      <div
        ref={scope}
        className="relative w-full rounded-3xl border-2 border-zinc-900 bg-white shadow-[6px_6px_0px_#18181b] overflow-hidden min-h-[580px] lg:min-h-[620px] flex items-center justify-center p-4 sm:p-8 lg:p-12 text-center select-none"
      >
        {/* Decorative Grid Lines Background */}
        <div className="absolute inset-0 cute-grid opacity-25 pointer-events-none" />

        {/* Center Content with High Readability Shield (High Z-Index) */}
        <motion.div
          className="relative z-30 max-w-2xl mx-auto flex flex-col items-center pointer-events-auto bg-white/95 backdrop-blur-md p-6 sm:p-10 rounded-3xl border-2 border-zinc-900 shadow-[4px_4px_0px_#18181b]"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 border-2 border-zinc-900 text-xs font-bold text-zinc-950 mb-4 shadow-[2px_2px_0px_#18181b]">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>비 · 폭염 · 눈길 없는 일본 지하 내비게이션 🐾</span>
          </div>

          {/* Main Title */}
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-950 font-jua tracking-normal leading-[1.3] text-balance">
            지상 말고 지하로 쾌적하게,
            <br />
            <span className="bg-amber-300 px-3 py-1 rounded-2xl border-2 border-zinc-900 shadow-[3px_3px_0px_#18181b] inline-block mt-2">
              일본 4대 도시 지하 꿀루트 연속 사진 가이드
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-4 text-xs sm:text-sm lg:text-base text-zinc-700 font-medium max-w-lg leading-relaxed">
            개찰구 표지판부터 중간 분기점, 도착 빌딩 게이트까지!
            <br className="hidden sm:inline" />
            <strong>현장 연속 사진과 랜드마크 설명</strong>으로 일본 지하 던전을 헤매지 않고 빠르게 통과하세요.
          </p>

          {/* Action CTA Buttons */}
          <div className="mt-7 flex flex-wrap justify-center items-center gap-3 w-full sm:w-auto">
            <a
              href="#city-gateways"
              className="cute-btn-primary px-5 py-3 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 w-full sm:w-auto shadow-[3px_3px_0px_#18181b]"
            >
              <MapPin className="w-4 h-4 text-zinc-950" />
              <span>4대 도시 지름길 선택하기</span>
            </a>

            <Link
              href="/generate"
              className="cute-btn-secondary px-5 py-3 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 bg-white hover:bg-zinc-50 w-full sm:w-auto"
            >
              <Plus className="w-4 h-4 text-amber-600" />
              <span>나만의 꿀루트 등록하기</span>
            </Link>
          </div>

          {/* Quick Metrics Bar */}
          <div className="mt-6 pt-5 border-t-2 border-zinc-200/80 grid grid-cols-3 gap-3 sm:gap-6 text-center w-full max-w-md">
            <div>
              <div className="font-jua text-lg sm:text-xl text-zinc-950">100%</div>
              <div className="text-[10px] sm:text-[11px] text-zinc-600 font-bold">우천·자외선 회피</div>
            </div>
            <div>
              <div className="font-jua text-lg sm:text-xl text-zinc-950">체감 -7°C</div>
              <div className="text-[10px] sm:text-[11px] text-zinc-600 font-bold">지하 공조 냉방</div>
            </div>
            <div>
              <div className="font-jua text-lg sm:text-xl text-zinc-950">4대 도시</div>
              <div className="text-[10px] sm:text-[11px] text-zinc-600 font-bold">도쿄·오사카·후쿠오카·삿포로</div>
            </div>
          </div>
        </motion.div>

        {/* Parallax Floating Underground Landmarks & Photos (Flanking the Perimeters Only) */}
        <Floating sensitivity={-0.5} className="overflow-hidden pointer-events-none hidden md:block">
          {/* Top Left Corner: Shinjuku West */}
          <FloatingElement depth={0.5} className="top-[6%] left-[2%] lg:left-[3%]">
            <div className="floating-card opacity-0 group pointer-events-auto cursor-pointer p-1.5 bg-white rounded-2xl border-2 border-zinc-900 shadow-[3px_3px_0px_#18181b] hover:scale-105 transition duration-200">
              <div className="w-20 h-20 lg:w-28 lg:h-28 rounded-xl overflow-hidden border border-zinc-900 relative">
                <img
                  src={heroFloatingImages[0].url}
                  alt={heroFloatingImages[0].title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-1 left-1 bg-zinc-900/90 text-amber-300 text-[9px] font-bold px-1.5 py-0.5 rounded">
                  {heroFloatingImages[0].tag}
                </span>
              </div>
            </div>
          </FloatingElement>

          {/* Mid Left Edge: Tokyo Station Flat Walk */}
          <FloatingElement depth={0.8} className="top-[45%] left-[1%] lg:left-[2%]">
            <div className="floating-card opacity-0 group pointer-events-auto cursor-pointer p-1.5 bg-white rounded-2xl border-2 border-zinc-900 shadow-[3px_3px_0px_#18181b] hover:scale-105 transition duration-200">
              <div className="w-20 h-24 lg:w-26 lg:h-32 rounded-xl overflow-hidden border border-zinc-900 relative">
                <img
                  src={heroFloatingImages[4].url}
                  alt={heroFloatingImages[4].title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-1 left-1 bg-zinc-900/90 text-emerald-300 text-[9px] font-bold px-1.5 py-0.5 rounded">
                  {heroFloatingImages[4].tag}
                </span>
              </div>
            </div>
          </FloatingElement>

          {/* Bottom Left Corner: Tochomae Gate */}
          <FloatingElement depth={1.1} className="bottom-[5%] left-[2%] lg:left-[4%]">
            <div className="floating-card opacity-0 group pointer-events-auto cursor-pointer p-1.5 bg-white rounded-2xl border-2 border-zinc-900 shadow-[3px_3px_0px_#18181b] hover:scale-105 transition duration-200">
              <div className="w-22 h-20 lg:w-32 lg:h-26 rounded-xl overflow-hidden border border-zinc-900 relative">
                <img
                  src={heroFloatingImages[5].url}
                  alt={heroFloatingImages[5].title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-1 left-1 bg-zinc-900/90 text-amber-300 text-[9px] font-bold px-1.5 py-0.5 rounded">
                  {heroFloatingImages[5].tag}
                </span>
              </div>
            </div>
          </FloatingElement>

          {/* Top Right Corner: Sapporo Chikaho */}
          <FloatingElement depth={0.7} className="top-[6%] right-[2%] lg:right-[3%]">
            <div className="floating-card opacity-0 group pointer-events-auto cursor-pointer p-1.5 bg-white rounded-2xl border-2 border-zinc-900 shadow-[3px_3px_0px_#18181b] hover:scale-105 transition duration-200">
              <div className="w-22 h-24 lg:w-28 lg:h-32 rounded-xl overflow-hidden border border-zinc-900 relative">
                <img
                  src={heroFloatingImages[3].url}
                  alt={heroFloatingImages[3].title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-1 left-1 bg-zinc-900/90 text-sky-300 text-[9px] font-bold px-1.5 py-0.5 rounded">
                  {heroFloatingImages[3].tag}
                </span>
              </div>
            </div>
          </FloatingElement>

          {/* Mid Right Edge: Fukuoka Tenchika */}
          <FloatingElement depth={0.9} className="top-[43%] right-[1%] lg:right-[2%]">
            <div className="floating-card opacity-0 group pointer-events-auto cursor-pointer p-1.5 bg-white rounded-2xl border-2 border-zinc-900 shadow-[3px_3px_0px_#18181b] hover:scale-105 transition duration-200">
              <div className="w-20 h-22 lg:w-28 lg:h-28 rounded-xl overflow-hidden border border-zinc-900 relative">
                <img
                  src={heroFloatingImages[2].url}
                  alt={heroFloatingImages[2].title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-1 left-1 bg-zinc-900/90 text-rose-300 text-[9px] font-bold px-1.5 py-0.5 rounded">
                  {heroFloatingImages[2].tag}
                </span>
              </div>
            </div>
          </FloatingElement>

          {/* Bottom Right Corner: Umeda Fountain */}
          <FloatingElement depth={1.2} className="bottom-[5%] right-[2%] lg:right-[4%]">
            <div className="floating-card opacity-0 group pointer-events-auto cursor-pointer p-1.5 bg-white rounded-2xl border-2 border-zinc-900 shadow-[3px_3px_0px_#18181b] hover:scale-105 transition duration-200">
              <div className="w-22 h-20 lg:w-30 lg:h-28 rounded-xl overflow-hidden border border-zinc-900 relative">
                <img
                  src={heroFloatingImages[1].url}
                  alt={heroFloatingImages[1].title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-1 left-1 bg-zinc-900/90 text-cyan-300 text-[9px] font-bold px-1.5 py-0.5 rounded">
                  {heroFloatingImages[1].tag}
                </span>
              </div>
            </div>
          </FloatingElement>
        </Floating>
      </div>
    </section>
  );
}
