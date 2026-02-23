"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  adminGetTeamList,
  adminAddTeamMember,
  adminUpdateTeamMember,
  adminDeleteTeamMember,
  adminReorderTeam,
  setCachedTeam,
} from "@/lib/api/admin";

type TeamMember = {
  id: number;
  name: string;
  role: string;
  description: string;
  image: string | null;
  order?: number;
};

export default function AdminTeamPage() {
  const [list, setList] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<"none" | "add" | "edit">("none");
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState({ name: "", role: "", description: "", image: null as File | string | null });
  const [submitting, setSubmitting] = useState(false);
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  const load = async () => {
    setLoading(true);
    const data = await adminGetTeamList();
    const sorted = Array.isArray(data)
      ? [...data].sort((a: { order?: number }, b: { order?: number }) => (a.order ?? 0) - (b.order ?? 0))
      : [];
    setList(sorted);
    setCachedTeam(sorted);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const openAdd = () => {
    setForm({ name: "", role: "", description: "", image: null });
    setEditId(null);
    setModal("add");
  };

  const openEdit = (m: TeamMember) => {
    setForm({ name: m.name, role: m.role, description: m.description, image: m.image });
    setEditId(m.id);
    setModal("edit");
  };

  const closeModal = () => {
    setModal("none");
    setEditId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const body = {
        name: form.name,
        role: form.role,
        description: form.description,
        image: form.image instanceof File ? form.image : form.image ?? undefined,
      };
      if (modal === "add") {
        await adminAddTeamMember(body);
      } else if (editId != null) {
        await adminUpdateTeamMember(editId, body);
      }
      await load();
      closeModal();
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("이 팀원을 삭제할까요?")) return;
    await adminDeleteTeamMember(id);
    await load();
  };

  const handleReorder = async (fromIndex: number, toIndex: number) => {
    if (fromIndex === toIndex) return;
    const next = [...list];
    const [removed] = next.splice(fromIndex, 1);
    next.splice(toIndex, 0, removed);
    const orderList = next.map((m, i) => ({ id: m.id, order: i, version: (m as { version?: number }).version ?? 1 }));
    await adminReorderTeam(orderList);
    setList(next);
    setCachedTeam(next);
    setDragIndex(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-800">팀원</h1>
        <button
          type="button"
          onClick={openAdd}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          팀원 추가
        </button>
      </div>

      <p className="text-sm text-slate-500 mb-4">드래그하여 순서를 변경할 수 있습니다.</p>

      {loading ? (
        <div className="py-12 text-center text-slate-500">로딩 중...</div>
      ) : (
        <div className="space-y-3">
          {list.map((m, index) => (
            <div
              key={m.id}
              draggable
              onDragStart={() => setDragIndex(index)}
              onDragOver={(e) => {
                e.preventDefault();
                if (dragIndex === null) return;
                if (dragIndex !== index) handleReorder(dragIndex, index);
              }}
              onDragEnd={() => setDragIndex(null)}
              className={`bg-white rounded-xl border border-slate-200 p-4 flex items-center justify-between gap-4 cursor-move ${dragIndex === index ? "opacity-50" : ""}`}
            >
              <div className="flex items-center gap-4">
                <span className="text-slate-400 text-sm w-6">{index + 1}</span>
                {m.image && typeof m.image === "string" ? (
                  <img src={m.image} alt="" className="w-12 h-12 object-cover rounded-full" />
                ) : (
                  <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center text-slate-400 text-xs">
                    사진
                  </div>
                )}
                <div>
                  <div className="font-semibold text-slate-800">{m.name}</div>
                  <div className="text-sm text-slate-500">{m.role}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => openEdit(m)}
                  className="px-3 py-1.5 text-sm bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200"
                >
                  수정
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(m.id)}
                  className="px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-lg"
                >
                  삭제
                </button>
              </div>
            </div>
          ))}
          {list.length === 0 && (
            <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-slate-500">
              등록된 팀원이 없습니다.
            </div>
          )}
        </div>
      )}

      {modal !== "none" && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6">
            <h2 className="text-lg font-bold text-slate-800 mb-4">
              {modal === "add" ? "팀원 추가" : "팀원 수정"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">이름 *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">역할 *</label>
                <input
                  type="text"
                  value={form.role}
                  onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">소개</label>
                <textarea
                  value={typeof form.description === "string" ? form.description : ""}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 h-24"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">이미지</label>
                {form.image && typeof form.image === "string" && (
                  <p className="text-sm text-slate-500 mb-1">현재 이미지 사용 중</p>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setForm((f) => ({ ...f, image: e.target.files?.[0] ?? f.image }))}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2"
                />
              </div>
              <div className="flex gap-2 justify-end">
                <button type="button" onClick={closeModal} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg">
                  취소
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
                >
                  {submitting ? "저장 중..." : "저장"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
