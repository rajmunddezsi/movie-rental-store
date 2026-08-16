import type { Movie } from "../movies.types";

type MovieCardProps = {
  movie: Movie;
  onFavorite: (id: number) => void;
  isFavorite: boolean;
};

const MovieCard = ({ movie, onFavorite, isFavorite }: MovieCardProps) => {
  const buttonLabel = isFavorite ? "Remove from favorites" : "Add to favorites";

  return (
    <div>
      <h2>{movie.title}</h2>
      <button onClick={() => onFavorite(movie.id)}>{buttonLabel}</button>
    </div>
  );
};

export default MovieCard;
