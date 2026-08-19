import { create } from "zustand";
import { persist } from "zustand/middleware";

type FavoriteMovies = {
    favorites: number[];
    isFavorite: (movieId: number) => boolean;
    toggleFavorite: (movieId: number) => void;
}

export const useFavoriteStore = create<FavoriteMovies>()(persist((set, get) => ({
    favorites: [],
    isFavorite: (movieId: number) => get().favorites.includes(movieId),
    toggleFavorite: (movieId) => 
        set((state) => 
            ({
                favorites: state.favorites.includes(movieId) ? 
                state.favorites.filter((id) => id !== movieId) : 
                [...state.favorites, movieId]
            })
        ), 
}), {name: "favorite-store"}))