"use client";

import Link from "next/link";

const cards = [
  { href: "/admin/notice", label: "공지사항", desc: "공지 등록·수정·삭제" },
  { href: "/admin/sports-class", label: "스포츠 클래스", desc: "클래스 관리 및 수강 신청자" },
  { href: "/admin/enrollments", label: "수강 신청", desc: "전체 수강 신청 목록·상태 변경" },
  { href: "/admin/team", label: "팀원", desc: "팀원 추가·수정·순서 변경" },
  { href: "/admin/contact", label: "문의", desc: "문의 목록·상태·메모 관리" },
];

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800 mb-2">어드민 대시보드</h1>
      <p className="text-slate-600 mb-8">항목을 선택해 관리하세요.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="block p-5 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-indigo-200 transition"
          >
            <h2 className="font-semibold text-slate-800">{c.label}</h2>
            <p className="text-sm text-slate-500 mt-1">{c.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
