import { useParams, useNavigate } from "react-router-dom";
import { useMovie } from "../features/movies/hooks/useMovies";

const MovieDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const normalizedId = Number(id);

  const { data, isLoading, isError, error } = useMovie(normalizedId);

  if (isNaN(normalizedId) || normalizedId < 1) {
    return <div>{normalizedId} is not a valid ID!</div>;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  if (isLoading) {
    return <div>Please wait...</div>;
  }

  if (!data) {
    return <div>No data available!</div>;
  }

  return (
    <div className="h-max">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl">{data.title} Movie Detail Page</h1>
        <button className="cursor-pointer" onClick={() => navigate("..")}>
          Back
        </button>
      </div>
      <h3 className="text-2xl mb-5">
        {data.genres.map((g) => g.name).join(" | ")}
      </h3>
      <p className="text-lg text-justify mb-5">{data.overview}</p>
      <div className="justify-center">
        <img
          src={`https://image.tmdb.org/t/p/w200${data.poster_path}`}
          alt={`${data.title} poster`}
        />
      </div>
    </div>
  );
};

export default MovieDetailPage;
