import { api } from "@/lib/axios";
import { ApiVersion } from "@/types/api-version";
import { useMutation } from "@tanstack/react-query";

export type SendVerificationEmailRequest = {
    pid: string;
    email: string;
}

export type SendVerificationEmailResponse = {
    message: string;
}

const version : ApiVersion = "v1";

const sendVerificationEmail = async ( payload: SendVerificationEmailRequest) => {
    const response = await api.post<SendVerificationEmailResponse>(`api/${version}/auth/send-verification-email`, {
        ...payload
    });

    return response.data;
}

export const useSendVerificationEmail = () => useMutation({
    mutationFn: sendVerificationEmail
})