import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { User } from "@/types";

interface UserDataSlice {
	pid?: string;
	user: User | null;
	setPid: (pid: string) => void;
	setUser: (user: User) => void;
	clearUserData: () => void;
}

export const useUserStore = create<UserDataSlice>()(
	persist(
		(set) => ({
			pid: undefined,
			user: null,

			setPid: (pid) => set({ pid }),
			setUser: (user) => set({ user }),
			clearUserData: () => set({ pid: undefined, user: null }),
		}),
		{
			name: "user-store",
			storage: createJSONStorage(() => localStorage),
		}
	)
);
