"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { insforge } from "@/lib/insforge";
import { Loader2, Footprints, CheckCircle2, AlertCircle } from "lucide-react";

function AuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Check for error parameters in URL
        const error =
          searchParams?.get("error") || searchParams?.get("insforge_error");
        const errorDesc =
          searchParams?.get("error_description") || searchParams?.get("message");

        if (error) {
          setStatus("error");
          setErrorMessage(errorDesc || error || "인증 중 오류가 발생했습니다.");
          return;
        }

        // Wait a short moment for InsForge SDK's automatic token exchange & session storage
        let userResult = await insforge.auth.getCurrentUser();

        // If not immediately available, retry once after a short delay
        if (!userResult.data?.user) {
          await new Promise((resolve) => setTimeout(resolve, 800));
          userResult = await insforge.auth.getCurrentUser();
        }

        if (userResult.data?.user) {
          const user = userResult.data.user;

          // Ensure profile exists in public.users
          try {
            await insforge.database.from("users").upsert([
              {
                id: user.id,
                email: user.email,
                name:
                  user.profile?.name ||
                  user.profile?.full_name ||
                  user.email?.split("@")[0] ||
                  "지하탐험가",
                avatar_url: user.profile?.avatar_url || null,
                provider: user.providers?.[0] || "oauth",
              },
            ]);
          } catch (dbErr) {
            console.warn("Auto profile upsert warning:", dbErr);
          }

          setStatus("success");
          setTimeout(() => {
            router.push("/");
          }, 800);
        } else {
          // If no user found yet, redirect to login with fallback
          setStatus("success");
          router.push("/");
        }
      } catch (err: any) {
        console.error("OAuth callback error:", err);
        setStatus("error");
        setErrorMessage(
          err?.message || "소셜 로그인 완료 처리 중 문제가 발생했습니다."
        );
      }
    };

    handleAuthCallback();
  }, [router, searchParams]);

  return (
    <div className="p-8 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl max-w-sm w-full text-center backdrop-blur-xl">
      <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center mx-auto mb-5 shadow-lg shadow-cyan-500/25">
        <Footprints className="w-7 h-7 text-white transform -rotate-12" />
      </div>

      {status === "loading" && (
        <div className="space-y-3">
          <Loader2 className="w-8 h-8 text-cyan-400 animate-spin mx-auto" />
          <h3 className="text-base font-bold text-white">
            소셜 로그인 인증 처리 중...
          </h3>
          <p className="text-xs text-slate-400">
            계정 정보를 안전하게 확인하고 있습니다. 잠시만 기다려 주세요.
          </p>
        </div>
      )}

      {status === "success" && (
        <div className="space-y-3">
          <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
          <h3 className="text-base font-bold text-white">로그인 성공!</h3>
          <p className="text-xs text-slate-400">
            CHIKAMICHI 홈으로 이동 중입니다...
          </p>
        </div>
      )}

      {status === "error" && (
        <div className="space-y-3">
          <AlertCircle className="w-8 h-8 text-rose-400 mx-auto" />
          <h3 className="text-base font-bold text-white">로그인 실패</h3>
          <p className="text-xs text-rose-300">{errorMessage}</p>
          <button
            onClick={() => router.push("/login")}
            className="mt-4 w-full py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-semibold rounded-xl transition border border-cyan-500/30"
          >
            로그인 페이지로 돌아가기
          </button>
        </div>
      )}
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center px-4 relative underground-grid">
      <Suspense
        fallback={
          <div className="p-8 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl max-w-sm w-full text-center">
            <Loader2 className="w-8 h-8 text-cyan-400 animate-spin mx-auto mb-3" />
            <p className="text-xs text-slate-400">페이지를 불러오는 중입니다...</p>
          </div>
        }
      >
        <AuthCallbackContent />
      </Suspense>
    </div>
  );
}
