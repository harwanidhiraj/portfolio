import { NavLink } from "react-router-dom";
import {
  FaUser,
  FaLaptopCode,
  FaBriefcase,
  FaProjectDiagram,
  FaEnvelope,
  FaSignOutAlt,
  FaInfoCircle,
  FaAddressBook,
} from "react-icons/fa";

const navLinks = [
  { label: "Profile", icon: <FaUser />, path: "/admin/profile" },
  { label: "About", icon: <FaInfoCircle />, path: "/admin/about" },
  { label: "Skills", icon: <FaLaptopCode />, path: "/admin/skills" },
  { label: "Experience", icon: <FaBriefcase />, path: "/admin/experience" },
  { label: "Projects", icon: <FaProjectDiagram />, path: "/admin/projects" },
  { label: "Messages", icon: <FaEnvelope />, path: "/admin/messages" },
  {
    label: "Get In Touch",
    icon: <FaAddressBook />,
    path: "/admin/getInTouch",
  },
];

const AdminSidebar = () => {
  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    window.location.href = "/admin/login";
  };

  return (
    <aside className="w-64 h-screen bg-gray-800 text-white fixed left-0 top-0 shadow-lg">
      <div className="py-6 px-4 text-center border-b border-gray-700">
        <h1 className="text-2xl font-bold tracking-wide">Admin Panel</h1>
      </div>

      <nav className="mt-6 space-y-1 px-4">
        {navLinks.map((link) => (
          <NavLink
            to={link.path}
            key={link.label}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md transition ${
                isActive
                  ? "bg-indigo-600 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`
            }
          >
            <span className="text-lg">{link.icon}</span>
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="absolute bottom-6 left-0 w-full px-4">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
