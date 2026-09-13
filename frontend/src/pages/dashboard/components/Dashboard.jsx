import React from "react";
import Navbar from "../../../layout/Navbar";
import { Outlet } from "react-router";

const Dashboard = () => {
  return (
    <div>
      <Navbar />
      <main className="h-screen overflow-y-auto pb-10">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
