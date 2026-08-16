import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../features/auth/store/authStore";
import { useShallow } from "zustand/shallow";

const Navbar = () => {
  const navigate = useNavigate();
  const { username, role, logout } = useAuthStore(
    useShallow((state) => ({
      username: state.user?.name,
      role: state.user?.role,
      logout: state.logout,
    })),
  );

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="p-5 px-10 border-b border-gray-100">
      <nav className="flex justify-between">
        <div className="flex gap-3">
          <Link to="/">Home</Link>
          {role === "admin" && <Link to="/admin">Admin</Link>}
        </div>
        {username ? (
          <div className="flex gap-3">
            <div className="capitalize">{username}</div>
            <div>|</div>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
