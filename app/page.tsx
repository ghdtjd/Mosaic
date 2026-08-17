"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/auth-context";
import {
  Umbrella,
  Sun,
  Snowflake,
  Navigation,
  Compass,
  Building2,
  MapPin,
  Clock,
  ArrowRight,
  ShieldCheck,
  Zap,
  Users,
  AlertCircle,
  Accessibility,
  CheckCircle2,
  ChevronDown,
  Search,
  Sparkles,
  Share2,
  Smartphone,
  Info,
  TrendingUp,
  Thermometer,
  CloudRain,
  ChevronRight,
  ChevronLeft,
  BellRing,
  Send,
  Footprints,
  Eye,
  Layers,
  Flame,
  LogIn,
  UserPlus,
  LogOut,
  User,
  Heart,
  Image as ImageIcon,
  Video,
  Camera,
  UploadCloud,
  Trophy,
  Award,
  Crown,
  Play,
  Maximize2,
  X,
  Plus,
  Trash2,
  ImagePlus,
  FileText,
  ThumbsUp,
  Bookmark,
} from "lucide-react";

// Visual Step for Photo/Video Guide
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
interface EditableStep {
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

// Default 3 steps template for modal
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
  const { user, profile, signOut } = useAuth();

  // Active states
  const [routes, setRoutes] = useState<RouteData[]>(INITIAL_ROUTES);
  const [selectedRouteId, setSelectedRouteId] = useState<string>(
    "shinjuku-tochomae"
  );
  const [selectedCityFilter, setSelectedCityFilter] = useState<string>("all");

  // Lightbox modal with Next / Prev browsing through all route steps
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(
    null
  );

  // New Route Upload Modal State
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newOrigin, setNewOrigin] = useState("");
  const [newDest, setNewDest] = useState("");
  const [newCity, setNewCity] = useState("tokyo");
  const [newDuration, setNewDuration] = useState("6분");
  const [newDistance, setNewDistance] = useState("480m");
  const [newHighlightTip, setNewHighlightTip] = useState("");
  const [editableSteps, setEditableSteps] = useState<EditableStep[]>(
    DEFAULT_EDITABLE_STEPS
  );
  const [uploadSuccess, setUploadSuccess] = useState(false);

  // FAQ state
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Email pre-registration
  const [emailInput, setEmailInput] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  // Current active route object
  const currentRoute =
    routes.find((r) => r.id === selectedRouteId) || routes[0];

  // Filtered preset routes
  const filteredRoutes =
    selectedCityFilter === "all"
      ? routes
      : routes.filter((r) => r.city === selectedCityFilter);

  // Handle Likes / Upvote with dynamic leaderboard reordering
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

  // Step Management in Creator Modal
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

  // Submit Multi-Photo Route
  const handleCreateMultiPhotoRoute = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newOrigin || !newDest) return;

    const authorName =
      profile?.name || user?.email?.split("@")[0] || "지하길탐험가";

    // Sample placeholder photos fallback if none uploaded
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
      duration: newDuration,
      distance: newDistance,
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
        newHighlightTip ||
        "출발지부터 도착지까지 사진 순서대로 따라오시면 비를 전혀 맞지 않고 도착할 수 있습니다!",
    };

    setRoutes([newRouteItem, ...routes]);
    setSelectedRouteId(newRouteItem.id);
    setUploadSuccess(true);

    setTimeout(() => {
      setUploadSuccess(false);
      setIsUploadModalOpen(false);
      // Reset form
      setNewTitle("");
      setNewOrigin("");
      setNewDest("");
      setNewHighlightTip("");
      setEditableSteps(DEFAULT_EDITABLE_STEPS);

      // Scroll to visual guide view
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
      {/* 1. TOP CUTE ANNOUNCEMENT BAR */}
      <div className="w-full bg-zinc-900 text-white text-xs py-2 px-4 sticky top-0 z-40 shadow-sm">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="bg-amber-400 text-zinc-950 text-[10px] font-bold px-2 py-0.5 rounded-full">
              NEW
            </span>
            <span className="font-medium text-zinc-200">
              출발점부터 도착지까지! 단계별 다중 사진 & 랜드마크 설명 가이드 지원
            </span>
          </div>

          <div className="flex items-center gap-3 text-zinc-300 text-[11px]">
            <span className="flex items-center gap-1">
              <CloudRain className="w-3.5 h-3.5 text-cyan-400" /> 도쿄 비 80% (우산 0% 모드)
            </span>
            <span className="hidden sm:inline text-zinc-600">|</span>
            <span className="hidden sm:flex items-center gap-1">
              <Sun className="w-3.5 h-3.5 text-amber-400" /> 오사카 34°C (에어컨 루트 추천)
            </span>
          </div>
        </div>
      </div>

      {/* 2. NAVIGATION BAR */}
      <header className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between border-b-2 border-zinc-900">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-11 h-11 rounded-2xl bg-amber-400 border-2 border-zinc-900 flex items-center justify-center shadow-[3px_3px_0px_#18181b] group-hover:rotate-6 transition">
              <Footprints className="w-6 h-6 text-zinc-950" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-extrabold tracking-tight font-jua text-zinc-950">
                  치카미치
                </span>
                <span className="bg-zinc-900 text-amber-300 text-[10px] font-bold px-1.5 py-0.5 rounded-md font-mono">
                  CHIKAMICHI
                </span>
              </div>
              <p className="text-[11px] text-zinc-600 font-medium">
                출발~도착 다중 사진으로 쉽게 찾는 일본 지하 지름길
              </p>
            </div>
          </Link>
        </div>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-bold text-zinc-800">
          <a
            href="#leaderboard"
            className="hover:text-amber-600 transition flex items-center gap-1.5"
          >
            <Trophy className="w-4 h-4 text-amber-500" />
            주간 랭킹
          </a>
          <a
            href="#visual-guide"
            className="hover:text-amber-600 transition flex items-center gap-1.5"
          >
            <Camera className="w-4 h-4 text-cyan-600" />
            사진 스텝 가이드
          </a>
          <a
            href="#how-it-works"
            className="hover:text-amber-600 transition flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4 text-purple-600" />
            서비스 소개
          </a>
          <a href="#faq" className="hover:text-amber-600 transition">
            FAQ
          </a>
        </nav>

        {/* Right Nav: Upload Button & Auth */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="cute-btn-primary px-3.5 py-2 text-xs sm:text-sm flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>내 루트 다중 사진 등록</span>
          </button>

          {user ? (
            <div className="flex items-center gap-2 bg-white border-2 border-zinc-900 rounded-2xl px-2.5 py-1.5 shadow-[2px_2px_0px_#18181b]">
              <div className="w-6 h-6 rounded-full bg-amber-300 border border-zinc-900 text-zinc-950 font-bold text-xs flex items-center justify-center">
                {(profile?.name || user.email || "U")[0].toUpperCase()}
              </div>
              <span className="text-xs font-bold text-zinc-900 hidden sm:inline max-w-[80px] truncate">
                {profile?.name || user.email?.split("@")[0]}
              </span>
              <button
                onClick={() => signOut()}
                title="로그아웃"
                className="p-1 text-zinc-500 hover:text-red-500 transition"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
              <Link
                href="/login"
                className="cute-btn-secondary px-3 py-2 text-xs font-bold"
              >
                로그인
              </Link>
              <Link
                href="/signup"
                className="hidden sm:inline-flex cute-btn-primary px-3 py-2 text-xs font-bold"
              >
                가입하기
              </Link>
            </div>
          )}
        </div>
      </header>

      {/* 3. HERO SECTION */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 pb-12 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 border-2 border-zinc-900 text-xs font-bold text-zinc-900 mb-5 shadow-[2px_2px_0px_#18181b]">
          <ImagePlus className="w-4 h-4 text-amber-600" />
          <span>출발점부터 도착지까지 연속 사진 가이드 📸</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-zinc-950 font-jua tracking-normal leading-[1.2]">
          단 한 장의 사진이 아닌,
          <br />
          <span className="bg-amber-300 px-3 py-1 rounded-2xl border-2 border-zinc-900 shadow-[3px_3px_0px_#18181b] inline-block mt-2">
            출발부터 도착까지 전체 루트 사진
          </span>
          으로 찾아가세요! 🐾
        </h1>

        <p className="mt-6 text-sm sm:text-lg text-zinc-700 max-w-2xl mx-auto font-medium leading-relaxed">
          개찰구 표지판, 중간 분기점 랜드마크, 도착 게이트까지
          <br className="hidden sm:inline" />
          <strong>각 사진마다 상세 설명과 꿀팁</strong>을 보며 지하 미로를 완벽하게 통과하세요.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap justify-center items-center gap-3">
          <a
            href="#visual-guide"
            className="cute-btn-primary px-6 py-3.5 text-sm sm:text-base flex items-center gap-2"
          >
            <Camera className="w-5 h-5" />
            연속 사진 스텝 가이드 체험하기
          </a>
          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="cute-btn-secondary px-6 py-3.5 text-sm sm:text-base flex items-center gap-2"
          >
            <Plus className="w-5 h-5 text-amber-600" />
            나만의 코스 사진 여러 장 등록하기
          </button>
        </div>
      </section>

      {/* 4. WEEKLY TOP UNDERGROUND ROUTES LEADERBOARD */}
      <section id="leaderboard" className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-200 border-2 border-zinc-900 text-xs font-bold text-zinc-900 mb-2">
              <Crown className="w-4 h-4 text-amber-600" />
              Weekly Top Routes
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-zinc-950 font-jua">
              🏆 이번 주 명예의 전당 · 베스트 지하 꿀루트 랭킹
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 mt-1">
              상세한 사진과 꿀팁이 담긴 루트일수록 좋아요(❤️)를 많이 받습니다.
            </p>
          </div>

          {/* City Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-white border-2 border-zinc-900 rounded-2xl shadow-[2px_2px_0px_#18181b] overflow-x-auto">
            {[
              { id: "all", label: "전체 랭킹" },
              { id: "tokyo", label: "🗼 도쿄" },
              { id: "osaka", label: "🏯 오사카" },
              { id: "sapporo", label: "❄️ 삿포로" },
              { id: "fukuoka", label: "🍜 후쿠오카" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCityFilter(tab.id)}
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredRoutes.map((route) => {
            const isSelected = route.id === selectedRouteId;
            return (
              <div
                key={route.id}
                onClick={() => {
                  setSelectedRouteId(route.id);
                  const el = document.getElementById("visual-guide");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className={`cute-card p-4 cursor-pointer relative flex flex-col justify-between ${
                  isSelected
                    ? "border-amber-500 ring-2 ring-amber-400 bg-amber-50/40"
                    : "bg-white"
                }`}
              >
                {/* Top Rank & Likes */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`w-7 h-7 rounded-xl border-2 border-zinc-900 font-jua text-sm flex items-center justify-center shadow-[1.5px_1.5px_0px_#18181b] ${
                        route.rank === 1
                          ? "bg-amber-300 text-zinc-950 font-bold"
                          : route.rank === 2
                          ? "bg-slate-200 text-zinc-950 font-bold"
                          : route.rank === 3
                          ? "bg-amber-700 text-white font-bold"
                          : "bg-zinc-100 text-zinc-700"
                      }`}
                    >
                      {route.rank}위
                    </span>
                    <span className="text-xs font-bold text-zinc-600 font-mono">
                      {route.cityName}
                    </span>
                  </div>

                  {/* Upvote Button with Heart */}
                  <button
                    onClick={(e) => handleLikeRoute(route.id, e)}
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
      </section>

      {/* 5. VISUAL STEP-BY-STEP PHOTO & VIDEO GUIDE (출발부터 도착까지 다중 사진 뷰어) */}
      <section
        id="visual-guide"
        className="max-w-6xl mx-auto px-4 sm:px-6 py-12 scroll-mt-16"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-100 border-2 border-zinc-900 text-xs font-bold text-zinc-900 mb-2">
            <Camera className="w-4 h-4 text-cyan-600" />
            Full Route Photo Journey
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-zinc-950 font-jua">
            📸 출발부터 도착까지 단계별 사진 & 설명 가이드
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 mt-1 max-w-xl mx-auto">
            출발지 ➡️ 중간 분기점 ➡️ 도착지까지 실제 현장 사진과 꿀팁을 확인하세요. (사진 클릭 시 전체화면 확대)
          </p>
        </div>

        {/* Main Visual Display Card */}
        <div className="cute-card bg-white p-5 sm:p-8">
          {/* Header of Active Route */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b-2 border-zinc-900">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className="bg-amber-300 border-2 border-zinc-900 text-zinc-950 text-xs font-bold px-2.5 py-0.5 rounded-full font-mono">
                  {currentRoute.cityName}
                </span>
                <span className="bg-zinc-100 text-zinc-700 text-xs font-medium px-2 py-0.5 rounded-md border border-zinc-300">
                  작성자: {currentRoute.author.name} ({currentRoute.author.badge})
                </span>
                <span className="bg-cyan-100 text-cyan-900 text-xs font-bold px-2 py-0.5 rounded-md border border-cyan-300">
                  사진 {currentRoute.steps.length}단계 수록
                </span>
              </div>

              <h3 className="text-xl sm:text-3xl font-extrabold text-zinc-950 font-jua">
                {currentRoute.title}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 mt-1">
                <strong>{currentRoute.origin}</strong> ➡️{" "}
                <strong>{currentRoute.destination}</strong>
              </p>
            </div>

            {/* Quick like button */}
            <div className="flex items-center gap-3">
              <button
                onClick={(e) => handleLikeRoute(currentRoute.id, e)}
                className="cute-btn-primary px-4 py-2.5 text-xs sm:text-sm flex items-center gap-2 text-rose-700"
              >
                <Heart className="w-4 h-4 fill-rose-600 text-rose-600" />
                <span className="font-bold text-zinc-950">
                  이 루트 추천 ({currentRoute.likes})
                </span>
              </button>
            </div>
          </div>

          {/* Condition Matrix Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6">
            <div className="p-3 rounded-2xl bg-cyan-50 border-2 border-zinc-900 text-center">
              <div className="text-xs font-bold text-cyan-800 flex items-center justify-center gap-1">
                <Umbrella className="w-4 h-4" /> 우천 노출도
              </div>
              <div className="text-base font-extrabold text-zinc-950 font-jua mt-0.5">
                {currentRoute.rainShieldPercent === 100
                  ? "0m (100% 실내)"
                  : "일부 야외"}
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-amber-50 border-2 border-zinc-900 text-center">
              <div className="text-xs font-bold text-amber-800 flex items-center justify-center gap-1">
                <Thermometer className="w-4 h-4" /> 냉방 체감
              </div>
              <div className="text-base font-extrabold text-zinc-950 font-jua mt-0.5">
                {currentRoute.tempBenefit}
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-emerald-50 border-2 border-zinc-900 text-center">
              <div className="text-xs font-bold text-emerald-800 flex items-center justify-center gap-1">
                <Clock className="w-4 h-4" /> 예상 시간
              </div>
              <div className="text-base font-extrabold text-zinc-950 font-jua mt-0.5">
                {currentRoute.duration} ({currentRoute.distance})
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-purple-50 border-2 border-zinc-900 text-center">
              <div className="text-xs font-bold text-purple-800 flex items-center justify-center gap-1">
                <Accessibility className="w-4 h-4" /> 배리어프리
              </div>
              <div className="text-base font-extrabold text-zinc-950 font-jua mt-0.5">
                엘리베이터 완비
              </div>
            </div>
          </div>

          {/* Sequential Step-by-Step Multi-Photo Timeline Grid */}
          <div className="space-y-6 my-8">
            <div className="flex items-center justify-between">
              <h4 className="font-jua text-xl text-zinc-950 flex items-center gap-2">
                <Camera className="w-5 h-5 text-amber-500" />
                출발지 ➡️ 도착지 사진 순서대로 따라가기
              </h4>
              <span className="text-xs text-zinc-500 font-bold">
                각 사진 클릭 시 전체화면 넘겨보기 지원
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {currentRoute.steps.map((step, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveLightboxIndex(idx)}
                  className="cute-card bg-[#FAF9F6] p-4 cursor-pointer group hover:bg-white transition flex flex-col justify-between"
                >
                  <div>
                    {/* Step Number Tag & Indicator */}
                    <div className="flex items-center justify-between mb-2">
                      <span className="bg-zinc-900 text-amber-300 text-xs font-bold px-2.5 py-0.5 rounded-full font-mono">
                        {idx === 0
                          ? "🚩 출발점 (STEP 1)"
                          : idx === currentRoute.steps.length - 1
                          ? `🎯 도착점 (STEP ${idx + 1})`
                          : `🚶 경유지 (STEP ${idx + 1})`}
                      </span>
                      <span className="text-[11px] font-bold text-zinc-500 flex items-center gap-1">
                        <Maximize2 className="w-3 h-3" /> 크게 보기
                      </span>
                    </div>

                    {/* Photo Container */}
                    <div className="relative w-full h-48 rounded-xl border-2 border-zinc-900 overflow-hidden mb-3">
                      <img
                        src={step.photoUrl}
                        alt={step.photoAlt}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      />
                      <div className="absolute bottom-2 left-2 bg-zinc-900/85 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur-xs">
                        🔍 {step.landmark}
                      </div>
                    </div>

                    {/* Step Title & Detailed Description */}
                    <h5 className="font-jua text-base text-zinc-950 mb-1">
                      {step.title}
                    </h5>
                    <p className="text-xs text-zinc-600 leading-relaxed mb-3">
                      {step.description}
                    </p>
                  </div>

                  {/* Step Tip */}
                  <div className="p-2.5 rounded-xl bg-amber-100/80 border border-amber-300 text-[11px] text-amber-950 font-medium">
                    💡 <strong>구간 꿀팁:</strong> {step.tip}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Route Summary Highlight */}
          <div className="p-4 rounded-2xl bg-amber-300 border-2 border-zinc-900 shadow-[3px_3px_0px_#18181b] flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-zinc-950 text-amber-300 flex items-center justify-center shrink-0 font-bold">
              🐾
            </div>
            <div>
              <strong className="font-jua text-base text-zinc-950 block">
                전체 코스 핵심 요약
              </strong>
              <p className="text-xs sm:text-sm text-zinc-900 mt-0.5 leading-relaxed font-medium">
                {currentRoute.highlightTip}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. MULTI-PHOTO ROUTE CREATOR MODAL (사용자 여러 장 사진 & 설명 등록 폼) */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="cute-card bg-white max-w-2xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto relative animate-in fade-in zoom-in-95">
            <button
              onClick={() => setIsUploadModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full border-2 border-zinc-900 bg-zinc-100 hover:bg-zinc-200 text-zinc-900"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl">📸</span>
              <h3 className="font-jua text-2xl sm:text-3xl text-zinc-950">
                출발~도착 다중 사진 꿀루트 등록하기
              </h3>
            </div>
            <p className="text-xs text-zinc-600 mb-6">
              출발지부터 도착지까지 단계별로 사진을 첨부하고 설명을 작성해 주세요.
              등록된 루트는 주간 랭킹에 올라가 좋아요(❤️)를 받을 수 있습니다!
            </p>

            <form onSubmit={handleCreateMultiPhotoRoute} className="space-y-6 text-xs">
              {/* Basic Route Information */}
              <div className="p-4 rounded-2xl bg-[#FAF9F6] border-2 border-zinc-900 space-y-3">
                <div className="font-jua text-base text-zinc-950 flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-amber-600" />
                  1. 기본 루트 정보
                </div>

                <div>
                  <label className="block font-bold text-zinc-900 mb-1">
                    루트 제목 (예: 신주쿠 서쪽 ➡️ 도쿄도청 무빙워크 직통길)
                  </label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="예: 우메다 화이티 ➡️ 한큐백화점 에어컨 직통로"
                    className="w-full bg-white border-2 border-zinc-900 rounded-xl px-3 py-2 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-amber-400 font-medium"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block font-bold text-zinc-900 mb-1">지역</label>
                    <select
                      value={newCity}
                      onChange={(e) => setNewCity(e.target.value)}
                      className="w-full bg-white border-2 border-zinc-900 rounded-xl px-3 py-2 text-xs text-zinc-900 font-medium focus:outline-none focus:ring-2 focus:ring-amber-400"
                    >
                      <option value="tokyo">🗼 도쿄 (신주쿠/도쿄역)</option>
                      <option value="osaka">🏯 오사카 (우메다/난바)</option>
                      <option value="sapporo">❄️ 삿포로 (치카호)</option>
                      <option value="fukuoka">🍜 후쿠오카 (텐진)</option>
                      <option value="nagoya">🏯 나고야 (메이에키)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-zinc-900 mb-1">
                      출발지 (역/개찰구)
                    </label>
                    <input
                      type="text"
                      required
                      value={newOrigin}
                      onChange={(e) => setNewOrigin(e.target.value)}
                      placeholder="예: JR 신주쿠역 서쪽 B1F"
                      className="w-full bg-white border-2 border-zinc-900 rounded-xl px-3 py-2 text-xs text-zinc-900 focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-zinc-900 mb-1">
                      도착지 (건물/출구)
                    </label>
                    <input
                      type="text"
                      required
                      value={newDest}
                      onChange={(e) => setNewDest(e.target.value)}
                      placeholder="예: 도쿄도청 지하 로비"
                      className="w-full bg-white border-2 border-zinc-900 rounded-xl px-3 py-2 text-xs text-zinc-900 focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                  </div>
                </div>
              </div>

              {/* Multi-Step Photos & Descriptions Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="font-jua text-base text-zinc-950 flex items-center gap-1.5">
                    <Camera className="w-4 h-4 text-cyan-600" />
                    2. 출발 ➡️ 도착 단계별 사진 & 설명 ({editableSteps.length}개 등록 중)
                  </div>
                  <button
                    type="button"
                    onClick={handleAddStep}
                    className="cute-btn-primary px-3 py-1 text-xs flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>단계 추가하기</span>
                  </button>
                </div>

                {editableSteps.map((step, idx) => (
                  <div
                    key={step.id}
                    className="p-4 rounded-2xl bg-white border-2 border-zinc-900 shadow-[3px_3px_0px_#18181b] space-y-3 relative"
                  >
                    <div className="flex items-center justify-between">
                      <span className="bg-zinc-900 text-amber-300 text-xs font-bold px-2.5 py-0.5 rounded-full font-mono">
                        {idx === 0
                          ? "🚩 STEP 1 (출발지)"
                          : idx === editableSteps.length - 1
                          ? `🎯 STEP ${idx + 1} (도착지)`
                          : `🚶 STEP ${idx + 1} (경유지/분기점)`}
                      </span>

                      {editableSteps.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveStep(step.id)}
                          className="text-zinc-400 hover:text-red-500 p-1 transition"
                          title="이 단계 삭제"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {/* Photo Upload for this specific step */}
                      <div>
                        <label className="block font-bold text-zinc-900 mb-1">
                          이 단계 현장 사진
                        </label>
                        <div className="border-2 border-dashed border-zinc-400 hover:border-zinc-900 rounded-xl p-3 text-center bg-[#FAF9F6] transition cursor-pointer relative h-36 flex items-center justify-center">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleStepPhotoUpload(step.id, e)}
                            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                          />
                          {step.photoPreview ? (
                            <div className="relative h-full w-full rounded-lg overflow-hidden border border-zinc-900">
                              <img
                                src={step.photoPreview}
                                alt="Step preview"
                                className="w-full h-full object-cover"
                              />
                              <span className="absolute bottom-1 right-1 bg-zinc-900 text-amber-300 text-[9px] font-bold px-1.5 py-0.5 rounded">
                                변경 클릭
                              </span>
                            </div>
                          ) : (
                            <div>
                              <ImagePlus className="w-6 h-6 text-amber-500 mx-auto mb-1" />
                              <p className="font-bold text-[11px] text-zinc-900">
                                사진 파일 선택
                              </p>
                              <p className="text-[10px] text-zinc-500">
                                스마트폰 촬영 사진 첨부
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Step Details */}
                      <div className="space-y-2">
                        <div>
                          <label className="block font-bold text-zinc-900 mb-0.5">
                            단계 제목 / 위치
                          </label>
                          <input
                            type="text"
                            value={step.title}
                            onChange={(e) =>
                              handleStepChange(step.id, "title", e.target.value)
                            }
                            placeholder="예: JR 신주쿠 서쪽 개찰구 앞"
                            className="w-full bg-[#FAF9F6] border-2 border-zinc-900 rounded-lg px-2.5 py-1.5 text-xs text-zinc-900 focus:outline-none focus:ring-2 focus:ring-amber-400 font-medium"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-zinc-900 mb-0.5">
                            눈에 띄는 랜드마크 / 표지판
                          </label>
                          <input
                            type="text"
                            value={step.landmark}
                            onChange={(e) =>
                              handleStepChange(step.id, "landmark", e.target.value)
                            }
                            placeholder="예: 노란색 도쿄도청 표지판 & 분수대"
                            className="w-full bg-[#FAF9F6] border-2 border-zinc-900 rounded-lg px-2.5 py-1.5 text-xs text-zinc-900 focus:outline-none focus:ring-2 focus:ring-amber-400"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-zinc-900 mb-0.5">
                            통과 방법 & 꿀팁 설명
                          </label>
                          <textarea
                            rows={2}
                            value={step.description}
                            onChange={(e) =>
                              handleStepChange(step.id, "description", e.target.value)
                            }
                            placeholder="예: 개찰구 나와서 정면 오다큐 백화점 통로로 직진하세요."
                            className="w-full bg-[#FAF9F6] border-2 border-zinc-900 rounded-lg px-2.5 py-1.5 text-xs text-zinc-900 focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={handleAddStep}
                  className="w-full py-2.5 border-2 border-dashed border-zinc-900 rounded-2xl bg-amber-50 hover:bg-amber-100 text-zinc-950 font-bold flex items-center justify-center gap-1.5 transition"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ 사진 & 다음 경유지 단계 추가하기</span>
                </button>
              </div>

              {/* Final Tip */}
              <div>
                <label className="block font-bold text-zinc-900 mb-1">
                  전체 코스 핵심 꿀팁 요약
                </label>
                <textarea
                  rows={2}
                  value={newHighlightTip}
                  onChange={(e) => setNewHighlightTip(e.target.value)}
                  placeholder="예: 비 올 때 지상으로 안 나가고 무빙워크 타면 땀 한 방울 안 흘리고 8분 만에 갈 수 있어요!"
                  className="w-full bg-[#FAF9F6] border-2 border-zinc-900 rounded-xl px-3 py-2 text-xs text-zinc-900 focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full cute-btn-primary py-3.5 text-sm font-bold flex items-center justify-center gap-2"
              >
                <UploadCloud className="w-5 h-5" />
                <span>다중 사진 루트 등록하고 랭커 도전하기! 🚀</span>
              </button>

              {uploadSuccess && (
                <div className="p-3.5 rounded-xl bg-emerald-100 border-2 border-zinc-900 text-emerald-950 font-bold text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    루트가 성공적으로 등록되었습니다! 사진 스텝 가이드에 반영됩니다.
                  </span>
                </div>
              )}
            </form>
          </div>
        </div>
      )}

      {/* 7. INTERACTIVE SEQUENTIAL PHOTO LIGHTBOX (이전/다음 사진 연속 보기) */}
      {activeLightboxIndex !== null && currentRoute.steps[activeLightboxIndex] && (
        <div
          onClick={() => setActiveLightboxIndex(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xs cursor-pointer animate-in fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="cute-card bg-white max-w-3xl w-full p-5 sm:p-7 relative overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveLightboxIndex(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full border-2 border-zinc-900 bg-zinc-100 hover:bg-zinc-200 text-zinc-900 z-20"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Step Counter Badge */}
            <div className="flex items-center justify-between mb-3">
              <span className="bg-zinc-900 text-amber-300 text-xs font-bold px-3 py-1 rounded-full font-mono">
                STEP {activeLightboxIndex + 1} / {currentRoute.steps.length} 단계
              </span>
              <span className="text-xs text-zinc-500 font-bold hidden sm:inline">
                키보드 ◀ ▶ 키로 이전/다음 사진 이동 가능
              </span>
            </div>

            {/* Large Photo with Prev / Next Navigation Arrows */}
            <div className="relative w-full h-80 sm:h-96 rounded-2xl border-2 border-zinc-900 overflow-hidden mb-4 bg-zinc-100 flex items-center justify-center">
              <img
                src={currentRoute.steps[activeLightboxIndex].photoUrl}
                alt={currentRoute.steps[activeLightboxIndex].photoAlt}
                className="w-full h-full object-cover"
              />

              {/* Prev Button */}
              {activeLightboxIndex > 0 && (
                <button
                  onClick={() =>
                    setActiveLightboxIndex((prev) =>
                      prev !== null ? prev - 1 : 0
                    )
                  }
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white border-2 border-zinc-900 flex items-center justify-center shadow-[2px_2px_0px_#18181b] transition hover:scale-105"
                  title="이전 사진"
                >
                  <ChevronLeft className="w-6 h-6 text-zinc-950" />
                </button>
              )}

              {/* Next Button */}
              {activeLightboxIndex < currentRoute.steps.length - 1 && (
                <button
                  onClick={() =>
                    setActiveLightboxIndex((prev) =>
                      prev !== null ? prev + 1 : 0
                    )
                  }
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
                  {currentRoute.steps[activeLightboxIndex].title}
                </h4>
                <span className="bg-amber-100 text-amber-900 text-xs font-bold px-2 py-0.5 rounded border border-amber-300">
                  🔍 {currentRoute.steps[activeLightboxIndex].landmark}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed font-medium">
                {currentRoute.steps[activeLightboxIndex].description}
              </p>
              <div className="p-2 rounded-xl bg-amber-50 border border-amber-300 text-xs text-amber-950 font-bold mt-2">
                💡 <strong>길잡이 팁:</strong>{" "}
                {currentRoute.steps[activeLightboxIndex].tip}
              </div>
            </div>

            {/* Thumbnail Strip Below */}
            <div className="flex items-center gap-2 mt-4 pt-3 border-t-2 border-zinc-100 overflow-x-auto">
              {currentRoute.steps.map((s, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveLightboxIndex(idx)}
                  className={`w-16 h-12 rounded-lg border-2 overflow-hidden cursor-pointer shrink-0 transition ${
                    idx === activeLightboxIndex
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
      )}

      {/* 8. WHY MULTI-PHOTO MATTERS */}
      <section
        id="how-it-works"
        className="max-w-6xl mx-auto px-4 sm:px-6 py-14 border-t-2 border-zinc-900"
      >
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 border-2 border-zinc-900 text-xs font-bold text-zinc-900 mb-2">
            <Sparkles className="w-4 h-4 text-purple-600" />
            Visual Route Power
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-zinc-950 font-jua">
            출발부터 도착까지, 연속 사진의 힘!
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 mt-2">
            중간에 길을 잃지 않도록 모든 분기점 사진과 랜드마크를 연속으로 확인하세요.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="cute-card bg-white p-6">
            <div className="w-12 h-12 rounded-2xl bg-amber-300 border-2 border-zinc-900 flex items-center justify-center text-xl mb-4 font-bold">
              🚩
            </div>
            <h3 className="font-jua text-xl text-zinc-950 mb-2">
              1. 출발 개찰구 표지판 사진
            </h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              역에서 내리자마자 어느 개찰구로 나가야 비를 안 맞는지 첫 출발점 사진으로 확인합니다.
            </p>
          </div>

          <div className="cute-card bg-white p-6">
            <div className="w-12 h-12 rounded-2xl bg-cyan-300 border-2 border-zinc-900 flex items-center justify-center text-xl mb-4 font-bold">
              🚶
            </div>
            <h3 className="font-jua text-xl text-zinc-950 mb-2">
              2. 중간 분기점 랜드마크 사진
            </h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              복잡한 갈림길에서 분수대, 빨간 간판, 무빙워크 등 시각적 랜드마크 사진을 보고 1초 만에 길을 찾습니다.
            </p>
          </div>

          <div className="cute-card bg-white p-6">
            <div className="w-12 h-12 rounded-2xl bg-rose-300 border-2 border-zinc-900 flex items-center justify-center text-xl mb-4 font-bold">
              🎯
            </div>
            <h3 className="font-jua text-xl text-zinc-950 mb-2">
              3. 도착 빌딩 직결 게이트 사진
            </h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              지상으로 나가지 않고 건물 지하 로비로 직통 연결되는 최종 게이트 사진으로 완벽하게 골인!
            </p>
          </div>
        </div>
      </section>

      {/* 9. FAQ ACCORDION */}
      <section
        id="faq"
        className="max-w-4xl mx-auto px-4 sm:px-6 py-12 border-t-2 border-zinc-900"
      >
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 font-jua">
            자주 묻는 질문 (FAQ)
          </h2>
          <p className="text-xs text-zinc-600 mt-1">
            치카미치 다중 사진 길안내에 관한 궁금증을 확인해 보세요.
          </p>
        </div>

        <div className="space-y-3">
          {[
            {
              q: "사진을 몇 장까지 등록할 수 있나요?",
              a: "출발지부터 중간 분기점, 도착지까지 원하는 만큼 단계를 무제한으로 추가하여 각 단계별 사진과 설명을 작성할 수 있습니다.",
            },
            {
              q: "내가 올린 사진 루트에 좋아요가 많아지면 어떻게 되나요?",
              a: "실시간 좋아요(❤️) 수에 따라 주간 명예의 전당 랭킹 1~3위에 등극하며, 프로필에 골드/실버/브론즈 길잡이 랭커 배지가 부여됩니다.",
            },
            {
              q: "스마트폰으로 현장에서 바로 사진 찍어 올릴 수 있나요?",
              a: "네! 모바일 브라우저에서도 '내 루트 등록' 버튼을 누르면 스마트폰 카메라로 바로 촬영하거나 갤러리의 사진을 첨부하여 실시간으로 등록할 수 있습니다.",
            },
          ].map((item, idx) => (
            <div key={idx} className="cute-card bg-white overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-4 text-left flex items-center justify-between font-bold text-sm sm:text-base text-zinc-950"
              >
                <span>{item.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-zinc-900 transition-transform duration-200 shrink-0 ml-2 ${
                    openFaq === idx ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openFaq === idx && (
                <div className="px-4 pb-4 text-xs sm:text-sm text-zinc-700 leading-relaxed border-t border-zinc-100 pt-3 font-medium">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 10. PRE-REGISTRATION CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="cute-card bg-amber-300 p-8 sm:p-12 text-center relative overflow-hidden">
          <div className="w-14 h-14 rounded-2xl bg-zinc-950 text-amber-300 flex items-center justify-center mx-auto mb-4 border-2 border-zinc-950 shadow-[3px_3px_0px_#18181b]">
            <Smartphone className="w-7 h-7" />
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-zinc-950 font-jua">
            다음 일본 여행, 우산 없이 가볍게 걸어보세요!
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-zinc-900 font-medium max-w-md mx-auto">
            치카미치 모바일 앱 출시 알림을 신청하시면{" "}
            <strong>일본 5대 도시 지하 던전 고화질 사진 가이드북</strong>을
            무료로 보내드립니다.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (emailInput) {
                setSubscribed(true);
                setEmailInput("");
              }
            }}
            className="mt-6 max-w-md mx-auto flex flex-col sm:flex-row gap-2"
          >
            <input
              type="email"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              placeholder="이메일 주소를 입력해주세요"
              required
              className="flex-1 bg-white border-2 border-zinc-900 rounded-2xl px-4 py-3 text-xs sm:text-sm text-zinc-950 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-950 font-medium"
            />
            <button
              type="submit"
              className="cute-btn-secondary py-3 px-6 text-xs sm:text-sm font-bold bg-zinc-950 text-amber-300 hover:bg-zinc-800"
            >
              사전 등록하기
            </button>
          </form>

          {subscribed && (
            <div className="mt-4 p-3 max-w-md mx-auto rounded-xl bg-white border-2 border-zinc-900 text-zinc-950 text-xs font-bold flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>
                사전 등록이 완료되었습니다! 출시 소식을 가장 먼저 보내드릴게요.
              </span>
            </div>
          )}
        </div>
      </section>

      {/* 11. FOOTER */}
      <footer className="border-t-2 border-zinc-900 bg-white py-8 px-4 sm:px-6 text-xs text-zinc-600">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-jua text-base font-bold text-zinc-950">
              치카미치 (CHIKAMICHI)
            </span>
            <span>•</span>
            <span>출발부터 도착까지 다중 사진 기반 지하 꿀루트 내비게이션</span>
          </div>

          <div className="flex items-center gap-4 font-bold text-zinc-800">
            <a href="#leaderboard" className="hover:underline">
              주간 랭킹
            </a>
            <a href="#visual-guide" className="hover:underline">
              사진 가이드
            </a>
            <a href="#how-it-works" className="hover:underline">
              이용 방법
            </a>
            <Link href="/login" className="hover:underline">
              로그인
            </Link>
          </div>

          <div className="text-zinc-500 text-[11px]">
            © 2026 CHIKAMICHI Project. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
