import { api } from "@/lib/axios";
import { ApiVersion } from "@/types/api-version";
import { IdentifyResponseDto } from "./dto/indentify.response.dto";
import { useMutation } from "@tanstack/react-query";

export type IdentifyRequestDto = {
    pid: string;
    dob: Date;
    lastname: string;
}

const version: ApiVersion = "v1";

const identifyStep2 = async (payload: IdentifyRequestDto) => {
    const response = await api.post<IdentifyResponseDto>(`api/${version}/auth/identify/step2`, {
        ...payload
    });

    return response.data;
}

export const useIdentifyStep2 = () => useMutation({
    mutationFn: identifyStep2
})