import { Navigate } from "react-router";
import { useAuth } from "./AuthProvider";

const AdminRoute = ({ children }) => {
  const { user, isAdmin, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  if (!user || !isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default AdminRoute;
