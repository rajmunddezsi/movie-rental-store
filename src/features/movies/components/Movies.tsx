import { useQueries } from "@tanstack/react-query";
import List from "../../../shared/components/List";
import { fetchPopularMovies, fetchTopRatedMovies } from "../api/moviesApi";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import type { Movie } from "../movies.types";

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

  const renderItem = (movie: Movie): ReactNode => {
    return (
      <div
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w400${movie.poster_path})`,
        }}
        className="mb-5 bg-gray-100 p-3 rounded-2xl shadow-lg w-full h-100 bg-cover bg-center relative"
      >
        <div className="z-10 relative shadow-md shadow-black/20 flex text-white rounded-3xl items-center justify-between mb-3 bg-black/30 p-3 backdrop-blur-lg">
          <Link className="text-xl" to={`/movie/${movie.id}`}>
            {movie.title}
          </Link>
          <div className="text-sm bg-blue-800 px-3 p-2 rounded-4xl font-bold">
            {movie.vote_average}
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent rounded-2xl" />
      </div>
    );
  };

  const keyExtractor = (movie: Movie): string | number => movie.id;

  return (
    <div className="mt-10">
      <h3 className="text-4xl font-semibold text-white">Popular movies</h3>
      <div className="mt-10 flex flex-wrap gap-3 justify-start bg-blue-800/40 p-5 rounded-2xl">
        <List
          items={popularMovies.data.results}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
        />
      </div>

      <h3 className="mt-10 text-4xl font-semibold text-white">Top rated</h3>
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
