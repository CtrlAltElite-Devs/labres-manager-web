import Axios from "axios";
import { useAuthStore } from "@/stores/auth";
import { ApiVersion } from "@/types/api-version";

export const api = Axios.create({
    baseURL: "https://slabres.ctr3.org",
    // baseURL: "https://kfsbqd92-3000.asse.devtunnels.ms",
    // baseURL: "http://localhost:5001",
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
