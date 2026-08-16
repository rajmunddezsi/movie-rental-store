export type UserRole = "user" | "admin";

export type User = {
    id: string;
    name: string;
    email: string;
    role: UserRole;
}

export type AuthState = {
    user: User | null;
    isLoading: boolean;
    logout: () => void;
    setUser: (user: User) => void;
    setLoading: (loading: boolean) => void;
}