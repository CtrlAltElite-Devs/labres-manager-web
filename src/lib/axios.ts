import Axios from "axios";
import { ApiVersion } from "@/types/api-version";
import { useTokenStore } from "@/stores/tokens/token";
import { useUserStore } from "@/stores/user";
import { useTokenStoreHookState } from "@/stores/tokens";
import { useRefreshTokenStore } from "@/stores/tokens/refresh-token";

export const api = Axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_BASE_URI,
	withCredentials: true,
});

api.interceptors.request.use(
	(config) => {
		const token = useTokenStore.getState().token;
		config.headers.Authorization = `Bearer ${token}`;
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

api.interceptors.response.use(
	(response) => response,
	async (error) => {
		const VERSION: ApiVersion = "v1";
		const originalRequest = error.config;

		if (error.response?.status === 429) {
			console.warn("Rate limit hit — logging out.");
			useUserStore.getState().clearUserData();
            useTokenStoreHookState().clearTokens();
			window.location.replace("/sign-in");
			return Promise.reject(error);
		}

		if (originalRequest.url.includes(`/api/${VERSION}/auth/refresh`)) {
			return Promise.reject(error);
		}

		if (error.response?.status === 401) {
			try {
				const response = await api.post<{ token: string; refreshToken: string }>(`/api/${VERSION}/auth/refresh?useCookie=false`, {
					refreshToken: useRefreshTokenStore.getState().refreshToken,
				});

				if (response.status === 201) {
                    useTokenStoreHookState().setTokens(response.data.token, response.data.refreshToken)
					const originalResponse = await api(originalRequest);
					return originalResponse;
				} else {
					useUserStore.getState().clearUserData();
                    useTokenStoreHookState().clearTokens();
					window.location.replace("/sign-in");
					return Promise.reject(error);
				}
			} catch (refreshError) {
				useUserStore.getState().clearUserData();
                useTokenStoreHookState().clearTokens();
				window.location.replace("/sign-in");
				return Promise.reject(refreshError);
			}
		}

		return Promise.reject(error);
	}
);
