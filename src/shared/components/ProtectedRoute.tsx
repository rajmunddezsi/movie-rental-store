import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../features/auth/store/authStore";

type RequiredRole = {
  requiredRole?: "user" | "admin";
};

const ProtectedRoute = ({ requiredRole }: RequiredRole) => {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
