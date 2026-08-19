import { useQuery } from "@tanstack/react-query";
import { fetchMovieById, fetchPopularMovies, fetchTopRatedMovies } from "../api/moviesApi";

export function usePopularMovies(page: number = 1) {
    return useQuery(
        {
            queryKey: ['movies', 'popular', page],
            queryFn: () => fetchPopularMovies(page),
            staleTime: 1000 * 60 * 5
        }
    )
}

export function useTopRatedMovies(page: number = 1) {
    return useQuery({
        queryKey: ['movies', 'top-rated', page],
        queryFn: () => fetchTopRatedMovies(page),
        staleTime: 1000 * 60 * 5
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