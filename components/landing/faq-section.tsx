"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export function FaqSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqItems = [
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
      a: "네! /generate 페이지에서 스마트폰 카메라로 바로 촬영하거나 갤러리의 사진을 첨부하여 실시간으로 등록할 수 있습니다.",
    },
  ];

  return (
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
        {faqItems.map((item, idx) => (
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
  );
}
