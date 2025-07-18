import React from "react";
import Sidebar from "../layout/sidebar";
import Navbar from "../layout/NavBar";
import { Outlet } from "react-router-dom";

const DashboardLayout = ({ role }) => {
  return (
    <>
      {/* Navbar is fixed */}
      <Navbar className="w-full fixed top-0 left-0 z-50" />

      <div className="flex pt-16 bg-[#f5f5f5] min-h-screen">
        {/* Sidebar fixed, height adjusted below navbar */}
        <Sidebar role={role} />

        {/* Main content, padding to avoid sidebar overlap */}
        <main className="flex-1 p-6 ml-64">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default DashboardLayout;
