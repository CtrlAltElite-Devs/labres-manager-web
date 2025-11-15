import { NextRequest, NextResponse } from "next/server";
import { ValidateToken } from "./lib/validate-token";
import { ZustandCookieParser } from "./lib/zustand-cookie-parser";

const protectedRoutes = ["/dashboard", "/profile", "/settings"];
const authRoutes = ["/sign-in", "/password", "/register"];

export async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	if (
		pathname.startsWith("/_next") ||
		pathname.startsWith("/favicon") ||
		pathname.startsWith("/robots") ||
		pathname.startsWith("/sitemap") ||
		pathname.includes(".")
	) {
		return;
	}
	console.log("Middleware:", request.nextUrl.pathname);
	const cookies = request.cookies.getAll();
	const accessToken = ZustandCookieParser.parseToken(cookies);
	const isLoggedIn = await ValidateToken(accessToken);

	const isProtectedRoute = protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route));

	if (isProtectedRoute && !isLoggedIn) {
		const loginUrl = new URL("/sign-in", request.url);
		return NextResponse.redirect(loginUrl);
	}

	if (isAuthenticationPath(request.nextUrl.pathname) && isLoggedIn) {
		return NextResponse.redirect(new URL("/dashboard", request.url));
	}

	return NextResponse.next();
}

function isAuthenticationPath(pathname: string): boolean {
	return authRoutes.some((route) => pathname.startsWith(route));
}
