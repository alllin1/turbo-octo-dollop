import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

export async function updateSession(request) {
  // Create a response object that we can modify
  let response = NextResponse.next()
  
  // Create a Supabase client configured to use cookies
  const supabase = createMiddlewareClient({ req: request, res: response })
  
  // Refresh session if expired - required for Server Components
  // This will set the session cookie if needed
  const {
    data: { session },
  } = await supabase.auth.getSession()
  
  // If no session but trying to access protected routes, redirect to login
  if (!session && isProtectedRoute(request.nextUrl.pathname)) {
    const redirectUrl = new URL('/auth/signin', request.url)
    // Add the original URL as a query parameter so we can redirect after login
    redirectUrl.searchParams.set('redirectTo', request.nextUrl.pathname)
    return NextResponse.redirect(redirectUrl)
  }
  
  return response
}

// Helper function to determine if a route should be protected
function isProtectedRoute(pathname) {
  // List of routes that require authentication
  const protectedRoutes = [
    '/main/profile',
    '/main/cart',
    '/main/checkout',
    '/main/tickets',
    '/main/account'
  ]
  
  // Check if the pathname starts with any protected route
  return protectedRoutes.some(route => pathname.startsWith(route))
}
