import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path
      ? "text-indigo-600 dark:text-indigo-400"
      : "text-gray-700 dark:text-gray-300";

  return (
    <nav className="bg-white dark:bg-[#1a1a1a] shadow-md fixed w-full top-0 left-0 z-50 transition-all duration-300">
      <div className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-white font-bold overflow-hidden">
            <img src="/logo.png" alt="Startup Mayhem" className="h-full w-full object-cover" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">
            Startup Mayhem
          </h1>
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden text-gray-700 dark:text-gray-200"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Links */}
        <div
          className={`${
            open ? "flex" : "hidden"
          } absolute md:static top-16 left-0 w-full md:w-auto bg-white dark:bg-[#1a1a1a] md:flex flex-col md:flex-row items-center md:gap-8 gap-4 px-6 md:px-0 py-4 md:py-0`}
        >
          <Link
            to="/"
            className={`text-base font-medium ${isActive("/")} hover:text-indigo-500`}
            onClick={() => setOpen(false)}
          >
            Home
          </Link>

          <Link
            to="/cards"
            className={`text-base font-medium ${isActive("/cards")} hover:text-indigo-500`}
            onClick={() => setOpen(false)}
          >
            Cards
          </Link>

          <Link
            to="/teams"
            className={`text-base font-medium ${isActive("/teams")} hover:text-indigo-500`}
            onClick={() => setOpen(false)}
          >
            Teams
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
