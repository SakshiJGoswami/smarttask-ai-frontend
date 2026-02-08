import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { resetPassword } from "../../services/authService";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleReset = () => {
    if (!email) {
      setError("Email is required");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    // ⏳ fake async reset
    setTimeout(() => {
      try {
        const result = resetPassword(email);
        setSuccess(result.message);

        // redirect after short delay
        setTimeout(() => {
          navigate("/");
        }, 1500);
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
        <h2 className="text-2xl font-semibold mb-2">Forgot Password</h2>
        <p className="text-sm text-lightMuted dark:text-gray-400 mb-6">
          Enter your registered email to receive a reset link.
        </p>

        {/* ERROR */}
        {error && (
          <p className="mb-4 text-sm text-red-600 dark:text-red-400">
            {error}
          </p>
        )}

        {/* SUCCESS */}
        {success && (
          <p className="mb-4 text-sm text-green-600 dark:text-green-400">
            {success}
          </p>
        )}

        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError("");
          }}
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
          onClick={handleReset}
          disabled={loading}
          className="
            w-full bg-primary py-3 rounded-xl
            font-medium text-white
            disabled:opacity-60
          "
        >
          {loading ? "Sending..." : "Send Reset Link →"}
        </button>

        <p className="text-center text-sm text-lightMuted dark:text-gray-400 mt-6">
          Remembered your password?{" "}
          <span
            onClick={() => navigate("/")}
            className="text-primary cursor-pointer"
          >
            Back to Login
          </span>
        </p>
      </div>
    </div>
  );
}
