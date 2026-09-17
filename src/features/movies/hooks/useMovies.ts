import { useQuery } from "@tanstack/react-query";
import { fetchMovieById, fetchGenre } from "../api/moviesApi";

export function useGenre() {
    return useQuery({
        queryKey: ['genre'],
        queryFn: () => fetchGenre(),
    })
}

export function useMovie(id: number) {
    return useQuery(
        {
            queryKey: ['movie', id],
            queryFn: () => fetchMovieById(id),
            enabled: !!id
        }
    )
}