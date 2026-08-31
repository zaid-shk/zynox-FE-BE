import React from "react";
import Navbar from "../../../layout/Navbar";
import { Outlet } from "react-router";

const Dashboard = () => {
  return (
    <div>
      <Navbar />
      <main className="">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
