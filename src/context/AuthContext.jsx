import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // ✅ LOGIN
  const login = (userData) => {
    const fakeToken = "jwt_token_example";

    const userWithToken = {
      ...userData,
      token: fakeToken,
    };

    localStorage.setItem("user", JSON.stringify(userWithToken));
    setUser(userWithToken);
  };

  // ✅ LOGOUT
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  // ✅ UPDATE PROFILE (NEW – REQUIRED)
  const updateProfile = (updatedData) => {
    setUser((prev) => {
      const updatedUser = { ...prev, ...updatedData };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      return updatedUser;
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
