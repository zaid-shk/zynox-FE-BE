import React from "react";
import { Link } from "react-router";
const Navbar = () => {
  return (
    <nav className="w-full border-b border-white/10 bg-[#0a0a0a] shadow-[0_4px_20px_rgba(0,0,0,0.35)]">
      {" "}
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {" "}
        {/* Logo */}{" "}
        <Link to="/" className="text-xl font-bold tracking-tight text-white">
          {" "}
          TaskFlow{" "}
        </Link>{" "}
        {/* Navigation */}{" "}
        <div className="hidden items-center gap-8 md:flex">
          {" "}
          <Link
            to="/"
            className="text-sm text-gray-400 transition hover:text-white"
          >
            {" "}
            Home{" "}
          </Link>{" "}
          <Link
            to="/dashboard"
            className="text-sm text-gray-400 transition hover:text-white"
          >
            {" "}
            Dashboard{" "}
          </Link>{" "}
          <a
            href="#features"
            className="text-sm text-gray-400 transition hover:text-white"
          >
            {" "}
            Features{" "}
          </a>{" "}
          <a
            href="#about"
            className="text-sm text-gray-400 transition hover:text-white"
          >
            {" "}
            About{" "}
          </a>{" "}
        </div>{" "}
        {/* Auth Buttons */}{" "}
        <div className="flex items-center gap-3">
          {" "}
          <Link
            to="/login"
            className="rounded-lg px-4 py-2 text-sm font-medium text-gray-300 transition hover:bg-white/10 hover:text-white"
          >
            {" "}
            Sign In{" "}
          </Link>{" "}
          <Link
            to="/register"
            className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-black transition hover:bg-gray-200"
          >
            {" "}
            Sign Up{" "}
          </Link>{" "}
        </div>{" "}
      </div>{" "}
    </nav>
  );
};
export default Navbar;
