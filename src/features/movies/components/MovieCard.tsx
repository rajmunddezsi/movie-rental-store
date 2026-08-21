import { Link } from "react-router-dom";
import type { Movie } from "../movies.types";
import { useFavoriteStore } from "../store/favoriteStore";
import { useShallow } from "zustand/shallow";
import { useAuthStore } from "../../auth/store/authStore";

type MovieCardProps = {
  movie: Movie;
};

const MovieCard = ({ movie }: MovieCardProps) => {
  const { favorites, toggleFavorite } = useFavoriteStore(
    useShallow((state) => ({
      favorites: state.favorites,
      toggleFavorite: state.toggleFavorite,
    })),
  );

  const isFavorite = favorites.includes(movie.id);
  const user = useAuthStore((state) => state.user?.name);
  const buttonLabel = isFavorite ? "Remove from favorites" : "Add to favorites";
  const cardStyle = {
    backgroundImage: `url(https://image.tmdb.org/t/p/w780${movie.poster_path})`,
    boxShadow:
      user && isFavorite
        ? "rgb(0 187 255) 0px 0px 40px 25px inset, 0 0 0px 1px rgb(0 187 255)"
        : "",
  };

  return (
    <div
      style={{ ...cardStyle }}
      className="mb-5 bg-gray-100 p-3 rounded-2xl shadow-lg w-full h-100 bg-cover bg-center relative"
    >
      <div className="z-10 relative shadow-md shadow-black/20 flex text-white rounded-3xl items-center justify-between mb-3 bg-black/30 p-3 backdrop-blur-lg">
        <Link
          className="text-md font-semibold hover:text-blue-400"
          to={`/movie/${movie.id}`}
        >
          {movie.title}
        </Link>
        <div className="text-xs bg-blue-800 px-3 p-2 rounded-4xl font-bold">
          {movie.vote_average}
        </div>
      </div>
      <div className="absolute inset-0 bg-linear-to-t from-black from-15% via-transparent to-transparent rounded-2xl" />
      {user && (
        <button
          className="absolute bottom-3 w-full left-1/2 -translate-x-1/2 text-white hover:cursor-pointer text-xs"
          onClick={() => toggleFavorite(movie.id)}
        >
          {buttonLabel}
        </button>
      )}
    </div>
  );
};

export default MovieCard;
