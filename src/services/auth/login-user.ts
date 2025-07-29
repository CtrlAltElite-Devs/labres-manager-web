import { User } from "@/types"
import { api } from "@/lib/axios"
import { useMutation } from "@tanstack/react-query";

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

    return response.data;
}

export const useLoginUser = () => useMutation({
    mutationFn: loginUser
})
