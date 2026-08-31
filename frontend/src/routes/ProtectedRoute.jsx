import { Navigate, Outlet, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import meApi from "../api/Me";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slices/authSlices";
// import { projectApi } from "../api/Projects";

const API_URL =
  import.meta.env.VITE_BACKEND_API || "http://localhost:3000/api/v1";

const ProtectedRoute = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setAuthenticated(false);
        setLoading(false);
        return;
      }

      try {
        const response = await meApi();

        if (!response.ok) {
          localStorage.removeItem("token");
          setAuthenticated(false);
          setLoading(false);
          return;
        }

        const user = await response.json();
        dispatch(setUser(user));

        setAuthenticated(true);
        navigate("/dashboard");
      } catch (error) {
        localStorage.removeItem("token");
        setAuthenticated(false);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
