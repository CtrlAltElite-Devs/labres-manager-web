import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { customCookieStorage } from "../custom-cookie-storage";

interface RefreshTokenSlice {
  refreshToken?: string;
  setRefreshToken: (refreshToken: string) => void;
  clearRefreshToken: () => void;
}

export const useRefreshTokenStore = create<RefreshTokenSlice>()(
  persist(
    (set) => ({
      refreshToken: undefined,
      setRefreshToken: (refreshToken) => set({ refreshToken }),
      clearRefreshToken: () => set({ refreshToken: undefined }),
    }),
    {
      name: "refresh-token-store",
      storage: createJSONStorage(() => customCookieStorage),
      partialize: (state) => ({ refreshToken: state.refreshToken }), // persist only refresh token
    }
  )
);
