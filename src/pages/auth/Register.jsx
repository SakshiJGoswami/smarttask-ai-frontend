import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = () => {
    if (!form.name || !form.email || !form.password) {
      alert("Please fill all fields");
      return;
    }

    alert("Account created successfully (mock)");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-card backdrop-blur-glass border border-border rounded-2xl p-8 shadow-glass">
        <h2 className="text-2xl font-semibold mb-2">Create Account</h2>
        <p className="text-sm text-gray-400 mb-6">
          Join SmartTask AI and boost productivity.
        </p>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-3 rounded-xl bg-surface border border-border outline-none focus:border-primary"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-3 rounded-xl bg-surface border border-border outline-none focus:border-primary"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full mb-6 px-4 py-3 rounded-xl bg-surface border border-border outline-none focus:border-primary"
        />

        <button
          onClick={handleRegister}
          className="w-full bg-primary hover:bg-primaryHover transition py-3 rounded-xl font-medium"
        >
          Create Account →
        </button>

        <p className="text-center text-sm text-gray-400 mt-6">
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
