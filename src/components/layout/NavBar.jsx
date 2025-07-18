import React from "react";

const NavBar = ({ role }) => {
  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Dashboard</h1>
      <div>
        <p className="text-sm text-gray-600">
          Logged in as: <strong>{role}</strong>
        </p>
      </div>
    </header>
  );
};

export default NavBar;
