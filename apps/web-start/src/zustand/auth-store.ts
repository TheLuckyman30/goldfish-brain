import { create } from "zustand"

type AuthStore = {
    isAuthenticated: boolean
    setIsAuthenticated: (newAuthState: boolean) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
    isAuthenticated: false,
    setIsAuthenticated: (newAuthState: boolean) => {
        set({isAuthenticated: newAuthState})
    }
}))