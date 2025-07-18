// src/layouts/PublicLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../layout/NavBar";
import Footer from "../layout/Footer";

const PublicLayout = () => {
  return (
    <>
      <NavBar />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default PublicLayout;
