"use client";

import Link from "next/link";
import {
  CITIES_DATA,
  CityMeta,
} from "@/lib/routes-data";
import {
  ArrowRight,
  MapPin,
  Sparkles,
  CloudRain,
  Sun,
  Snowflake,
  ShieldCheck,
  Camera,
  Plus,
} from "lucide-react";

export function CityGatewaySection() {
  const cities = Object.values(CITIES_DATA);

  return (
    <section id="city-gateways" className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-200 border-2 border-zinc-900 text-xs font-bold text-zinc-900 mb-2.5 shadow-[2px_2px_0px_#18181b]">
          <Sparkles className="w-3.5 h-3.5 text-amber-700" />
          <span>4대 거점 도시 전용관</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-zinc-950 font-jua">
          여행할 도시를 선택하세요 🐾
        </h2>
        <p className="text-xs sm:text-sm text-zinc-600 mt-2">
          각 도시를 선택하면 해당 도시의 <strong>지름길 랭킹, 연속 사진 가이드</strong>를 독립적으로 확인하고 새로운 꿀루트를 직접 등록할 수 있습니다.
        </p>
      </div>

      {/* 4 Cities Interactive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cities.map((city) => (
          <Link
            key={city.id}
            href={`/city/${city.id}`}
            className="cute-card bg-white p-5 sm:p-6 group cursor-pointer hover:-translate-y-1 transition duration-200 flex flex-col justify-between"
          >
            <div>
              {/* Card Top: City Badge & Real-time Weather Pill */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{city.icon}</span>
                  <div>
                    <h3 className="font-jua text-2xl text-zinc-950 flex items-center gap-1.5">
                      {city.name}
                      <span className="text-xs font-mono font-bold text-zinc-400">
                        {city.nameEn}
                      </span>
                    </h3>
                  </div>
                </div>

                {/* Weather Pill */}
                <div className="flex items-center gap-1.5 bg-zinc-100 border-2 border-zinc-900 px-2.5 py-1 rounded-full text-xs font-bold text-zinc-900 shadow-[1.5px_1.5px_0px_#18181b]">
                  <span>{city.weather.icon}</span>
                  <span>{city.weather.temp}</span>
                </div>
              </div>

              {/* Cover Photo */}
              <div className="relative w-full h-44 rounded-2xl border-2 border-zinc-900 overflow-hidden mb-4">
                <img
                  src={city.coverImage}
                  alt={city.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="bg-amber-400 text-zinc-950 text-[10px] font-bold px-2 py-0.5 rounded-full inline-block mb-1 border border-zinc-900">
                    {city.tagline}
                  </span>
                  <p className="text-xs text-zinc-200 line-clamp-1 font-medium">
                    {city.description}
                  </p>
                </div>
              </div>

              {/* Key Benefit Box */}
              <div className="p-3 rounded-xl bg-[#FAF9F6] border-2 border-zinc-900 mb-4 flex items-center justify-between text-xs">
                <span className="text-zinc-600 font-medium">지하 통로 특장점:</span>
                <span className="font-bold text-zinc-950">
                  {city.undergroundBenefit}
                </span>
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-3 border-t-2 border-zinc-100 flex items-center justify-between">
              <span className="text-xs font-bold text-zinc-500">
                등록된 지름길 <strong>{city.totalRoutesCount}개</strong>
              </span>

              <span className="cute-btn-primary px-4 py-2 text-xs font-bold flex items-center gap-1.5 group-hover:bg-amber-400">
                <span>{city.name} 지름길 입장</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
