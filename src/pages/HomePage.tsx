import type { ReactNode } from "react";
import type { Movie } from "../features/movies/movies.types";
import List from "../shared/components/List";
import { Link } from "react-router-dom";
import { usePopularMovies } from "../features/movies/hooks/useMovies";

const HomePage = () => {
  const { data, isLoading, isError, error } = usePopularMovies();

  if (isError) {
    return <div>{error.message}</div>;
  }

  if (isLoading) {
    return <div>Please wait...</div>;
  }

  if (!data) {
    return <div>No data available!</div>;
  }

  const renderItem = (movie: Movie): ReactNode => {
    return (
      <div className="mb-5 bg-gray-100 p-5 rounded-2xl shadow-lg w-full">
        <div className="flex items-center justify-between mb-3">
          <Link className="text-2xl" to={`/movie/${movie.id}`}>
            {movie.title}
          </Link>
          <div>{movie.vote_average}</div>
        </div>
        <div className="flex justify-center">
          <img
            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
            alt={`${movie.title} poster`}
          />
        </div>
      </div>
    );
  };

  const keyExtractor = (movie: Movie): string | number => movie.id;

  return (
    <div className="h-full">
      <h1 className="text-5xl text-center font-bold">
        Welcome to Movie Rental Store!
      </h1>
      <h2 className="text-2xl text-center italic text-gray-500">
        Your neighborhood movie rental, almost for free :)
      </h2>
      <div className="mt-10 flex flex-wrap gap-3 justify-evenly">
        <List
          items={data.results}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
        />
      </div>
    </div>
  );
};

export default HomePage;
