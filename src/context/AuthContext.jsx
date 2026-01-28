import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    return token ? { token, role } : null;
  });

  const login = (email, password) => {
    // 🔴 MOCK LOGIN (replace with API later)
    let role = "employee";
    if (email.includes("admin")) role = "admin";
    else if (email.includes("manager")) role = "manager";

    const fakeToken = "jwt_token_example";

    localStorage.setItem("token", fakeToken);
    localStorage.setItem("role", role);

    setUser({ token: fakeToken, role });
    return role;
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
