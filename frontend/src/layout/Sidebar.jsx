import React from "react";
import {
  LayoutPanelLeft,
  FolderOpen,
  FileExclamationPoint,
  Cog,
} from "lucide-react";
import { NavLink } from "react-router";

const Sidebar = () => {
  const items = [
    {
      icon: LayoutPanelLeft,
      name: "Dashboard",
      path: "/dashboard",
    },
    {
      icon: FolderOpen,
      name: "Projects",
      path: "/dashboard/projects",
    },
    {
      icon: FileExclamationPoint,
      name: "Tasks",
      path: "/dashboard/tasks",
    },
    {
      icon: Cog,
      name: "Settings",
      path: "/dashboard/setting",
    },
  ];

  return (
    <aside className="shrink-0 border-[#2b2c31] bg-[#101216] md:w-56 md:border-r-2">
      {/* Desktop Sidebar */}
      <div className="hidden h-screen flex-col px-3 py-4 md:flex">
        {/* Logo */}
        <div className="mb-10">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center rounded-md bg-[#ADC6FF] p-1">
              <LayoutPanelLeft color="#002E6A" size={18} />
            </div>

            <h2 className="font-semibold text-white">TaskFlow</h2>
          </div>

          <p className="mt-1 pl-1 text-xs text-gray-500">Developer Pro</p>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2">
          {items.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                end={item.path === "/dashboard"}
                to={item.path}
                className={({ isActive }) =>
                  `group flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-all
                  ${
                    isActive
                      ? "bg-[#ADC6FF]/10 text-[#ADC6FF]"
                      : "text-gray-400 hover:bg-white/5 hover:text-white"
                  }`
                }
              >
                <Icon size={18} />

                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 z-50 flex w-full border-t border-[#2b2c31] bg-[#101216] px-2 py-2 md:hidden">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              end={item.path === "/dashboard"}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-1 flex-col items-center justify-center gap-1 rounded-md py-1.5 text-[10px] transition-all
                ${
                  isActive ? "text-[#ADC6FF]" : "text-gray-500 hover:text-white"
                }`
              }
            >
              <Icon size={19} />

              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </div>
    </aside>
  );
};

export default Sidebar;
