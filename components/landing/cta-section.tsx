"use client";

import { useState } from "react";
import { Smartphone, CheckCircle2 } from "lucide-react";

export function CtaSection() {
  const [emailInput, setEmailInput] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput) {
      setSubscribed(true);
      setEmailInput("");
    }
  };

  return (
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
          onSubmit={handleSubmit}
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
  );
}
