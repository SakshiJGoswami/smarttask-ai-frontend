import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    const role = login(email, password); // ✅ REAL INPUT
    navigate(`/${role}`);
  };

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-4">
      <div className="w-full max-w-5xl bg-card backdrop-blur-glass shadow-glass border border-border rounded-2xl grid grid-cols-1 md:grid-cols-2 overflow-hidden">

        {/* LEFT SIDE */}
        <div className="hidden md:flex flex-col justify-between p-10 bg-gradient-to-br from-[#1a1f3c] to-[#0b1020]">
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

          <div className="flex gap-6 mt-10">
            <div className="bg-card border border-border rounded-xl p-4 w-32">
              <p className="text-sm text-gray-400">Productivity</p>
              <p className="text-2xl font-semibold mt-1">+84%</p>
            </div>

            <div className="bg-card border border-border rounded-xl p-4 w-32">
              <p className="text-sm text-gray-400">AI Insights</p>
              <p className="text-2xl font-semibold mt-1">2.4k</p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="p-8 md:p-12">
          <h2 className="text-2xl font-semibold mb-2">Welcome Back</h2>
          <p className="text-sm text-gray-400 mb-8">
            Enter your credentials to access your dashboard.
          </p>

          <div className="mb-5">
            <label className="text-sm mb-1 block">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-surface border border-border outline-none focus:border-primary"
            />
          </div>

          <div className="mb-6">
            <label className="text-sm mb-1 block">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-surface border border-border outline-none focus:border-primary"
            />
          </div>

          <div className="flex items-center justify-between text-sm mb-6">
            <label className="flex items-center gap-2">
              <input type="checkbox" />
              Remember me
            </label>
          <span
  onClick={() => navigate("/forgot-password")}
  className="text-primary cursor-pointer"
>
  Forgot password?
</span>

          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-primary hover:bg-primaryHover transition py-3 rounded-xl font-medium mb-6"
          >
            Log In →
          </button>

          <p className="text-center text-sm text-gray-400">
            Don’t have an account?{" "}
           <span
  onClick={() => navigate("/register")}
  className="text-primary cursor-pointer"
>
  Create account
</span>

          </p>
        </div>

      </div>
    </div>
  );
}
