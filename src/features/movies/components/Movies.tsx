import { useQueries } from "@tanstack/react-query";
import List from "../../../shared/components/List";
import { fetchPopularMovies, fetchTopRatedMovies } from "../api/moviesApi";
import type { JSX } from "react";
import type { Movie, MovieResponse } from "../movies.types";
import MovieCard from "./MovieCard";

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

const Movies = () => {
  const [popularMovies, topRatedMovies] = useQueries({
    queries: [
      { queryKey: ["movies", "popular"], queryFn: () => fetchPopularMovies(1) },
      {
        queryKey: ["movies", "top-rated"],
        queryFn: () => fetchTopRatedMovies(1),
      },
    ],
  });

  if (popularMovies.isError) {
    return <div>{popularMovies.error.message}</div>;
  }

  if (topRatedMovies.isError) {
    return <div>{topRatedMovies.error.message}</div>;
  }

  if (topRatedMovies.isLoading || popularMovies.isLoading) {
    return <div>Please wait...</div>;
  }

  if (!topRatedMovies.data || !popularMovies.data) {
    return <div>No data available!</div>;
  }

  if (!isMovieResponse(topRatedMovies.data)) {
    return <div>No data available!</div>;
  }

  if (!isMovieResponse(popularMovies.data)) {
    return <div>No data available!</div>;
  }

  const renderItem = (movie: Movie): JSX.Element => <MovieCard movie={movie} />;
  const keyExtractor = (movie: Movie): string | number => movie.id;

  return (
    <div className="mt-2 p-10 relative z-10">
      <h3 className="section-title text-4xl font-semibold text-white border-l-5 border-l-blue-800 pl-3">
        Popular movies
      </h3>
      <div className="mt-10 flex flex-wrap gap-3 justify-start bg-blue-800/40 p-5 rounded-2xl">
        <List
          items={popularMovies.data.results}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
        />
      </div>

      <h3 className="section-title mt-10 text-4xl font-semibold text-white border-l-5 border-l-red-800 pl-3">
        Top rated
      </h3>
      <div className="mt-10 flex flex-wrap gap-3 justify-start bg-red-800/40 p-5 rounded-2xl">
        <List
          items={topRatedMovies.data.results}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
        />
      </div>
    </div>
  );
};

export default Movies;
