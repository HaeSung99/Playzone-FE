"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menus = [
  { href: "/admin", label: "대시보드" },
  { href: "/admin/notice", label: "공지사항" },
  { href: "/admin/sports-class", label: "스포츠 클래스" },
  { href: "/admin/enrollments", label: "수강 신청" },
  { href: "/admin/team", label: "팀원" },
  { href: "/admin/contact", label: "문의" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex">
        <aside className="w-56 min-h-screen bg-slate-800 text-white shrink-0 shadow-lg flex flex-col">
          <div className="p-4 border-b border-slate-700">
            <Link href="/admin" className="text-lg font-bold text-white hover:text-slate-200">
              플레이존 관리자
            </Link>
          </div>
          <nav className="p-2 flex-1">
            {menus.map((m) => (
              <Link
                key={m.href}
                href={m.href}
                className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  pathname === m.href || (m.href !== "/admin" && pathname.startsWith(m.href + "/"))
                    ? "bg-indigo-600 text-white"
                    : "text-slate-300 hover:bg-slate-700 hover:text-white"
                }`}
              >
                {m.label}
              </Link>
            ))}
          </nav>
          <div className="p-4 border-t border-slate-700">
            <Link href="/" className="block text-center py-2 text-sm text-slate-400 hover:text-white">
              ← 사이트로
            </Link>
          </div>
        </aside>
        <main className="flex-1 p-6 md:p-8">{children}</main>
      </div>
    </div>
  );
}
