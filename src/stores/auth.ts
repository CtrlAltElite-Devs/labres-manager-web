import { LoginResponseDto } from '@/services/auth/login-user/login-user-v2';
import { User } from '@/types';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface Auth {
    user: User;
    token: string;
}

interface AuthState {
    pid: string | undefined;
    auth: Auth | null;
    setPid: (pid: string | undefined) => void;
    setAuth: (authData: LoginResponseDto) => void;
    clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) =>({
            pid: undefined,
            auth: null,
            setPid: (pid) => set({pid: pid}),
            setAuth: (authData) => set({auth: authData}),
            clearAuth: () => set({ pid:undefined, auth: null })
        })
    ,{
        name: 'auth',
        storage: createJSONStorage(() => localStorage)
    })
)
