import React from "react";
import {
  LayoutPanelLeft,
  FolderOpen,
  FileExclamationPoint,
  Cog,
} from "lucide-react";
import { Link, NavLink } from "react-router";

const Sidebar = () => {
  const items = [
    { icon: LayoutPanelLeft, name: "Dashboard", path: "/dashboard" },
    { icon: FolderOpen, name: "Projects", path: "/dashboard/projects" },
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
    <div className="border-r-2
     border-[#2b2c31] px-2 py-2 flex gap-10 flex-col">
      <div className="flex flex-col gap-1">
        <div className="flex gap-2">
          <div className="bg-[#ADC6FF] p-px rounded flex items-center justify-between">
            <LayoutPanelLeft color="#002E6A" size={18} />
          </div>
          <h2>TaskFlow</h2>
        </div>
        <p className="text-xs"> Developer Pro</p>
      </div>

      <div className="flex flex-col gap-5">
        {items.map((item, index) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              end={item.path === "/dashboard"}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-2 py-1 ${isActive ? "border-r-2 py-1 rounded text-[#ADC6FF]" : ""}`
              }
            >
              <Icon size={18} />
              {item.name}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
