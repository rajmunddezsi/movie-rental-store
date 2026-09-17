import { useCallback, useState, type JSX } from "react";
import { useQueries } from "@tanstack/react-query";
import { fetchPopularMovies, fetchTopRatedMovies } from "../api/moviesApi";

import filterByKey from "../../../shared/utils/filterByKey";
import getMoviesQueryStatus from "../utils/getMoviesQueryStatus";

import List from "../../../shared/components/List";
import MovieCard from "./MovieCard";
import SearchBar from "../../../shared/components/Searchbar";

import useDebounce from "../../../shared/hooks/useDebounce";

import type { Movie } from "../movies.types";

const Movies = () => {
  const [movieSearchTitle, setMovieSearchTitle] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const debouncedSearchValue = useDebounce(movieSearchTitle, 500);

  const handleSearch = useCallback(
    (searchText: string) => setMovieSearchTitle(searchText),
    [],
  );

  const handleSelect = useCallback(
    (genre: string) => setSelectedGenre(genre),
    [],
  );

  const [popularMovies, topRatedMovies] = useQueries({
    queries: [
      { queryKey: ["movies", "popular"], queryFn: () => fetchPopularMovies(1) },
      {
        queryKey: ["movies", "top-rated"],
        queryFn: () => fetchTopRatedMovies(1),
      },
    ],
  });

  const { status, data, message } = getMoviesQueryStatus(
    popularMovies,
    topRatedMovies,
  );

  if (status === "loading") return <div>Loading...</div>;
  if (status === "error") return <div>Error: {message}</div>;
  if (!data) return <div>{message}</div>;

  const renderItem = (movie: Movie): JSX.Element => <MovieCard movie={movie} />;
  const keyExtractor = (movie: Movie): string | number => movie.id;

  const filteredPopularMovies = filterByKey(
    [debouncedSearchValue, selectedGenre],
    data.popularMovies.results,
    ["title", "genre_ids"],
  );

  const filteredTopRatedMovies = filterByKey(
    [debouncedSearchValue, selectedGenre],
    data.topRatedMovies.results,
    ["title", "genre_ids"],
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
      <SearchBar onType={handleSearch} onSelect={handleSelect} />
    </div>
  );
};

export default Movies;
