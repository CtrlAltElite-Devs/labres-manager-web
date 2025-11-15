import { User } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/axios";

export type LoginDto = {
	pid: string;
	password: string;
};

export type LoginResponseDto = {
	user: User;
	token: string;
	refreshToken: string;
};

const loginUser = async (payload: LoginDto) => {
    const response = await api.post<LoginResponseDto>("/api/v2/auth/login?useCookie=false", {...payload})
	return response.data;
};

export const useLoginUser = () =>
	useMutation({
		mutationFn: loginUser,
	});
