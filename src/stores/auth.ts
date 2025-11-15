import { LoginResponseDto } from "@/services/auth/login-user/login-user-v2";
import { User } from "@/types";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { cookieStorage } from "zustand-cookie-storage";

interface Auth {
	user: User;
	token: string;
	refreshToken: string;
}
interface AuthState {
	pid: string | undefined;
	auth: Auth | null;
	setPid: (pid: string | undefined) => void;
	setAuth: (authData: LoginResponseDto) => void;
	setTokens: (data: { token: string; refreshToken: string }) => void;
	clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
	persist(
		(set) => ({
			pid: undefined,
			auth: null,
			setPid: (pid) => set({ pid: pid }),
			setAuth: (authData) => set({ auth: authData }),
			setTokens: (data) =>
				set((state) => ({
					auth: state.auth
						? {
								...state.auth,
								token: data.token,
								refreshToken: data.refreshToken,
						  }
						: null,
				})),
			clearAuth: () => set({ pid: undefined, auth: null }),
		}),
		{
			name: "auth-user",
			storage: createJSONStorage(() => cookieStorage),
		}
	)
);
