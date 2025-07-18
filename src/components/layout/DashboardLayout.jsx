import React from "react";
import Sidebar from "../layout/sidebar";
import Navbar from "../layout/navbar";
import { Outlet } from "react-router-dom";

const DashboardLayout = ({ role }) => {
  return (
    <>
    <Navbar className="w-full" />
    <div className="flex bg-[#f5f5f5] min-h-screen">
      {/* Sidebar will receive the role as a prop to conditionally render items */}
      <Sidebar role={role} />
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
    </>
  );
};

export default DashboardLayout;
