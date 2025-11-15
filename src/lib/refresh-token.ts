import { ZustandCookieParser } from "./zustand-cookie-parser";
import { NextRequest } from "next/server";

export async function refreshTokens(refreshToken: string | undefined, request: NextRequest): Promise<boolean> {
	if (!refreshToken) return false;
	const cookies = request.cookies.getAll();

	const accessTokenKey = ZustandCookieParser.extractFromCookies(cookies, "auth-user", "token").name;
	const refreshTokenKey = ZustandCookieParser.extractFromCookies(cookies, "auth-user", "refreshToken").name;

	const res = await fetch(`${process.env.API_BASE_URI}/api/v1/auth/refresh/?useCookie=false`, {
		method: "POST",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ refreshToken }),
	});

	if (!res.ok) {
		request.cookies.delete(accessTokenKey);
		request.cookies.delete(refreshTokenKey);
	};

	const data = await res.json();

	// store tokens in HttpOnly cookies
	request.cookies.set(accessTokenKey, data.token);
	request.cookies.set(refreshTokenKey, data.refreshToken);

	return true;
}
