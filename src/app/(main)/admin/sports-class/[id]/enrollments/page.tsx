"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { adminGetSportsClassById, adminGetClassEnrollmentList } from "@/lib/api/admin";

type Enrollment = {
  id: number;
  applicantName: string;
  phone: string;
  email: string;
  status: string;
  createdAt: string;
};

export default function ClassEnrollmentsPage() {
  const params = useParams();
  const classId = Number(params.id);
  const [className, setClassName] = useState("");
  const [list, setList] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!classId) return;
    Promise.all([
      adminGetSportsClassById(classId),
      adminGetClassEnrollmentList(classId),
    ]).then(([cls, enrollments]) => {
      setClassName((cls as { title?: string })?.title ?? `클래스 #${classId}`);
      setList(Array.isArray(enrollments) ? enrollments : []);
      setLoading(false);
    });
  }, [classId]);

  if (loading) return <div className="py-12 text-center text-slate-500">로딩 중...</div>;

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/sports-class" className="text-slate-600 hover:text-slate-800">← 클래스 목록</Link>
        <h1 className="text-2xl font-bold text-slate-800">수강 신청자: {className}</h1>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-100 text-slate-600 text-sm">
            <tr>
              <th className="p-3 font-medium">ID</th>
              <th className="p-3 font-medium">신청자</th>
              <th className="p-3 font-medium">연락처</th>
              <th className="p-3 font-medium">상태</th>
              <th className="p-3 font-medium">신청일</th>
            </tr>
          </thead>
          <tbody>
            {list.map((e) => (
              <tr key={e.id} className="border-t border-slate-100">
                <td className="p-3 text-slate-600">{e.id}</td>
                <td className="p-3 font-medium">{e.applicantName}</td>
                <td className="p-3 text-sm">{e.phone} / {e.email}</td>
                <td className="p-3">{e.status}</td>
                <td className="p-3 text-slate-500 text-sm">
                  {new Date(e.createdAt).toLocaleDateString("ko-KR")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {list.length === 0 && (
          <div className="p-12 text-center text-slate-500">이 클래스의 수강 신청자가 없습니다.</div>
        )}
      </div>
    </div>
  );
}
