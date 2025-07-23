import React, { useState } from "react";
import Sidebar from "../layout/sidebar";
import Navbar from "../layout/NavBar";
import { Outlet } from "react-router-dom";

const DashboardLayout = ({ role }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <>
      {/* Navbar — pass toggle button callback */}
      <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

      <div className="flex pt-16 bg-[#f5f5f5] min-h-screen">
        {/* Sidebar */}
        {isSidebarOpen && (
          <div className="fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 z-40">
            <Sidebar role={role} />
          </div>
        )}

        {/* Main content — dynamic margin based on sidebar state */}
        <main className={`transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-0"} w-full p-4`}>
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default DashboardLayout;
