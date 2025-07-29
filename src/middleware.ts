import { NextRequest, NextResponse } from 'next/server';

const protectedRoutes = ['/dashboard', '/profile', '/settings'];
const authRoutes = ["/sign-in", "/password", "/register"];

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const isLoggedIn = Boolean(token);

  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  if (isProtectedRoute && !isLoggedIn) {
    const loginUrl = new URL('/sign-in', request.url);
    return NextResponse.redirect(loginUrl);
  }

  if(isAuthenticationPath(request.nextUrl.pathname) && isLoggedIn){
    return NextResponse.redirect(new URL("/dashboard", request.url)) ;
  }

  return NextResponse.next();
}

function isAuthenticationPath(pathname: string) : boolean{
    return authRoutes.some(route => pathname.startsWith(route));
}

// export const config = {
//   matcher: ['/dashboard/:path*', ...authRoutes ],
// };
