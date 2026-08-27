"use client";

import { Crown, Heart, Camera, Play, ChevronRight, Trophy, MapPin } from "lucide-react";
import type { RouteData } from "@/lib/routes-data";
import { CITIES_DATA } from "@/components/landing/city-selector-bar";

interface LeaderboardSectionProps {
  filteredRoutes: RouteData[];
  selectedRouteId: string;
  selectedCityFilter: string;
  onSelectCityFilter: (city: string) => void;
  onSelectRoute: (routeId: string) => void;
  onLikeRoute: (routeId: string, e: React.MouseEvent) => void;
}

export function LeaderboardSection({
  filteredRoutes,
  selectedRouteId,
  selectedCityFilter,
  onSelectCityFilter,
  onSelectRoute,
  onLikeRoute,
}: LeaderboardSectionProps) {
  const currentCityMeta =
    selectedCityFilter !== "all" ? CITIES_DATA[selectedCityFilter] : null;

  return (
    <section id="leaderboard" className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      {/* Leaderboard Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-200 border-2 border-zinc-900 text-xs font-bold text-zinc-900 mb-2">
            <Crown className="w-4 h-4 text-amber-600" />
            {currentCityMeta
              ? `${currentCityMeta.name} 지역 랭킹`
              : "전국 통합 랭킹"}
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-zinc-950 font-jua">
            {currentCityMeta ? (
              <>
                🏆 {currentCityMeta.icon} {currentCityMeta.name} 베스트 꿀루트 랭킹
              </>
            ) : (
              <>🏆 전국 통합 명예의 전당 · 베스트 지하 꿀루트 랭킹</>
            )}
          </h2>

          <p className="text-xs sm:text-sm text-zinc-600 mt-1">
            {currentCityMeta ? (
              <>
                <strong>{currentCityMeta.name}</strong> 지역에서 이용자 만족도와 좋아요(❤️)가 가장 높은 상위 루트입니다.
              </>
            ) : (
              <>일본 전역 5대 도시의 가장 인기 있는 지하 쾌속 루트를 실시간으로 집계합니다.</>
            )}
          </p>
        </div>

        {/* City Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 bg-white border-2 border-zinc-900 rounded-2xl shadow-[2px_2px_0px_#18181b] overflow-x-auto">
          {[
            { id: "all", label: "🌐 전국 랭킹" },
            { id: "tokyo", label: "🗼 도쿄" },
            { id: "osaka", label: "🏯 오사카" },
            { id: "sapporo", label: "❄️ 삿포로" },
            { id: "fukuoka", label: "🍜 후쿠오카" },
            { id: "nagoya", label: "🏯 나고야" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => onSelectCityFilter(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                selectedCityFilter === tab.id
                  ? "bg-zinc-900 text-amber-300 shadow-sm"
                  : "text-zinc-700 hover:text-zinc-950"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Leaderboard Cards Grid */}
      {filteredRoutes.length === 0 ? (
        <div className="cute-card bg-white p-8 text-center text-zinc-500">
          <p className="font-jua text-lg text-zinc-800 mb-1">
            해당 도시에 등록된 루트가 없습니다.
          </p>
          <p className="text-xs">첫 번째 꿀루트를 직접 등록해 보세요!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredRoutes.map((route, idx) => {
            const isSelected = route.id === selectedRouteId;
            const cityRank = idx + 1;

            return (
              <div
                key={route.id}
                onClick={() => onSelectRoute(route.id)}
                className={`cute-card p-4 cursor-pointer relative flex flex-col justify-between ${
                  isSelected
                    ? "border-amber-500 ring-2 ring-amber-400 bg-amber-50/40"
                    : "bg-white"
                }`}
              >
                {/* Top Rank & Likes */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-1.5">
                    {/* Dynamic City Rank or National Rank */}
                    <span
                      className={`px-2.5 py-1 rounded-xl border-2 border-zinc-900 font-jua text-xs flex items-center gap-1 shadow-[1.5px_1.5px_0px_#18181b] ${
                        cityRank === 1
                          ? "bg-amber-300 text-zinc-950 font-bold"
                          : cityRank === 2
                          ? "bg-slate-200 text-zinc-950 font-bold"
                          : cityRank === 3
                          ? "bg-amber-700 text-white font-bold"
                          : "bg-zinc-100 text-zinc-700"
                      }`}
                    >
                      <span>
                        {selectedCityFilter !== "all"
                          ? `${currentCityMeta?.name} ${cityRank}위`
                          : `전국 ${route.rank}위`}
                      </span>
                    </span>

                    <span className="text-[11px] font-bold text-zinc-600 font-mono">
                      {route.cityName}
                    </span>
                  </div>

                  {/* Upvote Button with Heart */}
                  <button
                    onClick={(e) => onLikeRoute(route.id, e)}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-full border-2 border-zinc-900 bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-bold transition shadow-[2px_2px_0px_#18181b] active:scale-95 group"
                  >
                    <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 group-hover:scale-125 transition" />
                    <span>{route.likes.toLocaleString()}</span>
                  </button>
                </div>

                {/* Cover Photo Thumbnail */}
                <div className="relative w-full h-36 rounded-xl border-2 border-zinc-900 overflow-hidden mb-3 group">
                  <img
                    src={route.coverPhoto}
                    alt={route.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-zinc-900/80 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-md backdrop-blur-xs">
                    <Camera className="w-3 h-3 text-amber-300" />
                    <span>사진 {route.steps.length}장 포함</span>
                  </div>
                  {route.videoPreviewUrl && (
                    <div className="absolute top-2 right-2 bg-amber-400 border border-zinc-900 text-zinc-950 text-[10px] font-bold px-1.5 py-0.5 rounded-md flex items-center gap-0.5">
                      <Play className="w-3 h-3 fill-zinc-950" />
                      <span>영상</span>
                    </div>
                  )}
                </div>

                {/* Route Title & Origin ➡️ Dest */}
                <div>
                  <h3 className="font-bold text-base text-zinc-950 line-clamp-1 mb-1 font-jua">
                    {route.title}
                  </h3>
                  <div className="text-xs text-zinc-600 flex items-center gap-1 mb-3">
                    <span className="truncate max-w-[120px]">{route.origin}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                    <span className="truncate max-w-[120px] font-semibold text-zinc-900">
                      {route.destination}
                    </span>
                  </div>
                </div>

                {/* Footer details: Author & Duration */}
                <div className="pt-3 border-t-2 border-zinc-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5">
                    <div
                      className={`w-5 h-5 rounded-full border border-zinc-900 ${route.author.avatarBg} text-[10px] font-bold flex items-center justify-center`}
                    >
                      {route.author.name[0]}
                    </div>
                    <span className="text-zinc-700 font-medium">
                      {route.author.name}
                    </span>
                  </div>

                  <span className="text-amber-700 font-bold text-[11px] bg-amber-100 px-2 py-0.5 rounded-md border border-amber-300">
                    {route.duration} ({route.distance})
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
