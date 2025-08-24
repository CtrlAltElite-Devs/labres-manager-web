import Axios from "axios";
import { useAuthStore } from "@/stores/auth";

export const api = Axios.create({
    baseURL: "https://slabres.ctr3.org",
    // baseURL: "https://kfsbqd92-3000.asse.devtunnels.ms",
    // baseURL: "http://localhost:5001",
    withCredentials: true
})

api.interceptors.request.use(
    (config) => {
        const token =useAuthStore.getState().auth?.token;
        // console.log("token: ", token);
        if(token) {
            config.headers.Authorization = `Bearer ${token}`
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)
