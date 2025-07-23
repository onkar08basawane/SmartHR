// src/context/AuthContext.jsx

import React, { createContext, useContext, useState } from "react";

// Change role here to test
const initialUser = {
  role: "hr", // or "superadmin", "engineer", "customer"
  email: "admin@example.com",
};

export const AuthContext = createContext(); // ✅ ADD this line

export const AuthProvider = ({ children }) => {
  const [user] = useState(initialUser);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
