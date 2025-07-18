import React from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Welcome to SmartHR</h1>
      <p>This is the Hero section of the landing page.</p>

      <div style={{ marginTop: "2rem", display: "flex", justifyContent: "center", gap: "1rem" }}>
        <button onClick={() => navigate("/about")}>About Us</button>
        <button onClick={() => navigate("/features")}>Features</button>
        <button onClick={() => navigate("/services")}>Our Services</button>
      </div>
    </div>
  );
};

export default Hero;
