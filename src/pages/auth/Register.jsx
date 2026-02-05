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

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = () => {
    if (!form.name || !form.email || !form.password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const result = registerUser(form.name, form.email, form.password);
      login(result.user);
      navigate(`/${result.role}`);
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
        <h2 className="text-2xl font-semibold mb-2">Create Account</h2>
        <p className="text-sm text-lightMuted dark:text-gray-400 mb-6">
          Join SmartTask AI and boost productivity.
        </p>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="
            w-full mb-4 px-4 py-3 rounded-xl
            bg-lightBg text-lightText border border-lightBorder
            dark:bg-surface dark:text-white dark:border-border
            outline-none focus:border-primary
          "
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="
            w-full mb-4 px-4 py-3 rounded-xl
            bg-lightBg text-lightText border border-lightBorder
            dark:bg-surface dark:text-white dark:border-border
            outline-none focus:border-primary
          "
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="
            w-full mb-6 px-4 py-3 rounded-xl
            bg-lightBg text-lightText border border-lightBorder
            dark:bg-surface dark:text-white dark:border-border
            outline-none focus:border-primary
          "
        />

        <button
          onClick={handleRegister}
          className="w-full bg-primary py-3 rounded-xl font-medium text-white"
        >
          Create Account →
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
