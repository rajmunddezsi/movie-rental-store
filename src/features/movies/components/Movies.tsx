import { useQueries } from "@tanstack/react-query";
import List from "../../../shared/components/List";
import { fetchPopularMovies, fetchTopRatedMovies } from "../api/moviesApi";
import { useState, type JSX } from "react";
import type { Movie } from "../movies.types";
import MovieCard from "./MovieCard";
import SearchBar from "../../../shared/components/Searchbar";
import useDebounce from "../../../shared/hooks/useDebounce";
import useCombinedMoviesQuery from "../hooks/useCombinedMoviesQuery";

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

  const { status, data, message } = useCombinedMoviesQuery(
    popularMovies,
    topRatedMovies,
  );

  if (status === "loading") return <div>Loading...</div>;
  if (status === "error") return <div>Error: {message}</div>;
  if (!data) return <div>{message}</div>;

  const renderItem = (movie: Movie): JSX.Element => <MovieCard movie={movie} />;
  const keyExtractor = (movie: Movie): string | number => movie.id;

  const handleSearch = (searchText: string) => setMovieSearchTitle(searchText);

  const filteredPopularMovies = [...data.popularMovies.results].filter(
    (movie) =>
      movie.title.toLowerCase().includes(debouncedSearchValue.toLowerCase())
        ? movie
        : false,
  );

  const filteredTopRatedMovies = [...data.topRatedMovies.results].filter(
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
