import type { MovieDetail, MovieResponse } from "../movies.types";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export async function fetchPopularMovies(page: number) {
    const response = await fetch(`${TMDB_BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`);
    if (!response.ok) {
        throw new Error('Failed to fetch Popular Movies!');
    }

    return response.json() as Promise<MovieResponse>;
}

export async function fetchTopRatedMovies(page: number) {
    const response = await fetch(`${TMDB_BASE_URL}/movie/top_rated?language=en-US&api_key=${API_KEY}&page=${page}`);

    if (!response.ok) {
        throw new Error('Failed to fetch Top Rated movies!')
    }

    return response.json() as Promise<MovieResponse>;
}

export async function fetchMovieById(id: number) {
    const response = await fetch(`${TMDB_BASE_URL}/movie/${id}?api_key=${API_KEY}`);
    if (!response.ok) {
        throw new Error("Failed to fetch movie details!");
    }

    return response.json() as Promise<MovieDetail>;
}