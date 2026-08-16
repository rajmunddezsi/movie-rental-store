import { Link } from "react-router";

const PageNotFound = () => {
  return (
    <div className="h-screen p-6 flex flex-col justify-center items-center">
      <h1 className="text-center text-4xl mb-6">404 | Page not found</h1>
      <div className="text-center">
        <Link to="/">Back to Home page</Link>
      </div>
    </div>
  );
};

export default PageNotFound;
