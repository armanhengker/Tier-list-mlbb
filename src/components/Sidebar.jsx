import React from "react";
import { NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

export default function Sidebar() {
  return (
    <aside className="sidebar desktop-only">
      <div className="sidebar-header">
        <h2 className="logo-text">MLBB</h2>
      </div>

      <nav className="nav-section">
        <NavLink to="/" className="sidebar-item">Home</NavLink>
        <NavLink to="/tier" className="sidebar-item">Tier List</NavLink>
        <NavLink to="/counter" className="sidebar-item">Counterpick</NavLink>
        <NavLink to="/about" className="sidebar-item">About</NavLink>
      </nav>

      <div className="sidebar-footer">
        <ThemeToggle />
      </div>
    </aside>
  );
}
