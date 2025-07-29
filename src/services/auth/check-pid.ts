import { api } from "@/lib/axios"
import { useMutation } from "@tanstack/react-query";

export type CheckPidDto = {
    pid: string;
}

export type CheckPidResponseDto = {
    hasPassword: boolean,
    hasPid: boolean,
    pid: string
}

const checkPid = async (payload: CheckPidDto) : Promise<CheckPidResponseDto> => {
    const response = await api.post<CheckPidResponseDto>("/api/auth/check-pid", {
        ...payload
    });

    return response.data;
}

export const useCheckPid = () => useMutation({
    mutationFn: checkPid
})


