import { User } from "@/types"
import { api } from "@/lib/axios"
import { useMutation } from "@tanstack/react-query";
import Cookies from 'js-cookie';

export type LoginDto = {
    pid: string;
    password: string;
}

export type LoginResponseDto = {
    user: User,
    token: string
}


const loginUser = async (payload: LoginDto) => {
    const response = await api.post<LoginResponseDto>("/api/auth/login", {
        ...payload
    });

    const { token } = response.data;

    Cookies.set('token', token, {
        expires: 7,
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
    });

    return response.data;
}

export const useLoginUser = () => useMutation({
    mutationFn: loginUser
})
