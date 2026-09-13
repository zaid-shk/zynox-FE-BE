import { Navigate, Outlet } from "react-router";
import { useUser } from "../hooks/redux";

const PublicRoute = () => {
  const user = useUser();

  // User already logged in
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
