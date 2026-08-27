"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import {
  Footprints,
  Camera,
  ImagePlus,
  Plus,
  Trash2,
  UploadCloud,
  FileText,
  MapPin,
  Clock,
  Navigation,
  ArrowRight,
  Home,
  CheckCircle2,
  Sparkles,
  Info,
  ChevronLeft,
  User,
  LogOut,
  ShieldCheck,
  Building2,
  Compass,
} from "lucide-react";

interface StepItem {
  id: string;
  stepNumber: number;
  title: string;
  landmark: string;
  description: string;
  tip: string;
  photoPreview: string | null;
  indoor: boolean;
  elevator: boolean;
}

const DEFAULT_STEPS: StepItem[] = [
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

export default function GenerateRoutePage() {
  const router = useRouter();
  const { user, profile, signOut, isLoading } = useAuth();

  const [title, setTitle] = useState("");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [city, setCity] = useState("tokyo");
  const [duration, setDuration] = useState("7분");
  const [distance, setDistance] = useState("500m");
  const [highlightTip, setHighlightTip] = useState("");
  const [steps, setSteps] = useState<StepItem[]>(DEFAULT_STEPS);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Add new step
  const handleAddStep = () => {
    const nextNum = steps.length + 1;
    const newStep: StepItem = {
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
    setSteps([...steps, newStep]);
  };

  // Remove step
  const handleRemoveStep = (id: string) => {
    if (steps.length <= 1) return;
    const updated = steps
      .filter((s) => s.id !== id)
      .map((s, idx) => ({ ...s, stepNumber: idx + 1 }));
    setSteps(updated);
  };

  // Update step field
  const handleStepChange = (id: string, field: keyof StepItem, value: any) => {
    setSteps((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [field]: value } : s))
    );
  };

  // Handle Photo upload for step
  const handleStepPhoto = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleStepChange(id, "photoPreview", reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Submit route
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !origin || !destination) return;

    setIsSubmitting(true);

    const authorName =
      profile?.name || user?.email?.split("@")[0] || "지하길탐험가";

    // Save to localStorage for demo persistence across pages
    try {
      const newRouteItem = {
        id: `custom-${Date.now()}`,
        rank: 99,
        city,
        cityName:
          city === "tokyo"
            ? "도쿄"
            : city === "osaka"
            ? "오사카"
            : city === "sapporo"
            ? "삿포로"
            : city === "fukuoka"
            ? "후쿠오카"
            : "나고야",
        title,
        origin,
        destination,
        duration,
        distance,
        rainShieldPercent: 100,
        tempBenefit: "체감 -7°C (냉방)",
        likes: 1,
        views: 12,
        author: {
          name: authorName,
          badge: "✨ 신규 길잡이",
          avatarBg: "bg-amber-400",
        },
        tags: [
          `📸 사진 ${steps.length}장 포함`,
          "🌧️ 100% 지하 연결",
          "🆕 내가 방금 등록함",
        ],
        coverPhoto:
          steps[0].photoPreview ||
          "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1000&q=80",
        steps: steps.map((s, idx) => ({
          stepNumber: idx + 1,
          title: s.title || `STEP ${idx + 1}`,
          landmark: s.landmark || "안내 표지판",
          description: s.description || "해당 통로를 따라 이동하세요.",
          photoUrl:
            s.photoPreview ||
            "https://images.unsplash.com/photo-1538332576228-eb5b4c4de6f5?auto=format&fit=crop&w=800&q=80",
          photoAlt: s.title,
          tip: s.tip || "쾌적한 지하 통로입니다.",
          indoor: s.indoor,
          elevator: s.elevator,
        })),
        highlightTip:
          highlightTip ||
          "출발지부터 도착지까지 사진 순서대로 따라오시면 비를 전혀 맞지 않고 도착할 수 있습니다!",
      };

      const existing = JSON.parse(
        localStorage.getItem("chikamichi_custom_routes") || "[]"
      );
      localStorage.setItem(
        "chikamichi_custom_routes",
        JSON.stringify([newRouteItem, ...existing])
      );
    } catch (storageErr) {
      console.warn("Storage warning:", storageErr);
    }

    setSuccess(true);
    setIsSubmitting(false);

    setTimeout(() => {
      router.push("/#visual-guide");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-zinc-900 cute-dots font-sans pb-16">
      {/* 1. Header with Home Navigation & User Info */}
      <header className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between border-b-2 border-zinc-900 bg-[#FAF9F6]/90 backdrop-blur-xs sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-2xl bg-amber-400 border-2 border-zinc-900 flex items-center justify-center shadow-[2px_2px_0px_#18181b] group-hover:rotate-6 transition">
              <Footprints className="w-5 h-5 text-zinc-950" />
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight font-jua text-zinc-950">
                치카미치 스튜디오
              </span>
              <span className="ml-1.5 bg-zinc-900 text-amber-300 text-[10px] font-bold px-1.5 py-0.5 rounded font-mono">
                GENERATE
              </span>
            </div>
          </Link>
        </div>

        {/* Action Buttons: Return to Home OR Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Prominent Button to go to Home for users who just want to browse */}
          <Link
            href="/"
            className="cute-btn-secondary px-3.5 py-2 text-xs sm:text-sm font-bold flex items-center gap-1.5 bg-white hover:bg-zinc-100 shadow-[2px_2px_0px_#18181b]"
          >
            <Home className="w-4 h-4 text-zinc-700" />
            <span>홈으로 이동 (루트 둘러보기)</span>
          </Link>

          {/* User Profile Badge */}
          {user && (
            <div className="flex items-center gap-2 bg-white border-2 border-zinc-900 rounded-2xl px-3 py-1.5 shadow-[2px_2px_0px_#18181b]">
              <div className="w-6 h-6 rounded-full bg-amber-300 border border-zinc-900 text-zinc-950 font-bold text-xs flex items-center justify-center">
                {(profile?.name || user.email || "U")[0].toUpperCase()}
              </div>
              <span className="text-xs font-bold text-zinc-900 hidden sm:inline max-w-[100px] truncate">
                {profile?.name || user.email?.split("@")[0]}
              </span>
              <button
                onClick={() => signOut()}
                title="로그아웃"
                className="text-zinc-400 hover:text-red-500 p-0.5 transition"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </header>

      {/* 2. Top Banner for Logged-In Users */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 pb-4">
        {/* Welcome Card with Option to Create or Go to Home */}
        <div className="cute-card bg-amber-300 p-5 sm:p-6 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-zinc-950 text-amber-300 flex items-center justify-center shrink-0 font-bold text-xl border-2 border-zinc-950 shadow-[2px_2px_0px_#18181b]">
              ✨
            </div>
            <div>
              <h2 className="font-jua text-xl sm:text-2xl text-zinc-950">
                환영합니다, {profile?.name || user?.email?.split("@")[0] || "길잡이"}님! 🐾
              </h2>
              <p className="text-xs sm:text-sm text-zinc-900 font-medium mt-0.5">
                내가 알고 있는 지하 지름길을 사진과 함께 등록하고 <strong>주간 랭커 배지</strong>에 도전해보세요!
              </p>
            </div>
          </div>

          <Link
            href="/"
            className="cute-btn-secondary shrink-0 px-4 py-2.5 text-xs sm:text-sm font-bold bg-white hover:bg-zinc-100 flex items-center gap-1.5"
          >
            <Home className="w-4 h-4 text-zinc-800" />
            <span>홈에서 다른 루트 보기</span>
          </Link>
        </div>

        {/* Route Creation Form */}
        <div className="cute-card bg-white p-6 sm:p-8">
          <div className="border-b-2 border-zinc-900 pb-4 mb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-100 border-2 border-zinc-900 text-xs font-bold text-zinc-900 mb-2">
              <Camera className="w-3.5 h-3.5 text-cyan-700" />
              Multi-Photo Route Generator
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 font-jua">
              나만의 지하 꿀루트 & 연속 사진 등록
            </h1>
            <p className="text-xs sm:text-sm text-zinc-600 mt-1">
              출발 개찰구부터 도착 빌딩까지 각 단계별 현장 사진과 꿀팁을 작성해 주세요.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Section 1: Basic Route Info */}
            <div className="p-5 rounded-2xl bg-[#FAF9F6] border-2 border-zinc-900 space-y-4">
              <div className="font-jua text-lg text-zinc-950 flex items-center gap-2">
                <FileText className="w-5 h-5 text-amber-600" />
                1. 기본 루트 정보
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-900 mb-1">
                  루트 제목 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="예: 신주쿠 서쪽 ➡️ 도쿄도청 무빙워크 직통 쾌속로"
                  className="w-full bg-white border-2 border-zinc-900 rounded-xl px-3.5 py-2.5 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-amber-400 font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-zinc-900 mb-1">
                    지역 선택
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-white border-2 border-zinc-900 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-zinc-900 font-medium focus:outline-none focus:ring-2 focus:ring-amber-400"
                  >
                    <option value="tokyo">🗼 도쿄 (신주쿠 / 도쿄역 / 시부야)</option>
                    <option value="osaka">🏯 오사카 (우메다 / 난바)</option>
                    <option value="sapporo">❄️ 삿포로 (치카호 지하보도)</option>
                    <option value="fukuoka">🍜 후쿠오카 (텐진 지하상가)</option>
                    <option value="nagoya">🏯 나고야 (메이에키 지하가)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-900 mb-1">
                    출발지 (역/개찰구) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                    placeholder="예: JR 신주쿠역 서쪽 B1F 개찰구"
                    className="w-full bg-white border-2 border-zinc-900 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-amber-400 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-900 mb-1">
                    도착지 (건물/출구) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="예: 도쿄도청 제1본청사 지하 로비"
                    className="w-full bg-white border-2 border-zinc-900 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-amber-400 font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-xs font-bold text-zinc-900 mb-1">
                    예상 소요시간
                  </label>
                  <input
                    type="text"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="예: 7분"
                    className="w-full bg-white border-2 border-zinc-900 rounded-xl px-3 py-2 text-xs sm:text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-900 mb-1">
                    이동 거리
                  </label>
                  <input
                    type="text"
                    value={distance}
                    onChange={(e) => setDistance(e.target.value)}
                    placeholder="예: 520m"
                    className="w-full bg-white border-2 border-zinc-900 rounded-xl px-3 py-2 text-xs sm:text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Sequential Step-by-Step Photos & Descriptions */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-jua text-lg text-zinc-950 flex items-center gap-2">
                    <Camera className="w-5 h-5 text-cyan-600" />
                    2. 출발 ➡️ 도착 단계별 사진 & 설명 ({steps.length}단계)
                  </div>
                  <p className="text-xs text-zinc-500">
                    스마트폰으로 찍은 사진을 각 단계에 첨부하고 길안내 설명을 적어주세요.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleAddStep}
                  className="cute-btn-primary px-3.5 py-1.5 text-xs flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ 단계 추가</span>
                </button>
              </div>

              {/* Step Cards List */}
              <div className="space-y-4">
                {steps.map((step, idx) => (
                  <div
                    key={step.id}
                    className="p-5 rounded-2xl bg-white border-2 border-zinc-900 shadow-[3px_3px_0px_#18181b] space-y-3 relative"
                  >
                    <div className="flex items-center justify-between">
                      <span className="bg-zinc-900 text-amber-300 text-xs font-bold px-3 py-1 rounded-full font-mono">
                        {idx === 0
                          ? "🚩 출발지 (STEP 1)"
                          : idx === steps.length - 1
                          ? `🎯 도착지 (STEP ${idx + 1})`
                          : `🚶 경유지/분기점 (STEP ${idx + 1})`}
                      </span>

                      {steps.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveStep(step.id)}
                          className="text-zinc-400 hover:text-red-500 p-1 transition flex items-center gap-1 text-xs"
                          title="이 단계 삭제"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span>삭제</span>
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Photo Upload */}
                      <div>
                        <label className="block text-xs font-bold text-zinc-900 mb-1">
                          현장 사진 첨부
                        </label>
                        <div className="border-2 border-dashed border-zinc-400 hover:border-zinc-900 rounded-2xl p-3 text-center bg-[#FAF9F6] transition cursor-pointer relative h-44 flex items-center justify-center overflow-hidden">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleStepPhoto(step.id, e)}
                            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                          />
                          {step.photoPreview ? (
                            <div className="relative h-full w-full rounded-xl overflow-hidden border border-zinc-900">
                              <img
                                src={step.photoPreview}
                                alt="Step preview"
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 bg-black/20 hover:bg-transparent transition" />
                              <span className="absolute bottom-2 right-2 bg-zinc-900 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded shadow">
                                사진 변경하기
                              </span>
                            </div>
                          ) : (
                            <div className="p-2">
                              <ImagePlus className="w-8 h-8 text-amber-500 mx-auto mb-1.5" />
                              <p className="font-bold text-xs text-zinc-900">
                                사진 파일 첨부 (클릭)
                              </p>
                              <p className="text-[11px] text-zinc-500 mt-0.5">
                                스마트폰 갤러리 또는 촬영 사진
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Step Details */}
                      <div className="space-y-2.5">
                        <div>
                          <label className="block text-xs font-bold text-zinc-900 mb-1">
                            단계 제목 / 위치 명칭
                          </label>
                          <input
                            type="text"
                            value={step.title}
                            onChange={(e) =>
                              handleStepChange(step.id, "title", e.target.value)
                            }
                            placeholder="예: JR 신주쿠 서쪽 개찰구 나와서 정면"
                            className="w-full bg-[#FAF9F6] border-2 border-zinc-900 rounded-xl px-3 py-2 text-xs text-zinc-900 focus:outline-none focus:ring-2 focus:ring-amber-400 font-medium"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-zinc-900 mb-1">
                            시각적 랜드마크 / 눈에 띄는 표지판
                          </label>
                          <input
                            type="text"
                            value={step.landmark}
                            onChange={(e) =>
                              handleStepChange(step.id, "landmark", e.target.value)
                            }
                            placeholder="예: 노란색 도쿄도청 표지판 & 280m 무빙워크"
                            className="w-full bg-[#FAF9F6] border-2 border-zinc-900 rounded-xl px-3 py-2 text-xs text-zinc-900 focus:outline-none focus:ring-2 focus:ring-amber-400"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-zinc-900 mb-1">
                            통과 방법 & 길잡이 꿀팁 설명
                          </label>
                          <textarea
                            rows={3}
                            value={step.description}
                            onChange={(e) =>
                              handleStepChange(
                                step.id,
                                "description",
                                e.target.value
                              )
                            }
                            placeholder="예: 지상으로 나가지 말고 오다큐 에이스 지하상가 입구로 직진하세요. 비를 100% 피할 수 있습니다!"
                            className="w-full bg-[#FAF9F6] border-2 border-zinc-900 rounded-xl px-3 py-2 text-xs text-zinc-900 focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none font-medium"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={handleAddStep}
                className="w-full py-3 border-2 border-dashed border-zinc-900 rounded-2xl bg-amber-50 hover:bg-amber-100 text-zinc-950 font-bold flex items-center justify-center gap-2 transition"
              >
                <Plus className="w-4 h-4" />
                <span>+ 사진 & 다음 경유지 단계 추가하기</span>
              </button>
            </div>

            {/* Section 3: Highlight Tip */}
            <div>
              <label className="block text-xs font-bold text-zinc-900 mb-1">
                전체 코스 핵심 요약 & 꿀팁
              </label>
              <textarea
                rows={2}
                value={highlightTip}
                onChange={(e) => setHighlightTip(e.target.value)}
                placeholder="예: 비나 눈 올 때 지상 신호등 3개를 모두 건너뛰고 땀 한 방울 안 흘리며 도착하는 최강 꿀루트입니다!"
                className="w-full bg-[#FAF9F6] border-2 border-zinc-900 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none font-medium"
              />
            </div>

            {/* Submit & Home Buttons */}
            <div className="pt-4 border-t-2 border-zinc-200 flex flex-col sm:flex-row items-center gap-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:flex-1 cute-btn-primary py-4 text-sm font-bold flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <UploadCloud className="w-5 h-5" />
                <span>
                  {isSubmitting ? "루트 등록 중..." : "다중 사진 꿀루트 등록하기 🚀"}
                </span>
              </button>

              <Link
                href="/"
                className="w-full sm:w-auto cute-btn-secondary py-4 px-6 text-sm font-bold flex items-center justify-center gap-2 bg-white hover:bg-zinc-100"
              >
                <Home className="w-4 h-4 text-zinc-700" />
                <span>등록 안 하고 홈으로 가기</span>
              </Link>
            </div>

            {success && (
              <div className="p-4 rounded-2xl bg-emerald-100 border-2 border-zinc-900 text-emerald-950 font-bold text-xs sm:text-sm flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>
                  축하합니다! 꿀루트가 등록되었습니다. 메인 사진 가이드로 이동합니다...
                </span>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
