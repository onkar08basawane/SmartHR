import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import SideBarLinks from "../constants/SideBarLinks";
import { useAuth } from "../../context/AuthContext";
import { FaBars, FaTimes } from "react-icons/fa"; // ✅ Icons imported here

const Sidebar = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const role = user?.role || "employee";
  const links = SideBarLinks[role] || [];

  return (
    <div
      className={`fixed top-16 left-0 h-[calc(100vh-4rem)] bg-black text-white z-40 transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      <div className="flex items-center justify-between p-4">
        {!collapsed && <h1 className="text-xl font-bold">Dashboard</h1>}
        <button
          className="text-white focus:outline-none"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <FaBars /> : <FaTimes />}
        </button>
      </div>

      <nav className="mt-4">
        {links.map((link, index) => (
          <div
            key={index}
            className={`px-4 py-2 hover:bg-gray-700 ${
              location.pathname === link.path ? "bg-gray-700" : ""
            }`}
          >
            <Link to={link.path} className="block text-white text-sm">
              {collapsed ? link.label.charAt(0) : link.label}
            </Link>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
