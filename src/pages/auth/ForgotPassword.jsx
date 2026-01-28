import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleReset = () => {
    if (!email) {
      alert("Please enter your email");
      return;
    }

    alert("Password reset link sent (mock)");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-card backdrop-blur-glass border border-border rounded-2xl p-8 shadow-glass">
        <h2 className="text-2xl font-semibold mb-2">Forgot Password</h2>
        <p className="text-sm text-gray-400 mb-6">
          Enter your registered email to receive a reset link.
        </p>

        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-6 px-4 py-3 rounded-xl bg-surface border border-border outline-none focus:border-primary"
        />

        <button
          onClick={handleReset}
          className="w-full bg-primary hover:bg-primaryHover transition py-3 rounded-xl font-medium"
        >
          Send Reset Link →
        </button>

        <p className="text-center text-sm text-gray-400 mt-6">
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
