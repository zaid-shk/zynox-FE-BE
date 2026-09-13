import React from "react";
import { Search, RotateCcwClock, Bell } from "lucide-react";
import { useUser } from "../hooks/redux";

const Navbar = () => {
  const { avatar } = useUser();

  return (
    <header className="flex items-center justify-between gap-3 border-b-2 border-[#2b2c31] px-3 py-3">
      {/* Left */}
      <div className="flex min-w-0 flex-1 items-center gap-5">
        {/* Search */}
        <div className="relative w-full max-w-sm">
          <Search
            size={17}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search tasks, docs..."
            className="w-full rounded-md border border-[#2b2c31] bg-[#15181e] px-2.5 py-2 pr-9 text-xs tracking-wider text-white outline-none placeholder:text-gray-500 focus:border-[#ADC6FF]"
          />
        </div>

        {/* Links - desktop only */}
        <div className="hidden items-center gap-5 md:flex">
          <h3 className="cursor-pointer text-sm text-gray-400 hover:text-white">
            Changelog
          </h3>

          <h3 className="cursor-pointer text-sm text-gray-400 hover:text-white">
            API
          </h3>
        </div>
      </div>

      {/* Right */}
      <div className="flex shrink-0 items-center gap-2">
        {/* Upgrade - desktop/tablet */}
        <div className="hidden cursor-pointer items-center justify-center rounded-lg bg-[#32353C] px-2 py-1 text-xs text-[#ADC6FF] sm:flex">
          Upgrade
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 border-x-2 border-[#2b2c31] px-3">
          <Bell
            size={18}
            className="cursor-pointer text-gray-400 hover:text-white"
          />

          <RotateCcwClock
            size={18}
            className="cursor-pointer text-gray-400 hover:text-white"
          />
        </div>

        {/* Avatar */}
        <img
          className="h-8 w-8 cursor-pointer rounded-full object-cover object-center"
          src={avatar}
          alt="Profile"
        />
      </div>
    </header>
  );
};

export default Navbar;
