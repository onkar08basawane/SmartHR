// src/components/layout/Sidebar.jsx
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import SideBarLinks from "../constants/SideBarLinks";
import { useAuth } from "../../context/AuthContext";

const Sidebar = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  // Get the role-specific sidebar links
  const role = user?.role || "employee";
  const links = SideBarLinks[role] || [];

  return (
    <div className={`h-screen bg-black text-white transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'} fixed top-0 left-0 overflow-hidden`}>
      <div className="flex items-center justify-between p-4">
        <h1 className={`text-xl font-bold ${collapsed ? 'hidden' : 'block'}`}>Dashboard</h1>
        <button
          className="text-white focus:outline-none"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? '☰' : '✕'}
        </button>
      </div>

      <nav className="mt-4">
        {links.map((link, index) => (
          <div key={index} className={`px-4 py-2 hover:bg-gray-700 ${location.pathname === link.path ? 'bg-gray-700' : ''}`}>
            <a href={link.path} className="block text-white text-sm">
              {collapsed ? link.label.charAt(0) : link.label}
            </a>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
