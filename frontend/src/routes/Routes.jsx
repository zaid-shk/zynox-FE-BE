import { lazy, Suspense, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router";
import SignIn from "../pages/signIn/SignIn";
import Signup from "../pages/signUp/Signup";
import Navbar from "../layout/Navbar";
import Landing from "../pages/landing/Landing";

import { useNavigate } from "react-router";
const DashboardMain = lazy(() => import("../pages/dashboard/Dashboard"));
const Projects = lazy(() => import("../pages/dashboard/components/Projects"));
const Overview = lazy(() => import("../pages/dashboard/components/Overview"));
const Task = lazy(() => import("../pages/dashboard/components/Task"));
const Setting = lazy(() => import("../pages/dashboard/components/Setting"));
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import ProjectDetails from "../pages/dashboard/components/ProjectDetails";

const Routess = () => {
  const navigate = useNavigate();

  const API_URL =
    import.meta.env.VITE_BACKEND_API || "http://localhost:3000/api/v1";
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch(`${API_URL}/user/me`, {
          headers: {
            token,
          },
        });

        if (!response.ok) {
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }
      } catch (error) {
        localStorage.removeItem("token");
        navigate("/login");
        console.log(error);
      }
    };
    checkAuth();
  }, [navigate]);

  return (
    <div>
      {/* <Navbar /> */}
      <Suspense fallback={<div>Loading ...</div>}>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<SignIn />} />
            <Route path="/register" element={<Signup />} />
          </Route>

          <Route path="/" element={<Landing />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardMain />}>
              <Route index element={<Overview />} />
              <Route path="projects" element={<Projects />} />
              <Route path="projects/:projectId" element={<ProjectDetails />} />
              <Route path="tasks" element={<Task />} />
              <Route path="setting" element={<Setting />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
};

export default Routess;
