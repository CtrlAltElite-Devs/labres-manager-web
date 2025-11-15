import { CheckPidDto } from "../check-pid/check-pid-v1";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { IdentifyResponseDto } from "./dto/indentify.response.dto";

const identifyStep1 = async (payload: CheckPidDto) => {
    const response = await api.post<IdentifyResponseDto>("/api/v1/auth/identify/step1", {...payload});
    return response.data;
}

export const useIdentifyStep1 = () => useMutation({
    mutationFn: identifyStep1
})