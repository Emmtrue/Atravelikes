
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// The firebase-admin package is not compatible with the Edge Runtime,
// which is where Middleware runs. Any attempt to import it here will
// cause a build-time error.

// Instead of verifying the token here, we just check for the existence
// of the session cookie. The actual token verification will happen in
// the protected page or API route, which runs in a full Node.js environment.

export async function middleware(request: NextRequest) {
    const sessionCookie = request.cookies.get('session')?.value
    const { pathname } = request.nextUrl

    // Super Admin Routes Protection
    if (pathname.startsWith('/super-admin') && pathname !== '/super-admin') {
        if (!sessionCookie) {
            const loginUrl = new URL('/super-admin', request.url)
            loginUrl.searchParams.set('redirectTo', pathname)
            return NextResponse.redirect(loginUrl)
        }
        // Verification of the 'superadmin' role claim will happen in the /super-admin layout.
    }

    // Regular User Protected Routes
    if (pathname.startsWith('/profile')) {
        if (!sessionCookie) {
            const loginUrl = new URL('/login', request.url)
            loginUrl.searchParams.set('redirectTo', pathname)
            return NextResponse.redirect(loginUrl)
        }
    }

    return NextResponse.next()
}

export const config = {
  matcher: ['/super-admin/:path*', '/profile'],
}
