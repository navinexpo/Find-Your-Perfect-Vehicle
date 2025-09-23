import React from "react";
import "./FloatingNavbar.css";

export const FloatingNavbar: React.FC = () => {
  return (
    <nav className="floating-navbar">
      <div className="navbar-left">
        <span className="logo">
          FLEX<span className="logo-x">X</span>CAR
        </span>
        <div className="navbar-filters">
          <div className="navbar-chip">
            <span className="icon">📍</span> 94105
          </div>
          <div className="navbar-chip">
            <span className="icon">👤</span> 25–34{" "}
            <span className="divider">|</span> <span className="icon">🏎️</span>{" "}
            740+
          </div>
          <div className="navbar-chip">
            <span className="icon">📅</span> Standard Plan
          </div>
          <div className="navbar-chip">
            <span className="icon">🛡️</span> Protection: Essential
          </div>
        </div>
      </div>
      <div className="navbar-right">
        <a href="#" className="navbar-link">
          How it works
        </a>
        <a href="#" className="navbar-link">
          Log in
        </a>
      </div>
    </nav>
  );
};
