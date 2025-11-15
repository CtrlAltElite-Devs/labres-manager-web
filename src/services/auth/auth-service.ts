import { apiPost } from "@/lib/api-client";
import { CheckPidDto } from "./check-pid/check-pid-v1";
import { IdentifyRequestDto } from "./identify/identify-step2";
import { Routes } from "@/app/constants/network";
import { LoginDto, LoginResponseDto } from "./login-user/login-user-v2";

class AuthService {
    async identifyStep1(payload: CheckPidDto){
        return apiPost<IdentifyRequestDto>(Routes.IDENTIFY_STEP_1, payload);
    }

    async loginUser(payload: LoginDto){
        return apiPost<LoginResponseDto>(Routes.LOGIN, payload);
    }
}


export const authService = new AuthService();