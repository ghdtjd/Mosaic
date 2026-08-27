"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/auth-context";

// Landing Page Modular Section Components
import { Header } from "@/components/landing/header";
import { UserDashboardBanner } from "@/components/landing/user-dashboard-banner";
import { HeroSection } from "@/components/landing/hero-section";
import { LeaderboardSection } from "@/components/landing/leaderboard-section";
import { VisualGuideSection } from "@/components/landing/visual-guide-section";
import { LightboxModal } from "@/components/landing/lightbox-modal";
import { RouteCreateModal } from "@/components/landing/route-create-modal";
import { WhySection } from "@/components/landing/why-section";
import { FaqSection } from "@/components/landing/faq-section";
import { CtaSection } from "@/components/landing/cta-section";
import { Footer } from "@/components/landing/footer";

// Visual Step Data Structure
export interface VisualStep {
  stepNumber: number;
  title: string;
  landmark: string;
  description: string;
  photoUrl: string;
  photoAlt: string;
  tip: string;
  indoor: boolean;
  elevator: boolean;
}

// Route Data with Multiple Photos, Video & Leaderboard Likes
export interface RouteData {
  id: string;
  rank: number;
  city: string;
  cityName: string;
  title: string;
  origin: string;
  destination: string;
  duration: string;
  distance: string;
  rainShieldPercent: number;
  tempBenefit: string;
  likes: number;
  views: number;
  author: {
    name: string;
    badge: string;
    avatarBg: string;
  };
  tags: string[];
  coverPhoto: string;
  videoPreviewUrl?: string;
  steps: VisualStep[];
  highlightTip: string;
}

// Editable Step structure for Multi-Photo upload form
export interface EditableStep {
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

const INITIAL_ROUTES: RouteData[] = [
  {
    id: "shinjuku-tochomae",
    rank: 1,
    city: "tokyo",
    cityName: "도쿄 · 신주쿠",
    title: "신주쿠역 서쪽 ➡️ 도쿄도청 100% 무빙워크 지하쾌속길",
    origin: "JR 신주쿠역 서쪽 지하 개찰구 (B1F)",
    destination: "도쿄도청 제1본청사 (B1F 직결)",
    duration: "8분",
    distance: "680m",
    rainShieldPercent: 100,
    tempBenefit: "체감 -7°C (냉방 풀가동)",
    likes: 1428,
    views: 8920,
    author: {
      name: "신주쿠마스터",
      badge: "👑 1위 골드 길잡이",
      avatarBg: "bg-amber-400",
    },
    tags: ["🌧️ 우천 100% 회피", "❄️ 에어컨 완비", "🛗 무빙워크 직통"],
    coverPhoto:
      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1000&q=80",
    videoPreviewUrl:
      "https://assets.mixkit.co/videos/preview/mixkit-modern-subway-station-with-bright-lights-41278-large.mp4",
    steps: [
      {
        stepNumber: 1,
        title: "출발: JR 신주쿠역 서쪽 지하 개찰구",
        landmark: "노란색 '도쿄도청 방면' 천장 표지판",
        description:
          "서쪽 지하 개찰구를 나와 정면의 오다큐 에이스(Odakyu Ace) 지하상가 입구로 직진하세요.",
        photoUrl:
          "https://images.unsplash.com/photo-1538332576228-eb5b4c4de6f5?auto=format&fit=crop&w=800&q=80",
        photoAlt: "신주쿠역 서쪽 지하 개찰구 표지판",
        tip: "지상으로 나가지 마시고 B1F 표지판을 계속 따라가세요!",
        indoor: true,
        elevator: true,
      },
      {
        stepNumber: 2,
        title: "경유: 신주쿠 스카이웨이 무빙워크 진입",
        landmark: "초록색 바닥 유도선 & 280m 무빙워크 시작점",
        description:
          "에어컨이 빵빵하게 나오는 280m 길이의 지하 무빙워크에 탑승하여 비를 완전히 피해 이동합니다.",
        photoUrl:
          "https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=800&q=80",
        photoAlt: "신주쿠 지하 무빙워크 통로",
        tip: "비 오는 날 지상 횡단보도 3개를 모두 건너뛰는 핵심 구간입니다.",
        indoor: true,
        elevator: true,
      },
      {
        stepNumber: 3,
        title: "도착: 도쿄도청 제1본청사 B1F 게이트",
        landmark: "도청사 지하 로비 및 전망대 직통 E/V 게이트",
        description:
          "무빙워크 끝에서 바로 연결되는 도청사 지하 자동문으로 들어가면 비 한 방울 안 묻고 도착 완료!",
        photoUrl:
          "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=800&q=80",
        photoAlt: "도쿄도청사 지하 입구",
        tip: "무료 전망대 전용 엘리베이터도 지하 1층 로비에서 바로 탑승 가능합니다.",
        indoor: true,
        elevator: true,
      },
    ],
    highlightTip:
      "지상으로 가면 신호등 3개와 폭우를 맞지만, 지하 무빙워크를 타면 땀 한 방울 안 흘리고 도착합니다!",
  },
  {
    id: "umeda-diamor",
    rank: 2,
    city: "osaka",
    cityName: "오사카 · 우메다",
    title: "우메다 던전 탈출! 화이티 ➡️ 디아모르 쾌속 쿨루트",
    origin: "JR 오사카역 중앙 지하 개찰구",
    destination: "한큐 백화점 본점 & 디아모르 오사카",
    duration: "4분",
    distance: "320m",
    rainShieldPercent: 100,
    tempBenefit: "체감 -8°C (쇼핑몰 공조)",
    likes: 1182,
    views: 7450,
    author: {
      name: "오사카길잡이",
      badge: "🥈 2위 실버 길잡이",
      avatarBg: "bg-cyan-400",
    },
    tags: ["🌧️ 비 안 맞기", "🛍️ 백화점 직통", "❄️ 에어컨 빵빵"],
    coverPhoto:
      "https://images.unsplash.com/photo-1590559899731-a382839e5549?auto=format&fit=crop&w=1000&q=80",
    steps: [
      {
        stepNumber: 1,
        title: "출발: JR 오사카역 중앙 지하 B1F 출구",
        landmark: "사우스 게이트 빌딩 연결 통로",
        description:
          "계단 또는 엘리베이터를 이용해 B1F로 내려와 화이티 우메다(Whity Umeda) 방향으로 꺾습니다.",
        photoUrl:
          "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=800&q=80",
        photoAlt: "오사카역 지하 연결부",
        tip: "머리 위 'Whity Umeda' 핑크색 표지판을 주시하세요.",
        indoor: true,
        elevator: true,
      },
      {
        stepNumber: 2,
        title: "경유: 화이티 우메다 분수 광장 분기점",
        landmark: "중앙 원형 분수대 (Water Fantasy 랜드마크)",
        description:
          "분수 광장을 오른쪽에 두고 직진하면 디아모르 오사카(Diamor)의 원형 돔 천장이 나타납니다.",
        photoUrl:
          "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
        photoAlt: "화이티 우메다 광장",
        tip: "우메다 던전의 가장 유명한 나침반 분수대입니다. 여기서 길 잃지 마세요!",
        indoor: true,
        elevator: true,
      },
      {
        stepNumber: 3,
        title: "도착: 디아모르 오사카 & 한큐 백화점 식품관",
        landmark: "유리 돔 채광창 & 백화점 B1F 입구",
        description:
          "유럽풍 대리석 바닥을 따라 백화점 식품관 지하 게이트로 바로 진입합니다.",
        photoUrl:
          "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=800&q=80",
        photoAlt: "한큐 백화점 지하 입구",
        tip: "여름철 에어컨이 가장 시원한 쇼핑 코스입니다.",
        indoor: true,
        elevator: true,
      },
    ],
    highlightTip:
      "분수 광장 랜드마크 사진만 기억하면 악명 높은 우메다 던전도 3분 만에 정복할 수 있습니다.",
  },
  {
    id: "tokyo-otemachi-flat",
    rank: 3,
    city: "tokyo",
    cityName: "도쿄 · 도쿄역",
    title: "도쿄역 마루노우치 ➡️ 오테마치 캐리어 무계단 평지길",
    origin: "도쿄역 마루노우치 지하 중앙구",
    destination: "오테마치 파이낸셜 오피스 타워",
    duration: "7분",
    distance: "550m",
    rainShieldPercent: 100,
    tempBenefit: "체감 -5°C",
    likes: 945,
    views: 5890,
    author: {
      name: "도쿄비즈니스맨",
      badge: "🥉 3위 브론즈 길잡이",
      avatarBg: "bg-emerald-400",
    },
    tags: ["🧳 캐리어 평지", "🏢 오피스 직결", "🌧️ 100% 실내"],
    coverPhoto:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1000&q=80",
    steps: [
      {
        stepNumber: 1,
        title: "출발: 마루노우치 지하 중앙 광장",
        landmark: "신마루비루(新丸ビル) 지하 연결 입구",
        description:
          "붉은 벽돌 도쿄역사 지하에서 신마루빌딩 지하 통로로 단차 없이 바로 이어집니다.",
        photoUrl:
          "https://images.unsplash.com/photo-1508807526345-15e9b5f4eaff?auto=format&fit=crop&w=800&q=80",
        photoAlt: "도쿄역 마루노우치 지하",
        tip: "계단이 하나도 없는 완벽한 평지 구간입니다.",
        indoor: true,
        elevator: true,
      },
      {
        stepNumber: 2,
        title: "도착: 오테마치 지하 연결 와이드 보도",
        landmark: "치요다선 환승 복도 & 오테모리 숲 광장",
        description:
          "폭 15m의 넓은 지하 회랑을 따라 오테마치 오피스 타운으로 쾌적하게 이동합니다.",
        photoUrl:
          "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
        photoAlt: "오테마치 오피스 지하 통로",
        tip: "출퇴근 시간에도 보행자 전용선이 넓어 캐리어 끌기 아주 편합니다.",
        indoor: true,
        elevator: true,
      },
    ],
    highlightTip:
      "대형 캐리어나 유모차를 끌고 갈 때 지상 턱이나 계단에 걸리지 않는 최적의 휠체어/캐리어 프리 패스입니다.",
  },
  {
    id: "sapporo-chikaho-walk",
    rank: 4,
    city: "sapporo",
    cityName: "삿포로 · 치카호",
    title: "삿포로역 ➡️ 스스키노 1.9km 폭설·빙판 제로 논스톱 회랑",
    origin: "JR 삿포로역 지하 개찰구",
    destination: "스스키노역 & 다누키코지 아케이드",
    duration: "14분",
    distance: "1,900m",
    rainShieldPercent: 100,
    tempBenefit: "겨울 실내 20°C / 여름 22°C",
    likes: 812,
    views: 4320,
    author: {
      name: "북해도눈사람",
      badge: "⭐ 삿포로 마스터",
      avatarBg: "bg-sky-400",
    },
    tags: ["❄️ 폭설/빙판 제로", "🚶 1.9km 논스톱", "🎪 지하 이벤트홀"],
    coverPhoto:
      "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=1000&q=80",
    steps: [
      {
        stepNumber: 1,
        title: "출발: 치카호 북쪽 1번 게이트",
        landmark: "삿포로 에키마에 도리 지하보행공간 시작점",
        description:
          "삿포로역 지하에서 오도리 방면으로 일직선으로 뻗은 20m 광폭 지하보도 진입.",
        photoUrl:
          "https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=800&q=80",
        photoAlt: "치카호 지하보도 입구",
        tip: "겨울철 두꺼운 패딩을 벗고 가볍게 걸을 수 있는 온도가 유지됩니다.",
        indoor: true,
        elevator: true,
      },
      {
        stepNumber: 2,
        title: "도착: 오도리역 비세(Bisse) 광장 통과",
        landmark: "오도리역 지하 허브 & 삿포로 TV타워 연결부",
        description:
          "중간 쉼터와 카페가 밀집한 오도리 광장을 지나 스스키노 폴타운으로 직진.",
        photoUrl:
          "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
        photoAlt: "오도리역 지하 광장",
        tip: "무료 Wi-Fi와 충전 벤치가 곳곳에 마련되어 있습니다.",
        indoor: true,
        elevator: true,
      },
    ],
    highlightTip:
      "영하 12도 강추위와 미끄러운 빙판길 대신, 따뜻한 지하보도에서 음악 들으며 스스키노까지 가세요!",
  },
  {
    id: "tenjin-shopping-route",
    rank: 5,
    city: "fukuoka",
    cityName: "후쿠오카 · 텐진",
    title: "텐진 지하상가 ➡️ 백화점 4곳 우산 없이 직결 쇼핑길",
    origin: "텐진역 지하철 개찰구",
    destination: "파ルコ · 다이마루 · 미츠코시 백화점",
    duration: "5분",
    distance: "400m",
    rainShieldPercent: 100,
    tempBenefit: "체감 -7°C",
    likes: 672,
    views: 3890,
    author: {
      name: "하카타라멘러",
      badge: "🍜 텐치카 전문가",
      avatarBg: "bg-rose-400",
    },
    tags: ["🌧️ 우천 100% 회피", "🏛️ 유럽풍 거리", "🛍️ 백화점 4곳"],
    coverPhoto:
      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1000&q=80",
    steps: [
      {
        stepNumber: 1,
        title: "출발: 텐진 지하상가 1번가 (Tenchika)",
        landmark: "남유럽풍 벽돌 거리 & 스테인드글라스 조명",
        description:
          "돌바닥과 클래식 조명이 인상적인 텐진 지하상가 메인 스트리트 진입.",
        photoUrl:
          "https://images.unsplash.com/photo-1538332576228-eb5b4c4de6f5?auto=format&fit=crop&w=800&q=80",
        photoAlt: "텐진 지하상가",
        tip: "바닥 표지판에 백화점별 출구가 친절하게 한글로도 적혀 있습니다.",
        indoor: true,
        elevator: true,
      },
    ],
    highlightTip:
      "비 오는 날 후쿠오카 쇼핑은 텐진 지하상가 하나면 백화점 4곳을 우산 없이 전부 둘러볼 수 있습니다.",
  },
];

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
  const { user, profile } = useAuth();

  // Active routes state
  const [routes, setRoutes] = useState<RouteData[]>(INITIAL_ROUTES);
  const [selectedRouteId, setSelectedRouteId] = useState<string>(
    "shinjuku-tochomae"
  );
  const [selectedCityFilter, setSelectedCityFilter] = useState<string>("all");

  // Lightbox modal index
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(
    null
  );

  // Quick Route Modal State
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newOrigin, setNewOrigin] = useState("");
  const [newDest, setNewDest] = useState("");
  const [newCity, setNewCity] = useState("tokyo");
  const [editableSteps, setEditableSteps] = useState<EditableStep[]>(
    DEFAULT_EDITABLE_STEPS
  );
  const [uploadSuccess, setUploadSuccess] = useState(false);

  // Load custom routes from localStorage created in /generate
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

  // Current active route object
  const currentRoute =
    routes.find((r) => r.id === selectedRouteId) || routes[0];

  // Filtered preset routes
  const filteredRoutes =
    selectedCityFilter === "all"
      ? routes
      : routes.filter((r) => r.city === selectedCityFilter);

  // Handle Likes / Upvote
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
      city: newCity,
      cityName:
        newCity === "tokyo"
          ? "도쿄"
          : newCity === "osaka"
          ? "오사카"
          : newCity === "sapporo"
          ? "삿포로"
          : newCity === "fukuoka"
          ? "후쿠오카"
          : "나고야",
      title: newTitle,
      origin: newOrigin,
      destination: newDest,
      duration: "6분",
      distance: "480m",
      rainShieldPercent: 100,
      tempBenefit: "체감 -7°C (냉방)",
      likes: 1,
      views: 10,
      author: {
        name: authorName,
        badge: "✨ 신규 길잡이",
        avatarBg: "bg-amber-400",
      },
      tags: [
        `📸 사진 ${builtSteps.length}장 포함`,
        "🌧️ 100% 지하 연결",
        "🆕 방금 등록",
      ],
      coverPhoto: builtSteps[0].photoUrl,
      steps: builtSteps,
      highlightTip:
        "출발지부터 도착지까지 사진 순서대로 따라오시면 비를 전혀 맞지 않고 도착할 수 있습니다!",
    };

    setRoutes([newRouteItem, ...routes]);
    setSelectedRouteId(newRouteItem.id);
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

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeLightboxIndex === null) return;
      if (e.key === "ArrowLeft") {
        setActiveLightboxIndex((prev) =>
          prev !== null && prev > 0 ? prev - 1 : prev
        );
      } else if (e.key === "ArrowRight") {
        setActiveLightboxIndex((prev) =>
          prev !== null && prev < currentRoute.steps.length - 1
            ? prev + 1
            : prev
        );
      } else if (e.key === "Escape") {
        setActiveLightboxIndex(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeLightboxIndex, currentRoute.steps.length]);

  return (
    <div className="relative min-h-screen bg-[#FAF9F6] text-zinc-900 cute-dots font-sans overflow-x-hidden selection:bg-amber-300 selection:text-zinc-950">
      {/* 1. Header & Navigation */}
      <Header onOpenUploadModal={() => setIsUploadModalOpen(true)} />

      {/* 2. Logged-in User Dashboard Banner */}
      <UserDashboardBanner />

      {/* 3. Hero Section (Parallax Floating Showcase in Rounded Frame) */}
      <HeroSection />

      {/* 4. Weekly Leaderboard Section */}
      <LeaderboardSection
        filteredRoutes={filteredRoutes}
        selectedRouteId={selectedRouteId}
        selectedCityFilter={selectedCityFilter}
        onSelectCityFilter={setSelectedCityFilter}
        onSelectRoute={(id) => {
          setSelectedRouteId(id);
          const el = document.getElementById("visual-guide");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }}
        onLikeRoute={handleLikeRoute}
      />

      {/* 5. Visual Step-by-Step Guide Section */}
      <VisualGuideSection
        currentRoute={currentRoute}
        onLikeRoute={handleLikeRoute}
        onOpenLightbox={(idx) => setActiveLightboxIndex(idx)}
      />

      {/* 6. Why Multi-Photo Visual Route Section */}
      <WhySection />

      {/* 7. FAQ Section */}
      <FaqSection />

      {/* 8. Mobile Pre-registration CTA Section */}
      <CtaSection />

      {/* 9. Footer */}
      <Footer />

      {/* 10. Modals */}
      <LightboxModal
        activeIndex={activeLightboxIndex}
        currentRoute={currentRoute}
        onClose={() => setActiveLightboxIndex(null)}
        onSelectIndex={(idx) => setActiveLightboxIndex(idx)}
      />

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
