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
    <div
      className="h-[calc(100vh-65px)] w-full bg-cover bg-center relative"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/w500${data.poster_path})`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black from-15% via-transparent to-transparent" />
      <div className="relative z-10 text-white p-10">
        <div className="flex justify-between items-center gap-3">
          <h1 className="text-4xl">{data.title} Movie Detail Page</h1>
          <button
            className="cursor-pointer bg-blue-800 px-2.5 p-0.5 rounded-xl"
            onClick={() => navigate("..")}
          >
            Back
          </button>
        </div>
        <div className="text-sm mb-5 flex gap-2 mt-2">
          {data.genres.map((g) => (
            <span className="rounded-xl bg-blue-400 px-2.5 p-0.5" key={g.name}>
              {g.name}
            </span>
          ))}
        </div>
        <p className="text-lg text-justify mb-5">{data.overview}</p>
      </div>
    </div>
  );
};

export default MovieDetailPage;
