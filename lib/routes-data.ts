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

export interface RouteData {
  id: string;
  rank: number;
  city: "tokyo" | "osaka" | "fukuoka" | "sapporo";
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

export interface CityMeta {
  id: "tokyo" | "osaka" | "fukuoka" | "sapporo";
  name: string;
  nameEn: string;
  tagline: string;
  description: string;
  coverImage: string;
  icon: string;
  badge: string;
  accentColor: string;
  weather: {
    temp: string;
    condition: string;
    rainProb: string;
    alert: string;
    icon: string;
  };
  undergroundBenefit: string;
  featuredStations: string[];
  totalRoutesCount: number;
}

export const CITIES_DATA: Record<string, CityMeta> = {
  tokyo: {
    id: "tokyo",
    name: "도쿄",
    nameEn: "Tokyo",
    tagline: "신주쿠 · 도쿄역 · 시부야 거대 지하 미로",
    description:
      "지상 신호등 3개와 폭우를 건너뛰는 280m 무빙워크 및 오테마치 오피스 직통 평지길",
    coverImage:
      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80",
    icon: "🗼",
    badge: "도쿄 수도권",
    accentColor: "bg-amber-400",
    weather: {
      temp: "32°C",
      condition: "국지성 소나기",
      rainProb: "80%",
      alert: "지상 강우 주의! 신주쿠/도쿄역 B1F 지하 회랑 권장",
      icon: "🌧️",
    },
    undergroundBenefit: "우천 100% 회피 & 280m 무빙워크 직통",
    featuredStations: ["신주쿠역 서쪽", "도쿄역 마루노우치", "시부야 히카리에"],
    totalRoutesCount: 18,
  },
  osaka: {
    id: "osaka",
    name: "오사카",
    nameEn: "Osaka",
    tagline: "우메다 던전 · 난바워크 쾌속 에어컨길",
    description:
      "복잡하기로 악명 높은 우메다 던전을 3분 만에 돌파하는 분수 광장 랜드마크 쿨루트",
    coverImage:
      "https://images.unsplash.com/photo-1590559899731-a382839e5549?auto=format&fit=crop&w=1200&q=80",
    icon: "🏯",
    badge: "오사카 간사이",
    accentColor: "bg-cyan-400",
    weather: {
      temp: "35°C",
      condition: "폭염 경보",
      rainProb: "10%",
      alert: "체감 38°C 위험! 우메다 화이티 쇼핑몰 공조 냉방 이용 권장",
      icon: "☀️",
    },
    undergroundBenefit: "체감 -8°C 쇼핑몰 공조 냉방 완비",
    featuredStations: ["우메다 화이티", "디아모르 오사카", "난바워크"],
    totalRoutesCount: 14,
  },
  fukuoka: {
    id: "fukuoka",
    name: "후쿠오카",
    nameEn: "Fukuoka",
    tagline: "텐진 지하상가 ➡️ 백화점 4곳 우산 없는 쇼핑",
    description:
      "남유럽풍 돌바닥 텐치카를 따라 파ルコ, 다이마루, 미츠코시 백화점을 우산 없이 직결",
    coverImage:
      "https://images.unsplash.com/photo-1538332576228-eb5b4c4de6f5?auto=format&fit=crop&w=1200&q=80",
    icon: "🍜",
    badge: "후쿠오카 큐슈",
    accentColor: "bg-rose-400",
    weather: {
      temp: "33°C",
      condition: "습도 85% 다습",
      rainProb: "40%",
      alert: "텐진 지하상가(텐치카)로 백화점 4곳 우산 없이 직통 연결",
      icon: "🌦️",
    },
    undergroundBenefit: "클래식 유럽풍 통로 & 백화점 4곳 직결",
    featuredStations: ["텐진 지하상가", "하카타역 B1F", "후쿠오카 공항선"],
    totalRoutesCount: 8,
  },
  sapporo: {
    id: "sapporo",
    name: "삿포로",
    nameEn: "Sapporo",
    tagline: "삿포로역 ➡️ 스스키노 1.9km 폭설·빙판 제로 회랑",
    description:
      "영하 12도 한파와 빙판길 대신 따뜻한 20m 광폭 실내 치카호로 스스키노까지 논스톱",
    coverImage:
      "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=1200&q=80",
    icon: "❄️",
    badge: "삿포로 홋카이도",
    accentColor: "bg-sky-400",
    weather: {
      temp: "22°C / 겨울 -6°C",
      condition: "쾌적 (겨울철 빙판길)",
      rainProb: "20%",
      alert: "빙판길 미끄럼 제로! 치카호 1.9km 직통 회랑 추천",
      icon: "❄️",
    },
    undergroundBenefit: "1.9km 논스톱 광폭 실내 보행 공간",
    featuredStations: ["치카호 1번 게이트", "오도리역 광장", "스스키노 폴타운"],
    totalRoutesCount: 9,
  },
};

export const INITIAL_ROUTES: RouteData[] = [
  // 1. 도쿄 (Tokyo)
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
      badge: "👑 도쿄 1위 길잡이",
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
    id: "tokyo-otemachi-flat",
    rank: 2,
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
      badge: "🥈 도쿄 2위 길잡이",
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

  // 2. 오사카 (Osaka)
  {
    id: "umeda-diamor",
    rank: 1,
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
      badge: "👑 오사카 1위 길잡이",
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
    id: "namba-walk-parks",
    rank: 2,
    city: "osaka",
    cityName: "오사카 · 난바",
    title: "난바역 ➡️ 난바워크 & 난바파크스 지하 논스톱 아케이드",
    origin: "지하철 미도스지선 난바역 북쪽 개찰구",
    destination: "난바파크스 쇼핑몰 B1F 가든 입구",
    duration: "6분",
    distance: "420m",
    rainShieldPercent: 100,
    tempBenefit: "체감 -6°C",
    likes: 540,
    views: 3120,
    author: {
      name: "난바마스터",
      badge: "🥈 오사카 2위 길잡이",
      avatarBg: "bg-sky-400",
    },
    tags: ["🌧️ 우천 100% 회피", "🛍️ 쇼핑몰 직통"],
    coverPhoto:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=80",
    steps: [
      {
        stepNumber: 1,
        title: "출발: 난바역 북쪽 개찰구 나와 난바워크 진입",
        landmark: "고래 광장(Kujira Park) 조형물",
        description: "고래 광장을 지나 남쪽 연결로를 따라 직진합니다.",
        photoUrl:
          "https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=800&q=80",
        photoAlt: "난바워크 통로",
        tip: "지상 도로 공사 구간을 완전히 우회할 수 있습니다.",
        indoor: true,
        elevator: true,
      },
    ],
    highlightTip: "복잡한 난바 교차로 신호등을 전부 건너뛰는 지하 직결 루트!",
  },

  // 3. 후쿠오카 (Fukuoka)
  {
    id: "tenjin-shopping-route",
    rank: 1,
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
      badge: "👑 후쿠오카 1위 길잡이",
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

  // 4. 삿포로 (Sapporo)
  {
    id: "sapporo-chikaho-walk",
    rank: 1,
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
      badge: "👑 삿포로 1위 길잡이",
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
];
