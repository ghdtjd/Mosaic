"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion, stagger, useAnimate } from "motion/react";
import Floating, { FloatingElement } from "@/components/ui/parallax-floating";
import {
  Camera,
  Plus,
  Footprints,
  Compass,
  MapPin,
  Sparkles,
  CloudRain,
  Sun,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";

const heroFloatingImages = [
  {
    url: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=600&q=80",
    title: "신주쿠 서쪽 지하",
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
    tag: "🏢 오테마치 직통",
    sub: "캐리어 무계단",
  },
  {
    url: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=600&q=80",
    title: "도쿄도청 지하 로비",
    tag: "🎯 목적지 게이트",
    sub: "100% 실내",
  },
  {
    url: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80",
    title: "오도리역 지하 광장",
    tag: "🎪 쉼터 & 카페",
    sub: "냉난방 풀가동",
  },
  {
    url: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=600&q=80",
    title: "한큐 백화점 식품관",
    tag: "🛍️ 지하 쇼핑 연결",
    sub: "시원한 에어컨",
  },
];

export function HeroSection() {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    animate(
      ".floating-card",
      { opacity: [0, 1], scale: [0.9, 1] },
      { duration: 0.6, delay: stagger(0.12) }
    );
  }, [animate]);

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-4 pb-12">
      {/* Outer rounded frame preserving background color */}
      <div
        ref={scope}
        className="relative w-full rounded-3xl border-2 border-zinc-900 bg-white shadow-[6px_6px_0px_#18181b] overflow-hidden min-h-[580px] sm:min-h-[640px] flex items-center justify-center p-6 sm:p-12 text-center select-none"
      >
        {/* Decorative Grid Lines Background */}
        <div className="absolute inset-0 cute-grid opacity-30 pointer-events-none" />

        {/* Center Content (High Z-Index) */}
        <motion.div
          className="relative z-30 max-w-2xl mx-auto flex flex-col items-center pointer-events-auto"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 border-2 border-zinc-900 text-xs font-bold text-zinc-950 mb-5 shadow-[2px_2px_0px_#18181b] hover:scale-105 transition">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>비 · 폭염 · 눈길 회피 지하 내비게이션 🐾</span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-zinc-950 font-jua tracking-normal leading-[1.25] text-balance">
            지상 말고 지하로 쾌적하게,
            <br />
            <span className="bg-amber-300 px-3.5 py-1 rounded-2xl border-2 border-zinc-900 shadow-[3px_3px_0px_#18181b] inline-block mt-2">
              일본 지하 꿀루트 연속 사진 가이드
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-5 text-sm sm:text-base lg:text-lg text-zinc-700 font-medium max-w-xl leading-relaxed">
            개찰구 표지판부터 중간 분기점, 도착 빌딩 게이트까지!
            <br className="hidden sm:inline" />
            <strong>실제 현장 연속 사진과 꿀팁 설명</strong>으로 일본 지하 던전을 헤매지 않고 통과하세요.
          </p>

          {/* Action CTA Buttons */}
          <div className="mt-8 flex flex-wrap justify-center items-center gap-3 w-full sm:w-auto">
            <a
              href="#city-gateways"
              className="cute-btn-primary px-6 py-3.5 text-sm sm:text-base font-bold flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              <MapPin className="w-5 h-5" />
              <span>4대 도시 지름길 선택하기</span>
            </a>

            <Link
              href="/generate"
              className="cute-btn-secondary px-6 py-3.5 text-sm sm:text-base font-bold flex items-center justify-center gap-2 bg-white hover:bg-zinc-50 w-full sm:w-auto"
            >
              <Plus className="w-5 h-5 text-amber-600" />
              <span>나만의 꿀루트 등록하기</span>
            </Link>
          </div>

          {/* Quick Metrics Bar */}
          <div className="mt-8 pt-6 border-t-2 border-zinc-200/80 grid grid-cols-3 gap-4 sm:gap-8 text-center w-full max-w-md">
            <div>
              <div className="font-jua text-xl sm:text-2xl text-zinc-950">100%</div>
              <div className="text-[11px] text-zinc-600 font-bold">우천/자외선 회피</div>
            </div>
            <div>
              <div className="font-jua text-xl sm:text-2xl text-zinc-950">체감 -7°C</div>
              <div className="text-[11px] text-zinc-600 font-bold">지하 공조 냉방</div>
            </div>
            <div>
              <div className="font-jua text-xl sm:text-2xl text-zinc-950">5대 도시</div>
              <div className="text-[11px] text-zinc-600 font-bold">도쿄·오사카·삿포로+</div>
            </div>
          </div>
        </motion.div>

        {/* Parallax Floating Underground Landmarks & Photos */}
        <Floating sensitivity={-0.9} className="overflow-hidden pointer-events-none">
          {/* Top Left: Shinjuku West */}
          <FloatingElement depth={0.6} className="top-[6%] left-[4%] sm:left-[6%]">
            <div className="floating-card opacity-0 group pointer-events-auto cursor-pointer p-1.5 bg-white rounded-2xl border-2 border-zinc-900 shadow-[3px_3px_0px_#18181b] hover:scale-105 transition duration-200">
              <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-xl overflow-hidden border border-zinc-900 relative">
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

          {/* Top Middle-Left: Umeda Fountain */}
          <FloatingElement depth={1.2} className="top-[4%] left-[26%] sm:left-[24%]">
            <div className="floating-card opacity-0 group pointer-events-auto cursor-pointer p-1.5 bg-white rounded-2xl border-2 border-zinc-900 shadow-[3px_3px_0px_#18181b] hover:scale-105 transition duration-200">
              <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-xl overflow-hidden border border-zinc-900 relative">
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

          {/* Top Right: Sapporo Chikaho */}
          <FloatingElement depth={1.8} className="top-[5%] right-[5%] sm:right-[8%]">
            <div className="floating-card opacity-0 group pointer-events-auto cursor-pointer p-1.5 bg-white rounded-2xl border-2 border-zinc-900 shadow-[3px_3px_0px_#18181b] hover:scale-105 transition duration-200">
              <div className="w-24 h-28 sm:w-32 sm:h-36 rounded-xl overflow-hidden border border-zinc-900 relative">
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

          {/* Middle Left: Tokyo Station */}
          <FloatingElement depth={0.8} className="top-[45%] left-[2%] sm:left-[3%]">
            <div className="floating-card opacity-0 group pointer-events-auto cursor-pointer p-1.5 bg-white rounded-2xl border-2 border-zinc-900 shadow-[3px_3px_0px_#18181b] hover:scale-105 transition duration-200">
              <div className="w-20 h-24 sm:w-28 sm:h-32 rounded-xl overflow-hidden border border-zinc-900 relative">
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

          {/* Middle Right: Fukuoka Tenchika */}
          <FloatingElement depth={1.1} className="top-[42%] right-[2%] sm:right-[3%]">
            <div className="floating-card opacity-0 group pointer-events-auto cursor-pointer p-1.5 bg-white rounded-2xl border-2 border-zinc-900 shadow-[3px_3px_0px_#18181b] hover:scale-105 transition duration-200">
              <div className="w-22 h-22 sm:w-30 sm:h-30 rounded-xl overflow-hidden border border-zinc-900 relative">
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

          {/* Bottom Left: Tochomae Gate */}
          <FloatingElement depth={2.2} className="bottom-[8%] left-[8%] sm:left-[10%]">
            <div className="floating-card opacity-0 group pointer-events-auto cursor-pointer p-1.5 bg-white rounded-2xl border-2 border-zinc-900 shadow-[3px_3px_0px_#18181b] hover:scale-105 transition duration-200">
              <div className="w-24 h-20 sm:w-36 sm:h-28 rounded-xl overflow-hidden border border-zinc-900 relative">
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

          {/* Bottom Right: Hankyu Department Mall */}
          <FloatingElement depth={1.5} className="bottom-[6%] right-[8%] sm:right-[12%]">
            <div className="floating-card opacity-0 group pointer-events-auto cursor-pointer p-1.5 bg-white rounded-2xl border-2 border-zinc-900 shadow-[3px_3px_0px_#18181b] hover:scale-105 transition duration-200">
              <div className="w-22 h-22 sm:w-32 sm:h-32 rounded-xl overflow-hidden border border-zinc-900 relative">
                <img
                  src={heroFloatingImages[7].url}
                  alt={heroFloatingImages[7].title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-1 left-1 bg-zinc-900/90 text-purple-300 text-[9px] font-bold px-1.5 py-0.5 rounded">
                  {heroFloatingImages[7].tag}
                </span>
              </div>
            </div>
          </FloatingElement>
        </Floating>
      </div>
    </section>
  );
}
