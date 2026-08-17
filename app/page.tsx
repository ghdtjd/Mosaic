"use client";

import { useState } from "react";
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
  ThumbsUp,
  Bookmark,
} from "lucide-react";

// Visual Step for Photo/Video Guide
interface VisualStep {
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

// Route Data with Photos, Video & Leaderboard Likes
interface RouteData {
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
    videoPreviewUrl: "https://assets.mixkit.co/videos/preview/mixkit-modern-subway-station-with-bright-lights-41278-large.mp4",
    steps: [
      {
        stepNumber: 1,
        title: "JR 신주쿠역 서쪽 지하 개찰구",
        landmark: "노란색 '도쿄도청 방면' 표지판 확인",
        description: "개찰구에서 나온 후 정면의 오다큐 에이스(Odakyu Ace) 지하상가 입구로 직진하세요.",
        photoUrl:
          "https://images.unsplash.com/photo-1538332576228-eb5b4c4de6f5?auto=format&fit=crop&w=800&q=80",
        photoAlt: "신주쿠역 서쪽 지하 개찰구 표지판",
        tip: "지상으로 나가지 마시고 B1F 표지판을 계속 따라가세요!",
        indoor: true,
        elevator: true,
      },
      {
        stepNumber: 2,
        title: "신주쿠 스카이웨이 무빙워크 진입",
        landmark: "초록색 바닥 유도선 & 280m 무빙워크",
        description: "에어컨이 빵빵하게 나오는 280m 길이의 지하 무빙워크에 탑승하여 편안하게 이동합니다.",
        photoUrl:
          "https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=800&q=80",
        photoAlt: "신주쿠 지하 무빙워크 통로",
        tip: "비 오는 날 지상 횡단보도 3개를 모두 건너뛰는 핵심 구간입니다.",
        indoor: true,
        elevator: true,
      },
      {
        stepNumber: 3,
        title: "도쿄도청 제1본청사 B1F 게이트 도착",
        landmark: "도청사 지하 로비 및 안내데스크",
        description: "무빙워크 끝에서 바로 연결되는 도청사 지하 자동문으로 들어가면 젖지 않고 도착 완료!",
        photoUrl:
          "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=800&q=80",
        photoAlt: "도쿄도청사 입구",
        tip: "전망대 전용 엘리베이터도 지하 1층 로비에서 바로 탑승 가능합니다.",
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
        title: "JR 오사카역 중앙 지하 B1F 출구",
        landmark: "사우스 게이트 빌딩 연결 통로",
        description: "계단 또는 엘리베이터를 이용해 B1F로 내려와 화이티 우메다(Whity Umeda) 방향으로 꺾습니다.",
        photoUrl:
          "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=800&q=80",
        photoAlt: "오사카역 지하 연결부",
        tip: "머리 위 'Whity Umeda' 핑크색 표지판을 주시하세요.",
        indoor: true,
        elevator: true,
      },
      {
        stepNumber: 2,
        title: "화이티 우메다 분수 광장 분기점",
        landmark: "중앙 원형 분수대 (Water Fantasy)",
        description: "분수 광장을 오른쪽에 두고 직진하면 디아모르 오사카(Diamor)의 원형 돔 천장이 나타납니다.",
        photoUrl:
          "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
        photoAlt: "화이티 우메다 광장",
        tip: "우메다 던전의 가장 유명한 나침반 분수대입니다. 여기서 길 잃지 마세요!",
        indoor: true,
        elevator: true,
      },
      {
        stepNumber: 3,
        title: "디아모르 오사카 & 한큐 백화점 식품관",
        landmark: "유리 돔 채광창 & 백화점 B1F 입구",
        description: "유럽풍 대리석 바닥을 따라 백화점 식품관 지하 게이트로 바로 진입합니다.",
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
        title: "마루노우치 지하 중앙 광장",
        landmark: "신마루비루(新丸ビル) 지하 연결 입구",
        description: "붉은 벽돌 도쿄역사 지하에서 신마루빌딩 지하 통로로 단차 없이 바로 이어집니다.",
        photoUrl:
          "https://images.unsplash.com/photo-1508807526345-15e9b5f4eaff?auto=format&fit=crop&w=800&q=80",
        photoAlt: "도쿄역 마루노우치 지하",
        tip: "계단이 하나도 없는 완벽한 평지 구간입니다.",
        indoor: true,
        elevator: true,
      },
      {
        stepNumber: 2,
        title: "오테마치 지하 연결 와이드 보도",
        landmark: "치요다선 환승 복도 & 오테모리 숲 광장",
        description: "폭 15m의 넓은 지하 회랑을 따라 오테마치 오피스 타운으로 쾌적하게 이동합니다.",
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
        title: "치카호 북쪽 1번 게이트",
        landmark: "삿포로 에키마에 도리 지하보행공간",
        description: "삿포로역 지하에서 오도리 방면으로 일직선으로 뻗은 20m 광폭 지하보도 진입.",
        photoUrl:
          "https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=800&q=80",
        photoAlt: "치카호 지하보도 입구",
        tip: "겨울철 두꺼운 패딩을 벗고 가볍게 걸을 수 있는 온도가 유지됩니다.",
        indoor: true,
        elevator: true,
      },
      {
        stepNumber: 2,
        title: "오도리역 비세(Bisse) 광장 통과",
        landmark: "오도리역 지하 허브 & 삿포로 TV타워 연결부",
        description: "중간 쉼터와 카페가 밀집한 오도리 광장을 지나 스스키노 폴타운으로 직진.",
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
        title: "텐진 지하상가 1번가 (Tenchika)",
        landmark: "남유럽풍 벽돌 거리 & 스테인드글라스 조명",
        description: "돌바닥과 클래식 조명이 인상적인 텐진 지하상가 메인 스트리트 진입.",
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

export default function Home() {
  const { user, profile, signOut } = useAuth();

  // Active states
  const [routes, setRoutes] = useState<RouteData[]>(INITIAL_ROUTES);
  const [selectedRouteId, setSelectedRouteId] = useState<string>("shinjuku-tochomae");
  const [selectedCityFilter, setSelectedCityFilter] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"photo" | "step" | "video">("photo");

  // Photo Lightbox modal
  const [lightboxPhoto, setLightboxPhoto] = useState<{
    url: string;
    alt: string;
    title: string;
    tip: string;
  } | null>(null);

  // New Route Upload Modal
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newOrigin, setNewOrigin] = useState("");
  const [newDest, setNewDest] = useState("");
  const [newCity, setNewCity] = useState("tokyo");
  const [newTip, setNewTip] = useState("");
  const [newPhotoPreview, setNewPhotoPreview] = useState<string | null>(null);
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

  // Handle Likes / Upvote with animation
  const handleLikeRoute = (routeId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setRoutes((prev) => {
      const updated = prev.map((r) =>
        r.id === routeId ? { ...r, likes: r.likes + 1 } : r
      );
      // Sort by likes to dynamically reflect leaderboard rankings
      return updated.sort((a, b) => b.likes - a.likes).map((item, idx) => ({
        ...item,
        rank: idx + 1,
      }));
    });
  };

  // Handle Photo upload preview
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle new custom route submit
  const handleCreateRoute = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newOrigin || !newDest) return;

    const authorName =
      profile?.name || user?.email?.split("@")[0] || "신규 길잡이";

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
      distance: "450m",
      rainShieldPercent: 100,
      tempBenefit: "체감 -6°C",
      likes: 1,
      views: 12,
      author: {
        name: authorName,
        badge: "✨ 뉴 크리에이터",
        avatarBg: "bg-amber-300",
      },
      tags: ["📸 사진 등록됨", "🌧️ 100% 지하", "🆕 방금 등록"],
      coverPhoto:
        newPhotoPreview ||
        "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1000&q=80",
      steps: [
        {
          stepNumber: 1,
          title: newOrigin,
          landmark: "출발지 지하 연결구",
          description: "출발 개찰구에서 안내 표지판을 따라 진입하세요.",
          photoUrl:
            newPhotoPreview ||
            "https://images.unsplash.com/photo-1538332576228-eb5b4c4de6f5?auto=format&fit=crop&w=800&q=80",
          photoAlt: "출발지 사진",
          tip: newTip || "비 올 때 우산 없이 이동 가능한 꿀루트입니다!",
          indoor: true,
          elevator: true,
        },
        {
          stepNumber: 2,
          title: newDest,
          landmark: "목적지 빌딩 지하 로비",
          description: "지하 게이트를 통해 목적지에 도착합니다.",
          photoUrl:
            "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=800&q=80",
          photoAlt: "도착지 사진",
          tip: "단차 없는 엘리베이터 이동이 가능합니다.",
          indoor: true,
          elevator: true,
        },
      ],
      highlightTip: newTip || "내가 직접 발견한 최고의 쾌적 지하 지름길입니다!",
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
      setNewTip("");
      setNewPhotoPreview(null);
    }, 1500);
  };

  return (
    <div className="relative min-h-screen bg-[#FAF9F6] text-zinc-900 cute-dots font-sans overflow-x-hidden selection:bg-amber-300 selection:text-zinc-950">
      {/* 1. TOP CUTE ANNOUNCEMENT BAR */}
      <div className="w-full bg-zinc-900 text-white text-xs py-2 px-4 sticky top-0 z-40 shadow-sm">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="bg-amber-400 text-zinc-950 text-[10px] font-bold px-2 py-0.5 rounded-full">
              LIVE
            </span>
            <span className="font-medium text-zinc-200">
              도쿄 · 오사카 · 삿포로 · 후쿠오카 지하 꿀루트 실시간 사진 가이드 연동 중!
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
                사진 & 영상으로 쉽게 찾는 일본 지하 지름길
              </p>
            </div>
          </Link>
        </div>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-bold text-zinc-800">
          <a href="#leaderboard" className="hover:text-amber-600 transition flex items-center gap-1.5">
            <Trophy className="w-4 h-4 text-amber-500" />
            주간 랭킹
          </a>
          <a href="#visual-guide" className="hover:text-amber-600 transition flex items-center gap-1.5">
            <Camera className="w-4 h-4 text-cyan-600" />
            사진/영상 가이드
          </a>
          <a href="#how-it-works" className="hover:text-amber-600 transition flex items-center gap-1.5">
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
            <span>내 루트 등록</span>
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

      {/* 3. HERO SECTION (Warm, Friendly, Visual) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 pb-14 text-center">
        {/* Cute highlight pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 border-2 border-zinc-900 text-xs font-bold text-zinc-900 mb-5 shadow-[2px_2px_0px_#18181b]">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>비 오는 날도, 폭염에도 뽀송뽀송하게! ☂️☀️</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-zinc-950 font-jua tracking-normal leading-[1.2]">
          글로만 보면 헷갈리는 지하 던전?
          <br />
          <span className="bg-amber-300 px-3 py-1 rounded-2xl border-2 border-zinc-900 shadow-[3px_3px_0px_#18181b] inline-block mt-2">
            사진과 영상으로 한눈에
          </span>{" "}
          찾아가세요! 🐾
        </h1>

        <p className="mt-6 text-sm sm:text-lg text-zinc-700 max-w-2xl mx-auto font-medium leading-relaxed">
          신주쿠·우메다의 복잡한 지하 출구와 에어컨 빵빵 지름길을
          <br className="hidden sm:inline" />
          실제 유저들이 촬영한 <strong>랜드마크 사진 & 꿀팁</strong>으로 1초 만에 확인하세요.
        </p>

        {/* Quick Search & Filter Strip */}
        <div className="mt-8 flex flex-wrap justify-center items-center gap-3">
          <a
            href="#visual-guide"
            className="cute-btn-primary px-6 py-3.5 text-sm sm:text-base flex items-center gap-2"
          >
            <Camera className="w-5 h-5" />
            사진 스텝 가이드 보러가기
          </a>
          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="cute-btn-secondary px-6 py-3.5 text-sm sm:text-base flex items-center gap-2"
          >
            <Plus className="w-5 h-5 text-amber-600" />
            내 꿀루트 사진 등록하고 랭커 되기
          </button>
        </div>

        {/* 3 Key Visual Proof Cards */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left max-w-4xl mx-auto">
          <div className="cute-card p-4 bg-white">
            <div className="text-2xl mb-1">📸</div>
            <div className="font-jua text-lg text-zinc-950">실제 출구 사진 안내</div>
            <div className="text-xs text-zinc-600 mt-1">
              "A12 출구" 글자 대신 기둥, 분수대, 백화점 게이트 실사진으로 헷갈림 제로!
            </div>
          </div>

          <div className="cute-card p-4 bg-white">
            <div className="text-2xl mb-1">👑</div>
            <div className="font-jua text-lg text-zinc-950">좋아요 랭킹 보상제</div>
            <div className="text-xs text-zinc-600 mt-1">
              내가 올린 꿀루트가 좋아요(❤️)를 많이 받으면 '명예의 전당' 랭커로 등극!
            </div>
          </div>

          <div className="cute-card p-4 bg-white">
            <div className="text-2xl mb-1">❄️</div>
            <div className="font-jua text-lg text-zinc-950">100% 쾌적 실내 보도</div>
            <div className="text-xs text-zinc-600 mt-1">
              게릴라 폭우 시 우산 사용률 0%, 여름철 아스팔트 폭염 대비 체감 -8°C!
            </div>
          </div>
        </div>
      </section>

      {/* 4. WEEKLY TOP UNDERGROUND ROUTES LEADERBOARD (루트 랭킹 제도) */}
      <section id="leaderboard" className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
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
              이용자들이 직접 걸어보고 감동해서 누른 <strong>좋아요(❤️) 실시간 랭킹</strong>입니다.
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
                {/* Top Rank Badge */}
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
                  <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-zinc-900/80 text-white text-[10px] font-bold px-2 py-0.5 rounded-md backdrop-blur-xs">
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

                {/* Footer details: Author & Badges */}
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

      {/* 5. VISUAL STEP-BY-STEP PHOTO & VIDEO GUIDE (핵심 시각 가이드 뷰어) */}
      <section id="visual-guide" className="max-w-6xl mx-auto px-4 sm:px-6 py-12 scroll-mt-16">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-100 border-2 border-zinc-900 text-xs font-bold text-zinc-900 mb-2">
            <Camera className="w-4 h-4 text-cyan-600" />
            Visual Step-by-Step Navigator
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-zinc-950 font-jua">
            📸 사진으로 한눈에 따라가는 현장 길안내
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 mt-1 max-w-xl mx-auto">
            각 분기점마다 실제 찍힌 사진과 바닥 유도선, 랜드마크를 보며 따라가세요.
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
              </div>

              <h3 className="text-xl sm:text-3xl font-extrabold text-zinc-950 font-jua">
                {currentRoute.title}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 mt-1">
                <strong>{currentRoute.origin}</strong> ➡️ <strong>{currentRoute.destination}</strong>
              </p>
            </div>

            {/* Quick like & stats on viewer */}
            <div className="flex items-center gap-3">
              <button
                onClick={(e) => handleLikeRoute(currentRoute.id, e)}
                className="cute-btn-primary px-4 py-2.5 text-xs sm:text-sm flex items-center gap-2 text-rose-700"
              >
                <Heart className="w-4 h-4 fill-rose-600 text-rose-600" />
                <span className="font-bold text-zinc-950">이 루트 추천 ({currentRoute.likes})</span>
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
                {currentRoute.rainShieldPercent === 100 ? "0m (100% 실내)" : "일부 야외"}
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

          {/* Photo Steps Grid */}
          <div className="space-y-6 my-8">
            <div className="flex items-center justify-between">
              <h4 className="font-jua text-xl text-zinc-950 flex items-center gap-2">
                <Camera className="w-5 h-5 text-amber-500" />
                단계별 현장 사진 & 표지판 확인 (클릭 시 확대)
              </h4>
              <span className="text-xs text-zinc-500">총 {currentRoute.steps.length}단계</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {currentRoute.steps.map((step, idx) => (
                <div
                  key={idx}
                  onClick={() =>
                    setLightboxPhoto({
                      url: step.photoUrl,
                      alt: step.photoAlt,
                      title: step.title,
                      tip: step.tip,
                    })
                  }
                  className="cute-card bg-[#FAF9F6] p-4 cursor-pointer group hover:bg-white transition"
                >
                  {/* Step Number Tag */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="bg-zinc-900 text-amber-300 text-xs font-bold px-2.5 py-0.5 rounded-full font-mono">
                      STEP {step.stepNumber}
                    </span>
                    <span className="text-[11px] font-bold text-zinc-500 flex items-center gap-1">
                      <Maximize2 className="w-3 h-3" /> 크게 보기
                    </span>
                  </div>

                  {/* Photo Container */}
                  <div className="relative w-full h-44 rounded-xl border-2 border-zinc-900 overflow-hidden mb-3">
                    <img
                      src={step.photoUrl}
                      alt={step.photoAlt}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition" />
                    <div className="absolute bottom-2 left-2 bg-zinc-900/80 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur-xs">
                      🔍 {step.landmark}
                    </div>
                  </div>

                  <h5 className="font-jua text-base text-zinc-950 mb-1">{step.title}</h5>
                  <p className="text-xs text-zinc-600 leading-relaxed mb-3">
                    {step.description}
                  </p>

                  <div className="p-2 rounded-xl bg-amber-100/70 border border-amber-300 text-[11px] text-amber-900 font-medium">
                    💡 <strong>길잡이 팁:</strong> {step.tip}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Big Highlight Tip Box */}
          <div className="p-4 rounded-2xl bg-amber-300 border-2 border-zinc-900 shadow-[3px_3px_0px_#18181b] flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-zinc-950 text-amber-300 flex items-center justify-center shrink-0 font-bold">
              🐾
            </div>
            <div>
              <strong className="font-jua text-base text-zinc-950 block">
                치카미치 크리에이터 추천 포인트
              </strong>
              <p className="text-xs sm:text-sm text-zinc-900 mt-0.5 leading-relaxed font-medium">
                {currentRoute.highlightTip}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. UPLOAD ROUTE MODAL (사용자 사진/영상 루트 등록 기능) */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="cute-card bg-white max-w-lg w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto relative animate-in fade-in zoom-in-95">
            <button
              onClick={() => setIsUploadModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full border-2 border-zinc-900 bg-zinc-100 hover:bg-zinc-200 text-zinc-900"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">📸</span>
              <h3 className="font-jua text-2xl text-zinc-950">
                나만의 지하 꿀루트 & 사진 등록하기
              </h3>
            </div>
            <p className="text-xs text-zinc-600 mb-5">
              비 안 맞는 지름길 사진을 공유하면 다른 여행자들이 좋아요(❤️)를 누르고 주간 랭킹에 등록됩니다!
            </p>

            <form onSubmit={handleCreateRoute} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-zinc-900 mb-1">
                  루트 제목 (예: 신주쿠 서쪽 ➡️ 도쿄도청 무빙워크 쾌속길)
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="예: 우메다 화이티 ➡️ 한큐백화점 에어컨 직통로"
                  className="w-full bg-[#FAF9F6] border-2 border-zinc-900 rounded-xl px-3 py-2.5 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-amber-400 font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-zinc-900 mb-1">출발지 (역/개찰구)</label>
                  <input
                    type="text"
                    required
                    value={newOrigin}
                    onChange={(e) => setNewOrigin(e.target.value)}
                    placeholder="예: JR 신주쿠역 서쪽 B1F"
                    className="w-full bg-[#FAF9F6] border-2 border-zinc-900 rounded-xl px-3 py-2 text-xs text-zinc-900 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>
                <div>
                  <label className="block font-bold text-zinc-900 mb-1">도착지 (건물/출구)</label>
                  <input
                    type="text"
                    required
                    value={newDest}
                    onChange={(e) => setNewDest(e.target.value)}
                    placeholder="예: 도쿄도청 지하 로비"
                    className="w-full bg-[#FAF9F6] border-2 border-zinc-900 rounded-xl px-3 py-2 text-xs text-zinc-900 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-zinc-900 mb-1">지역 선택</label>
                <select
                  value={newCity}
                  onChange={(e) => setNewCity(e.target.value)}
                  className="w-full bg-[#FAF9F6] border-2 border-zinc-900 rounded-xl px-3 py-2 text-xs text-zinc-900 font-medium focus:outline-none focus:ring-2 focus:ring-amber-400"
                >
                  <option value="tokyo">🗼 도쿄 (신주쿠/도쿄역/시부야)</option>
                  <option value="osaka">🏯 오사카 (우메다/난바)</option>
                  <option value="sapporo">❄️ 삿포로 (치카호)</option>
                  <option value="fukuoka">🍜 후쿠오카 (텐진)</option>
                  <option value="nagoya">🏯 나고야 (메이에키)</option>
                </select>
              </div>

              {/* Photo Upload Input with Preview */}
              <div>
                <label className="block font-bold text-zinc-900 mb-1">
                  현장 사진 업로드 (표지판/분기점 랜드마크)
                </label>
                <div className="border-2 border-dashed border-zinc-400 hover:border-zinc-900 rounded-2xl p-4 text-center bg-[#FAF9F6] transition cursor-pointer relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                  {newPhotoPreview ? (
                    <div className="relative h-32 w-full rounded-xl overflow-hidden border border-zinc-900">
                      <img
                        src={newPhotoPreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute bottom-1 right-2 bg-zinc-900 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded">
                        사진 첨부됨 (변경 클릭)
                      </span>
                    </div>
                  ) : (
                    <div className="py-3">
                      <UploadCloud className="w-8 h-8 text-amber-500 mx-auto mb-1" />
                      <p className="font-bold text-zinc-900">클릭하여 사진 파일 선택</p>
                      <p className="text-[11px] text-zinc-500">
                        PNG, JPG, 스마트폰 촬영 사진 지원
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block font-bold text-zinc-900 mb-1">
                  길잡이 꿀팁 & 설명
                </label>
                <textarea
                  rows={3}
                  value={newTip}
                  onChange={(e) => setNewTip(e.target.value)}
                  placeholder="예: 7번 출구 에스컬레이터 타고 올라가면 바로 백화점 지하 푸드코트랑 연결돼요!"
                  className="w-full bg-[#FAF9F6] border-2 border-zinc-900 rounded-xl px-3 py-2 text-xs text-zinc-900 focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full cute-btn-primary py-3 text-sm font-bold flex items-center justify-center gap-2 mt-2"
              >
                <UploadCloud className="w-4 h-4" />
                <span>루트 등록하고 좋아요 받기!</span>
              </button>

              {uploadSuccess && (
                <div className="p-3 rounded-xl bg-emerald-100 border-2 border-zinc-900 text-emerald-950 font-bold text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>루트가 성공적으로 등록되었습니다! 랭킹 목록에 반영됩니다.</span>
                </div>
              )}
            </form>
          </div>
        </div>
      )}

      {/* 7. LIGHTBOX MODAL FOR EXPANDED PHOTO VIEW */}
      {lightboxPhoto && (
        <div
          onClick={() => setLightboxPhoto(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs cursor-pointer animate-in fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="cute-card bg-white max-w-2xl w-full p-5 relative overflow-hidden"
          >
            <button
              onClick={() => setLightboxPhoto(null)}
              className="absolute top-3 right-3 p-1.5 rounded-full border-2 border-zinc-900 bg-zinc-100 hover:bg-zinc-200 text-zinc-900 z-10"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="relative w-full h-80 rounded-xl border-2 border-zinc-900 overflow-hidden mb-4 bg-zinc-100">
              <img
                src={lightboxPhoto.url}
                alt={lightboxPhoto.alt}
                className="w-full h-full object-cover"
              />
            </div>

            <h4 className="font-jua text-xl text-zinc-950 mb-1">
              {lightboxPhoto.title}
            </h4>
            <p className="text-xs text-zinc-700 leading-relaxed font-medium">
              💡 {lightboxPhoto.tip}
            </p>
          </div>
        </div>
      )}

      {/* 8. WHY PHOTOS & VIDEOS MATTER */}
      <section id="how-it-works" className="max-w-6xl mx-auto px-4 sm:px-6 py-14 border-t-2 border-zinc-900">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 border-2 border-zinc-900 text-xs font-bold text-zinc-900 mb-2">
            <Sparkles className="w-4 h-4 text-purple-600" />
            Visual Power
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-zinc-950 font-jua">
            왜 글보다 <span className="bg-amber-300 px-2 py-0.5 rounded-lg border border-zinc-900">‘사진과 영상’</span>이 중요할까요?
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 mt-2">
            일반 지도 앱의 평면 텍스트 길안내는 지하에서 무용지물입니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="cute-card bg-white p-6">
            <div className="w-12 h-12 rounded-2xl bg-amber-300 border-2 border-zinc-900 flex items-center justify-center text-xl mb-4 font-bold">
              1
            </div>
            <h3 className="font-jua text-xl text-zinc-950 mb-2">GPS 안 터져도 랜드마크로 1초 식별</h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              지하 깊은 곳에서 GPS가 튕겨도 "빨간색 기둥 앞", "원형 분수대 옆" 실제 사진을 보며 헷갈림 없이 이동할 수 있습니다.
            </p>
          </div>

          <div className="cute-card bg-white p-6">
            <div className="w-12 h-12 rounded-2xl bg-cyan-300 border-2 border-zinc-900 flex items-center justify-center text-xl mb-4 font-bold">
              2
            </div>
            <h3 className="font-jua text-xl text-zinc-950 mb-2">계단 없는 엘리베이터 뷰 확인</h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              무거운 캐리어를 끌거나 유모차를 동반했을 때, 실제로 계단이 없는지 사진으로 미리 확인하고 안심하고 이동하세요.
            </p>
          </div>

          <div className="cute-card bg-white p-6">
            <div className="w-12 h-12 rounded-2xl bg-rose-300 border-2 border-zinc-900 flex items-center justify-center text-xl mb-4 font-bold">
              3
            </div>
            <h3 className="font-jua text-xl text-zinc-950 mb-2">유저 보상 랭킹 시스템</h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              남들이 모르는 나만의 지하 지름길 사진을 등록하고 좋아요를 모아 주간 명예의 전당 랭커 배지를 획득하세요!
            </p>
          </div>
        </div>
      </section>

      {/* 9. FAQ ACCORDION */}
      <section id="faq" className="max-w-4xl mx-auto px-4 sm:px-6 py-12 border-t-2 border-zinc-900">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 font-jua">
            자주 묻는 질문 (FAQ)
          </h2>
          <p className="text-xs text-zinc-600 mt-1">치카미치 이용에 관한 궁금증을 풀어드립니다.</p>
        </div>

        <div className="space-y-3">
          {[
            {
              q: "사진이나 영상을 올리면 정말 랭킹에 반영되나요?",
              a: "네! 사용자들이 등록한 루트에 다른 보행자들이 좋아요(❤️)를 누르면 실시간으로 주간 베스트 랭킹에 반영되며, 1~3위 랭커에게는 특별 프로필 배지와 치카미치 서포터 혜택이 주어집니다.",
            },
            {
              q: "비 오는 날 정말 우산 한 번도 안 펴도 되나요?",
              a: "'우천 100% 회피' 배지가 붙은 루트는 지하철 개찰구부터 목적지 빌딩 지하 로비까지 지상으로 단 1미터도 나가지 않는 100% 지하 연결 통로만 엄선하여 안내합니다.",
            },
            {
              q: "새벽이나 늦은 밤에도 이용할 수 있나요?",
              a: "일본 지하상가와 개별 빌딩 연결 통로는 밤 11시~자정 이후 셔터가 닫히는 곳이 있습니다. 치카미치는 24시간 개방되는 공공 지하보도와 심야 통로 시간표를 함께 제공합니다.",
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
            치카미치 모바일 앱 출시 알림을 신청하시면 <strong>일본 5대 도시 지하 던전 사진 가이드북</strong>을 무료로 보내드립니다.
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
              <span>사전 등록이 완료되었습니다! 출시 소식을 가장 먼저 보내드릴게요.</span>
            </div>
          )}
        </div>
      </section>

      {/* 11. FOOTER */}
      <footer className="border-t-2 border-zinc-900 bg-white py-8 px-4 sm:px-6 text-xs text-zinc-600">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-jua text-base font-bold text-zinc-950">치카미치 (CHIKAMICHI)</span>
            <span>•</span>
            <span>사진·영상 기반 일본 도심 지하 지름길 내비게이션</span>
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
