import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ allowedRoles, children }) {
  const { user } = useAuth();

  // ❌ Not logged in
  if (!user) {
    return <Navigate to="/" replace />; // LOGIN PAGE
  }

  // ❌ Role not allowed
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // ✅ Allowed
  return children;
}
