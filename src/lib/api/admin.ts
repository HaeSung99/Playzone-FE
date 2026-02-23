/**
 * 어드민 API 클라이언트
 * NEXT_PUBLIC_API_URL 없거나 요청 실패 시 site.ts mock 사용
 */

import {
  getNotices,
  getNoticeById,
  getSportsClasses,
  getSportsClassById,
  getTeamMembers,
  getEnrollments,
  getEnrollmentsByClassId,
  getContacts,
} from "@/data/site";

export type NoticeItem = { id: number; title: string; content: string; createdAt: string; updatedAt: string };
export type SportsClassItem = Record<string, unknown> & { id: number };
export type TeamMemberItem = { id: number; name: string; role: string; description: string; image: string | null; order?: number };
export type EnrollmentItem = { id: number; classId: number; className?: string; applicantName: string; phone: string; email: string; status: string; createdAt: string; version?: number };
export type ContactItem = { id: number; name: string; company: string; type: string; phone: string; email: string; message: string; status: string; memo: string | null; createdAt: string };

const _envUrl =
  typeof globalThis !== "undefined" &&
  (globalThis as unknown as { process?: { env?: { NEXT_PUBLIC_API_URL?: string } } }).process?.env?.NEXT_PUBLIC_API_URL;
const BASE: string = (typeof _envUrl === "string" ? _envUrl : "") || "";

function getBaseUrl(): string {
  return BASE;
}

async function fetchAdmin<T>(path: string, options?: RequestInit): Promise<T> {
  const base = getBaseUrl();
  if (!base) throw new Error("NO_BACKEND");
  const url = `${base.replace(/\/$/, "")}${path}`;
  const headers: HeadersInit = { ...(options?.headers as HeadersInit) };
  if (options?.body && typeof options.body === "string" && !(headers as Record<string, string>)["Content-Type"])
    (headers as Record<string, string>)["Content-Type"] = "application/json";
  const res = await fetch(url, {
    ...options,
    headers,
    credentials: "include",
  });
  if (!res.ok) throw new Error(String(res.status));
  return res.json() as Promise<T>;
}

async function withMock<T>(fn: () => Promise<T>, getFallback: () => T): Promise<T> {
  try {
    return await fn();
  } catch {
    return getFallback();
  }
}

// 클라이언트 메모리 캐시 (mutation 후 목록 갱신용). 서버에서는 사용 안 함.
let cache: {
  notices?: NoticeItem[];
  sportsClasses?: SportsClassItem[];
  team?: TeamMemberItem[];
  enrollments?: EnrollmentItem[];
  contacts?: ContactItem[];
} = {};

// --- Notice
export async function adminGetNotice(): Promise<NoticeItem[]> {
  return withMock(
    () => fetchAdmin<NoticeItem[]>("/admin/notice"),
    () => cache.notices ?? getNotices()
  );
}

export function setCachedNotices(list: NoticeItem[]) {
  cache.notices = list;
}

export async function adminGetNoticeById(id: number) {
  return withMock(
    () => fetchAdmin(`/admin/notice/${id}`),
    () => getNoticeById(id) ?? null
  );
}

export async function adminPostNotice(body: { title: string; content: string }) {
  try {
    const res = await fetchAdmin("/admin/notice", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });
    return res;
  } catch {
    const list = cache.notices ?? getNotices();
    const newId = Math.max(0, ...list.map((n: NoticeItem) => n.id)) + 1;
    const now = new Date().toISOString();
    const newOne = { id: newId, ...body, createdAt: now, updatedAt: now };
    cache.notices = [...list, newOne];
    return newOne;
  }
}

export async function adminPutNotice(id: number, body: { title?: string; content?: string }) {
  try {
    return await fetchAdmin(`/admin/notice/${id}`, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });
  } catch {
    const list = cache.notices ?? getNotices();
    const idx = list.findIndex((n: NoticeItem) => n.id === id);
    const updated: NoticeItem =
      idx >= 0
        ? { ...list[idx], ...body, updatedAt: new Date().toISOString() }
        : { id, title: body.title ?? "", content: body.content ?? "", createdAt: "", updatedAt: "" };
    if (idx >= 0) {
      cache.notices = list.slice(0, idx).concat(updated).concat(list.slice(idx + 1));
    }
    return updated;
  }
}

export async function adminDeleteNotice(id: number) {
  try {
    await fetchAdmin(`/admin/notice/${id}`, { method: "DELETE" });
    return {};
  } catch {
    cache.notices = (cache.notices ?? getNotices()).filter((n: NoticeItem) => n.id !== id);
    return {};
  }
}

// --- Sports Class
export async function adminGetSportsClassList(): Promise<SportsClassItem[]> {
  return withMock(
    () => fetchAdmin<SportsClassItem[]>("/admin/sports-class"),
    () => cache.sportsClasses ?? (getSportsClasses() as SportsClassItem[])
  );
}

export function setCachedSportsClasses(list: SportsClassItem[]) {
  cache.sportsClasses = list;
}

export async function adminGetSportsClassById(id: number) {
  return withMock(
    () => fetchAdmin(`/admin/sports-class/${id}`),
    () => getSportsClassById(id) ?? null
  );
}

export async function adminCreateSportsClass(body: Record<string, unknown> & { image?: string | null }) {
  try {
    const form = new FormData();
    Object.entries(body).forEach(([k, v]) => {
      if (v == null) return;
      form.append(k, typeof v === "object" && "name" in v && v instanceof File ? v : String(v));
    });
    const base = getBaseUrl();
    const res = await fetch(`${base.replace(/\/$/, "")}/admin/sports-class`, { method: "POST", body: form, credentials: "include" });
    if (!res.ok) throw new Error(String(res.status));
    return res.json();
  } catch {
    const list = cache.sportsClasses ?? (getSportsClasses() as SportsClassItem[]);
    const newId = Math.max(0, ...list.map((c) => c.id)) + 1;
    const now = new Date().toISOString();
    const newOne = { id: newId, ...body, createdAt: now, updatedAt: now };
    cache.sportsClasses = [...list, newOne];
    return newOne;
  }
}

export async function adminUpdateSportsClass(id: number, body: Record<string, unknown> & { image?: string | null }) {
  try {
    const form = new FormData();
    Object.entries(body).forEach(([k, v]) => {
      if (v == null) return;
      form.append(k, typeof v === "object" && "name" in v && v instanceof File ? v : String(v));
    });
    const base = getBaseUrl();
    const res = await fetch(`${base.replace(/\/$/, "")}/admin/sports-class/${id}`, { method: "PUT", body: form, credentials: "include" });
    if (!res.ok) throw new Error(String(res.status));
    return res.json();
  } catch {
    const list = cache.sportsClasses ?? (getSportsClasses() as SportsClassItem[]);
    const idx = list.findIndex((c) => c.id === id);
    const updated = idx >= 0 ? { ...list[idx], ...body, updatedAt: new Date().toISOString() } : { id, ...body };
    if (idx >= 0) cache.sportsClasses = list.map((c, i) => (i === idx ? (updated as SportsClassItem) : c));
    return updated;
  }
}

export async function adminDeleteSportsClass(id: number) {
  try {
    await fetchAdmin(`/admin/sports-class/${id}`, { method: "DELETE" });
    return {};
  } catch {
    cache.sportsClasses = (cache.sportsClasses ?? (getSportsClasses() as SportsClassItem[])).filter((c) => c.id !== id);
    return {};
  }
}

export async function adminGetClassEnrollmentList(classId: number) {
  return withMock(
    () => fetchAdmin(`/admin/sports-class/${classId}/enrollments`),
    () => getEnrollmentsByClassId(classId)
  );
}

// --- Enrollments
export async function adminGetAllEnrollments(): Promise<EnrollmentItem[]> {
  return withMock(
    () => fetchAdmin<EnrollmentItem[]>("/admin/enrollments"),
    () => cache.enrollments ?? (getEnrollments() as EnrollmentItem[])
  );
}

export function setCachedEnrollments(list: EnrollmentItem[]) {
  cache.enrollments = list;
}

export type EnrollmentStatus = "PENDING" | "APPROVED" | "REJECTED" | "CANCELLED";

export async function adminUpdateEnrollmentStatus(id: number, status: EnrollmentStatus) {
  try {
    return await fetchAdmin(`/admin/enrollments/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
      headers: { "Content-Type": "application/json" },
    });
  } catch {
    const list = cache.enrollments ?? (getEnrollments() as EnrollmentItem[]);
    const e = list.find((x) => x.id === id);
    if (e) e.status = status;
    cache.enrollments = [...list];
    return e ?? { id, status };
  }
}

export async function adminDeleteEnrollment(id: number) {
  try {
    await fetchAdmin(`/admin/enrollments/${id}`, { method: "DELETE" });
    return {};
  } catch {
    cache.enrollments = (cache.enrollments ?? (getEnrollments() as EnrollmentItem[])).filter((e) => e.id !== id);
    return {};
  }
}

// --- Team
export async function adminGetTeamList(): Promise<TeamMemberItem[]> {
  return withMock(
    () => fetchAdmin<TeamMemberItem[]>("/admin/team"),
    () => cache.team ?? getTeamMembers().map((t, i) => ({ ...t, order: i })) as TeamMemberItem[]
  );
}

export function setCachedTeam(list: TeamMemberItem[]) {
  cache.team = list;
}

export async function adminAddTeamMember(body: { name: string; role: string; description: string; image?: string | null }) {
  try {
    const form = new FormData();
    Object.entries(body).forEach(([k, v]) => {
      if (v == null) return;
      const isFile = typeof v === "object" && v !== null && (v as File) instanceof File;
      form.append(k, isFile ? (v as File) : String(v));
    });
    const base = getBaseUrl();
    const res = await fetch(`${base.replace(/\/$/, "")}/admin/team`, { method: "POST", body: form, credentials: "include" });
    if (!res.ok) throw new Error(String(res.status));
    return res.json();
  } catch {
    const list: TeamMemberItem[] = cache.team ?? getTeamMembers().map((t, i) => ({ ...t, order: i })) as TeamMemberItem[];
    const newId = Math.max(0, ...list.map((t) => t.id)) + 1;
    const newOne: TeamMemberItem = { id: newId, ...body, image: body.image ?? null, order: list.length };
    cache.team = [...list, newOne];
    return newOne;
  }
}

export async function adminUpdateTeamMember(id: number, body: { name?: string; role?: string; description?: string; image?: string | null }) {
  try {
    const form = new FormData();
    Object.entries(body).forEach(([k, v]) => {
      if (v == null) return;
      const isFile = typeof v === "object" && v !== null && (v as File) instanceof File;
      form.append(k, isFile ? (v as File) : String(v));
    });
    const base = getBaseUrl();
    const res = await fetch(`${base.replace(/\/$/, "")}/admin/team/${id}`, { method: "PUT", body: form, credentials: "include" });
    if (!res.ok) throw new Error(String(res.status));
    return res.json();
  } catch {
    const list = cache.team ?? getTeamMembers().map((t, i) => ({ ...t, order: i })) as TeamMemberItem[];
    const idx = list.findIndex((t) => t.id === id);
    if (idx >= 0) {
      list[idx] = { ...list[idx], ...body };
      cache.team = [...list];
      return list[idx];
    }
    return { id, ...body };
  }
}

export async function adminDeleteTeamMember(id: number) {
  try {
    await fetchAdmin(`/admin/team/${id}`, { method: "DELETE" });
    return {};
  } catch {
    cache.team = (cache.team ?? getTeamMembers().map((t, i) => ({ ...t, order: i })) as TeamMemberItem[]).filter((t) => t.id !== id);
    return {};
  }
}

export async function adminReorderTeam(orderList: Array<{ id: number; order: number; version: number }>) {
  try {
    return await fetchAdmin("/admin/team/reorder", {
      method: "PATCH",
      body: JSON.stringify(orderList),
      headers: { "Content-Type": "application/json" },
    });
  } catch {
    const list = cache.team ?? getTeamMembers().map((t, i) => ({ ...t, order: i })) as TeamMemberItem[];
    const byId = new Map(list.map((t) => [t.id, t]));
    orderList.forEach(({ id, order }) => {
      const t = byId.get(id);
      if (t) t.order = order;
    });
    cache.team = [...list].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    return cache.team;
  }
}

// --- Contact
export async function adminGetContacts(): Promise<ContactItem[]> {
  return withMock(
    () => fetchAdmin<ContactItem[]>("/admin/contact"),
    () => cache.contacts ?? (getContacts() as ContactItem[])
  );
}

export function setCachedContacts(list: ContactItem[]) {
  cache.contacts = list;
}

export async function adminUpdateContact(id: number, body: { status?: string; memo?: string | null }) {
  try {
    return await fetchAdmin(`/admin/contact/${id}`, {
      method: "PATCH",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });
  } catch {
    const list = cache.contacts ?? (getContacts() as ContactItem[]);
    const c = list.find((x) => x.id === id);
    if (c) {
      if (body.status != null) c.status = body.status;
      if (body.memo !== undefined) c.memo = body.memo;
      cache.contacts = [...list];
      return c;
    }
    return { id, ...body };
  }
}
