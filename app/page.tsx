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
  SlidersHorizontal,
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
} from "lucide-react";

// Preset routes for demo
interface RoutePreset {
  id: string;
  city: string;
  cityName: string;
  origin: string;
  destination: string;
  duration: string;
  distance: string;
  rainExposure: string;
  tempBenefit: string;
  accessibility: string;
  tags: string[];
  steps: {
    point: string;
    description: string;
    indoor: boolean;
    hasElevator: boolean;
    tag?: string;
  }[];
  tip: string;
}

const PRESET_ROUTES: RoutePreset[] = [
  {
    id: "shinjuku-tochomae",
    city: "tokyo",
    cityName: "도쿄 · 신주쿠",
    origin: "JR 신주쿠역 서쪽 개찰구 (B1F)",
    destination: "도쿄도청 제1본청사 (B1F 연결부)",
    duration: "8분",
    distance: "680m",
    rainExposure: "0m (100% 지하)",
    tempBenefit: "체감 -6°C (냉방 풀가동)",
    accessibility: "전 구간 엘리베이터/경사로 완비",
    tags: ["🌧️ 우천 100% 회피", "❄️ 에어컨 완비", "🛗 배리어프리"],
    steps: [
      {
        point: "JR 신주쿠역 서쪽 지하 개찰구",
        description: "개찰구 나와 직진 후 '도쿄도청 방면 무빙워크' 지하 통로 진입",
        indoor: true,
        hasElevator: true,
        tag: "B1F 메인 통로",
      },
      {
        point: "신주쿠 서쪽 지하 로터리 연결부",
        description: "오다큐 에이스 지하상가를 지나 중앙 지하 보도로 직진",
        indoor: true,
        hasElevator: true,
        tag: "에어컨 존",
      },
      {
        point: "도청 무빙워크 보도 (신주쿠 스카이웨이)",
        description: "냉방 완비된 280m 무빙워크 탑승",
        indoor: true,
        hasElevator: true,
        tag: "무빙워크",
      },
      {
        point: "도쿄도청 제1본청사 B1F 정문",
        description: "지상으로 나가지 않고 건물 지하 게이트로 바로 진입 완료",
        indoor: true,
        hasElevator: true,
        tag: "도착",
      },
    ],
    tip: "비 올 때 지상으로 나가면 횡단보도 3개를 건너야 하지만, 지하 무빙워크를 타면 땀 한 방울 안 흘리고 도착합니다.",
  },
  {
    id: "umeda-dungeon",
    city: "osaka",
    cityName: "오사카 · 우메다",
    origin: "JR 오사카역 중앙 개찰구",
    destination: "한큐 백화점 본점 & 디아모르 오사카",
    duration: "4분",
    distance: "320m",
    rainExposure: "0m (100% 지하)",
    tempBenefit: "체감 -8°C (쇼핑몰 공조)",
    accessibility: "엘리베이터 환승로 지원",
    tags: ["🌧️ 비 안 맞기", "🛍️ 지하상가 직결", "❄️ 쿨 쉘터"],
    steps: [
      {
        point: "JR 오사카역 중앙 지하 계단/E/V",
        description: "B1F로 하강 후 '사우스 게이트 빌딩' 방면 이동",
        indoor: true,
        hasElevator: true,
        tag: "B1F",
      },
      {
        point: "화이티 우메다 (Whity Umeda) 진입",
        description: "쾌적한 지하 쇼핑가 분수 광장을 거쳐 한큐 백화점 지하 푸드홀로 연결",
        indoor: true,
        hasElevator: true,
        tag: "화이티 광장",
      },
      {
        point: "디아모르 오사카 연결 게이트",
        description: "유리 돔 지하 스트리트 통해 목적지 빌딩 지하 로비 도착",
        indoor: true,
        hasElevator: true,
        tag: "도착",
      },
    ],
    tip: "악명 높은 '우메다 던전'에서도 길 잃지 않고 랜드마크 분수대 기준 분기점만 짚어드립니다.",
  },
  {
    id: "tokyo-otemachi",
    city: "tokyo",
    cityName: "도쿄 · 도쿄역/마루노우치",
    origin: "도쿄역 마루노우치 지하 중앙구",
    destination: "오테마치 오피스 타워 B2F",
    duration: "7분",
    distance: "550m",
    rainExposure: "0m (100% 지하)",
    tempBenefit: "체감 -5°C",
    accessibility: "캐리어/휠체어 평지 루트",
    tags: ["🧳 캐리어 최적", "🏢 오피스 직결", "🌧️ 100% 실내"],
    steps: [
      {
        point: "마루노우치 지하 광장",
        description: "신마루비루(新丸ビル) 지하 방면 지하 통로로 진입",
        indoor: true,
        hasElevator: true,
        tag: "마루노우치 지하",
      },
      {
        point: "오테마치 메트로 연결 보도",
        description: "치요다선/마루노우치선 사이 광역 지하 통로 이동",
        indoor: true,
        hasElevator: true,
        tag: "평지 보도",
      },
      {
        point: "오테마치 타워 파이낸셜 빌딩 로비",
        description: "사무동 지하 보안 게이트 직통",
        indoor: true,
        hasElevator: true,
        tag: "도착",
      },
    ],
    tip: "도쿄역에서 오테마치까지 5개 노선 지하 구간이 모두 연결되어 있어 지상 신호대기 없이 통과합니다.",
  },
  {
    id: "sapporo-chikaho",
    city: "sapporo",
    cityName: "삿포로 · 치카호",
    origin: "JR 삿포로역 지하 개찰구",
    destination: "스스키노역 & 다누키코지 상점가",
    duration: "14분",
    distance: "1,900m (1.9km)",
    rainExposure: "0m (폭설/빙판길 0%)",
    tempBenefit: "겨울 난방 20°C / 여름 냉방 22°C",
    accessibility: "전 구간 완만 경사로 & E/V",
    tags: ["❄️ 폭설/빙판 제로", "🚶 1.9km 논스톱", "🎪 지하 이벤트홀"],
    steps: [
      {
        point: "삿포로역 앞 지하보도 (치카호 치카치카)",
        description: "폭 20m의 쾌적한 삿포로 지하 보행 공간 진입",
        indoor: true,
        hasElevator: true,
        tag: "치카호 북쪽 입구",
      },
      {
        point: "오도리역 지하 광장 환승 구간",
        description: "오도리 비세 및 지하철 3개 노선 환승 허브 통과",
        indoor: true,
        hasElevator: true,
        tag: "오도리 허브",
      },
      {
        point: "스스키노 폴타운 (Pole Town)",
        description: "다누키코지 아케이드 및 스스키노 상권 지하 직결",
        indoor: true,
        hasElevator: true,
        tag: "도착",
      },
    ],
    tip: "겨울철 영하 10도와 빙판길 넘어짐 사고 없이, 코트 벗고 가볍게 스스키노까지 걸어갈 수 있습니다.",
  },
  {
    id: "fukuoka-tenjin",
    city: "fukuoka",
    cityName: "후쿠오카 · 텐진",
    origin: "텐진역 지하철 개찰구",
    destination: "후쿠오카 파ルコ & 다이마루 백화점",
    duration: "5분",
    distance: "400m",
    rainExposure: "0m (100% 지하)",
    tempBenefit: "체감 -7°C",
    accessibility: "단차 없는 유럽풍 거리",
    tags: ["🌧️ 우천 100% 회피", "🏛️ 19세기 유럽풍 거리", "🛍️ 백화점 4곳 직결"],
    steps: [
      {
        point: "텐진 지하상가 1번가 (Tenchika)",
        description: "돌바닥과 유럽풍 조명으로 꾸며진 중앙 지하 통로 진입",
        indoor: true,
        hasElevator: true,
        tag: "텐치카 스트리트",
      },
      {
        point: "파ルコ (PARCO) B2F 게이트",
        description: "비 맞지 않고 지하 식품관 및 쇼핑몰로 바로 입장",
        indoor: true,
        hasElevator: true,
        tag: "도착",
      },
    ],
    tip: "텐진의 주요 백화점 4곳(이와타야, 다이마루, 미츠코시, 파ルコ)이 지하 통로로 전부 연결되어 있습니다.",
  },
];

// Live community reports mock data
interface CommunityReport {
  id: string;
  city: string;
  location: string;
  status: "쾌적" | "주의" | "공사중" | "혼잡";
  statusColor: string;
  category: "weather" | "construction" | "facility" | "tip";
  title: string;
  content: string;
  timeAgo: string;
  upvotes: number;
  author: string;
}

const INITIAL_REPORTS: CommunityReport[] = [
  {
    id: "rep-1",
    city: "도쿄",
    location: "신주쿠역 서쪽 B16 출구 부근",
    status: "공사중",
    statusColor: "text-amber-400 border-amber-500/30 bg-amber-500/10",
    category: "construction",
    title: "B16 에스컬레이터 점검 중, B14 엘리베이터 추천",
    content:
      "현재 B16 출구 방면 에스컬레이터 공사로 계단만 이용 가능합니다. 캐리어나 유모차는 B14 엘리베이터로 우회하세요!",
    timeAgo: "8분 전",
    upvotes: 42,
    author: "도쿄통근러",
  },
  {
    id: "rep-2",
    city: "오사카",
    location: "우메다 디아모르 지하 광장",
    status: "쾌적",
    statusColor: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
    category: "weather",
    title: "지금 지상 36도 폭염인데 지하 냉방 21도로 천국입니다",
    content:
      "지상은 아스팔트 열기 때문에 5분만 걸어도 땀범벅인데, 한큐-디아모르 통로는 에어컨 엄청 빵빵하게 틀어져 있어서 쾌적해요.",
    timeAgo: "23분 전",
    upvotes: 89,
    author: "간사이여행중",
  },
  {
    id: "rep-3",
    city: "도쿄",
    location: "도쿄역 마루노우치 ↔ 오테마치 지하 연결로",
    status: "주의",
    statusColor: "text-blue-400 border-blue-500/30 bg-blue-500/10",
    category: "weather",
    title: "바깥 게릴라 폭우 시작됐는데 지하통로로 우산 없이 이동 완료",
    content:
      "야에스 쪽에서 마루노우치 거쳐서 오테마치 오피스까지 지상 한 번도 안 나가고 들어왔습니다. 빗물 하나 안 묻었네요 ㅎㅎ",
    timeAgo: "41분 전",
    upvotes: 67,
    author: "오테마치직장인",
  },
  {
    id: "rep-4",
    city: "후쿠오카",
    location: "텐진 지하상가 6번가",
    status: "쾌적",
    statusColor: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
    category: "facility",
    title: "파ルコ 지하 연결 통로 앞 코인라커 빈자리 넉넉함",
    content:
      "텐진역 지상 라커는 꽉 찼는데 지하 6번가 안쪽 E/V 옆 코인라커는 대형 캐리어 자리 4개 비어있습니다!",
    timeAgo: "1시간 전",
    upvotes: 35,
    author: "텐치카탐험가",
  },
];

export default function Home() {
  const { user, profile, signOut } = useAuth();

  // Active states
  const [selectedRouteId, setSelectedRouteId] = useState<string>("shinjuku-tochomae");
  const [selectedCityFilter, setSelectedCityFilter] = useState<string>("all");
  const [activeTabMode, setActiveTabMode] = useState<"rain" | "heat" | "barrier" | "all">("rain");
  
  // Custom search simulation
  const [searchOrigin, setSearchOrigin] = useState("신주쿠역 서쪽출구");
  const [searchDest, setSearchDest] = useState("도쿄도청");
  const [searchSuccess, setSearchSuccess] = useState(false);

  // Community live reports state
  const [reports, setReports] = useState<CommunityReport[]>(INITIAL_REPORTS);
  const [newReportText, setNewReportText] = useState("");
  const [newReportLocation, setNewReportLocation] = useState("");
  const [showSubmitSuccess, setShowSubmitSuccess] = useState(false);

  // Active FAQ
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Email pre-registration
  const [emailInput, setEmailInput] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  // Current active route object
  const currentRoute =
    PRESET_ROUTES.find((r) => r.id === selectedRouteId) || PRESET_ROUTES[0];

  // Filtered preset routes for selector
  const filteredRoutes =
    selectedCityFilter === "all"
      ? PRESET_ROUTES
      : PRESET_ROUTES.filter((r) => r.city === selectedCityFilter);

  // Handle route simulation search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchSuccess(true);
    setTimeout(() => setSearchSuccess(false), 4000);
  };

  // Handle report upvote
  const handleUpvote = (id: string) => {
    setReports((prev) =>
      prev.map((r) => (r.id === id ? { ...r, upvotes: r.upvotes + 1 } : r))
    );
  };

  // Handle new report submit
  const handleAddReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReportText.trim() || !newReportLocation.trim()) return;

    const authorName =
      profile?.name || user?.email?.split("@")[0] || "지하탐험가 (나)";

    const newRep: CommunityReport = {
      id: `rep-${Date.now()}`,
      city: "도쿄",
      location: newReportLocation,
      status: "주의",
      statusColor: "text-amber-400 border-amber-500/30 bg-amber-500/10",
      category: "tip",
      title: newReportText.slice(0, 30),
      content: newReportText,
      timeAgo: "방금 전",
      upvotes: 1,
      author: authorName,
    };

    setReports([newRep, ...reports]);
    setNewReportText("");
    setNewReportLocation("");
    setShowSubmitSuccess(true);
    setTimeout(() => setShowSubmitSuccess(false), 3500);
  };

  // Handle pre-registration
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) return;
    setSubscribed(true);
    setEmailInput("");
  };

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-500 selection:text-slate-950 underground-grid overflow-hidden">
      {/* Background ambient lighting effects */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-b from-cyan-600/15 via-blue-600/10 to-transparent blur-[140px] rounded-full" />
      <div className="pointer-events-none absolute top-[900px] -left-40 w-[600px] h-[600px] bg-sky-500/10 blur-[150px] rounded-full" />
      <div className="pointer-events-none absolute top-[1800px] -right-40 w-[600px] h-[600px] bg-amber-500/10 blur-[150px] rounded-full" />

      {/* 1. TOP LIVE STATUS BAR */}
      <div className="w-full bg-slate-900/90 border-b border-slate-800/80 backdrop-blur-md text-xs py-2 px-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-semibold text-emerald-400">실시간 데이터 연동 중</span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-300">
              도쿄 · 오사카 · 후쿠오카 · 삿포로 · 나고야 5대 도시 지하보도 지도 v2.5
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <div className="flex items-center gap-1.5 bg-slate-800/80 px-2 py-0.5 rounded text-[11px] border border-slate-700/60">
              <CloudRain className="w-3.5 h-3.5 text-cyan-400" />
              <span>도쿄 강수 80% (비 안 맞기 모드 가동)</span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 bg-slate-800/80 px-2 py-0.5 rounded text-[11px] border border-slate-700/60">
              <Sun className="w-3.5 h-3.5 text-amber-400" />
              <span>오사카 34°C (쿨루트 추천)</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. NAVIGATION HEADER */}
      <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between border-b border-slate-800/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 ring-1 ring-white/20">
            <Footprints className="w-5 h-5 text-white transform -rotate-12" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-100 to-cyan-400 bg-clip-text text-transparent">
                CHIKAMICHI
              </span>
              <span className="text-xs px-1.5 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 font-mono">
                치카미치 · 地下道
              </span>
            </div>
            <p className="text-[11px] text-slate-400">일본 도심 지하 연결망 & 쾌적 보행 내비게이션</p>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <a href="#simulator" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
            <Navigation className="w-4 h-4 text-cyan-400" />
            경로 시뮬레이터
          </a>
          <a href="#features" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            핵심 기능
          </a>
          <a href="#dungeons" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-purple-400" />
            5대 지하 던전 맵
          </a>
          <a href="#community" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
            <Users className="w-4 h-4 text-emerald-400" />
            실시간 제보 피드
          </a>
          <a href="#faq" className="hover:text-cyan-400 transition-colors">
            FAQ
          </a>
        </nav>

        {/* Action Buttons: Auth & App Register */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-2.5">
              <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5">
                <div className="w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 font-bold text-xs flex items-center justify-center">
                  {(profile?.name || user.email || "U")[0].toUpperCase()}
                </div>
                <div className="text-left hidden sm:block">
                  <div className="text-xs font-semibold text-white leading-none truncate max-w-[90px]">
                    {profile?.name || user.email?.split("@")[0]}
                  </div>
                  <div className="text-[10px] text-cyan-400 font-mono capitalize">
                    {profile?.provider || "회원"}
                  </div>
                </div>
                <button
                  onClick={() => signOut()}
                  title="로그아웃"
                  className="p-1 text-slate-400 hover:text-rose-400 transition ml-1"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>

              <a
                href="#preregister"
                className="hidden lg:flex relative group overflow-hidden px-3.5 py-2 rounded-xl font-medium text-xs bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 text-white shadow-md shadow-cyan-500/25 hover:shadow-cyan-500/40 transition"
              >
                <span className="relative z-10 flex items-center gap-1.5">
                  <Smartphone className="w-3.5 h-3.5" />
                  앱 사전 등록
                </span>
              </a>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-900/80 transition border border-transparent hover:border-slate-800 flex items-center gap-1.5"
              >
                <LogIn className="w-3.5 h-3.5 text-cyan-400" />
                로그인
              </Link>
              <Link
                href="/signup"
                className="px-3.5 py-2 rounded-xl font-semibold text-xs bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-md shadow-cyan-500/20 transition flex items-center gap-1.5"
              >
                <UserPlus className="w-3.5 h-3.5" />
                회원가입
              </Link>
            </div>
          )}
        </div>
      </header>

      {/* 3. HERO SECTION */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 lg:pt-20 lg:pb-24">
        {/* Weather condition highlight badges */}
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-cyan-500/30 text-xs font-medium text-cyan-300 shadow-inner">
            <Umbrella className="w-4 h-4 text-cyan-400" />
            <span>비 오는 날 · 우산 사용률 0% 보장</span>
          </div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-amber-500/30 text-xs font-medium text-amber-300 shadow-inner">
            <Sun className="w-4 h-4 text-amber-400" />
            <span>36°C 폭염 탈출 · 에어컨 쿨 쉘터</span>
          </div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-sky-500/30 text-xs font-medium text-sky-300 shadow-inner">
            <Snowflake className="w-4 h-4 text-sky-400" />
            <span>겨울 폭설 · 빙판길 없는 따뜻한 보도</span>
          </div>
        </div>

        {/* Main Headline */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] text-white">
            비바람 치는 날도, 38도 폭염에도
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
              일본 도심 지하 통로로 쾌적하게 직결
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
            복잡한 신주쿠·우메다 던전부터 빌딩 사이 숨은 지하 연결 통로까지.
            <br className="hidden sm:inline" />
            지상으로 나가지 않고 목적지 로비까지 100% 실내로 이어주는
            <br className="hidden sm:inline" />
            <strong className="text-cyan-300 font-semibold">스마트 지하 보행자 내비게이션 & 정보 공유 플랫폼</strong>
          </p>

          {/* Quick CTA Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#simulator"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:brightness-110 transition flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              <Navigation className="w-5 h-5" />
              지하 경로 바로 체험하기
            </a>
            <a
              href="#community"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-slate-200 font-medium hover:bg-slate-800 hover:text-white transition flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              <Users className="w-5 h-5 text-emerald-400" />
              실시간 지하 정보 제보 확인
            </a>
          </div>

          {/* Key Stats Strip */}
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto text-left">
            <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400">100%</div>
              <div className="text-xs text-slate-400 mt-1">우천 시 실내 지하 통로 비율</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-400">-7.5°C</div>
              <div className="text-xs text-slate-400 mt-1">여름철 지상 대비 체감 온도 절감</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-extrabold text-indigo-400">5대 도시</div>
              <div className="text-xs text-slate-400 mt-1">도쿄·오사카·나고야·후쿠오카·삿포로</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">2,400+</div>
              <div className="text-xs text-slate-400 mt-1">연결 빌딩 & 지하 출구 데이터</div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. INTERACTIVE ROUTE SIMULATOR (CORE VALUE DEMO) */}
      <section id="simulator" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 scroll-mt-16">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Compass className="w-3.5 h-3.5" />
            Interactive Route Simulator
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
            어디로 가시나요? <span className="text-cyan-400">비 안 맞는 최적 지하길</span>을 찾아드립니다
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-xl mx-auto">
            실제 일본 주요 환승역과 랜드마크 빌딩 사이의 지하 연결 동선을 인터랙티브하게 확인해보세요.
          </p>
        </div>

        {/* Route Selector & Details Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Preset Routes & Filters */}
          <div className="lg:col-span-5 space-y-4">
            {/* City Filter Pills */}
            <div className="flex items-center gap-2 p-1.5 bg-slate-900/90 rounded-xl border border-slate-800 overflow-x-auto">
              <button
                onClick={() => setSelectedCityFilter("all")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition whitespace-nowrap ${
                  selectedCityFilter === "all"
                    ? "bg-cyan-500 text-slate-950 font-bold shadow"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                전체 도시
              </button>
              <button
                onClick={() => setSelectedCityFilter("tokyo")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition whitespace-nowrap ${
                  selectedCityFilter === "tokyo"
                    ? "bg-cyan-500 text-slate-950 font-bold shadow"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                🗼 도쿄 (신주쿠/도쿄역)
              </button>
              <button
                onClick={() => setSelectedCityFilter("osaka")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition whitespace-nowrap ${
                  selectedCityFilter === "osaka"
                    ? "bg-cyan-500 text-slate-950 font-bold shadow"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                🏯 오사카 (우메다)
              </button>
              <button
                onClick={() => setSelectedCityFilter("sapporo")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition whitespace-nowrap ${
                  selectedCityFilter === "sapporo"
                    ? "bg-cyan-500 text-slate-950 font-bold shadow"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                ❄️ 삿포로 (치카호)
              </button>
              <button
                onClick={() => setSelectedCityFilter("fukuoka")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition whitespace-nowrap ${
                  selectedCityFilter === "fukuoka"
                    ? "bg-cyan-500 text-slate-950 font-bold shadow"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                🍜 후쿠오카 (텐진)
              </button>
            </div>

            {/* List of preset routes */}
            <div className="space-y-2.5">
              {filteredRoutes.map((route) => {
                const isSelected = route.id === selectedRouteId;
                return (
                  <div
                    key={route.id}
                    onClick={() => setSelectedRouteId(route.id)}
                    className={`p-4 rounded-xl cursor-pointer border transition-all ${
                      isSelected
                        ? "bg-slate-900 border-cyan-500 shadow-lg shadow-cyan-500/10 ring-1 ring-cyan-500/50"
                        : "bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/90"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-cyan-400">{route.cityName}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono">
                        {route.duration} ({route.distance})
                      </span>
                    </div>

                    <div className="mt-2 text-sm font-semibold text-white flex items-center gap-2">
                      <span className="truncate">{route.origin}</span>
                      <ChevronRight className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span className="truncate text-cyan-200">{route.destination}</span>
                    </div>

                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      {route.tags.map((t, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] px-2 py-0.5 rounded bg-slate-800/90 text-slate-300 border border-slate-700/50"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Custom search box prompt */}
            <form
              onSubmit={handleSearch}
              className="p-4 rounded-xl bg-slate-900/70 border border-slate-800/80 space-y-3"
            >
              <div className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Search className="w-3.5 h-3.5 text-cyan-400" />
                직접 원하는 건물/역 검색해보기 (데모)
              </div>
              <div className="space-y-2 text-xs">
                <div className="relative">
                  <input
                    type="text"
                    value={searchOrigin}
                    onChange={(e) => setSearchOrigin(e.target.value)}
                    placeholder="출발 역/출구 (예: 신주쿠역 서쪽출구)"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div className="relative">
                  <input
                    type="text"
                    value={searchDest}
                    onChange={(e) => setSearchDest(e.target.value)}
                    placeholder="도착 건물/장소 (예: 도쿄도청 제1본청사)"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-cyan-300 font-medium rounded-lg text-xs transition border border-cyan-500/20 flex items-center justify-center gap-1.5"
              >
                <Zap className="w-3.5 h-3.5 text-cyan-400" />
                지하 100% 최적 경로 탐색
              </button>
              {searchSuccess && (
                <div className="p-2 rounded bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>{searchOrigin} ➡️ {searchDest} 100% 지하 연결로가 탐색되었습니다!</span>
                </div>
              )}
            </form>
          </div>

          {/* Right Column: Detailed Underground Route Blueprint */}
          <div className="lg:col-span-7 p-6 rounded-2xl bg-slate-900 border border-slate-800/90 shadow-2xl relative overflow-hidden">
            {/* Decorative underground cross-section accent */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

            {/* Header of Active Route */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    {currentRoute.cityName}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">ID: {currentRoute.id}</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
                  {currentRoute.origin} ➡️ {currentRoute.destination}
                </h3>
              </div>

              {/* Status summary badges */}
              <div className="flex items-center gap-2">
                <div className="text-right">
                  <div className="text-xs text-slate-400">예상 소요시간</div>
                  <div className="text-base font-bold text-cyan-400">{currentRoute.duration}</div>
                </div>
              </div>
            </div>

            {/* Route Conditions Matrix */}
            <div className="grid grid-cols-3 gap-3 my-5">
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
                <div className="flex items-center justify-center text-cyan-400 mb-1">
                  <Umbrella className="w-4 h-4 mr-1" />
                  <span className="text-[11px] font-semibold text-slate-400">우산 필요도</span>
                </div>
                <div className="text-xs sm:text-sm font-bold text-cyan-300">{currentRoute.rainExposure}</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
                <div className="flex items-center justify-center text-amber-400 mb-1">
                  <Thermometer className="w-4 h-4 mr-1" />
                  <span className="text-[11px] font-semibold text-slate-400">온도 체감</span>
                </div>
                <div className="text-xs sm:text-sm font-bold text-amber-300">{currentRoute.tempBenefit}</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
                <div className="flex items-center justify-center text-emerald-400 mb-1">
                  <Accessibility className="w-4 h-4 mr-1" />
                  <span className="text-[11px] font-semibold text-slate-400">이동 편의</span>
                </div>
                <div className="text-xs sm:text-sm font-bold text-emerald-300">엘리베이터 완비</div>
              </div>
            </div>

            {/* Step-by-Step Underground Cross-Section Timeline */}
            <div className="space-y-4 my-6">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Footprints className="w-3.5 h-3.5 text-cyan-400" />
                지하 상세 통로 가이드 (단계별)
              </div>

              <div className="relative pl-6 space-y-5 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-gradient-to-b before:from-cyan-500 before:via-blue-500 before:to-indigo-500">
                {currentRoute.steps.map((step, idx) => (
                  <div key={idx} className="relative group">
                    {/* Timeline Node Point */}
                    <div className="absolute -left-[27px] top-1 w-5 h-5 rounded-full bg-slate-950 border-2 border-cyan-400 flex items-center justify-center shadow-md">
                      <div className="w-2 h-2 rounded-full bg-cyan-400 group-hover:scale-125 transition" />
                    </div>

                    <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800/80 hover:border-cyan-500/40 transition">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-slate-100 flex items-center gap-2">
                          <span className="text-xs text-cyan-400 font-mono">STEP {idx + 1}</span>
                          {step.point}
                        </span>
                        {step.tag && (
                          <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 font-mono">
                            {step.tag}
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-xs text-slate-300 leading-relaxed">{step.description}</p>
                      <div className="mt-2 flex items-center gap-3 text-[11px] text-slate-400">
                        {step.indoor && (
                          <span className="flex items-center gap-1 text-cyan-300">
                            <CheckCircle2 className="w-3 h-3 text-cyan-400" /> 100% 실내 냉방구간
                          </span>
                        )}
                        {step.hasElevator && (
                          <span className="flex items-center gap-1 text-emerald-300">
                            <CheckCircle2 className="w-3 h-3 text-emerald-400" /> 계단 없음 (E/V 연계)
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Underground Tip Box */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-blue-950/50 to-cyan-950/50 border border-cyan-500/30 text-xs text-cyan-200 flex items-start gap-3">
              <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block mb-0.5 font-semibold">치카미치 지하 꿀팁:</strong>
                {currentRoute.tip}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CORE FEATURES & VALUE PROPOSITIONS */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-16">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-500/30 text-blue-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            Core Benefits
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
            왜 지상이 아닌 <span className="text-cyan-400">‘지하 통로’</span>로 가야 할까요?
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            일본 도심은 세계에서 가장 정교한 지하 연결망을 갖추고 있습니다.
            기후 위기와 계단 스트레스에서 완벽히 해방되세요.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Feature 1: Rain & Weather Shield */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 transition-all group hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4 group-hover:scale-110 transition">
              <Umbrella className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">100% 젖지 않는 우천 회피 모드</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              갑작스러운 일본의 게릴라성 호우, 태풍, 폭설 시에도 우산을 펼칠 필요 없이 빌딩과 역사를 잇는 지하 연결로만 골라 안내합니다.
            </p>
            <ul className="mt-4 space-y-1.5 text-xs text-slate-300">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> 우산 젖음 방지 및 신발 오염 방지
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> 지상 횡단보도 신호 대기 시간 제로
              </li>
            </ul>
          </div>

          {/* Feature 2: Heatwave Cooling Shelter */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/50 transition-all group hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4 group-hover:scale-110 transition">
              <Sun className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">여름철 38도 폭염 탈출 쿨 루트</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              직사광선과 아스팔트 열기가 내리쬐는 지상 대신 22°C로 냉방이 유지되는 지하상가와 백화점 지하 통로를 우선 배정합니다.
            </p>
            <ul className="mt-4 space-y-1.5 text-xs text-slate-300">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" /> 열사병 위험 및 땀 흘림 최소화
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" /> 카페, 편의점, 음료 자판기 연계 휴식
              </li>
            </ul>
          </div>

          {/* Feature 3: Dungeon Navigation */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-purple-500/50 transition-all group hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-4 group-hover:scale-110 transition">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">복잡한 지하 미로 3D 층별 로드맵</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              일명 '우메다 던전', '신주쿠 던전'이라 불리는 복층 구조의 지하상가에서도 랜드마크와 출구 번호 기준으로 직관적 길 찾기를 제공합니다.
            </p>
            <ul className="mt-4 space-y-1.5 text-xs text-slate-300">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" /> 출구 번호(A1, B5 등) 및 상징물 가이드
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" /> 지하철 노선 간 최적 지하 환승 코스
              </li>
            </ul>
          </div>

          {/* Feature 4: Barrier-Free & Luggage */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/50 transition-all group hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-110 transition">
              <Accessibility className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">캐리어 & 유모차 전용 배리어프리</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              계단 지옥에 갇히지 않도록 엘리베이터, 에스컬레이터, 경사로만으로 이어지는 100% 무계단 평지 동선을 찾아냅니다.
            </p>
            <ul className="mt-4 space-y-1.5 text-xs text-slate-300">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> 무거운 여행 캐리어 및 유모차 안심 이동
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> 휠체어 전용 승강기 위치 실시간 체크
              </li>
            </ul>
          </div>

          {/* Feature 5: Realtime Crowd & Construction */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-rose-500/50 transition-all group hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 mb-4 group-hover:scale-110 transition">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">실시간 공사 · 폐쇄 통로 우회 안내</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              야간/휴일 빌딩 통로 폐쇄 시간, 에스컬레이터 점검, 리뉴얼 공사 구역을 실시간 반영하여 헛걸음을 원천 차단합니다.
            </p>
            <ul className="mt-4 space-y-1.5 text-xs text-slate-300">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-rose-400" /> 빌딩별 지하 셔터 개폐 시간표 제공
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-rose-400" /> 유저 제보 기반 빠른 우회로 자동 갱신
              </li>
            </ul>
          </div>

          {/* Feature 6: Community Knowledge Sharing */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-sky-500/50 transition-all group hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 mb-4 group-hover:scale-110 transition">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">현지인 & 여행자 정보 공유 커뮤니티</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              "이 통로 끝에 숨은 화장실이 있어요", "이쪽 백화점 지하 식품관이 덜 붐벼요" 등 생생한 지하 꿀팁을 나누는 커뮤니티.
            </p>
            <ul className="mt-4 space-y-1.5 text-xs text-slate-300">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" /> 코인라커 빈자리 및 쾌적 화장실 팁
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" /> 지하 맛집 & 디저트 거리 추천
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 6. JAPAN'S 5 MAJOR UNDERGROUND DUNGEON HUBS */}
      <section id="dungeons" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-16">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Layers className="w-3.5 h-3.5" />
            Major Underground Networks
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
            일본 5대 메가 지하 통로 네트워크
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            도시 전체가 지하로 연결된 일본의 대표 지하 회랑들을 치카미치가 모두 매핑했습니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Tokyo Shinjuku */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 relative overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-lg border border-cyan-500/30">
                도쿄 · 신주쿠
              </span>
              <span className="text-xs text-slate-400 font-mono">총 연장 12km+</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">신주쿠 메가 서브웨이 던전</h3>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-4">
              세계 최대 이용객의 신주쿠역. 서쪽 로터리부터 도쿄도청, 동쪽 가부키초 입구와 신주쿠 3초메 백화점 라인까지 지하로 관통합니다.
            </p>
            <div className="text-xs text-slate-300 bg-slate-950/80 p-3 rounded-xl border border-slate-800 space-y-1">
              <div>🔗 <strong>직결 랜드마크:</strong> 도쿄도청, 이세탄, 게이오 백화점, 룸네</div>
              <div>⚡ <strong>치카미치 강점:</strong> 서쪽 무빙워크 100% 비 차단 루트</div>
            </div>
          </div>

          {/* Card 2: Osaka Umeda */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 relative overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-amber-400 bg-amber-950/80 px-2.5 py-1 rounded-lg border border-amber-500/30">
                오사카 · 우메다
              </span>
              <span className="text-xs text-slate-400 font-mono">일명 '우메다 던전'</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">우메다 화이티 & 디아모르</h3>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-4">
              JR 오사카역, 한큐, 한신, 오사카 메트로 3개선이 얽힌 일본 최고의 지하 미로. 길을 잃지 않는 분수 광장 기준 길 안내 지원.
            </p>
            <div className="text-xs text-slate-300 bg-slate-950/80 p-3 rounded-xl border border-slate-800 space-y-1">
              <div>🔗 <strong>직결 랜드마크:</strong> 그랜드 프론트 오사카, 루쿠아, 한큐 본점</div>
              <div>⚡ <strong>치카미치 강점:</strong> 분기점별 사진 랜드마크 팝업</div>
            </div>
          </div>

          {/* Card 3: Sapporo Chikaho */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 relative overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-sky-400 bg-sky-950/80 px-2.5 py-1 rounded-lg border border-sky-500/30">
                삿포로 · 치카호
              </span>
              <span className="text-xs text-slate-400 font-mono">직선 1.9km</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">삿포로역 앞 지하보도 (Chi-Ka-Ho)</h3>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-4">
              겨울철 폭설과 얼어붙은 빙판길을 완벽히 피해 JR 삿포로역에서 오도리 공원을 거쳐 스스키노까지 논스톱으로 따뜻하게 직진합니다.
            </p>
            <div className="text-xs text-slate-300 bg-slate-950/80 p-3 rounded-xl border border-slate-800 space-y-1">
              <div>🔗 <strong>직결 랜드마크:</strong> 오도리 비세, 다누키코지, 폴타운, 오로라타운</div>
              <div>⚡ <strong>치카미치 강점:</strong> 겨울철 난방 구간 및 평지 배리어프리</div>
            </div>
          </div>

          {/* Card 4: Fukuoka Tenjin */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 relative overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-lg border border-emerald-500/30">
                후쿠오카 · 텐진
              </span>
              <span className="text-xs text-slate-400 font-mono">19세기 남유럽풍</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">텐진 지하상가 (텐치카)</h3>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-4">
              남북 590m 2열로 늘어선 유럽풍 지하상가. 텐진 주요 4대 백화점과 지하철 2개 노선, 버스 터미널을 우산 없이 직결합니다.
            </p>
            <div className="text-xs text-slate-300 bg-slate-950/80 p-3 rounded-xl border border-slate-800 space-y-1">
              <div>🔗 <strong>직결 랜드마크:</strong> 파ルコ, 이와타야, 다이마루, 솔라리아 플라자</div>
              <div>⚡ <strong>치카미치 강점:</strong> 백화점 지하 식품관/출구 최단 동선</div>
            </div>
          </div>

          {/* Card 5: Tokyo Marunouchi/Otemachi */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 relative overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-blue-400 bg-blue-950/80 px-2.5 py-1 rounded-lg border border-blue-500/30">
                도쿄 · 도쿄역-오테마치
              </span>
              <span className="text-xs text-slate-400 font-mono">일본 최대 비즈니스 회랑</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">마루노우치 & 긴자 롱패스</h3>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-4">
              도쿄역에서 오테마치, 유라쿠초, 히비야, 긴자역까지 모두 지하 통로로 이어지는 초거대 비즈니스 워킹 스트리트.
            </p>
            <div className="text-xs text-slate-300 bg-slate-950/80 p-3 rounded-xl border border-slate-800 space-y-1">
              <div>🔗 <strong>직결 랜드마크:</strong> 마루비루, 도쿄 미드타운 히비야, 긴자식스 방면</div>
              <div>⚡ <strong>치카미치 강점:</strong> 직장인 출퇴근 최단/냉방 우선 루트</div>
            </div>
          </div>

          {/* Card 6: Nagoya Meieki */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 relative overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-indigo-400 bg-indigo-950/80 px-2.5 py-1 rounded-lg border border-indigo-500/30">
                나고야 · 메이에키
              </span>
              <span className="text-xs text-slate-400 font-mono">산로드 & 에스카</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">나고야역 거대 지하 스트리트</h3>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-4">
              신칸센 출구의 에스카 지하가부터 동쪽 출구 산로드, 미드랜드 스퀘어까지 나고야 도심을 가로지르는 지하 회랑.
            </p>
            <div className="text-xs text-slate-300 bg-slate-950/80 p-3 rounded-xl border border-slate-800 space-y-1">
              <div>🔗 <strong>직결 랜드마크:</strong> JR 게이트 타워, 미드랜드 스퀘어, 다카시마야</div>
              <div>⚡ <strong>치카미치 강점:</strong> 신칸센 환승객 전용 캐리어 길 안내</div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. LIVE COMMUNITY REPORTS & BOARD */}
      <section id="community" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-16 border-t border-slate-800/60">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Users className="w-3.5 h-3.5" />
            Live Crowd Sourcing
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
            유저들이 실시간으로 공유하는 <span className="text-emerald-400">지하 통로 생생 리포트</span>
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            에스컬레이터 공사, 지하 침수, 에어컨 상태, 코인라커 잔여 정보까지 지금 지하 현장 소식을 실시간으로 확인하고 제보하세요.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Live Feed List */}
          <div className="lg:col-span-7 space-y-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
                <BellRing className="w-3.5 h-3.5 text-emerald-400" />
                실시간 최신 제보 피드
              </span>
              <span className="text-xs text-slate-500">자동 새로고침 켜짐</span>
            </div>

            {reports.map((report) => (
              <div
                key={report.id}
                className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition"
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-200">{report.city}</span>
                    <span className="text-xs text-slate-400">•</span>
                    <span className="text-xs text-cyan-300 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {report.location}
                    </span>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${report.statusColor}`}
                  >
                    {report.status}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-white mb-1">{report.title}</h4>
                <p className="text-xs text-slate-300 leading-relaxed mb-3">{report.content}</p>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800/60">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400">작성자: {report.author}</span>
                    <span>•</span>
                    <span className="text-slate-500">{report.timeAgo}</span>
                  </div>
                  <button
                    onClick={() => handleUpvote(report.id)}
                    className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-cyan-300 transition"
                  >
                    👍 도움이 돼요 <span className="text-cyan-400 font-mono">{report.upvotes}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Submit New Report Widget */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
            <div className="flex items-center gap-2 text-white font-bold text-base mb-1">
              <Send className="w-4 h-4 text-emerald-400" />
              내가 발견한 지하 정보 제보하기
            </div>
            <p className="text-xs text-slate-400 mb-4">
              공사 중인 통로나 시원한 지름길을 알려주시면 다른 보행자들에게 즉시 공유됩니다.
            </p>

            <form onSubmit={handleAddReport} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">위치 (역 이름 및 통로 번호)</label>
                <input
                  type="text"
                  value={newReportLocation}
                  onChange={(e) => setNewReportLocation(e.target.value)}
                  placeholder="예: 신주쿠역 서쪽 B12 출구 통로"
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">제보 내용 (현장 상황 & 꿀팁)</label>
                <textarea
                  rows={4}
                  value={newReportText}
                  onChange={(e) => setNewReportText(e.target.value)}
                  placeholder="예: 에어컨이 고장 나서 덥습니다 / 에스컬레이터 점검 중이니 B10 엘리베이터 이용하세요!"
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-emerald-500 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold rounded-lg text-xs transition shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                실시간 지하 정보 등록하기
              </button>

              {showSubmitSuccess && (
                <div className="p-3 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>제보가 성공적으로 등록되었습니다! 감사합니다.</span>
                </div>
              )}
            </form>

            <div className="mt-5 p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-[11px] text-slate-400">
              💡 <strong>제보 혜택:</strong> 검증된 지하 정보를 제보해주신 분께는 '치카미치 서포터 배지'와 광고 제거 혜택을 드립니다.
            </div>
          </div>
        </div>
      </section>

      {/* 8. REAL USER USE CASES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
            이런 분들에게 특히 필요합니다
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            여행자부터 현지 통근자까지, 다양한 상황에서 지하 통로는 최고의 선택지입니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 relative">
            <div className="text-2xl mb-3">🧳</div>
            <h3 className="text-base font-bold text-white mb-2">무거운 캐리어를 든 일본 여행자</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              "비 오는 날 28인치 캐리어 끌고 우산까지 드는 건 악몽이었어요. 치카미치 덕분에 도쿄역에서 호텔 로비까지 계단 없이 엘리베이터로만 쾌적하게 도착했습니다."
            </p>
            <div className="mt-4 text-[11px] text-cyan-400 font-semibold">— 도쿄 4박 5일 여행자 이**님</div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 relative">
            <div className="text-2xl mb-3">💼</div>
            <h3 className="text-base font-bold text-white mb-2">정장 차림의 도쿄/오사카 비즈니스맨</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              "한여름 37도 폭염에 셔츠가 땀에 젖어 미팅에 들어가는 게 늘 곤욕이었는데, 오테마치 지하 연결 통로로만 다니니 땀 한 방울 안 흘리고 출근합니다."
            </p>
            <div className="mt-4 text-[11px] text-cyan-400 font-semibold">— 마루노우치 IT 기업 근무 박**님</div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 relative">
            <div className="text-2xl mb-3">👶</div>
            <h3 className="text-base font-bold text-white mb-2">유모차 및 아이 동반 가족</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              "우메다 지하에서 유모차를 끌고 계단 때문에 몇 번을 돌아갔는지 몰라요. 치카미치의 배리어프리 전용 맵 덕분에 휠체어/유모차 전용 길로 편하게 다녔어요."
            </p>
            <div className="mt-4 text-[11px] text-cyan-400 font-semibold">— 가족 여행자 김**님</div>
          </div>
        </div>
      </section>

      {/* 9. FAQ ACCORDION */}
      <section id="faq" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-16 border-t border-slate-800/60">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Info className="w-3.5 h-3.5 text-cyan-400" />
            Frequently Asked Questions
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">자주 묻는 질문</h2>
        </div>

        <div className="space-y-3">
          {[
            {
              q: "일반 지도 앱(구글 맵 등)의 도보 안내와 무엇이 다른가요?",
              a: "구글 맵 등 일반 내비게이션은 주로 지상 도로와 횡단보도를 기준으로 최단거리를 안내하여 폭우나 폭염 시에도 야외로 걷게 만듭니다. 치카미치는 일본 도심의 '지하도-지하상가-빌딩 연결 통로'만을 전문적으로 분석하여 비를 0% 맞거나 냉방을 100% 누릴 수 있는 실내 특화 동선을 제공합니다.",
            },
            {
              q: "GPS가 잘 잡히지 않는 지하 공간에서 어떻게 위치를 찾나요?",
              a: "지하 주요 분기점의 출구 번호(예: B12, A5), 지하상가 기둥 랜드마크, 상점 간판 및 바닥 유도선 기반의 단계별 스텝 가이드(Step-by-Step)를 제공합니다. 또한 최신 비콘(Beacon) 및 QR 체크인 연동 기술을 도입하고 있습니다.",
            },
            {
              q: "밤이나 새벽에도 빌딩 지하 통로를 이용할 수 있나요?",
              a: "지하상가 및 개별 빌딩 연결 통로는 건물마다 개방 시간(셔터 닫히는 시간)이 다릅니다. 치카미치는 빌딩별 통로 운영 시간표 데이터를 보유하고 있어, 심야/이른 아침에는 개방된 24시간 공공 지하 보도로만 자동 우회 안내합니다.",
            },
            {
              q: "현재 어떤 도시들이 지원되나요?",
              a: "현재 도쿄(신주쿠, 시부야, 도쿄역/마루노우치/오테마치, 긴자/유라쿠초, 이케부쿠로), 오사카(우메다, 난바), 삿포로(치카호 일대), 후쿠오카(텐진, 하카타), 나고야(메이에키) 등 일본 5대 핵심 도심이 완벽 지원됩니다.",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="rounded-xl bg-slate-900/80 border border-slate-800 overflow-hidden transition"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-4 text-left flex items-center justify-between font-semibold text-sm sm:text-base text-slate-200 hover:text-white"
              >
                <span>{item.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-cyan-400 transition-transform duration-200 shrink-0 ml-2 ${
                    openFaq === idx ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openFaq === idx && (
                <div className="px-4 pb-4 text-xs sm:text-sm text-slate-400 leading-relaxed border-t border-slate-800/60 pt-3">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 10. PRE-REGISTRATION & CTA */}
      <section
        id="preregister"
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-16 text-center"
      >
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900 to-cyan-950/40 border border-cyan-500/30 shadow-2xl relative overflow-hidden">
          <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mx-auto mb-6 shadow-inner">
            <Footprints className="w-8 h-8" />
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            다음 일본 방문, 우산 없이 쾌적하게 걸어보세요
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
            치카미치 모바일 앱 출시 알림 및 베타 테스터에 등록하시면
            <br />
            <strong>일본 5대 도시 지하 던전 고화질 오프라인 지도 패키지</strong>를 무료로 보내드립니다.
          </p>

          <form onSubmit={handleSubscribe} className="mt-8 max-w-md mx-auto flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              placeholder="이메일 주소를 입력해주세요"
              required
              className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-sm hover:brightness-110 transition shadow-lg shadow-cyan-500/30 flex items-center justify-center gap-1.5"
            >
              사전 등록하기
            </button>
          </form>

          {subscribed && (
            <div className="mt-4 p-3 max-w-md mx-auto rounded-xl bg-cyan-950/90 border border-cyan-500/40 text-cyan-300 text-xs flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              <span>사전 등록이 완료되었습니다! 정식 출시 시 가장 먼저 안내해 드리겠습니다.</span>
            </div>
          )}

          <div className="mt-6 flex flex-wrap justify-center items-center gap-6 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> iOS & Android 동시 지원 예정
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> 스팸 없는 출시 알림 1회 발송
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> 100% 무료 오프라인 지도 제공
            </span>
          </div>
        </div>
      </section>

      {/* 11. FOOTER */}
      <footer className="border-t border-slate-800/80 bg-slate-950 text-slate-400 text-xs py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm">
              C
            </div>
            <div>
              <div className="text-white font-bold text-sm">CHIKAMICHI (치카미치 · 地下道)</div>
              <p className="text-[11px] text-slate-400">일본 도심 지하 통로 쾌적 보행 내비게이션</p>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-slate-400">
            <a href="#simulator" className="hover:text-slate-200 transition">
              경로 시뮬레이터
            </a>
            <a href="#features" className="hover:text-slate-200 transition">
              핵심 기능
            </a>
            <a href="#dungeons" className="hover:text-slate-200 transition">
              5대 지하 던전 맵
            </a>
            <a href="#community" className="hover:text-slate-200 transition">
              실시간 제보
            </a>
            <a href="#faq" className="hover:text-slate-200 transition">
              이용 안내
            </a>
          </div>

          <div className="text-slate-400 text-center md:text-right">
            <div>© 2026 CHIKAMICHI Project. All rights reserved.</div>
            <div className="text-[10px] mt-0.5">Designed for comfortable walking in Japan's weather.</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
