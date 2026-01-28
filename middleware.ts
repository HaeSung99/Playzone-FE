import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // 어드민 기능 제거로 인해 미들웨어 로직 불필요
  return NextResponse.next();
}

export const config = {
  // 빈 배열은 모든 경로에 매칭되므로 명시적으로 제외
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
