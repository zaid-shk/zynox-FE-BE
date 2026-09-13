import React from "react";
import Sidebar from "../../layout/Sidebar";
import Dashboard from "./components/Dashboard";

const DashboardMain = () => {
  return (
    <section className="flex h-screen w-full overflow-hidden bg-[#101216]">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="min-w-0 flex-1 overflow-y-auto pb-16 md:pb-0">
        <Dashboard />
      </main>
    </section>
  );
};

export default DashboardMain;
