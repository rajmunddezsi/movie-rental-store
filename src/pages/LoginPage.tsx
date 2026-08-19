import { useState } from "react";
import { useAuthStore } from "../features/auth/store/authStore";
import { useShallow } from "zustand/shallow";
import type { User } from "../features/auth/auth.types";
import { useNavigate, Link } from "react-router-dom";

type FormData = {
  email: string;
  password: string;
};

type DirtyFields = {
  email: boolean;
  password: boolean;
};

const INITITAL_FORM_DATA: FormData = {
  email: "",
  password: "",
};

const INITITAL_DIRTY_FIELDS: DirtyFields = {
  email: false,
  password: false,
};

const LoginPage = () => {
  const [form, setForm] = useState<FormData>(INITITAL_FORM_DATA);
  const [dirtyFields, setDirtyFields] = useState<DirtyFields>(
    INITITAL_DIRTY_FIELDS,
  );
  const navigate = useNavigate();

  const { setUser, setLoading, isLoading } = useAuthStore(
    useShallow((state) => ({
      setUser: state.setUser,
      isLoading: state.isLoading,
      setLoading: state.setLoading,
    })),
  );

  const emailValid = form.email.includes("@");
  const passwordValid = form.password.length > 5;
  const formIsValid = emailValid && passwordValid;

  const invalidEmail = dirtyFields.email && !emailValid;
  const invalidPassword = dirtyFields.password && !passwordValid;

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    setLoading(true);

    const loginUser: User = {
      id: Date.now().toString(),
      name: form.email.split("@")[0],
      email: form.email,
      role: "admin",
    };

    setTimeout(() => {
      setUser(loginUser);
      setLoading(false);
      navigate("/", { replace: true });
    }, 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
    setDirtyFields((prevFields) => ({ ...prevFields, [name]: true }));
  };

  return (
    <div className="p-10 h-screen flex justify-center items-center flex-col gap-8">
      <h1 className="text-5xl text-white/90">Movie Rental Login</h1>
      <div className="w-md">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            name="email"
            value={form.email}
            onChange={handleInputChange}
            className={`input-field ${invalidEmail && "invalid"}`}
            type="text"
            placeholder="example@example.com"
            disabled={isLoading}
          />
          {invalidEmail && (
            <div className="text-sm text-red-300 px-3">Email is invalid</div>
          )}
          <input
            name="password"
            value={form.password}
            onChange={handleInputChange}
            type="password"
            className={`input-field ${invalidPassword && "invalid"}`}
            placeholder="Password"
            disabled={isLoading}
          />
          {invalidPassword && (
            <div className="text-sm text-red-300 px-3">Password is invalid</div>
          )}
          <button
            disabled={!formIsValid || isLoading}
            className="btn bg-blue-900 border-blue-600"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
          <div className="text-center text-white/50">
            <Link to="/">Back to Home</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
