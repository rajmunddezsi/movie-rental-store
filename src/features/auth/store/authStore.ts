import {create} from "zustand";
import {persist} from "zustand/middleware";
import type { AuthState, User } from "../auth.types";

export const useAuthStore = create<AuthState>()(persist(set => ({
    user: null,
    isLoading: false,
    logout: () => set({user: null}),
    setUser: (user: User) => set({user: user}),
    setLoading: (loading: boolean) => set({isLoading: loading})
}), {name: "user-data"}));