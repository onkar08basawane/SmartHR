import React from "react";
import { useLocation, Link } from "react-router-dom";
import SideBarLinks from "../constants/SideBarLinks";
import { useAuth } from "../../context/AuthContext";
import {
  FiHome, FiUser, FiPieChart, FiSettings, FiFileText, FiUsers, FiBox,
  FiShoppingCart, FiBell, FiCalendar, FiMail, FiDatabase, FiLayers,
  FiCreditCard, FiShield, FiHelpCircle
} from "react-icons/fi";
import { motion } from "framer-motion";

const Sidebar = ({ role: passedRole }) => {
  const { user } = useAuth();
  const { pathname } = useLocation();

  const role = passedRole || user?.role || "employee";
  const links = SideBarLinks[role] || [];

  const getUserInitials = (name) =>
    name ? name.split(" ").map((n) => n[0]).join("").toUpperCase() : "U";

  const icons = {
    dashboard: <FiHome className="text-xl" />,
    profile: <FiUser className="text-xl" />,
    analytics: <FiPieChart className="text-xl" />,
    settings: <FiSettings className="text-xl" />,
    reports: <FiFileText className="text-xl" />,
    team: <FiUsers className="text-xl" />,
    products: <FiBox className="text-xl" />,
    orders: <FiShoppingCart className="text-xl" />,
    notifications: <FiBell className="text-xl" />,
    calendar: <FiCalendar className="text-xl" />,
    messages: <FiMail className="text-xl" />,
    inventory: <FiDatabase className="text-xl" />,
    projects: <FiLayers className="text-xl" />,
    payments: <FiCreditCard className="text-xl" />,
    security: <FiShield className="text-xl" />,
    help: <FiHelpCircle className="text-xl" />,
  };

  return (
    <>
      <motion.div
        className="fixed top-16 left-0 h-[calc(100vh-4rem)] bg-white/90 backdrop-blur-lg z-40 border-r border-[#0CAFFF]/10 shadow-2xl flex flex-col overflow-hidden"
        style={{ width: 256, position: 'fixed' }}
      >
        {/* Header */}
        <div className="p-4 shrink-0">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-3"
          >
            <div className="w-10 h-10 rounded-full bg-[#0CAFFF] flex items-center justify-center text-white font-bold">
              {getUserInitials(user?.name)}
            </div>
            <div className="min-w-0">
              <h3 className="font-semibold text-gray-800 truncate">{user?.name || "User"}</h3>
              <p className="text-xs text-gray-500 truncate">{role}</p>
            </div>
          </motion.div>
        </div>

        {/* Nav Links */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden py-2 px-2">
          <nav className="space-y-2">
            {links.map((link, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.02 }}
              >
                <Link
                  to={link.path}
                  className={`flex items-center p-3 rounded-xl transition-all duration-200 ${
                    pathname === link.path
                      ? "bg-[#0CAFFF] text-white shadow-md"
                      : "text-gray-600 hover:bg-[#0CAFFF]/10 hover:text-[#0CAFFF]"
                  } px-4`}
                >
                  <div className="relative flex items-center">
                    <div className="p-2 rounded-lg">
                      {icons[link.label.toLowerCase()] || <FiHome className="text-xl" />}
                    </div>
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="ml-3 font-medium text-sm truncate"
                    >
                      {link.label}
                    </motion.span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </nav>
        </div>

        {/* Footer */}
        <div className="p-4 shrink-0">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-between text-xs text-gray-500"
          >
            <span>v2.4.0</span>
            <span>© {new Date().getFullYear()}</span>
          </motion.div>
        </div>
      </motion.div>

      {/* Main content wrapper with fixed margin */}
      <div className="min-h-[calc(100vh-4rem)] ml-64">
        {/* Your main content goes here */}
      </div>
    </>
  );
};

export default Sidebar;