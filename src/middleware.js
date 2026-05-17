import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'

export async function middleware(request) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          response = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // 1. Lấy phiên đăng nhập (Session) - Cách này đồng bộ Cookie tốt nhất ở Middleware
  const { data: { session } } = await supabase.auth.getSession()
  const user = session?.user
  const pathname = request.nextUrl.pathname

  // 2. Nếu cố tình vào /admin hoặc /dashboard mà CHƯA ĐĂNG NHẬP -> Đá về /login
  if ((pathname.startsWith('/admin') || pathname.startsWith('/dashboard')) && !user) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // 3. Nếu ĐÃ ĐĂNG NHẬP và cố vào trang /login -> Đá ngược vào trong
  if (pathname.startsWith('/login') && user) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return response
}

export const config = {
  // Quét qua tất cả các tuyến đường cần bảo vệ
  matcher: [
    '/admin', 
    '/admin/:path*', 
    '/dashboard', 
    '/dashboard/:path*',
    '/login'
  ],
}