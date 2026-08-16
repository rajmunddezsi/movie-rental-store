import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import RootLayout from "../shared/components/RootLayout";
import AdminPage from "../pages/AdminPage";
import MovieDetailPage from "../pages/MovieDetailPage";
import ProtectedRoute from "../shared/components/ProtectedRoute";
import PageNotFound from "../shared/components/PageNotFound";
import LoginPage from "../pages/LoginPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "movie/:id",
        element: <MovieDetailPage />,
      },
      {
        path: "admin",
        element: <ProtectedRoute requiredRole="admin" />,
        children: [{ index: true, element: <AdminPage /> }],
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);
