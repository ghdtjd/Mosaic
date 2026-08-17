"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import {
  Footprints,
  Mail,
  Lock,
  User,
  MapPin,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Loader2,
  ShieldCheck,
  ChevronLeft,
  Sparkles,
} from "lucide-react";

function SignupFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, signInWithGoogle, signInWithLine, signUpWithEmail, isLoading } =
    useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [preferredCity, setPreferredCity] = useState("tokyo");
  const [agreeTerms, setAgreeTerms] = useState(true);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [oauthLoading, setOauthLoading] = useState<"google" | "line" | null>(
    null
  );

  const returnTo = searchParams?.get("returnTo") || "/";

  useEffect(() => {
    if (user && !isLoading) {
      router.push(returnTo);
    }
  }, [user, isLoading, router, returnTo]);

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!agreeTerms) {
      setErrorMessage("이용약관 및 개인정보 처리방침에 동의해 주세요.");
      return;
    }

    if (password.length < 6) {
      setErrorMessage("비밀번호는 최소 6자 이상이어야 합니다.");
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error, requireVerification } = await signUpWithEmail(
        email,
        password,
        name,
        preferredCity
      );

      if (error) {
        setErrorMessage(
          error.message || "회원가입에 실패했습니다. 입력 정보를 확인해 주세요."
        );
      } else if (requireVerification) {
        setSuccessMessage(
          "회원가입이 완료되었습니다! 입력하신 이메일로 인증 메일이 발송되었으니 확인 후 로그인해 주세요."
        );
      } else {
        setSuccessMessage("환영합니다! 회원가입이 성공적으로 완료되었습니다.");
        setTimeout(() => {
          router.push(returnTo);
        }, 1200);
      }
    } catch (err: any) {
      setErrorMessage(
        err?.message || "회원가입 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignup = async () => {
    setErrorMessage(null);
    setOauthLoading("google");
    try {
      await signInWithGoogle();
    } catch (err: any) {
      setErrorMessage(
        err?.message || "Google 계정 연동에 실패했습니다. 다시 시도해 주세요."
      );
      setOauthLoading(null);
    }
  };

  const handleLineSignup = async () => {
    setErrorMessage(null);
    setOauthLoading("line");
    try {
      await signInWithLine();
    } catch (err: any) {
      setErrorMessage(
        err?.message || "LINE 계정 연동에 실패했습니다. 다시 시도해 주세요."
      );
      setOauthLoading(null);
    }
  };

  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-md px-4">
      {/* Brand Header */}
      <div className="text-center">
        <Link href="/" className="inline-flex items-center justify-center">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-xl shadow-cyan-500/25 ring-1 ring-white/20 mb-3">
            <Footprints className="w-6 h-6 text-white transform -rotate-12" />
          </div>
        </Link>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          치카미치 회원가입
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-slate-400">
          일본 도심 지하 통로 커뮤니티 & 맞춤 경로 설정
        </p>
      </div>

      {/* Success message banner */}
      {successMessage && (
        <div className="mt-6 p-4 rounded-xl bg-emerald-950/90 border border-emerald-500/50 text-emerald-300 text-xs sm:text-sm flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <strong className="block font-bold text-white mb-0.5">안내</strong>
            {successMessage}
          </div>
        </div>
      )}

      {/* Error message */}
      {errorMessage && (
        <div className="mt-6 p-3.5 rounded-xl bg-rose-950/80 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Signup Form Card */}
      <div className="mt-6 bg-slate-900/80 py-8 px-5 sm:px-8 border border-slate-800/90 shadow-2xl rounded-2xl backdrop-blur-xl">
        {/* Social Signups: Google & LINE */}
        <div className="space-y-3">
          {/* Google OAuth Button */}
          <button
            type="button"
            onClick={handleGoogleSignup}
            disabled={oauthLoading !== null || isSubmitting}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-slate-700 hover:border-slate-500 rounded-xl bg-slate-950/70 hover:bg-slate-950 text-slate-100 text-sm font-semibold transition shadow-sm hover:shadow active:scale-[0.99] disabled:opacity-50"
          >
            {oauthLoading === "google" ? (
              <Loader2 className="w-5 h-5 text-cyan-400 animate-spin" />
            ) : (
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#EA4335"
                  d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z"
                />
                <path
                  fill="#4285F4"
                  d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3 0-.8.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12.3 0 15.2c0 2.8.7 5.5 1.9 7.8l3.7-2.9z"
                />
                <path
                  fill="#34A853"
                  d="M12 23.5c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2-6.4-4.8L1.9 16.9C3.7 20.6 7.5 23.5 12 23.5z"
                />
              </svg>
            )}
            <span>Google 계정으로 빠른 가입</span>
          </button>

          {/* LINE OAuth Button */}
          <button
            type="button"
            onClick={handleLineSignup}
            disabled={oauthLoading !== null || isSubmitting}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-[#06C755] hover:bg-[#05b34c] text-white text-sm font-semibold transition shadow-md shadow-[#06C755]/20 hover:shadow-[#06C755]/40 active:scale-[0.99] disabled:opacity-50"
          >
            {oauthLoading === "line" ? (
              <Loader2 className="w-5 h-5 text-white animate-spin" />
            ) : (
              <svg
                className="w-5 h-5 fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M19.365 9.864c0-4.04-4.201-7.327-9.365-7.327S.635 5.824.635 9.864c0 3.619 3.204 6.648 7.534 7.218.293.064.692.196.793.449.091.228.06.584.029.814l-.128.775c-.039.236-.183.923.809.504.992-.42 5.353-3.153 7.306-5.398 1.574-1.748 2.387-3.082 2.387-4.362zm-12.75 2.07H4.808a.56.56 0 0 1-.561-.56V7.63a.56.56 0 0 1 .561-.56h1.807a.56.56 0 1 1 0 1.12H5.369v1.077h1.246a.56.56 0 1 1 0 1.12zm2.936 0a.56.56 0 0 1-.561-.56V7.63a.56.56 0 0 1 1.122 0v3.744a.56.56 0 0 1-.561.56zm4.819 0a.56.56 0 0 1-.448-.223l-2.023-2.735v2.398a.56.56 0 0 1-1.122 0V7.63a.56.56 0 0 1 .448-.223.56.56 0 0 1 .448.223l2.023 2.735V7.63a.56.56 0 0 1 1.122 0v3.744a.56.56 0 0 1-.448.56zm4.184-2.122h-1.807V8.75h1.807a.56.56 0 1 0 0-1.12h-2.368a.56.56 0 0 0-.561.56v3.744c0 .31.251.56.561.56h2.368a.56.56 0 1 0 0-1.12z" />
              </svg>
            )}
            <span>LINE 아이디로 빠른 가입</span>
          </button>
        </div>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-800" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-slate-900 px-3 text-slate-500 font-mono">
              또는 직접 입력하여 가입
            </span>
          </div>
        </div>

        {/* Email Signup Form */}
        <form onSubmit={handleEmailSignup} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-xs font-semibold text-slate-300 mb-1"
            >
              닉네임 또는 이름
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                <User className="w-4 h-4" />
              </div>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="예: 신주쿠통근러"
                className="w-full pl-10 pr-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-xs font-semibold text-slate-300 mb-1"
            >
              이메일 주소
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                <Mail className="w-4 h-4" />
              </div>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-10 pr-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-xs font-semibold text-slate-300 mb-1"
            >
              비밀번호 (6자 이상)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                <Lock className="w-4 h-4" />
              </div>
              <input
                id="password"
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="city"
              className="block text-xs font-semibold text-slate-300 mb-1"
            >
              주요 관심 도시 (맞춤 날씨 & 지하 맵 제공)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                <MapPin className="w-4 h-4" />
              </div>
              <select
                id="city"
                value={preferredCity}
                onChange={(e) => setPreferredCity(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition"
              >
                <option value="tokyo">🗼 도쿄 (신주쿠 / 시부야 / 도쿄역)</option>
                <option value="osaka">🏯 오사카 (우메다 던전 / 난바)</option>
                <option value="sapporo">❄️ 삿포로 (치카호 지하보도)</option>
                <option value="fukuoka">🍜 후쿠오카 (텐진 지하상가)</option>
                <option value="nagoya">🏯 나고야 (메이에키 지하가)</option>
              </select>
            </div>
          </div>

          {/* Terms checkbox */}
          <div className="flex items-start gap-2 pt-1">
            <input
              id="terms"
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-slate-800 bg-slate-950 text-cyan-500 focus:ring-cyan-500"
            />
            <label htmlFor="terms" className="text-xs text-slate-400 leading-relaxed">
              <span className="text-slate-300 font-medium">이용약관</span> 및{" "}
              <span className="text-slate-300 font-medium">개인정보 처리방침</span>에 동의합니다.
            </label>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || oauthLoading !== null}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm transition shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>가입 처리 중...</span>
              </>
            ) : (
              <>
                <span>가입 완료하고 시작하기</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Switch to Login */}
        <div className="mt-6 pt-5 border-t border-slate-800/80 text-center">
          <p className="text-xs text-slate-400">
            이미 계정이 있으신가요?{" "}
            <Link
              href={`/login${returnTo !== "/" ? `?returnTo=${encodeURIComponent(returnTo)}` : ""}`}
              className="font-bold text-cyan-400 hover:text-cyan-300 underline underline-offset-4 ml-1 transition"
            >
              로그인하기
            </Link>
          </p>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="mt-8 text-center text-slate-500 text-xs flex items-center justify-center gap-4">
        <span className="flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" /> InsForge 보안 인증
        </span>
        <span>•</span>
        <span>안전한 OAuth 2.0 PKCE 인증</span>
      </div>
    </div>
  );
}

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative underground-grid overflow-hidden">
      {/* Background glow effects */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-gradient-to-b from-cyan-600/20 via-blue-600/10 to-transparent blur-[140px] rounded-full" />
      <div className="pointer-events-none absolute -bottom-40 left-10 w-[500px] h-[500px] bg-indigo-500/10 blur-[150px] rounded-full" />

      {/* Top back button */}
      <div className="max-w-md w-full mx-auto px-4 mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-cyan-400 transition"
        >
          <ChevronLeft className="w-4 h-4" />
          CHIKAMICHI 홈으로 돌아가기
        </Link>
      </div>

      <Suspense
        fallback={
          <div className="sm:mx-auto sm:w-full sm:max-w-md px-4 text-center">
            <Loader2 className="w-8 h-8 text-cyan-400 animate-spin mx-auto mb-3" />
            <p className="text-xs text-slate-400">회원가입 페이지 로딩 중...</p>
          </div>
        }
      >
        <SignupFormContent />
      </Suspense>
    </div>
  );
}
