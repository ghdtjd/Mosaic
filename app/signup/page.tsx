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
  KeyRound,
  RotateCw,
} from "lucide-react";

function SignupFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    user,
    signInWithGoogle,
    signInWithLine,
    signUpWithEmail,
    verifyEmailCode,
    resendVerificationCode,
    isLoading,
  } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [preferredCity, setPreferredCity] = useState("tokyo");
  const [agreeTerms, setAgreeTerms] = useState(true);

  // OTP Verification state
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [resendStatus, setResendStatus] = useState<string | null>(null);

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

  // Handle Signup Submission
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
        setIsVerifyingOtp(true);
        setSuccessMessage(
          `회원가입이 접수되었습니다! ${email}로 발송된 6자리 인증번호를 입력해 주세요.`
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

  // Handle OTP Code Verification
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
          error.message || "인증번호가 올바르지 않거나 만료되었습니다. 다시 확인해 주세요."
        );
      } else {
        setSuccessMessage("이메일 인증이 완료되었습니다! 로그인 상태로 이동합니다...");
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

  // Resend OTP Code
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

  // Google OAuth
  const handleGoogleSignup = async () => {
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
        err?.message || "Google 계정 연동에 실패했습니다. 다시 시도해 주세요."
      );
      setOauthLoading(null);
    }
  };

  // LINE OAuth
  const handleLineSignup = async () => {
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
        err?.message || "LINE 계정 연동에 실패했습니다. 다시 시도해 주세요."
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
          {isVerifyingOtp ? "이메일 인증번호 확인 ✉️" : "치카미치 회원가입 ✨"}
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-zinc-600 font-medium">
          {isVerifyingOtp
            ? "발송된 6자리 코드를 입력하여 가입을 완료하세요"
            : "나만의 지하 꿀루트 등록 & 주간 랭킹 도전하기"}
        </p>
      </div>

      {/* Success message banner */}
      {successMessage && (
        <div className="mt-5 p-4 rounded-2xl bg-emerald-100 border-2 border-zinc-900 text-emerald-950 text-xs sm:text-sm font-bold flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <strong className="block mb-0.5">안내</strong>
            {successMessage}
          </div>
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

      {/* Form Card */}
      <div className="mt-5 cute-card bg-white py-8 px-6 sm:px-8">
        {isVerifyingOtp ? (
          /* OTP Verification Step */
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
                  onChange={(e) => setOtpCode(e.target.value.replace(/[^0-9]/g, ""))}
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
                  <span>인증 완료하고 시작하기</span>
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
                이메일 다시 입력
              </button>
            </div>
          </form>
        ) : (
          /* Normal Signup Step */
          <>
            {/* Social Signups: Google & LINE */}
            <div className="space-y-3">
              {/* Google OAuth Button */}
              <button
                type="button"
                onClick={handleGoogleSignup}
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
                <span>Google 계정으로 빠른 가입</span>
              </button>

              {/* LINE OAuth Button */}
              <button
                type="button"
                onClick={handleLineSignup}
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
                <span>LINE 아이디로 빠른 가입</span>
              </button>
            </div>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t-2 border-zinc-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-3 text-zinc-500 font-bold">
                  또는 직접 입력하여 가입
                </span>
              </div>
            </div>

            {/* Email Signup Form */}
            <form onSubmit={handleEmailSignup} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-xs font-bold text-zinc-900 mb-1"
                >
                  닉네임 또는 이름
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    id="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="예: 신주쿠길잡이"
                    className="w-full pl-10 pr-3 py-2.5 bg-[#FAF9F6] border-2 border-zinc-900 rounded-2xl text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-400 font-medium transition"
                  />
                </div>
              </div>

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
                  비밀번호 (6자 이상)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500">
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
                    className="w-full pl-10 pr-3 py-2.5 bg-[#FAF9F6] border-2 border-zinc-900 rounded-2xl text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-400 font-medium transition"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="city"
                  className="block text-xs font-bold text-zinc-900 mb-1"
                >
                  주요 관심 도시
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <select
                    id="city"
                    value={preferredCity}
                    onChange={(e) => setPreferredCity(e.target.value)}
                    className="w-full pl-10 pr-3 py-2.5 bg-[#FAF9F6] border-2 border-zinc-900 rounded-2xl text-sm text-zinc-900 font-medium focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
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
                  className="mt-1 h-4 w-4 rounded border-2 border-zinc-900 text-zinc-900 focus:ring-amber-400"
                />
                <label
                  htmlFor="terms"
                  className="text-xs text-zinc-600 leading-relaxed font-medium"
                >
                  <span className="text-zinc-950 font-bold">이용약관</span> 및{" "}
                  <span className="text-zinc-950 font-bold">
                    개인정보 처리방침
                  </span>
                  에 동의합니다.
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || oauthLoading !== null}
                className="w-full cute-btn-primary py-3 text-sm font-bold flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
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
            <div className="mt-6 pt-5 border-t-2 border-zinc-100 text-center">
              <p className="text-xs text-zinc-600">
                이미 계정이 있으신가요?{" "}
                <Link
                  href={`/login${returnTo !== "/" ? `?returnTo=${encodeURIComponent(returnTo)}` : ""}`}
                  className="font-bold text-amber-700 hover:text-amber-800 underline underline-offset-4 ml-1 transition"
                >
                  로그인하기
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
        <span>안전한 OAuth 2.0 PKCE 인증</span>
      </div>
    </div>
  );
}

export default function SignupPage() {
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
            <p className="text-xs text-zinc-500">회원가입 페이지 로딩 중...</p>
          </div>
        }
      >
        <SignupFormContent />
      </Suspense>
    </div>
  );
}
