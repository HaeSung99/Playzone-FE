"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  adminGetNotice,
  adminPostNotice,
  adminPutNotice,
  adminDeleteNotice,
  setCachedNotices,
} from "@/lib/api/admin";

type Notice = { id: number; title: string; content: string; createdAt: string; updatedAt: string };

export default function AdminNoticePage() {
  const [list, setList] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<"none" | "add" | "edit">("none");
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState({ title: "", content: "" });
  const [submitting, setSubmitting] = useState(false);

  const load = async () => {
    setLoading(true);
    const data = await adminGetNotice();
    setList(Array.isArray(data) ? data : []);
    setCachedNotices(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const openAdd = () => {
    setForm({ title: "", content: "" });
    setEditId(null);
    setModal("add");
  };

  const openEdit = (n: Notice) => {
    setForm({ title: n.title, content: n.content });
    setEditId(n.id);
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
      if (modal === "add") {
        await adminPostNotice(form);
      } else if (editId != null) {
        await adminPutNotice(editId, form);
      }
      await load();
      closeModal();
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("이 공지를 삭제할까요?")) return;
    await adminDeleteNotice(id);
    await load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-800">공지사항</h1>
        <button
          type="button"
          onClick={openAdd}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          공지 추가
        </button>
      </div>

      {loading ? (
        <div className="py-12 text-center text-slate-500">로딩 중...</div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-100 text-slate-600 text-sm">
              <tr>
                <th className="p-3 font-medium">ID</th>
                <th className="p-3 font-medium">제목</th>
                <th className="p-3 font-medium">작성일</th>
                <th className="p-3 font-medium w-32">관리</th>
              </tr>
            </thead>
            <tbody>
              {list.map((n) => (
                <tr key={n.id} className="border-t border-slate-100">
                  <td className="p-3 text-slate-600">{n.id}</td>
                  <td className="p-3 font-medium text-slate-800">{n.title}</td>
                  <td className="p-3 text-slate-500 text-sm">
                    {new Date(n.createdAt).toLocaleDateString("ko-KR")}
                  </td>
                  <td className="p-3">
                    <button
                      type="button"
                      onClick={() => openEdit(n)}
                      className="text-indigo-600 hover:underline mr-2"
                    >
                      수정
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(n.id)}
                      className="text-red-600 hover:underline"
                    >
                      삭제
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {list.length === 0 && (
            <div className="p-12 text-center text-slate-500">등록된 공지가 없습니다.</div>
          )}
        </div>
      )}

      {modal !== "none" && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6">
            <h2 className="text-lg font-bold text-slate-800 mb-4">
              {modal === "add" ? "공지 추가" : "공지 수정"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">제목</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">내용</label>
                <textarea
                  value={form.content}
                  onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 h-32"
                  required
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
