import { api } from "@/lib/axios";
import { ApiVersion } from "@/types/api-version";
import { useMutation } from "@tanstack/react-query";

export type VerifyEmailRequest = {
    pid: string;
    email: string;
    code: string;
}

export type VerifyEmailResponse = {
    message: string;
}

const version : ApiVersion = "v1";

const verifyEmail = async (payload: VerifyEmailRequest) => {
    const response = await api.post<VerifyEmailResponse>(`api/${version}/auth/verify-email`, {
        ...payload
    });

    return response.data;
}

export const useVerifyEmail = () => useMutation({
    mutationFn: verifyEmail
})
