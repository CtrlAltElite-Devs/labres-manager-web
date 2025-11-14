import Axios from "axios";
import { useAuthStore } from "@/stores/auth";
import { ApiVersion } from "@/types/api-version";

export const api = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URI,
    withCredentials: true
})

api.interceptors.request.use(
    (config) => {
        const token = useAuthStore.getState().auth?.token;
        console.log("token: ", token);
        config.headers.Authorization = `Bearer ${token}`
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const VERSION: ApiVersion = "v1";
        const originalRequest = error.config;

        if (error.response?.status === 429) {
            console.warn("Rate limit hit — logging out.");
            useAuthStore.getState().clearAuth();
            window.location.replace("/sign-in");
            return Promise.reject(error);
        }

        if (originalRequest.url.includes(`/api/${VERSION}/auth/refresh`)) {
            return Promise.reject(error);
        }

        if (error.response?.status === 401) {
            try {
                const response = await api.post(
                    `/api/${VERSION}/auth/refresh?useCookie=true`,
                    {}
                );

                if (response.status === 201) {
                    const originalResponse = await api(originalRequest);
                    return originalResponse;
                } else {
                    useAuthStore.getState().clearAuth();
                    window.location.replace("/sign-in");
                    return Promise.reject(error);
                }
            } catch (refreshError) {
                useAuthStore.getState().clearAuth();
                window.location.replace("/sign-in");
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);
