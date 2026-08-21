import { useParams, useNavigate } from "react-router-dom";
import { useMovie } from "../features/movies/hooks/useMovies";
import Rating from "../shared/components/Rating";
import { useMutation, useQueryClient } from "@tanstack/react-query";

async function rateMovie(movieId: number, rating: number): Promise<void> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.2) {
        resolve();
      } else {
        reject(new Error("Rating failed. Please try again."));
      }
    }, 1500);
  });
}

const MovieDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const normalizedId = Number(id);

  const { data, isLoading, isError, error } = useMovie(normalizedId);

  const queryClient = useQueryClient();
  const {
    mutate,
    isPending,
    isError: isMutationError,
    error: mutationError,
  } = useMutation({
    mutationFn: (rating: number) => rateMovie(normalizedId, rating),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["movie", normalizedId] });
    },
  });

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
        backgroundImage: `url(https://image.tmdb.org/t/p/w1280${data.backdrop_path})`,
      }}
    >
      <div className="absolute inset-0 bg-linear-to-b from-black from-15% via-transparent to-transparent" />
      <div className="relative z-10 text-white p-10">
        <div className="flex justify-between items-center gap-3">
          <h1 className="text-4xl">{data.title} Movie Detail Page</h1>
          <div className="flex gap-5 align-middle">
            <div>
              <Rating onMutate={mutate} isPending={isPending} />
              {isMutationError && (
                <div className="text-red-500 text-xs text-center">
                  Please try again!
                </div>
              )}
            </div>
            <button
              className="cursor-pointer bg-blue-800 px-2.5 p-0.5 rounded-xl"
              onClick={() => navigate("..")}
            >
              Back
            </button>
          </div>
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
