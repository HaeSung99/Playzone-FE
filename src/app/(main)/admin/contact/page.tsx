"use client";

import { useState, useEffect } from "react";
import { adminGetContacts, adminUpdateContact, setCachedContacts } from "@/lib/api/admin";

type Contact = {
  id: number;
  name: string;
  company: string;
  type: string;
  phone: string;
  email: string;
  message: string;
  status: string;
  memo: string | null;
  createdAt: string;
};

export default function AdminContactPage() {
  const [list, setList] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({ status: "", memo: "" });
  const [submitting, setSubmitting] = useState(false);

  const load = async () => {
    setLoading(true);
    const data = await adminGetContacts();
    setList(Array.isArray(data) ? data : []);
    setCachedContacts(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const openEdit = (c: Contact) => {
    setEditingId(c.id);
    setEditForm({ status: c.status, memo: c.memo ?? "" });
  };

  const closeEdit = () => {
    setEditingId(null);
  };

  const handleSave = async () => {
    if (editingId == null) return;
    setSubmitting(true);
    try {
      await adminUpdateContact(editingId, { status: editForm.status, memo: editForm.memo || null });
      await load();
      closeEdit();
    } finally {
      setSubmitting(false);
    }
  };

  const statusColor = (s: string) => {
    switch (s) {
      case "ANSWERED": return "bg-green-100 text-green-800";
      case "PENDING": return "bg-amber-100 text-amber-800";
      default: return "bg-slate-100 text-slate-600";
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800 mb-6">문의</h1>

      {loading ? (
        <div className="py-12 text-center text-slate-500">로딩 중...</div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[700px]">
              <thead className="bg-slate-100 text-slate-600 text-sm">
                <tr>
                  <th className="p-3 font-medium">ID</th>
                  <th className="p-3 font-medium">이름/회사</th>
                  <th className="p-3 font-medium">유형</th>
                  <th className="p-3 font-medium">연락처</th>
                  <th className="p-3 font-medium">내용</th>
                  <th className="p-3 font-medium">상태</th>
                  <th className="p-3 font-medium">접수일</th>
                  <th className="p-3 font-medium w-20">관리</th>
                </tr>
              </thead>
              <tbody>
                {list.map((c) => (
                  <tr key={c.id} className="border-t border-slate-100">
                    <td className="p-3 text-slate-600">{c.id}</td>
                    <td className="p-3">
                      <div className="font-medium">{c.name}</div>
                      {c.company && <div className="text-xs text-slate-500">{c.company}</div>}
                    </td>
                    <td className="p-3 text-sm">{c.type}</td>
                    <td className="p-3 text-sm">{c.phone}<br />{c.email}</td>
                    <td className="p-3 text-sm max-w-xs truncate">{c.message}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${statusColor(c.status)}`}>
                        {c.status === "ANSWERED" ? "답변완료" : c.status === "PENDING" ? "대기" : c.status}
                      </span>
                    </td>
                    <td className="p-3 text-slate-500 text-sm">
                      {new Date(c.createdAt).toLocaleDateString("ko-KR")}
                    </td>
                    <td className="p-3">
                      <button
                        type="button"
                        onClick={() => openEdit(c)}
                        className="text-indigo-600 hover:underline text-sm"
                      >
                        수정
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {list.length === 0 && (
            <div className="p-12 text-center text-slate-500">문의가 없습니다.</div>
          )}
        </div>
      )}

      {editingId != null && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <h2 className="text-lg font-bold text-slate-800 mb-4">문의 상태/메모 수정</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">상태</label>
                <select
                  value={editForm.status}
                  onChange={(e) => setEditForm((f) => ({ ...f, status: e.target.value }))}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2"
                >
                  <option value="PENDING">대기</option>
                  <option value="ANSWERED">답변완료</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">메모</label>
                <textarea
                  value={editForm.memo}
                  onChange={(e) => setEditForm((f) => ({ ...f, memo: e.target.value }))}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 h-24"
                  placeholder="내부 메모"
                />
              </div>
            </div>
            <div className="flex gap-2 justify-end mt-6">
              <button type="button" onClick={closeEdit} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg">
                취소
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={submitting}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
              >
                {submitting ? "저장 중..." : "저장"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
