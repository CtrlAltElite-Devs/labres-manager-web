import { ApiVersion } from "@/types/api-version";
import { CheckPidDto } from "../check-pid/check-pid-v1";
import { api } from "@/lib/axios";
import { IdentifyResponseDto } from "./dto/indentify.response.dto";
import { useMutation } from "@tanstack/react-query";

const version: ApiVersion = "v1";

const identifyStep1 = async (payload: CheckPidDto) => {
    const response = await api.post<IdentifyResponseDto>(`api/${version}/auth/identify/step1`, {
        ...payload
    });

    return response.data;
}

export const useIdentifyStep1 = () => useMutation({
    mutationFn: identifyStep1
})