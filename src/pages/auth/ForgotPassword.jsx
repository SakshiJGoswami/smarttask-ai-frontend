import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { resetPassword } from "../../services/authService";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleReset = () => {
    if (!email) {
      alert("Please enter your email");
      return;
    }

    try {
      const result = resetPassword(email);
      alert(result.message);
      navigate("/");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-lightBg dark:bg-bg flex items-center justify-center px-4">
      <div className="
        w-full max-w-md
        bg-lightSurface border border-lightBorder
        dark:bg-card dark:border-border
        rounded-2xl p-8
      ">
        <h2 className="text-2xl font-semibold mb-2">Forgot Password</h2>
        <p className="text-sm text-lightMuted dark:text-gray-400 mb-6">
          Enter your registered email to receive a reset link.
        </p>

        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="
            w-full mb-6 px-4 py-3 rounded-xl
            bg-lightBg text-lightText border border-lightBorder
            dark:bg-surface dark:text-white dark:border-border
            outline-none focus:border-primary
          "
        />

        <button
          onClick={handleReset}
          className="w-full bg-primary py-3 rounded-xl font-medium text-white"
        >
          Send Reset Link →
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
