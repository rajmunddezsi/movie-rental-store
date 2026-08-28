import Movies from "../features/movies/components/Movies";

const HomePage = () => {
  return (
    <div className="relative z-10">
      <div className="m-3 mt-6 welcome-text">
        <h1 className="text-5xl text-center font-bold text-white clamp">
          Welcome to Movie Rental Store!
        </h1>
        <h2 className="text-4xl text-center italic text-blue-500">
          Your neighborhood movie rental!
        </h2>
      </div>

      <Movies />
    </div>
  );
};

export default HomePage;
