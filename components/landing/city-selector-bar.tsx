"use client";

import {
  MapPin,
  CloudRain,
  Sun,
  Snowflake,
  Wind,
  Navigation,
  Sparkles,
  Flame,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

export interface CityMeta {
  id: string;
  name: string;
  badge: string;
  icon: string;
  weather: {
    temp: string;
    condition: string;
    rainProb: string;
    alert: string;
  };
  undergroundBenefit: string;
  activeRoutesCount: number;
  featuredStation: string;
}

export const CITIES_DATA: Record<string, CityMeta> = {
  tokyo: {
    id: "tokyo",
    name: "도쿄",
    badge: "🗼 도쿄 수도권",
    icon: "🗼",
    weather: {
      temp: "32°C",
      condition: "국지성 소나기",
      rainProb: "80%",
      alert: "지상 폭우 주의! 신주쿠·도쿄역 지하 회랑 이용 권장",
    },
    undergroundBenefit: "우천 100% 회피 & 280m 무빙워크 완비",
    activeRoutesCount: 18,
    featuredStation: "신주쿠 · 도쿄역 · 시부야",
  },
  osaka: {
    id: "osaka",
    name: "오사카",
    badge: "🏯 오사카 간사이",
    icon: "🏯",
    weather: {
      temp: "35°C",
      condition: "폭염 경보",
      rainProb: "10%",
      alert: "체감 38°C 위험! 우메다 화이티 지하 냉방로 이용 권장",
    },
    undergroundBenefit: "체감 -8°C 쇼핑몰 공조 냉방",
    activeRoutesCount: 14,
    featuredStation: "우메다 던전 · 난바",
  },
  sapporo: {
    id: "sapporo",
    name: "삿포로",
    badge: "❄️ 삿포로 홋카이도",
    icon: "❄️",
    weather: {
      temp: "22°C / 겨울 -6°C",
      condition: "쾌적 (겨울철 빙판길)",
      rainProb: "20%",
      alert: "빙판길 미끄럼 제로! 치카호 1.9km 직통 회랑 추천",
    },
    undergroundBenefit: "1.9km 논스톱 광폭 실내 보도",
    activeRoutesCount: 9,
    featuredStation: "삿포로역 ~ 스스키노 (치카호)",
  },
  fukuoka: {
    id: "fukuoka",
    name: "후쿠오카",
    badge: "🍜 후쿠오카 큐슈",
    icon: "🍜",
    weather: {
      temp: "33°C",
      condition: "습도 85% 다습",
      rainProb: "40%",
      alert: "텐진 지하상가(텐치카)로 백화점 4곳 우산 없이 직통",
    },
    undergroundBenefit: "남유럽풍 돌바닥 & 백화점 4곳 직결",
    activeRoutesCount: 7,
    featuredStation: "텐진 · 하카타",
  },
  nagoya: {
    id: "nagoya",
    name: "나고야",
    badge: "🏯 나고야 주부",
    icon: "🏯",
    weather: {
      temp: "34°C",
      condition: "무더위",
      rainProb: "15%",
      alert: "메이에키 선로드 지하가로 환승 및 백화점 쾌속 진입",
    },
    undergroundBenefit: "복잡한 역 앞 교차로 횡단 제로",
    activeRoutesCount: 5,
    featuredStation: "나고야 메이에키 지하가",
  },
};

interface CitySelectorBarProps {
  selectedCity: string;
  onSelectCity: (cityId: string) => void;
}

export function CitySelectorBar({
  selectedCity,
  onSelectCity,
}: CitySelectorBarProps) {
  const currentCityMeta =
    selectedCity === "all" ? null : CITIES_DATA[selectedCity] || CITIES_DATA.tokyo;

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-2 pb-6">
      {/* 1. Interactive City Tabs */}
      <div className="cute-card bg-white p-4 sm:p-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b-2 border-zinc-200">
          <div>
            <div className="flex items-center gap-1.5 mb-1">
              <span className="bg-amber-300 text-zinc-950 text-[10px] font-bold px-2 py-0.5 rounded-full border border-zinc-900 font-mono">
                CITY FOCUS
              </span>
              <span className="font-jua text-lg sm:text-xl text-zinc-950">
                내 여행 도시 선택 & 도시별 맞춤 뷰
              </span>
            </div>
            <p className="text-xs text-zinc-600">
              선택한 도시의 <strong>지역별 독립 랭킹, 날씨 회피 팁, 사진 가이드</strong>가 맞춤 표시됩니다.
            </p>
          </div>

          {/* City Switcher Buttons */}
          <div className="flex items-center gap-1.5 p-1 bg-[#FAF9F6] border-2 border-zinc-900 rounded-2xl shadow-[2px_2px_0px_#18181b] overflow-x-auto">
            <button
              onClick={() => onSelectCity("all")}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                selectedCity === "all"
                  ? "bg-zinc-900 text-amber-300 shadow-sm"
                  : "text-zinc-700 hover:text-zinc-950"
              }`}
            >
              🌐 전국 통합
            </button>
            {Object.values(CITIES_DATA).map((city) => (
              <button
                key={city.id}
                onClick={() => onSelectCity(city.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap flex items-center gap-1.5 ${
                  selectedCity === city.id
                    ? "bg-zinc-900 text-amber-300 shadow-sm"
                    : "text-zinc-700 hover:text-zinc-950"
                }`}
              >
                <span>{city.icon}</span>
                <span>{city.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 2. City Real-time Weather & Underground Status Bar */}
        {currentCityMeta ? (
          <div className="mt-4 pt-1 grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Weather Alert */}
            <div className="p-3 rounded-2xl bg-cyan-50 border-2 border-zinc-900 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-200 border border-zinc-900 flex items-center justify-center text-lg shrink-0">
                {currentCityMeta.weather.rainProb.includes("80") ? "🌧️" : "☀️"}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-950">
                  <span>{currentCityMeta.name} 기상 상황</span>
                  <span className="bg-cyan-200 text-cyan-900 text-[10px] px-1.5 py-0.2 rounded font-mono">
                    {currentCityMeta.weather.temp}
                  </span>
                </div>
                <p className="text-[11px] text-cyan-900 font-medium truncate mt-0.5">
                  {currentCityMeta.weather.alert}
                </p>
              </div>
            </div>

            {/* Underground Benefit */}
            <div className="p-3 rounded-2xl bg-amber-50 border-2 border-zinc-900 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-200 border border-zinc-900 flex items-center justify-center text-lg shrink-0">
                ❄️
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-amber-950">
                  {currentCityMeta.name} 지하 통로 특장점
                </div>
                <p className="text-[11px] text-amber-900 font-medium truncate mt-0.5">
                  {currentCityMeta.undergroundBenefit}
                </p>
              </div>
            </div>

            {/* Active Hub */}
            <div className="p-3 rounded-2xl bg-emerald-50 border-2 border-zinc-900 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-200 border border-zinc-900 flex items-center justify-center text-lg shrink-0">
                🚶
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-emerald-950">
                  주요 허브 구간 ({currentCityMeta.activeRoutesCount}개 루트 등록됨)
                </div>
                <p className="text-[11px] text-emerald-900 font-medium truncate mt-0.5">
                  {currentCityMeta.featuredStation}
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* All Cities Overview Mode */
          <div className="mt-4 p-3.5 rounded-2xl bg-amber-100/70 border-2 border-zinc-900 flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-base">🌐</span>
              <span className="font-bold text-zinc-900">
                일본 전역 통합 랭킹 뷰 모드
              </span>
              <span className="text-zinc-600 hidden sm:inline">
                — 일본 5대 도시의 모든 추천 지하 꿀루트를 통합 순위로 확인하고 있습니다.
              </span>
            </div>
            <span className="bg-zinc-900 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full font-mono shrink-0">
              전체 5대 도시 활성화
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
