import { cookies } from "next/headers";
import { refreshTokens } from "./refresh-token";
import { CookieConstants } from "@/app/constants/cookies";

export async function externalApi<T>(
  url: string,
  init: RequestInit = {}
): Promise<T> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(CookieConstants.token)?.value;

  const res = await fetch(process.env.API_BASE_URI + url, {
    ...init,
    headers: {
      ...init.headers,
      Authorization: accessToken ? `Bearer ${accessToken}` : "",
      "Content-Type": "application/json",
    },
  });

  // If unauthorized → try refresh
  if (res.status === 401) {
    const refreshed = await refreshTokens();

    if (!refreshed) {
      throw new Error("UNAUTHORIZED");
    }

    // Retry original request
    return externalApi<T>(url, init);
  }

  if (!res.ok) {
	console.error(await res.json());
    throw new Error(`External API error: ${res.status}`);
  }

  return res.json();
}
