import React from "react";
import Logo from "../../assets/logo.png";

const NavBar = ({ role }) => {
  return (
    <header className="bg-white shadow p-4 flex justify-between items-center fixed top-0 left-0 right-0 z-50">
      {/* Logo and Title */}
      <div className="flex items-center gap-4">
        <img
          src={Logo}
          alt="Logo"
          className="h-12 max-h-full w-auto object-contain"
        />
        <h1 className="text-xl font-bold text-gray-800">Smart HR </h1>
      </div>

      {/* Role info */}
      <div>
        <p className="text-sm text-gray-600">
          Logged in as: <strong className="text-black">{role}</strong>
        </p>
      </div>
    </header>
  );
};

export default NavBar;
