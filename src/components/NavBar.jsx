import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="bg-white dark:bg-[#1a1a1a] shadow-md fixed w-full top-0 left-0 z-50 transition-all duration-300">
      <div className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-white font-bold">
            <img src="/logo.png"/>
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
            className={`text-base font-medium ${
              location.pathname === "/"
                ? "text-indigo-600 dark:text-indigo-400"
                : "text-gray-700 dark:text-gray-300"
            } hover:text-indigo-500`}
            onClick={() => setOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/cards"
            className={`text-base font-medium ${
              location.pathname === "/cards"
                ? "text-indigo-600 dark:text-indigo-400"
                : "text-gray-700 dark:text-gray-300"
            } hover:text-indigo-500`}
            onClick={() => setOpen(false)}
          >
            Cards
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
