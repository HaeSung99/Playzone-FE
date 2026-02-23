"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  adminGetSportsClassList,
  adminDeleteSportsClass,
  setCachedSportsClasses,
} from "@/lib/api/admin";

type SportsClass = {
  id: number;
  title: string;
  sport: string;
  instructor: string;
  schedule: string;
  status: string;
  maxParticipants: number;
  currentParticipants: number;
  price: number;
  createdAt?: string;
  image?: string | null;
};

const STATUS_MAP: Record<string, string> = {
  RECRUITING: "모집중",
  FULL: "정원마감",
  UPCOMING: "개강예정",
  SUSPENDED: "모집중지",
};

export default function AdminSportsClassPage() {
  const [list, setList] = useState<SportsClass[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const data = await adminGetSportsClassList();
    setList(Array.isArray(data) ? data : []);
    setCachedSportsClasses(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("이 클래스를 삭제할까요?")) return;
    await adminDeleteSportsClass(id);
    await load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-800">스포츠 클래스</h1>
        <Link
          href="/admin/sports-class/new"
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          클래스 추가
        </Link>
      </div>

      {loading ? (
        <div className="py-12 text-center text-slate-500">로딩 중...</div>
      ) : (
        <div className="grid gap-4">
          {list.map((c) => (
            <div
              key={c.id}
              className="bg-white rounded-xl border border-slate-200 p-4 flex items-center justify-between flex-wrap gap-4"
            >
              <div className="flex items-center gap-4">
                {c.image ? (
                  <img src={c.image} alt="" className="w-16 h-16 object-cover rounded-lg" />
                ) : (
                  <div className="w-16 h-16 bg-slate-200 rounded-lg flex items-center justify-center text-slate-400 text-xs">
                    이미지
                  </div>
                )}
                <div>
                  <div className="font-semibold text-slate-800">{c.title}</div>
                  <div className="text-sm text-slate-500">
                    {c.sport} · {c.instructor} · {STATUS_MAP[c.status] ?? c.status} · {c.currentParticipants}/{c.maxParticipants}명 · {Number(c.price).toLocaleString()}원
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href={`/admin/sports-class/${c.id}/enrollments`}
                  className="px-3 py-1.5 text-sm bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200"
                >
                  수강 신청자
                </Link>
                <Link
                  href={`/admin/sports-class/${c.id}/edit`}
                  className="px-3 py-1.5 text-sm bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200"
                >
                  수정
                </Link>
                <button
                  type="button"
                  onClick={() => handleDelete(c.id)}
                  className="px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-lg"
                >
                  삭제
                </button>
              </div>
            </div>
          ))}
          {list.length === 0 && (
            <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-slate-500">
              등록된 클래스가 없습니다.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
