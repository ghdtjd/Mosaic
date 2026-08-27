"use client";

import Link from "next/link";
import {
  X,
  Camera,
  Plus,
  Trash2,
  ImagePlus,
  FileText,
  UploadCloud,
  CheckCircle2,
} from "lucide-react";
import type { EditableStep } from "@/lib/routes-data";

interface RouteCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  newTitle: string;
  setNewTitle: (val: string) => void;
  newOrigin: string;
  setNewOrigin: (val: string) => void;
  newDest: string;
  setNewDest: (val: string) => void;
  newCity: string;
  setNewCity: (val: string) => void;
  editableSteps: EditableStep[];
  onAddStep: () => void;
  onRemoveStep: (id: string) => void;
  onStepChange: (id: string, field: keyof EditableStep, value: any) => void;
  onStepPhotoUpload: (id: string, e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  uploadSuccess: boolean;
}

export function RouteCreateModal({
  isOpen,
  onClose,
  newTitle,
  setNewTitle,
  newOrigin,
  setNewOrigin,
  newDest,
  setNewDest,
  newCity,
  setNewCity,
  editableSteps,
  onAddStep,
  onRemoveStep,
  onStepChange,
  onStepPhotoUpload,
  onSubmit,
  uploadSuccess,
}: RouteCreateModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="cute-card bg-white max-w-2xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto relative animate-in fade-in zoom-in-95">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full border-2 border-zinc-900 bg-zinc-100 hover:bg-zinc-200 text-zinc-900"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 mb-1">
          <span className="text-2xl">📸</span>
          <h3 className="font-jua text-2xl sm:text-3xl text-zinc-950">
            출발~도착 다중 사진 꿀루트 등록하기
          </h3>
        </div>
        <p className="text-xs text-zinc-600 mb-6">
          출발지부터 도착지까지 단계별로 사진을 첨부하고 설명을 작성해 주세요.
          전용 스튜디오 페이지(
          <Link href="/generate" className="text-amber-700 underline font-bold">
            /generate
          </Link>
          )에서도 등록할 수 있습니다!
        </p>

        <form onSubmit={onSubmit} className="space-y-6 text-xs">
          {/* Basic Route Information */}
          <div className="p-4 rounded-2xl bg-[#FAF9F6] border-2 border-zinc-900 space-y-3">
            <div className="font-jua text-base text-zinc-950 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-amber-600" />
              1. 기본 루트 정보
            </div>

            <div>
              <label className="block font-bold text-zinc-900 mb-1">
                루트 제목
              </label>
              <input
                type="text"
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="예: 우메다 화이티 ➡️ 한큐백화점 에어컨 직통로"
                className="w-full bg-white border-2 border-zinc-900 rounded-xl px-3 py-2 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-amber-400 font-medium"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block font-bold text-zinc-900 mb-1">지역</label>
                <select
                  value={newCity}
                  onChange={(e) => setNewCity(e.target.value)}
                  className="w-full bg-white border-2 border-zinc-900 rounded-xl px-3 py-2 text-xs text-zinc-900 font-medium focus:outline-none focus:ring-2 focus:ring-amber-400"
                >
                  <option value="tokyo">🗼 도쿄 (신주쿠/도쿄역)</option>
                  <option value="osaka">🏯 오사카 (우메다/난바)</option>
                  <option value="sapporo">❄️ 삿포로 (치카호)</option>
                  <option value="fukuoka">🍜 후쿠오카 (텐진)</option>
                  <option value="nagoya">🏯 나고야 (메이에키)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-zinc-900 mb-1">
                  출발지
                </label>
                <input
                  type="text"
                  required
                  value={newOrigin}
                  onChange={(e) => setNewOrigin(e.target.value)}
                  placeholder="예: JR 신주쿠역 서쪽 B1F"
                  className="w-full bg-white border-2 border-zinc-900 rounded-xl px-3 py-2 text-xs text-zinc-900 focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>

              <div>
                <label className="block font-bold text-zinc-900 mb-1">
                  도착지
                </label>
                <input
                  type="text"
                  required
                  value={newDest}
                  onChange={(e) => setNewDest(e.target.value)}
                  placeholder="예: 도쿄도청 지하 로비"
                  className="w-full bg-white border-2 border-zinc-900 rounded-xl px-3 py-2 text-xs text-zinc-900 focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>
            </div>
          </div>

          {/* Multi-Step Photos & Descriptions Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="font-jua text-base text-zinc-950 flex items-center gap-1.5">
                <Camera className="w-4 h-4 text-cyan-600" />
                2. 단계별 사진 & 설명 ({editableSteps.length}개)
              </div>
              <button
                type="button"
                onClick={onAddStep}
                className="cute-btn-primary px-3 py-1 text-xs flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>단계 추가하기</span>
              </button>
            </div>

            {editableSteps.map((step, idx) => (
              <div
                key={step.id}
                className="p-4 rounded-2xl bg-white border-2 border-zinc-900 shadow-[3px_3px_0px_#18181b] space-y-3 relative"
              >
                <div className="flex items-center justify-between">
                  <span className="bg-zinc-900 text-amber-300 text-xs font-bold px-2.5 py-0.5 rounded-full font-mono">
                    {idx === 0
                      ? "🚩 STEP 1 (출발지)"
                      : idx === editableSteps.length - 1
                      ? `🎯 STEP ${idx + 1} (도착지)`
                      : `🚶 STEP ${idx + 1} (경유지)`}
                  </span>

                  {editableSteps.length > 1 && (
                    <button
                      type="button"
                      onClick={() => onRemoveStep(step.id)}
                      className="text-zinc-400 hover:text-red-500 p-1 transition"
                      title="이 단계 삭제"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-zinc-900 mb-1">
                      현장 사진
                    </label>
                    <div className="border-2 border-dashed border-zinc-400 hover:border-zinc-900 rounded-xl p-3 text-center bg-[#FAF9F6] transition cursor-pointer relative h-36 flex items-center justify-center">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => onStepPhotoUpload(step.id, e)}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                      />
                      {step.photoPreview ? (
                        <div className="relative h-full w-full rounded-lg overflow-hidden border border-zinc-900">
                          <img
                            src={step.photoPreview}
                            alt="Step preview"
                            className="w-full h-full object-cover"
                          />
                          <span className="absolute bottom-1 right-1 bg-zinc-900 text-amber-300 text-[9px] font-bold px-1.5 py-0.5 rounded">
                            변경 클릭
                          </span>
                        </div>
                      ) : (
                        <div>
                          <ImagePlus className="w-6 h-6 text-amber-500 mx-auto mb-1" />
                          <p className="font-bold text-[11px] text-zinc-900">
                            사진 파일 선택
                          </p>
                          <p className="text-[10px] text-zinc-500">
                            스마트폰 촬영 사진 첨부
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div>
                      <label className="block font-bold text-zinc-900 mb-0.5">
                        단계 명칭
                      </label>
                      <input
                        type="text"
                        value={step.title}
                        onChange={(e) =>
                          onStepChange(step.id, "title", e.target.value)
                        }
                        placeholder="예: JR 신주쿠 서쪽 개찰구 앞"
                        className="w-full bg-[#FAF9F6] border-2 border-zinc-900 rounded-lg px-2.5 py-1.5 text-xs text-zinc-900 focus:outline-none focus:ring-2 focus:ring-amber-400 font-medium"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-zinc-900 mb-0.5">
                        랜드마크 표지판
                      </label>
                      <input
                        type="text"
                        value={step.landmark}
                        onChange={(e) =>
                          onStepChange(step.id, "landmark", e.target.value)
                        }
                        placeholder="예: 노란색 도쿄도청 표지판"
                        className="w-full bg-[#FAF9F6] border-2 border-zinc-900 rounded-lg px-2.5 py-1.5 text-xs text-zinc-900 focus:outline-none focus:ring-2 focus:ring-amber-400"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-zinc-900 mb-0.5">
                        통과 방법 설명
                      </label>
                      <textarea
                        rows={2}
                        value={step.description}
                        onChange={(e) =>
                          onStepChange(step.id, "description", e.target.value)
                        }
                        placeholder="예: 오다큐 백화점 통로로 직진하세요."
                        className="w-full bg-[#FAF9F6] border-2 border-zinc-900 rounded-lg px-2.5 py-1.5 text-xs text-zinc-900 focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full cute-btn-primary py-3.5 text-sm font-bold flex items-center justify-center gap-2"
          >
            <UploadCloud className="w-5 h-5" />
            <span>루트 등록하고 랭킹 등록하기! 🚀</span>
          </button>

          {uploadSuccess && (
            <div className="p-3.5 rounded-xl bg-emerald-100 border-2 border-zinc-900 text-emerald-950 font-bold text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>루트가 성공적으로 등록되었습니다!</span>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
