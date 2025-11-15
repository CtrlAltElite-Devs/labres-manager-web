/**
 * Parses zustand persist middleware cookie format
 * Example: "admin-auth-token|state|accessToken:array" -> extracts the actual token
 */

interface ZustandCookieData {
	state?: {
		accessToken?: string;
		// ..
	};
}

interface ZustandParsedTokenData {
	state? : {
		token? : string;
	}
}

interface ZustandParsedRefreshTokenData {
	state? : {
		refreshToken? : string;
	}
}

export type ZustandCookieParsedData = {
	name: string;
	value: string;
};

export class ZustandCookieParser {


	static parseToken(cookies: {name: string; value: string}[]) : string | null {
		try {
			const token = cookies.find(cookie => cookie.name.startsWith("token-store"));
			if(!token) return null;
			const parsed: ZustandParsedTokenData = JSON.parse(token.value);
			return parsed.state?.token || null;
		} catch(error) {
			console.error("Error parsing zustand cookie in middleware:", error);
			return null;
		}
	}

	static parseRefreshToken(cookies: {name: string; value: string}[]) : string | null {
		try {
			const token = cookies.find(cookie => cookie.name.startsWith("refresh-token-store"));
			if(!token) return null;
			const parsed: ZustandParsedRefreshTokenData = JSON.parse(token.value);
			return parsed.state?.refreshToken || null;
		} catch(error) {
			console.error("Error parsing zustand cookie in middleware:", error);
			return null;
		}
	}

	static extractRefreshToken(cookies: { name: string; value: string }[]) {
		try {
			const foundCookie = cookies.find((cookie) => cookie.name.endsWith("refreshToken"));
			console.log("EXTRACT REFRESH TOKEN", foundCookie);
			if (!foundCookie) return { name: "", value: "" };

			return {
				name: foundCookie.name,
				value: foundCookie.value,
			};
		} catch (error) {
			console.error("Error parsing zustand cookie in middleware:", error);
			return { name: "", value: "" };
		}
	}

	static extractFromCookies(cookies: { name: string; value: string }[], key: string, property: string): ZustandCookieParsedData {
		try {
			const foundCookie = cookies.find((cookie) => {
				const decoded = decodeURIComponent(cookie.name);
				return decoded.startsWith(key) && decoded.endsWith(property);
			});

			if (!foundCookie) return { name: "", value: "" };

			return {
				name: foundCookie.name,
				value: foundCookie.value,
			};
		} catch (error) {
			console.error("Error parsing zustand cookie in middleware:", error);
			return { name: "", value: "" };
		}
	}

	/**
	 * Extract token from the complex zustand cookie format
	 */
	private static extractTokenFromZustandFormat(cookieValue: string): string | null {
		if (!cookieValue) return null;

		try {
			const parsed: ZustandCookieData = JSON.parse(cookieValue);
			return parsed.state?.accessToken || null;
		} catch {
			console.warn("Cookie is not in expected JSON format, trying fallback parsing");
			return this.fallbackParse(cookieValue);
		}
	}

	/**
	 * Fallback parsing for different zustand cookie formats
	 */
	private static fallbackParse(cookieValue: string): string | null {
		if (cookieValue.startsWith('"') && cookieValue.endsWith('"')) {
			return cookieValue.slice(1, -1);
		}

		const tokenMatch = cookieValue.match(/"accessToken":"([^"]+)"/);
		if (tokenMatch) {
			return tokenMatch[1];
		}

		try {
			const decoded = decodeURIComponent(cookieValue);
			const parsed = JSON.parse(decoded);
			return parsed.state?.accessToken || null;
		} catch {
			if (cookieValue.length > 10 && cookieValue.length < 500) {
				return cookieValue;
			}
		}

		return null;
	}

	/**
	 * Debug utility to see what's actually in the cookies
	 */
	static debugCookies(cookies: { name: string; value: string }[], key: string): void {
		console.log("=== ZUSTAND COOKIE DEBUG ===");
		cookies.forEach((cookie) => {
			if (cookie.name.startsWith(key)) {
				console.log("Cookie name:", cookie.name);
				console.log("Cookie value:", cookie.value);
				console.log("Parsed token:", this.extractTokenFromZustandFormat(cookie.value));
				console.log("---");
			}
		});
	}
}
