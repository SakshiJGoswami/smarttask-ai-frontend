import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { registerUser } from "../../services/authService";

export default function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleRegister = () => {
    if (!form.name || !form.email || !form.password) {
      setError("All fields are required");
      return;
    }

    setLoading(true);
    setError("");

    // ⏳ fake async register
    setTimeout(() => {
      try {
        const result = registerUser(
          form.name,
          form.email,
          form.password
        );

        // auto-login after register
        login(result.user);

        // redirect by role
        navigate(`/${result.role}`);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-lightBg dark:bg-bg flex items-center justify-center px-4">
      <div
        className="
          w-full max-w-md
          bg-lightSurface border border-lightBorder
          dark:bg-card dark:border-border
          rounded-2xl p-8
        "
      >
        <h2 className="text-2xl font-semibold mb-2">Create Account</h2>
        <p className="text-sm text-lightMuted dark:text-gray-400 mb-6">
          Join SmartTask AI and boost productivity.
        </p>

        {/* ERROR */}
        {error && (
          <p className="mb-4 text-sm text-red-600 dark:text-red-400">
            {error}
          </p>
        )}

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          disabled={loading}
          className="
            w-full mb-4 px-4 py-3 rounded-xl
            bg-lightBg text-lightText border border-lightBorder
            dark:bg-surface dark:text-white dark:border-border
            outline-none focus:border-primary
            disabled:opacity-60
          "
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          disabled={loading}
          className="
            w-full mb-4 px-4 py-3 rounded-xl
            bg-lightBg text-lightText border border-lightBorder
            dark:bg-surface dark:text-white dark:border-border
            outline-none focus:border-primary
            disabled:opacity-60
          "
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          disabled={loading}
          className="
            w-full mb-6 px-4 py-3 rounded-xl
            bg-lightBg text-lightText border border-lightBorder
            dark:bg-surface dark:text-white dark:border-border
            outline-none focus:border-primary
            disabled:opacity-60
          "
        />

        <button
          onClick={handleRegister}
          disabled={loading}
          className="
            w-full bg-primary py-3 rounded-xl
            font-medium text-white
            disabled:opacity-60
          "
        >
          {loading ? "Creating account..." : "Create Account →"}
        </button>

        <p className="text-center text-sm text-lightMuted dark:text-gray-400 mt-6">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/")}
            className="text-primary cursor-pointer"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
