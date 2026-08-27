"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import {
  CITIES_DATA,
  INITIAL_ROUTES,
  RouteData,
  VisualStep,
  CityMeta,
} from "@/lib/routes-data";
import { Header } from "@/components/landing/header";
import { LeaderboardSection } from "@/components/landing/leaderboard-section";
import { VisualGuideSection } from "@/components/landing/visual-guide-section";
import { LightboxModal } from "@/components/landing/lightbox-modal";
import { RouteCreateModal } from "@/components/landing/route-create-modal";
import { Footer } from "@/components/landing/footer";
import {
  ArrowLeft,
  Camera,
  Plus,
  Crown,
  Heart,
  CloudRain,
  Sun,
  Snowflake,
  MapPin,
  Sparkles,
  Home,
  ChevronRight,
  ShieldCheck,
  Zap,
} from "lucide-react";
import type { EditableStep } from "@/lib/routes-data";

const DEFAULT_EDITABLE_STEPS: EditableStep[] = [
  {
    id: "step-1",
    stepNumber: 1,
    title: "출발지 개찰구 및 지하 진입로",
    landmark: "노란색 지하철 출구 표지판 앞",
    description: "개찰구를 나온 후 지하 연결통로 방향으로 진입하세요.",
    tip: "지상으로 나가지 말고 B1F 유도선을 따라가세요.",
    photoPreview: null,
    indoor: true,
    elevator: true,
  },
  {
    id: "step-2",
    stepNumber: 2,
    title: "중간 경유지 / 랜드마크 분기점",
    landmark: "중앙 분수대 또는 에어컨 쇼핑몰 연결부",
    description: "쾌적한 냉방 구역을 거쳐 목적지 통로로 직진합니다.",
    tip: "이 구간에서 에어컨이 가장 시원합니다.",
    photoPreview: null,
    indoor: true,
    elevator: true,
  },
  {
    id: "step-3",
    stepNumber: 3,
    title: "도착지 건물 지하 직결 게이트",
    landmark: "목적지 빌딩 B1F 로비 자동문",
    description: "건물 지하 입구를 통해 비를 맞지 않고 입장 완료!",
    tip: "엘리베이터를 타고 원하는 층으로 바로 올라갈 수 있습니다.",
    photoPreview: null,
    indoor: true,
    elevator: true,
  },
];

export default function CityPortalPage({
  params,
}: {
  params: Promise<{ cityId: string }>;
}) {
  const resolvedParams = use(params);
  const cityId: "tokyo" | "osaka" | "fukuoka" | "sapporo" = (
    ["tokyo", "osaka", "fukuoka", "sapporo"].includes(resolvedParams.cityId)
      ? resolvedParams.cityId
      : "tokyo"
  ) as "tokyo" | "osaka" | "fukuoka" | "sapporo";
  const cityMeta: CityMeta = CITIES_DATA[cityId] || CITIES_DATA.tokyo;

  const { user, profile } = useAuth();

  // City-specific routes state
  const [routes, setRoutes] = useState<RouteData[]>(INITIAL_ROUTES);
  const [selectedRouteId, setSelectedRouteId] = useState<string>("");
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(
    null
  );

  // Route Upload Modal
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newOrigin, setNewOrigin] = useState("");
  const [newDest, setNewDest] = useState("");
  const [editableSteps, setEditableSteps] = useState<EditableStep[]>(
    DEFAULT_EDITABLE_STEPS
  );
  const [uploadSuccess, setUploadSuccess] = useState(false);

  // Load custom routes from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("chikamichi_custom_routes");
      if (saved) {
        const parsed: RouteData[] = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setRoutes((prev) => {
            const existingIds = new Set(prev.map((r) => r.id));
            const newItems = parsed.filter((item) => !existingIds.has(item.id));
            if (newItems.length > 0) {
              return [...newItems, ...prev];
            }
            return prev;
          });
        }
      }
    } catch (e) {
      console.warn("Could not load custom routes from storage:", e);
    }
  }, []);

  // Filter routes strictly for this city
  const cityRoutes = routes.filter((r) => r.city === cityId);

  // Initialize selected route when city routes load
  useEffect(() => {
    if (cityRoutes.length > 0) {
      const exists = cityRoutes.some((r) => r.id === selectedRouteId);
      if (!exists) {
        setSelectedRouteId(cityRoutes[0].id);
      }
    }
  }, [cityRoutes, selectedRouteId]);

  const currentRoute =
    cityRoutes.find((r) => r.id === selectedRouteId) || cityRoutes[0];

  // Upvote / Like
  const handleLikeRoute = (routeId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setRoutes((prev) => {
      const updated = prev.map((r) =>
        r.id === routeId ? { ...r, likes: r.likes + 1 } : r
      );
      return updated.sort((a, b) => b.likes - a.likes).map((item, idx) => ({
        ...item,
        rank: idx + 1,
      }));
    });
  };

  // Step Management in Modal
  const handleAddStep = () => {
    const nextNum = editableSteps.length + 1;
    const newStep: EditableStep = {
      id: `step-${Date.now()}`,
      stepNumber: nextNum,
      title: `경유지 ${nextNum - 1} / 통로 연결 구간`,
      landmark: "지하 표지판 또는 기둥",
      description: "안내 표지판을 따라 직진하세요.",
      tip: "바닥 유도선을 확인하면 더 찾기 쉽습니다.",
      photoPreview: null,
      indoor: true,
      elevator: true,
    };
    setEditableSteps([...editableSteps, newStep]);
  };

  const handleRemoveStep = (idToRemove: string) => {
    if (editableSteps.length <= 1) return;
    const updated = editableSteps
      .filter((s) => s.id !== idToRemove)
      .map((s, idx) => ({ ...s, stepNumber: idx + 1 }));
    setEditableSteps(updated);
  };

  const handleStepChange = (
    id: string,
    field: keyof EditableStep,
    value: any
  ) => {
    setEditableSteps((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [field]: value } : s))
    );
  };

  const handleStepPhotoUpload = (
    id: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleStepChange(id, "photoPreview", reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Create city-specific route
  const handleCreateRoute = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newOrigin || !newDest) return;

    const authorName =
      profile?.name || user?.email?.split("@")[0] || "지하길탐험가";

    const samplePhotos = [
      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1538332576228-eb5b4c4de6f5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=800&q=80",
    ];

    const builtSteps: VisualStep[] = editableSteps.map((s, idx) => ({
      stepNumber: idx + 1,
      title: s.title || `STEP ${idx + 1}`,
      landmark: s.landmark || "안내 표지판",
      description: s.description || "해당 통로를 따라 이동하세요.",
      photoUrl: s.photoPreview || samplePhotos[idx % samplePhotos.length],
      photoAlt: s.title,
      tip: s.tip || "쾌적한 지하 통로입니다.",
      indoor: s.indoor,
      elevator: s.elevator,
    }));

    const newRouteItem: RouteData = {
      id: `custom-${Date.now()}`,
      rank: routes.length + 1,
      city: cityId,
      cityName: `${cityMeta.name} · 직결`,
      title: newTitle,
      origin: newOrigin,
      destination: newDest,
      duration: "5분",
      distance: "400m",
      rainShieldPercent: 100,
      tempBenefit: "체감 -7°C (냉방)",
      likes: 1,
      views: 8,
      author: {
        name: authorName,
        badge: `✨ ${cityMeta.name} 신규 길잡이`,
        avatarBg: "bg-amber-400",
      },
      tags: [
        `📸 사진 ${builtSteps.length}장 포함`,
        "🌧️ 100% 지하 연결",
        "🆕 내가 방금 등록함",
      ],
      coverPhoto: builtSteps[0].photoUrl,
      steps: builtSteps,
      highlightTip:
        "출발지부터 도착지까지 사진 순서대로 따라오시면 비를 전혀 맞지 않고 도착할 수 있습니다!",
    };

    const updated = [newRouteItem, ...routes];
    setRoutes(updated);
    setSelectedRouteId(newRouteItem.id);

    try {
      const existing = JSON.parse(
        localStorage.getItem("chikamichi_custom_routes") || "[]"
      );
      localStorage.setItem(
        "chikamichi_custom_routes",
        JSON.stringify([newRouteItem, ...existing])
      );
    } catch (err) {
      console.warn("Could not save to localStorage:", err);
    }

    setUploadSuccess(true);

    setTimeout(() => {
      setUploadSuccess(false);
      setIsUploadModalOpen(false);
      setNewTitle("");
      setNewOrigin("");
      setNewDest("");
      setEditableSteps(DEFAULT_EDITABLE_STEPS);

      const el = document.getElementById("visual-guide");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 1200);
  };

  // Keyboard Lightbox navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeLightboxIndex === null) return;
      if (e.key === "ArrowLeft") {
        setActiveLightboxIndex((prev) =>
          prev !== null && prev > 0 ? prev - 1 : prev
        );
      } else if (e.key === "ArrowRight") {
        setActiveLightboxIndex((prev) =>
          prev !== null && currentRoute && prev < currentRoute.steps.length - 1
            ? prev + 1
            : prev
        );
      } else if (e.key === "Escape") {
        setActiveLightboxIndex(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeLightboxIndex, currentRoute]);

  return (
    <div className="relative min-h-screen bg-[#FAF9F6] text-zinc-900 cute-dots font-sans overflow-x-hidden selection:bg-amber-300 selection:text-zinc-950">
      {/* 1. Header & Navigation */}
      <Header onOpenUploadModal={() => setIsUploadModalOpen(true)} />

      {/* 2. Top Navigation Hub (Return to Home & 4 Cities Switcher) */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b-2 border-zinc-200">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-700 hover:text-zinc-950 bg-white border-2 border-zinc-900 px-3 py-1.5 rounded-xl shadow-[2px_2px_0px_#18181b] transition hover:bg-zinc-50"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>메인 게이트 (4대 도시 전체 보기)</span>
          </Link>

          {/* 4 Cities Quick Pills */}
          <div className="flex items-center gap-1.5 p-1 bg-white border-2 border-zinc-900 rounded-2xl shadow-[2px_2px_0px_#18181b] overflow-x-auto">
            {Object.values(CITIES_DATA).map((c) => (
              <Link
                key={c.id}
                href={`/city/${c.id}`}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap flex items-center gap-1 ${
                  cityId === c.id
                    ? "bg-zinc-900 text-amber-300 shadow-sm"
                    : "text-zinc-700 hover:text-zinc-950"
                }`}
              >
                <span>{c.icon}</span>
                <span>{c.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Dedicated City Hero Banner */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 pb-6">
        <div className="cute-card bg-white p-6 sm:p-8 relative overflow-hidden">
          {/* Header row */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="text-3xl">{cityMeta.icon}</span>
                <span className="bg-amber-300 border-2 border-zinc-900 text-zinc-950 text-xs font-bold px-2.5 py-0.5 rounded-full font-mono shadow-[1.5px_1.5px_0px_#18181b]">
                  {cityMeta.badge} 전용관
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-950 font-jua">
                {cityMeta.name} 지하 지름길 & 랭킹 허브
              </h1>

              <p className="text-xs sm:text-sm text-zinc-700 font-medium leading-relaxed">
                {cityMeta.description}
              </p>
            </div>

            {/* City Action CTA */}
            <div className="flex flex-col gap-2 w-full md:w-auto shrink-0">
              <button
                onClick={() => setIsUploadModalOpen(true)}
                className="cute-btn-primary py-3 px-5 text-sm font-bold flex items-center justify-center gap-2 shadow-[3px_3px_0px_#18181b]"
              >
                <Plus className="w-4 h-4" />
                <span>{cityMeta.name} 꿀루트 직접 등록하기</span>
              </button>

              <a
                href="#visual-guide"
                className="cute-btn-secondary py-2.5 px-4 text-xs font-bold flex items-center justify-center gap-1.5 bg-[#FAF9F6] text-zinc-800"
              >
                <Camera className="w-3.5 h-3.5 text-cyan-600" />
                <span>연속 사진 스텝 가이드 보기</span>
              </a>
            </div>
          </div>

          {/* City Weather & Status Cards Grid */}
          <div className="mt-6 pt-5 border-t-2 border-zinc-100 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-2xl bg-cyan-50 border-2 border-zinc-900 flex items-center gap-3">
              <span className="text-2xl">{cityMeta.weather.icon}</span>
              <div>
                <strong className="text-cyan-950 block font-bold">
                  {cityMeta.name} 날씨: {cityMeta.weather.temp}
                </strong>
                <span className="text-cyan-900 text-[11px] font-medium">
                  {cityMeta.weather.alert}
                </span>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-amber-50 border-2 border-zinc-900 flex items-center gap-3">
              <span className="text-2xl">❄️</span>
              <div>
                <strong className="text-amber-950 block font-bold">
                  지하 쾌적 지수
                </strong>
                <span className="text-amber-900 text-[11px] font-medium">
                  {cityMeta.undergroundBenefit}
                </span>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-emerald-50 border-2 border-zinc-900 flex items-center gap-3">
              <span className="text-2xl">🚶</span>
              <div>
                <strong className="text-emerald-950 block font-bold">
                  등록된 꿀루트
                </strong>
                <span className="text-emerald-900 text-[11px] font-medium">
                  현재 {cityRoutes.length}개 루트 등록 & 랭킹 진행 중
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. City-Exclusive Leaderboard Section */}
      <LeaderboardSection
        filteredRoutes={cityRoutes}
        selectedRouteId={selectedRouteId}
        selectedCityFilter={cityId}
        onSelectCityFilter={() => {}}
        onSelectRoute={(id) => {
          setSelectedRouteId(id);
          const el = document.getElementById("visual-guide");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }}
        onLikeRoute={handleLikeRoute}
      />

      {/* 5. City-Exclusive Visual Step-by-Step Guide */}
      {currentRoute && (
        <VisualGuideSection
          currentRoute={currentRoute}
          availableCityRoutes={cityRoutes}
          selectedRouteId={selectedRouteId}
          onSelectRoute={(id) => setSelectedRouteId(id)}
          onLikeRoute={handleLikeRoute}
          onOpenLightbox={(idx) => setActiveLightboxIndex(idx)}
        />
      )}

      {/* 6. Footer */}
      <Footer />

      {/* 7. Lightbox Modal */}
      {currentRoute && (
        <LightboxModal
          activeIndex={activeLightboxIndex}
          currentRoute={currentRoute}
          onClose={() => setActiveLightboxIndex(null)}
          onSelectIndex={(idx) => setActiveLightboxIndex(idx)}
        />
      )}

      {/* 8. City-Scoped Route Creation Modal */}
      <RouteCreateModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        newTitle={newTitle}
        setNewTitle={setNewTitle}
        newOrigin={newOrigin}
        setNewOrigin={setNewOrigin}
        newDest={newDest}
        setNewDest={setNewDest}
        newCity={cityId}
        setNewCity={() => {}}
        editableSteps={editableSteps}
        onAddStep={handleAddStep}
        onRemoveStep={handleRemoveStep}
        onStepChange={handleStepChange}
        onStepPhotoUpload={handleStepPhotoUpload}
        onSubmit={handleCreateRoute}
        uploadSuccess={uploadSuccess}
      />
    </div>
  );
}
