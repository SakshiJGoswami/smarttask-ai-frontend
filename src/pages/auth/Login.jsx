import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { loginUser } from "../../services/authService";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    setError("");
    setLoading(true);

    // ⏳ fake async login
    setTimeout(() => {
      try {
        const result = loginUser(email, password);

        // save user in context
        login(result.user);

        // redirect based on role
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
          w-full max-w-5xl
          bg-lightSurface border border-lightBorder
          dark:bg-card dark:border-border
          rounded-2xl
          grid grid-cols-1 md:grid-cols-2 overflow-hidden
        "
      >
        {/* LEFT BRAND PANEL */}
        <div className="hidden md:flex flex-col justify-between p-10 bg-gradient-to-br from-[#1a1f3c] to-[#0b1020] text-white">
          <div>
            <div className="flex items-center gap-2 mb-10">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center font-bold">
                ⚡
              </div>
              <span className="text-lg font-semibold">SmartTask AI</span>
            </div>

            <h1 className="text-4xl font-bold leading-snug mb-4">
              Manage projects with <br />
              <span className="text-primary">Next-Gen Intelligence.</span>
            </h1>

            <p className="text-gray-400 text-sm max-w-sm">
              The ultimate MERN-stack powered tool to manage tasks, teams,
              and productivity with AI-powered insights.
            </p>
          </div>
        </div>

        {/* RIGHT LOGIN FORM */}
        <div className="p-8 md:p-12">
          <h2 className="text-2xl font-semibold mb-2">Welcome Back</h2>
          <p className="text-sm text-lightMuted dark:text-gray-400 mb-8">
            Enter your credentials to access your dashboard.
          </p>

          {/* ERROR */}
          {error && (
            <p className="mb-4 text-sm text-red-600 dark:text-red-400">
              {error}
            </p>
          )}

          <div className="mb-5">
            <label className="text-sm mb-1 block text-lightMuted dark:text-gray-400">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              disabled={loading}
              onChange={(e) => setEmail(e.target.value)}
              className="
                w-full px-4 py-3 rounded-xl
                bg-lightBg text-lightText border border-lightBorder
                dark:bg-surface dark:text-white dark:border-border
                outline-none focus:border-primary
                disabled:opacity-60
              "
            />
          </div>

          <div className="mb-6">
            <label className="text-sm mb-1 block text-lightMuted dark:text-gray-400">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              disabled={loading}
              onChange={(e) => setPassword(e.target.value)}
              className="
                w-full px-4 py-3 rounded-xl
                bg-lightBg text-lightText border border-lightBorder
                dark:bg-surface dark:text-white dark:border-border
                outline-none focus:border-primary
                disabled:opacity-60
              "
            />
          </div>

          <button
            onClick={handleLogin}
            disabled={loading}
            className="
              w-full bg-primary py-3 rounded-xl
              font-medium text-white mb-6
              disabled:opacity-60
            "
          >
            {loading ? "Signing in..." : "Log In →"}
          </button>
        </div>
      </div>
    </div>
  );
}
