import type { JSX } from "react";
import { Navigate } from "react-router";

import { useAuth } from "../../auth/AuthProvider.tsx";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;

  return children;
};

export default PrivateRoute;
