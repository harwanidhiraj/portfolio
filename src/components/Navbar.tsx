import { Link, useLocation } from "react-router-dom";
import { navLinks } from "../constants/navBarConsts";
import { ROUTES } from "../enums/routes";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link
          to={ROUTES.HOME}
          className="text-2xl font-bold text-indigo-600 hover:text-indigo-700 transition"
        >
          Code<span className="text-black dark:text-white">Launch</span>
        </Link>
        <div className="space-x-6 hidden md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`group relative text-lg font-medium transition duration-300 px-3 py-1 rounded-md
                ${
                  location.pathname === link.path
                    ? "text-indigo-600 bg-indigo-50 after:w-full"
                    : "text-gray-700 hover:text-indigo-500 hover:bg-indigo-50 after:w-0"
                }
                after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-indigo-500 after:transition-all after:duration-300 group-hover:after:w-full`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
