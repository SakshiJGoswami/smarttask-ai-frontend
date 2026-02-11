import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { fetchMe } from "../services/authService"; // ✅ IMPORTANT

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ---------------- RESTORE SESSION ---------------- */
  useEffect(() => {
    const restoreUser = async () => {
      try {
        const stored = localStorage.getItem("user");

        if (!stored) {
          setLoading(false);
          return;
        }

        const parsed = JSON.parse(stored);

        // ✅ Validate token with backend
        const res = await fetchMe();

        setUser({
          ...res.user,
          token: parsed.token, // keep JWT
        });
      } catch (error) {
        console.warn("Session restore failed:", error.message);
        localStorage.removeItem("user");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    restoreUser();
  }, []);

  /* ---------------- LOGIN ---------------- */
  const login = (data) => {
    // data = { user, token } from backend
    const { user, token } = data;

    const userWithToken = { ...user, token };

    localStorage.setItem("user", JSON.stringify(userWithToken));
    setUser(userWithToken);

    toast.success("Login successful ✅");
  };

  /* ---------------- LOGOUT ---------------- */
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    toast.success("Logged out successfully");
  };

  /* ---------------- UPDATE PROFILE ---------------- */
  const updateProfile = (updatedData) => {
    setUser((prev) => {
      const updatedUser = { ...prev, ...updatedData };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      toast.success("Profile updated");
      return updatedUser;
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
