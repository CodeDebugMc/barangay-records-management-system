import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, requireRole }) {
  const { user, loading } = useAuth();

  if (loading) return null; // or show spinner while we verify /me
  if (!user) return <Navigate to="/" replace />; // redirect to login

  if (requireRole && user.role !== requireRole && user.role !== "superadmin") {
    return <Navigate to="/unauthorized" replace />;
  }
  return children;
}
