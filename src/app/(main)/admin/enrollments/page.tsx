"use client";

import { useState, useEffect } from "react";
import {
  adminGetAllEnrollments,
  adminUpdateEnrollmentStatus,
  adminDeleteEnrollment,
  setCachedEnrollments,
  type EnrollmentStatus,
} from "@/lib/api/admin";

type Enrollment = {
  id: number;
  classId: number;
  className?: string;
  applicantName: string;
  phone: string;
  email: string;
  status: string;
  createdAt: string;
  version?: number;
};

const STATUS_OPTIONS: { value: EnrollmentStatus; label: string }[] = [
  { value: "PENDING", label: "대기" },
  { value: "APPROVED", label: "승인" },
  { value: "REJECTED", label: "거절" },
  { value: "CANCELLED", label: "취소" },
];

export default function AdminEnrollmentsPage() {
  const [list, setList] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const data = await adminGetAllEnrollments();
    setList(Array.isArray(data) ? data : []);
    setCachedEnrollments(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const handleStatusChange = async (id: number, status: EnrollmentStatus) => {
    await adminUpdateEnrollmentStatus(id, status);
    await load();
  };

  const handleDelete = async (id: number) => {
    if (!confirm("이 수강 신청을 삭제할까요?")) return;
    await adminDeleteEnrollment(id);
    await load();
  };

  const statusColor = (s: string) => {
    switch (s) {
      case "APPROVED": return "bg-green-100 text-green-800";
      case "REJECTED": return "bg-red-100 text-red-800";
      case "CANCELLED": return "bg-slate-100 text-slate-600";
      default: return "bg-amber-100 text-amber-800";
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800 mb-6">수강 신청</h1>

      {loading ? (
        <div className="py-12 text-center text-slate-500">로딩 중...</div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[800px]">
              <thead className="bg-slate-100 text-slate-600 text-sm">
                <tr>
                  <th className="p-3 font-medium">ID</th>
                  <th className="p-3 font-medium">클래스</th>
                  <th className="p-3 font-medium">신청자</th>
                  <th className="p-3 font-medium">연락처</th>
                  <th className="p-3 font-medium">상태</th>
                  <th className="p-3 font-medium">신청일</th>
                  <th className="p-3 font-medium w-48">관리</th>
                </tr>
              </thead>
              <tbody>
                {list.map((e) => (
                  <tr key={e.id} className="border-t border-slate-100">
                    <td className="p-3 text-slate-600">{e.id}</td>
                    <td className="p-3">{e.className ?? `클래스 #${e.classId}`}</td>
                    <td className="p-3 font-medium">{e.applicantName}</td>
                    <td className="p-3 text-sm">{e.phone} / {e.email}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${statusColor(e.status)}`}>
                        {STATUS_OPTIONS.find((o) => o.value === e.status)?.label ?? e.status}
                      </span>
                    </td>
                    <td className="p-3 text-slate-500 text-sm">
                      {new Date(e.createdAt).toLocaleDateString("ko-KR")}
                    </td>
                    <td className="p-3">
                      <select
                        value={e.status}
                        onChange={(ev) => handleStatusChange(e.id, ev.target.value as EnrollmentStatus)}
                        className="text-sm border border-slate-300 rounded px-2 py-1 mr-2"
                      >
                        {STATUS_OPTIONS.map((o) => (
                          <option key={o.value} value={o.value}>{o.label}</option>
                        ))}
                      </select>
                      <button
                        type="button"
                        onClick={() => handleDelete(e.id)}
                        className="text-red-600 hover:underline text-sm"
                      >
                        삭제
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {list.length === 0 && (
            <div className="p-12 text-center text-slate-500">수강 신청이 없습니다.</div>
          )}
        </div>
      )}
    </div>
  );
}
