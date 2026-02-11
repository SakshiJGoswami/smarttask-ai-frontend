import api from "./apiClient";

// ================= LOGIN =================
export async function loginUser(email, password) {
  if (!email || !password) {
    throw new Error("Email and password required");
  }

  try {
    const res = await api.post("/auth/login", { email, password });

    // ✅ Backend returns: { user, token }
    return res.data;

  } catch (error) {
    console.error(
      "LOGIN ERROR:",
      error.response?.data || error.message
    );

    throw new Error(
      error.response?.data?.message || "Login failed ❌"
    );
  }
}

// ================= REGISTER =================
export async function registerUser(name, email, password) {
  if (!name || !email || !password) {
    throw new Error("All fields are required");
  }

  try {
    const res = await api.post("/auth/register", {
      name,
      email,
      password,
    });

    return res.data;

  } catch (error) {
    console.error(
      "REGISTER ERROR:",
      error.response?.data || error.message
    );

    throw new Error(
      error.response?.data?.message || "Registration failed ❌"
    );
  }
}

// ================= RESET PASSWORD (Mock) =================
export function resetPassword(email) {
  if (!email) {
    throw new Error("Email is required");
  }

  return {
    success: true,
    message: "Password reset feature coming soon ✉️",
  };
}

// ================= FETCH CURRENT USER =================
export async function fetchMe() {
  try {
    const res = await api.get("/auth/me");
    return res.data;

  } catch (error) {
    console.error("FETCH ME ERROR:", error);

    throw new Error(
      error.response?.data?.message || "Session expired ❌"
    );
  }
}
