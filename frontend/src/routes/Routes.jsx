import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router";
import SignIn from "../pages/signIn/SignIn";
import Signup from "../pages/signUp/Signup";
import Navbar from "../layout/Navbar";
import Landing from "../pages/landing/Landing";

import { useNavigate } from "react-router";
import DashboardMain from "../pages/dashboard/Dashboard";
import Projects from "../pages/dashboard/components/Projects";
import Overview from "../pages/dashboard/components/Overview";
import Task from "../pages/dashboard/components/Task";
import Setting from "../pages/dashboard/components/Setting";
import ProtectedRoute from "./ProtectedRoute";

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
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardMain />}>
            <Route index element={<Overview />} />
            <Route path="projects" element={<Projects />} />
            <Route path="tasks" element={<Task />} />
            <Route path="setting" element={<Setting />} />
          </Route>
        </Route>

        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<SignIn />} />
      </Routes>
    </div>
  );
};

export default Routess;
