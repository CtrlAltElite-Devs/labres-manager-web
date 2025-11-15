import { useRefreshTokenStore } from "./refresh-token";
import { useTokenStore } from "./token"

export const useTokensStoreHook = () => {
    const tokenStore = useTokenStore();
    const refreshTokenStore =  useRefreshTokenStore();

    const setTokens = (token:string, refreshToken: string) => {
        tokenStore.setToken(token);
        refreshTokenStore.setRefreshToken(refreshToken);
    }

    const clearTokens = () => {
        tokenStore.clearToken();
        refreshTokenStore.clearRefreshToken();
    }

    return {
        setTokens,
        clearTokens
    }
}

export const useTokenStoreHookState = () => {
    const tokenStore = useTokenStore.getState();
    const refreshTokenStore =  useRefreshTokenStore.getState();

    const setTokens = (token:string, refreshToken: string) => {
        tokenStore.setToken(token);
        refreshTokenStore.setRefreshToken(refreshToken);
    }

    const clearTokens = () => {
        tokenStore.clearToken();
        refreshTokenStore.clearRefreshToken();
    }

    return {
        setTokens,
        clearTokens,
    }
}