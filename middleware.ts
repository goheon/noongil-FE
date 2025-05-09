//  Test 를 위해 middleware 를 주석처리합니다.

import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

// 인증이 필요한 경로 설정
const protectedAdminPaths = ['/admin']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get('refresh_token_admin')?.value // 예: 로그인 시 발급한 쿠키 이름

  console.log('미들웨어 작동함. 현재 경로:', pathname)
  console.log('토큰:', token)

  // 로그인 상태에서 로그인 페이지 접근 시 홈으로 리다이렉트
  // if (pathname.startsWith('/admin/login') && token) {
  //   return NextResponse.redirect(new URL('/admin', request.url))
  // }

  // // 로그인 페이지는 그대로 허용
  // if (pathname.startsWith('/admin/login')) {
  //   return NextResponse.next()
  // }

  // // 인증이 필요한 경로 접근 시, 토큰이 없으면 로그인 페이지로 리다이렉트
  // const isProtectedPath = protectedAdminPaths.some((path) =>
  //   pathname.startsWith(path),
  // )

  // if (isProtectedPath && !token) {
  //   const loginUrl = new URL('/admin/login', request.url)
  //   return NextResponse.redirect(loginUrl)
  // }

  return NextResponse.next()
}

export const config = {
  matcher: '/admin/:path*', // /admin 이하에만 middleware 작동
}

// export default function middleware(request: NextRequest) {
//   return NextResponse.next()
// }
