"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { adminGetSportsClassById, adminUpdateSportsClass } from "@/lib/api/admin";

const LEVEL_OPTIONS = ["BEGINNER", "INTERMEDIATE", "ADVANCED"];
const TYPE_OPTIONS = ["REGULAR", "PRIVATE", "GROUP"];
const STATUS_OPTIONS = ["RECRUITING", "FULL", "UPCOMING", "SUSPENDED"];

export default function EditSportsClassPage() {
  const router = useRouter();
  const params = useParams();
  const id = Number(params.id);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    title: "",
    sport: "",
    instructor: "",
    schedule: "",
    startDate: "",
    endDate: "",
    maxParticipants: 20,
    currentParticipants: 0,
    price: 0,
    level: "BEGINNER",
    type: "REGULAR",
    status: "RECRUITING",
    description: "",
    location: "",
    ageGroup: "",
    image: null as File | null,
    imageUrl: null as string | null,
  });

  useEffect(() => {
    if (!id) return;
    adminGetSportsClassById(id).then((data: Record<string, unknown> | null) => {
      if (!data) {
        setLoading(false);
        return;
      }
      setForm({
        title: String(data.title ?? ""),
        sport: String(data.sport ?? ""),
        instructor: String(data.instructor ?? ""),
        schedule: String(data.schedule ?? ""),
        startDate: String(data.startDate ?? "").slice(0, 10),
        endDate: String(data.endDate ?? "").slice(0, 10),
        maxParticipants: Number(data.maxParticipants ?? 20),
        currentParticipants: Number(data.currentParticipants ?? 0),
        price: Number(data.price ?? 0),
        level: String(data.level ?? "BEGINNER"),
        type: String(data.type ?? "REGULAR"),
        status: String(data.status ?? "RECRUITING"),
        description: String(data.description ?? ""),
        location: String(data.location ?? ""),
        ageGroup: String(data.ageGroup ?? ""),
        image: null,
        imageUrl: data.image ? String(data.image) : null,
      });
      setLoading(false);
    });
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const body: Record<string, unknown> = {
        title: form.title,
        sport: form.sport,
        instructor: form.instructor,
        schedule: form.schedule,
        startDate: form.startDate,
        endDate: form.endDate,
        maxParticipants: form.maxParticipants,
        currentParticipants: form.currentParticipants,
        price: form.price,
        level: form.level,
        type: form.type,
        status: form.status,
        description: form.description,
        location: form.location,
        ageGroup: form.ageGroup,
        image: form.image ?? form.imageUrl,
      };
      if (form.image) body.image = form.image;
      else if (form.imageUrl) body.image = form.imageUrl;
      await adminUpdateSportsClass(id, body);
      router.push("/admin/sports-class");
      router.refresh();
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="py-12 text-center text-slate-500">로딩 중...</div>;

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/sports-class" className="text-slate-600 hover:text-slate-800">← 목록</Link>
        <h1 className="text-2xl font-bold text-slate-800">스포츠 클래스 수정</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-slate-200 p-6 max-w-2xl space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">제목 *</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            className="w-full border border-slate-300 rounded-lg px-3 py-2"
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">종목 *</label>
            <input
              type="text"
              value={form.sport}
              onChange={(e) => setForm((f) => ({ ...f, sport: e.target.value }))}
              className="w-full border border-slate-300 rounded-lg px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">강사 *</label>
            <input
              type="text"
              value={form.instructor}
              onChange={(e) => setForm((f) => ({ ...f, instructor: e.target.value }))}
              className="w-full border border-slate-300 rounded-lg px-3 py-2"
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">일정</label>
          <input
            type="text"
            value={form.schedule}
            onChange={(e) => setForm((f) => ({ ...f, schedule: e.target.value }))}
            className="w-full border border-slate-300 rounded-lg px-3 py-2"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">시작일</label>
            <input
              type="date"
              value={form.startDate}
              onChange={(e) => setForm((f) => ({ ...f, startDate: e.target.value }))}
              className="w-full border border-slate-300 rounded-lg px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">종료일</label>
            <input
              type="date"
              value={form.endDate}
              onChange={(e) => setForm((f) => ({ ...f, endDate: e.target.value }))}
              className="w-full border border-slate-300 rounded-lg px-3 py-2"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">정원</label>
            <input
              type="number"
              min={1}
              value={form.maxParticipants}
              onChange={(e) => setForm((f) => ({ ...f, maxParticipants: Number(e.target.value) || 0 }))}
              className="w-full border border-slate-300 rounded-lg px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">현재 인원</label>
            <input
              type="number"
              min={0}
              value={form.currentParticipants}
              onChange={(e) => setForm((f) => ({ ...f, currentParticipants: Number(e.target.value) || 0 }))}
              className="w-full border border-slate-300 rounded-lg px-3 py-2"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">수강료(원)</label>
          <input
            type="number"
            min={0}
            value={form.price || ""}
            onChange={(e) => setForm((f) => ({ ...f, price: Number(e.target.value) || 0 }))}
            className="w-full border border-slate-300 rounded-lg px-3 py-2"
          />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">레벨</label>
            <select
              value={form.level}
              onChange={(e) => setForm((f) => ({ ...f, level: e.target.value }))}
              className="w-full border border-slate-300 rounded-lg px-3 py-2"
            >
              {LEVEL_OPTIONS.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">유형</label>
            <select
              value={form.type}
              onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}
              className="w-full border border-slate-300 rounded-lg px-3 py-2"
            >
              {TYPE_OPTIONS.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">상태</label>
            <select
              value={form.status}
              onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}
              className="w-full border border-slate-300 rounded-lg px-3 py-2"
            >
              {STATUS_OPTIONS.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">설명</label>
          <textarea
            value={form.description}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            className="w-full border border-slate-300 rounded-lg px-3 py-2 h-24"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">위치</label>
            <input
              type="text"
              value={form.location}
              onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
              className="w-full border border-slate-300 rounded-lg px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">연령대</label>
            <input
              type="text"
              value={form.ageGroup}
              onChange={(e) => setForm((f) => ({ ...f, ageGroup: e.target.value }))}
              className="w-full border border-slate-300 rounded-lg px-3 py-2"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">이미지</label>
          {form.imageUrl && !form.image && (
            <p className="text-sm text-slate-500 mb-1">현재: {form.imageUrl}</p>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setForm((f) => ({ ...f, image: e.target.files?.[0] ?? null }))}
            className="w-full border border-slate-300 rounded-lg px-3 py-2"
          />
        </div>
        <div className="flex gap-2 pt-4">
          <button
            type="submit"
            disabled={submitting}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
          >
            {submitting ? "저장 중..." : "저장"}
          </button>
          <Link href="/admin/sports-class" className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg">
            취소
          </Link>
        </div>
      </form>
    </div>
  );
}
