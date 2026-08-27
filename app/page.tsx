"use client";

import { useState } from "react";
import { Header } from "@/components/landing/header";
import { UserDashboardBanner } from "@/components/landing/user-dashboard-banner";
import { HeroSection } from "@/components/landing/hero-section";
import { CityGatewaySection } from "@/components/landing/city-gateway-section";
import { WhySection } from "@/components/landing/why-section";
import { FaqSection } from "@/components/landing/faq-section";
import { CtaSection } from "@/components/landing/cta-section";
import { Footer } from "@/components/landing/footer";
import { RouteCreateModal } from "@/components/landing/route-create-modal";
import { INITIAL_ROUTES, RouteData, EditableStep } from "@/lib/routes-data";

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

export default function Home() {
  // Modal state for quick route upload from header
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newOrigin, setNewOrigin] = useState("");
  const [newDest, setNewDest] = useState("");
  const [newCity, setNewCity] = useState("tokyo");
  const [editableSteps, setEditableSteps] = useState<EditableStep[]>(
    DEFAULT_EDITABLE_STEPS
  );
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleAddStep = () => {
    const nextNum = editableSteps.length + 1;
    setEditableSteps([
      ...editableSteps,
      {
        id: `step-${Date.now()}`,
        stepNumber: nextNum,
        title: `경유지 ${nextNum - 1} / 통로 연결 구간`,
        landmark: "지하 표지판 또는 기둥",
        description: "안내 표지판을 따라 직진하세요.",
        tip: "바닥 유도선을 확인하면 더 찾기 쉽습니다.",
        photoPreview: null,
        indoor: true,
        elevator: true,
      },
    ]);
  };

  const handleRemoveStep = (id: string) => {
    if (editableSteps.length <= 1) return;
    setEditableSteps(
      editableSteps
        .filter((s) => s.id !== id)
        .map((s, idx) => ({ ...s, stepNumber: idx + 1 }))
    );
  };

  const handleStepChange = (id: string, field: keyof EditableStep, val: any) => {
    setEditableSteps((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [field]: val } : s))
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

  const handleCreateRoute = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newOrigin || !newDest) return;

    const newRouteItem: RouteData = {
      id: `custom-${Date.now()}`,
      rank: 99,
      city: newCity as any,
      cityName:
        newCity === "tokyo"
          ? "도쿄"
          : newCity === "osaka"
          ? "오사카"
          : newCity === "fukuoka"
          ? "후쿠오카"
          : "삿포로",
      title: newTitle,
      origin: newOrigin,
      destination: newDest,
      duration: "5분",
      distance: "400m",
      rainShieldPercent: 100,
      tempBenefit: "체감 -7°C (냉방)",
      likes: 1,
      views: 10,
      author: {
        name: "신규 길잡이",
        badge: "✨ 크리에이터",
        avatarBg: "bg-amber-400",
      },
      tags: [
        `📸 사진 ${editableSteps.length}장 포함`,
        "🌧️ 100% 지하 연결",
        "🆕 방금 등록",
      ],
      coverPhoto:
        editableSteps[0].photoPreview ||
        "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1000&q=80",
      steps: editableSteps.map((s, idx) => ({
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
        "출발지부터 도착지까지 사진 순서대로 따라오시면 비를 전혀 맞지 않고 도착할 수 있습니다!",
    };

    try {
      const existing = JSON.parse(
        localStorage.getItem("chikamichi_custom_routes") || "[]"
      );
      localStorage.setItem(
        "chikamichi_custom_routes",
        JSON.stringify([newRouteItem, ...existing])
      );
    } catch (err) {
      console.warn("Storage warning:", err);
    }

    setUploadSuccess(true);
    setTimeout(() => {
      setUploadSuccess(false);
      setIsUploadModalOpen(false);
      window.location.href = `/city/${newCity}`;
    }, 1200);
  };

  return (
    <div className="relative min-h-screen bg-[#FAF9F6] text-zinc-900 cute-dots font-sans overflow-x-hidden selection:bg-amber-300 selection:text-zinc-950">
      {/* 1. Header & Navigation */}
      <Header onOpenUploadModal={() => setIsUploadModalOpen(true)} />

      {/* 2. Logged-in User Dashboard Banner */}
      <UserDashboardBanner />

      {/* 3. Hero Section (Parallax Floating Showcase with Service Introduction) */}
      <HeroSection />

      {/* 4. 4 Major Cities Gateway Selection Grid (도쿄, 오사카, 후쿠오카, 삿포로 선택관) */}
      <CityGatewaySection />

      {/* 5. Why Multi-Photo Visual Route Section */}
      <WhySection />

      {/* 6. FAQ Section */}
      <FaqSection />

      {/* 7. Mobile App Pre-registration CTA Section */}
      <CtaSection />

      {/* 8. Footer */}
      <Footer />

      {/* 9. Global Route Creation Modal */}
      <RouteCreateModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        newTitle={newTitle}
        setNewTitle={setNewTitle}
        newOrigin={newOrigin}
        setNewOrigin={setNewOrigin}
        newDest={newDest}
        setNewDest={setNewDest}
        newCity={newCity}
        setNewCity={setNewCity}
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
