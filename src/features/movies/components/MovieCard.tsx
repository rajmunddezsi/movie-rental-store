import { Link } from "react-router-dom";
import type { Movie } from "../movies.types";
import { useFavoriteStore } from "../store/favoriteStore";
import { useShallow } from "zustand/shallow";
import { useAuthStore } from "../../auth/store/authStore";

type MovieCardProps = {
  movie: Movie;
};

const MovieCard = ({ movie }: MovieCardProps) => {
  const { isFavorite, toggleFavorite } = useFavoriteStore(
    useShallow((state) => ({
      isFavorite: state.isFavorite(movie.id),
      toggleFavorite: state.toggleFavorite,
    })),
  );

  const isLoggedIn = useAuthStore((state) => state.user?.name);
  const buttonLabel = isFavorite ? "Remove from favorites" : "Add to favorites";
  const cardStyle = {
    backgroundImage: `url(https://image.tmdb.org/t/p/w400${movie.poster_path})`,
    border: isLoggedIn && isFavorite ? "1px solid #3e9dfb" : "",
    boxShadow: isLoggedIn && isFavorite ? "inset 0 0 25px #3e9dfb" : "",
  };

  return (
    <div
      style={{ ...cardStyle }}
      className="mb-5 bg-gray-100 p-3 rounded-2xl shadow-lg w-full h-100 bg-cover bg-center relative"
    >
      <div className="z-10 relative shadow-md shadow-black/20 flex text-white rounded-3xl items-center justify-between mb-3 bg-black/30 p-3 backdrop-blur-lg">
        <Link className="text-xl hover:text-blue-400" to={`/movie/${movie.id}`}>
          {movie.title}
        </Link>
        <div className="text-sm bg-blue-800 px-3 p-2 rounded-4xl font-bold">
          {movie.vote_average}
        </div>
      </div>
      <div className="absolute inset-0 bg-linear-to-t from-black from-15% via-transparent to-transparent rounded-2xl" />
      {isLoggedIn && (
        <button
          className="absolute bottom-3 left-1/2 -translate-x-1/2 text-white hover:cursor-pointer"
          onClick={() => toggleFavorite(movie.id)}
        >
          {buttonLabel}
        </button>
      )}
    </div>
  );
};

export default MovieCard;
