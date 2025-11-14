import { IdentifyStatus } from "@/enums/index.enums"

export type IdentifyPayload = {
    pid: string;
    email: string;
    emailVerified: boolean;
    hasPassword: boolean;
}

export type IdentifyResponseDto = {
    status: IdentifyStatus;
    message: string;
    payload?: IdentifyPayload
}