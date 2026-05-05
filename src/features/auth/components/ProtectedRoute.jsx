import { Navigate } from "react-router-dom";
import { useAuth }  from "../context/useAuth";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{
          width: 36, height: 36,
          border: "3px solid #e5e7eb",
          borderTop: "3px solid #2d6a4f",
          borderRadius: "50%",
          animation: "spin 0.8s linear infinite"
        }} />
      </div>
    );
  }

  if (!user || !user.emailVerified) {
    return <Navigate to="/login" replace />;
  }

  return children;
}