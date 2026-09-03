import type { UseQueryResult } from "@tanstack/react-query";
import type { MovieResponse } from "../movies.types";

function isMovieResponse(data: unknown): data is MovieResponse {
  return (
    typeof data === "object" &&
    data !== null &&
    "page" in data &&
    "results" in data &&
    "total_pages" in data &&
    "total_results" in data &&
    Array.isArray(data.results)
  );
}

interface CombinedMoviesQueryResult {
    status: 'loading' | 'error' | 'success',
    message?: string,
    data?: {
        popularMovies: MovieResponse,
        topRatedMovies: MovieResponse
    }
}

function useCombinedMoviesQuery(popularMovies: UseQueryResult<MovieResponse, Error>, topRatedMovies: UseQueryResult<MovieResponse, Error>): CombinedMoviesQueryResult {
    if (popularMovies.isError) return {status: 'error', message: popularMovies.error.message};

    if (topRatedMovies.isError) return {status: 'error', message: topRatedMovies.error.message};

    if (popularMovies.isLoading || topRatedMovies.isLoading) return {status: 'loading'};

    if (!isMovieResponse(popularMovies.data) || !isMovieResponse(topRatedMovies.data)) return {status: 'error', message: 'No data available!'};

    return {status: 'success', data: {popularMovies: popularMovies.data, topRatedMovies: topRatedMovies.data}};
}

export default useCombinedMoviesQuery;

