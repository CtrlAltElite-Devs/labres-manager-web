import { User } from "@/types"
import { api } from "@/lib/axios"
import { useMutation } from "@tanstack/react-query";
import { ApiVersion } from "@/types/api-version";

const VERSION : ApiVersion = "v2";

export type LoginDto = {
    pid: string;
    password: string;
}

export type LoginResponseDto = {
    user: User,
    token: string
}


const loginUser = async (payload: LoginDto) => {
    const response = await api.post<LoginResponseDto>(`/api/${VERSION}/auth/login?useCookie=true`, {
        ...payload
    });
    return response.data;
}

export const useLoginUser = () => useMutation({
    mutationFn: loginUser
})
