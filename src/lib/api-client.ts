type RequestMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface RequestOptions extends Omit<RequestInit, "method" | "body"> {
	method?: RequestMethod;
	body?: unknown;
	headers?: Record<string, string>;
}

export async function apiClient<T>(path: string, { method = "GET", body, headers = {}, ...options }: RequestOptions = {}): Promise<T> {
	const res = await fetch(path, {
		method,
		headers: {
			"Content-Type": "application/json",
			...headers,
		},
		body: body ? JSON.stringify(body) : undefined,
		credentials: "include",
		...options,
	});

	if (!res.ok) {
		const text = await res.text();
		throw new Error(text || `Request failed with status ${res.status}`);
	}

	return res.json();
}

export const apiGet = <T>(path: string) => apiClient<T>(path);
export const apiPost = <T>(path: string, body: unknown) => apiClient<T>(path, { method: "POST", body });
