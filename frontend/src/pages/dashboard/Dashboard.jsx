import React from "react";
import Sidebar from "../../layout/Sidebar";
import Dashboard from "./components/Dashboard";

const DashboardMain = () => {
  return (
    <section className="h-screen w-screen grid grid-cols-[20vw_80vw]">
      <Sidebar />
      <Dashboard />
    </section>
  );
};

export default DashboardMain;
