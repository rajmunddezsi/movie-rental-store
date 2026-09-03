import { useQueries } from "@tanstack/react-query";
import List from "../../../shared/components/List";
import { fetchPopularMovies, fetchTopRatedMovies } from "../api/moviesApi";
import { useState, type JSX } from "react";
import type { Movie, MovieResponse } from "../movies.types";
import MovieCard from "./MovieCard";
import SearchBar from "../../../shared/components/Searchbar";
import useDebounce from "../../../shared/hooks/useDebounce";

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
  const [movieSearchTitle, setMovieSearchTitle] = useState("");
  const debouncedSearchValue = useDebounce(movieSearchTitle, 500);

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

  const handleSearch = (searchText: string) => setMovieSearchTitle(searchText);

  const filteredPopularMovies = [...popularMovies.data.results].filter(
    (movie) =>
      movie.title.toLowerCase().includes(debouncedSearchValue.toLowerCase())
        ? movie
        : false,
  );

  const filteredTopRatedMovies = [...topRatedMovies.data.results].filter(
    (movie) =>
      movie.title.toLowerCase().includes(debouncedSearchValue.toLowerCase())
        ? movie
        : false,
  );

  return (
    <div className="mt-2 p-10 relative z-10">
      <h3 className="section-title text-4xl font-semibold text-white border-l-5 border-l-blue-800 pl-3">
        Popular movies
      </h3>
      <div className="mt-10 bg-blue-800/40 p-5 rounded-2xl movie-list-grid-container">
        <List
          items={filteredPopularMovies}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          emptyMessage="No movies."
        />
      </div>

      <h3 className="section-title mt-10 text-4xl font-semibold text-white border-l-5 border-l-red-800 pl-3">
        Top rated
      </h3>
      <div className="mt-10 bg-red-800/40 p-5 rounded-2xl movie-list-grid-container">
        <List
          items={filteredTopRatedMovies}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          emptyMessage="No movies."
        />
      </div>
      <SearchBar onType={handleSearch} />
    </div>
  );
};

export default Movies;
