import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || "http://localhost:5000/api",
  withCredentials: true,
});

// ✅ Attach JWT token automatically
api.interceptors.request.use((config) => {
  const raw = localStorage.getItem("user");

  if (raw) {
    try {
      const parsed = JSON.parse(raw);
      if (parsed?.token) {
        config.headers.Authorization = `Bearer ${parsed.token}`;
      }
    } catch (err) {
      console.warn("Token parse error:", err);
    }
  }

  return config;
});

export default api;
