import React, { useEffect } from "react";
import { Link } from "react-router";
import { Search, RotateCcwClock, Bell } from "lucide-react";
import { useUser } from "../hooks/redux";

const Navbar = () => {
  const { avatar } = useUser();

  return (
    <div
      className="flex items-center justify-between px-3 py-3 border-b-2
     border-[#2b2c31]"
    >
      <div className="flex gap-5">
        <div className="relative">
          <div className="absolute top-1.5 right-1">
            <Search size={18} />
          </div>
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search tasks,docs ..."
            className="border px-2.5 py-1.5 rounded tracking-wider text-xs"
          />
        </div>
        <div className="flex items-center gap-5">
          <h3 className="text-sm cursor-pointer">Changelog</h3>
          <h3 className="text-sm cursor-pointer">API</h3>
        </div>
      </div>
      <div className="flex gap-2 items-center">
        <div className="text-xs flex items-center cursor-pointer justify-center  px-2 py-0.5 rounded-lg h-7 bg-[#32353C] text-[#ADC6FF]">
          Upgrade
        </div>
        <div className="border-x-2 border-[#2b2c31] p-2 px-4 flex gap-4 items-center">
          <Bell size={18} className="cursor-pointer" />
          <RotateCcwClock size={18} className="cursor-pointer" />
        </div>
        <img
          className="h-8 w-8 rounded-full object-cover object-center cursor-pointer"
          src={avatar}
          alt=""
        />
      </div>
    </div>
  );
};

export default Navbar;
