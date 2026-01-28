import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // 어드민 기능 제거로 인해 미들웨어 로직 불필요
  return NextResponse.next();
}

export const config = {
  matcher: [],
};
