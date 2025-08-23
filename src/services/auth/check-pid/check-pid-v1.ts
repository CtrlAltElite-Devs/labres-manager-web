import { api } from "@/lib/axios"
import { ApiVersion } from "@/types/api-version";
import { useMutation } from "@tanstack/react-query";

const version : ApiVersion = "v1";

export type CheckPidDto = {
    pid: string;
}

export type CheckPidResponseDto = {
    hasPassword: boolean,
    hasPid: boolean,
    pid: string
}

const checkPid = async (payload: CheckPidDto) : Promise<CheckPidResponseDto> => {
    const response = await api.post<CheckPidResponseDto>(`/api/${version}/auth/check-pid`, {
        ...payload
    });

    return response.data;
}

export const useCheckPidV1 = () => useMutation({
    mutationFn: checkPid
})


