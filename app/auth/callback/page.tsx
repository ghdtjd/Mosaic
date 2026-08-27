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
          setErrorMessage(errorDesc || error || "소셜 인증 중 오류가 발생했습니다.");
          return;
        }

        // Check if there is an explicit insforge_code in the URL to exchange
        const code = searchParams?.get("insforge_code") || searchParams?.get("code");
        if (code) {
          try {
            await insforge.auth.exchangeOAuthCode(code);
          } catch (exchangeErr) {
            console.debug("Code exchange notice:", exchangeErr);
          }
        }

        // Wait a short moment for session sync
        let userResult = await insforge.auth.getCurrentUser();

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
            router.push("/generate");
          }, 800);
        } else {
          setStatus("success");
          router.push("/generate");
        }
      } catch (err: any) {
        console.error("OAuth callback error:", err);
        setStatus("error");
        setErrorMessage(
          err?.message || "소셜 로그인 처리 중 문제가 발생했습니다."
        );
      }
    };

    handleAuthCallback();
  }, [router, searchParams]);

  return (
    <div className="cute-card bg-white max-w-sm w-full p-8 text-center shadow-[4px_4px_0px_#18181b]">
      <div className="w-14 h-14 rounded-2xl bg-amber-400 border-2 border-zinc-900 flex items-center justify-center mx-auto mb-4 shadow-[2px_2px_0px_#18181b]">
        <Footprints className="w-7 h-7 text-zinc-950" />
      </div>

      {status === "loading" && (
        <div className="space-y-3">
          <Loader2 className="w-8 h-8 text-amber-500 animate-spin mx-auto" />
          <h3 className="text-lg font-bold text-zinc-950 font-jua">
            소셜 로그인 인증 처리 중...
          </h3>
          <p className="text-xs text-zinc-600 font-medium">
            계정 정보를 안전하게 확인하고 있습니다. 잠시만 기다려 주세요.
          </p>
        </div>
      )}

      {status === "success" && (
        <div className="space-y-3">
          <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
          <h3 className="text-lg font-bold text-zinc-950 font-jua">로그인 성공! ✨</h3>
          <p className="text-xs text-zinc-600 font-medium">
            CHIKAMICHI 홈으로 이동 중입니다...
          </p>
        </div>
      )}

      {status === "error" && (
        <div className="space-y-3">
          <AlertCircle className="w-8 h-8 text-rose-600 mx-auto" />
          <h3 className="text-lg font-bold text-zinc-950 font-jua">로그인 실패</h3>
          <p className="text-xs text-rose-700 font-medium">{errorMessage}</p>
          <button
            onClick={() => router.push("/login")}
            className="mt-4 w-full cute-btn-primary py-2.5 px-4 text-xs font-bold"
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
    <div className="min-h-screen bg-[#FAF9F6] text-zinc-900 cute-dots flex flex-col items-center justify-center px-4 font-sans">
      <Suspense
        fallback={
          <div className="cute-card bg-white max-w-sm w-full p-8 text-center">
            <Loader2 className="w-8 h-8 text-amber-500 animate-spin mx-auto mb-3" />
            <p className="text-xs text-zinc-500">인증 콜백 처리 중...</p>
          </div>
        }
      >
        <AuthCallbackContent />
      </Suspense>
    </div>
  );
}
