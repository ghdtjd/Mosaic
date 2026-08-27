"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import {
  Footprints,
  Mail,
  Lock,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Loader2,
  ShieldCheck,
  ChevronLeft,
  KeyRound,
  RotateCw,
} from "lucide-react";

function LoginFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    user,
    signInWithGoogle,
    signInWithLine,
    signInWithEmail,
    verifyEmailCode,
    resendVerificationCode,
    isLoading,
  } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [oauthLoading, setOauthLoading] = useState<"google" | "line" | null>(
    null
  );

  // OTP Verification state for unverified accounts
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [resendStatus, setResendStatus] = useState<string | null>(null);

  const verified = searchParams?.get("verified");
  const returnTo = searchParams?.get("returnTo") || "/generate";

  useEffect(() => {
    if (user && !isLoading) {
      router.push(returnTo);
    }
  }, [user, isLoading, router, returnTo]);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    setIsSubmitting(true);

    try {
      const { error, requireVerification } = await signInWithEmail(
        email,
        password
      );

      if (requireVerification) {
        setIsVerifyingOtp(true);
        setErrorMessage(
          "이메일 인증이 아직 완료되지 않았습니다. 메일함으로 발송된 6자리 인증번호를 입력해 주세요."
        );
      } else if (error) {
        setErrorMessage(
          error.message ||
            "이메일 또는 비밀번호가 올바르지 않습니다. 다시 확인해 주세요."
        );
      } else {
        router.push(returnTo);
      }
    } catch (err: any) {
      setErrorMessage(
        err?.message ||
          "로그인 중 문제가 발생했습니다. 잠시 후 다시 시도해 주세요."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!otpCode || otpCode.trim().length < 6) {
      setErrorMessage("6자리 인증번호를 올바르게 입력해 주세요.");
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error } = await verifyEmailCode(email, otpCode.trim());

      if (error) {
        setErrorMessage(
          error.message ||
            "인증번호가 올바르지 않거나 만료되었습니다. 다시 확인해 주세요."
        );
      } else {
        setSuccessMessage("이메일 인증 및 로그인이 완료되었습니다!");
        setTimeout(() => {
          router.push(returnTo);
        }, 1200);
      }
    } catch (err: any) {
      setErrorMessage(
        err?.message || "인증 처리 중 오류가 발생했습니다. 다시 시도해 주세요."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendOtp = async () => {
    setErrorMessage(null);
    setResendStatus("인증번호 재전송 중...");
    try {
      const { error } = await resendVerificationCode(email);
      if (error) {
        setErrorMessage(error.message || "인증번호 재전송에 실패했습니다.");
        setResendStatus(null);
      } else {
        setResendStatus("새로운 인증번호가 발송되었습니다!");
        setTimeout(() => setResendStatus(null), 4000);
      }
    } catch (err: any) {
      setErrorMessage("인증번호 재전송 중 오류가 발생했습니다.");
      setResendStatus(null);
    }
  };

  const handleGoogleLogin = async () => {
    setErrorMessage(null);
    setOauthLoading("google");
    try {
      const { error } = await signInWithGoogle();
      if (error) {
        setErrorMessage(error.message || "Google 로그인에 실패했습니다.");
        setOauthLoading(null);
      }
    } catch (err: any) {
      setErrorMessage(
        err?.message || "Google 로그인에 실패했습니다. 다시 시도해 주세요."
      );
      setOauthLoading(null);
    }
  };

  const handleLineLogin = async () => {
    setErrorMessage(null);
    setOauthLoading("line");
    try {
      const { error } = await signInWithLine();
      if (error) {
        setErrorMessage(error.message || "LINE 로그인에 실패했습니다.");
        setOauthLoading(null);
      }
    } catch (err: any) {
      setErrorMessage(
        err?.message || "LINE 로그인에 실패했습니다. 다시 시도해 주세요."
      );
      setOauthLoading(null);
    }
  };

  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-md px-4">
      {/* Brand Header */}
      <div className="text-center">
        <Link href="/" className="inline-flex items-center justify-center group">
          <div className="w-14 h-14 rounded-2xl bg-amber-400 border-2 border-zinc-900 flex items-center justify-center shadow-[3px_3px_0px_#18181b] group-hover:rotate-6 transition mb-3">
            <Footprints className="w-7 h-7 text-zinc-950" />
          </div>
        </Link>
        <h2 className="text-3xl font-extrabold text-zinc-950 font-jua tracking-normal">
          {isVerifyingOtp ? "이메일 인증 완료하기 ✉️" : "치카미치에 로그인 🐾"}
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-zinc-600 font-medium">
          {isVerifyingOtp
            ? "수신된 6자리 인증번호를 입력하여 로그인을 완료하세요"
            : "비와 폭염 없는 일본 지하 꿀루트 & 랭킹 커뮤니티"}
        </p>
      </div>

      {/* Verification Success Notice */}
      {verified && (
        <div className="mt-5 p-3.5 rounded-2xl bg-emerald-100 border-2 border-zinc-900 text-emerald-950 text-xs font-bold flex items-center gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>이메일 인증이 완료되었습니다! 로그인해 주세요.</span>
        </div>
      )}

      {/* Success Banner */}
      {successMessage && (
        <div className="mt-5 p-3.5 rounded-2xl bg-emerald-100 border-2 border-zinc-900 text-emerald-950 text-xs font-bold flex items-center gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Resend Status Banner */}
      {resendStatus && (
        <div className="mt-3 p-3 rounded-2xl bg-amber-100 border-2 border-zinc-900 text-amber-950 text-xs font-bold flex items-center gap-2">
          <RotateCw className="w-4 h-4 text-amber-700 animate-spin" />
          <span>{resendStatus}</span>
        </div>
      )}

      {/* Error message */}
      {errorMessage && (
        <div className="mt-5 p-3.5 rounded-2xl bg-rose-100 border-2 border-zinc-900 text-rose-950 text-xs font-bold flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Login Form Card */}
      <div className="mt-5 cute-card bg-white py-8 px-6 sm:px-8">
        {isVerifyingOtp ? (
          /* OTP Verification Form */
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div>
              <label
                htmlFor="otp"
                className="block text-xs font-bold text-zinc-900 mb-1"
              >
                이메일로 받은 6자리 인증번호
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500">
                  <KeyRound className="w-4 h-4" />
                </div>
                <input
                  id="otp"
                  type="text"
                  required
                  maxLength={6}
                  value={otpCode}
                  onChange={(e) =>
                    setOtpCode(e.target.value.replace(/[^0-9]/g, ""))
                  }
                  placeholder="예: 123456"
                  className="w-full pl-10 pr-3 py-3 bg-[#FAF9F6] border-2 border-zinc-900 rounded-2xl text-center text-lg tracking-widest text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-400 font-mono font-bold"
                />
              </div>
              <p className="text-[11px] text-zinc-500 mt-1">
                <strong>{email}</strong> 수신함을 확인해 주세요.
              </p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || otpCode.length < 6}
              className="w-full cute-btn-primary py-3 text-sm font-bold flex items-center justify-center gap-2 mt-3 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>인증번호 확인 중...</span>
                </>
              ) : (
                <>
                  <span>인증하고 로그인하기</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="pt-4 border-t-2 border-zinc-100 flex items-center justify-between text-xs">
              <button
                type="button"
                onClick={handleResendOtp}
                className="text-amber-700 hover:text-amber-800 font-bold underline underline-offset-4"
              >
                인증번호 재전송
              </button>
              <button
                type="button"
                onClick={() => setIsVerifyingOtp(false)}
                className="text-zinc-500 hover:text-zinc-800"
              >
                비밀번호로 로그인
              </button>
            </div>
          </form>
        ) : (
          /* Normal Login Form */
          <>
            {/* Social Logins: Google & LINE */}
            <div className="space-y-3">
              {/* Google OAuth Button */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={oauthLoading !== null || isSubmitting}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 border-2 border-zinc-900 rounded-2xl bg-white hover:bg-zinc-50 text-zinc-900 text-sm font-bold shadow-[2px_2px_0px_#18181b] active:scale-98 transition disabled:opacity-50"
              >
                {oauthLoading === "google" ? (
                  <Loader2 className="w-5 h-5 text-amber-500 animate-spin" />
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
                <span>Google 계정으로 로그인</span>
              </button>

              {/* LINE OAuth Button */}
              <button
                type="button"
                onClick={handleLineLogin}
                disabled={oauthLoading !== null || isSubmitting}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-2xl border-2 border-zinc-900 bg-[#06C755] hover:bg-[#05b34c] text-white text-sm font-bold shadow-[2px_2px_0px_#18181b] active:scale-98 transition disabled:opacity-50"
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
                <span>LINE 아이디로 로그인</span>
              </button>
            </div>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t-2 border-zinc-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-3 text-zinc-500 font-bold">
                  또는 이메일로 계속하기
                </span>
              </div>
            </div>

            {/* Email Login Form */}
            <form onSubmit={handleEmailLogin} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-bold text-zinc-900 mb-1"
                >
                  이메일 주소
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full pl-10 pr-3 py-2.5 bg-[#FAF9F6] border-2 border-zinc-900 rounded-2xl text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-400 font-medium transition"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-xs font-bold text-zinc-900 mb-1"
                >
                  비밀번호
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-3 py-2.5 bg-[#FAF9F6] border-2 border-zinc-900 rounded-2xl text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-400 font-medium transition"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || oauthLoading !== null}
                className="w-full cute-btn-primary py-3 text-sm font-bold flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>로그인 중...</span>
                  </>
                ) : (
                  <>
                    <span>로그인하기</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Switch to Signup */}
            <div className="mt-6 pt-5 border-t-2 border-zinc-100 text-center">
              <p className="text-xs text-zinc-600">
                아직 치카미치 회원이 아니신가요?{" "}
                <Link
                  href={`/signup${returnTo !== "/" ? `?returnTo=${encodeURIComponent(returnTo)}` : ""}`}
                  className="font-bold text-amber-700 hover:text-amber-800 underline underline-offset-4 ml-1 transition"
                >
                  회원가입하기
                </Link>
              </p>
            </div>
          </>
        )}
      </div>

      {/* Trust Badges */}
      <div className="mt-6 text-center text-zinc-500 text-xs flex items-center justify-center gap-3 font-medium">
        <span className="flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-zinc-700" /> InsForge 보안 인증
        </span>
        <span>•</span>
        <span>개인정보 암호화 보호</span>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-zinc-900 cute-dots flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden font-sans">
      {/* Top back button */}
      <div className="max-w-md w-full mx-auto px-4 mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-700 hover:text-zinc-950 transition"
        >
          <ChevronLeft className="w-4 h-4" />
          CHIKAMICHI 홈으로 돌아가기
        </Link>
      </div>

      <Suspense
        fallback={
          <div className="sm:mx-auto sm:w-full sm:max-w-md px-4 text-center">
            <Loader2 className="w-8 h-8 text-amber-500 animate-spin mx-auto mb-3" />
            <p className="text-xs text-zinc-500">로그인 페이지 로딩 중...</p>
          </div>
        }
      >
        <LoginFormContent />
      </Suspense>
    </div>
  );
}
