import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { customCookieStorage } from "../custom-cookie-storage";

interface TokenSlice {
  token?: string;
  setToken: (token: string) => void;
  clearToken: () => void;
}

export const useTokenStore = create<TokenSlice>()(
  persist(
    (set) => ({
      token: undefined,
      setToken: (token) => set({ token }),
      clearToken: () => set({ token: undefined }),
    }),
    {
      name: "token-store",
      storage: createJSONStorage(() => customCookieStorage),
      partialize: (state) => ({ token: state.token }), // persist only token
    }
  )
);
