import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Layers, Swords, Info } from "lucide-react";

export default function MobileNav() {
  const location = useLocation();

  return (
    <nav className="mobile-nav">
      <Link to="/" className={location.pathname === "/" ? "active" : ""}>
        <Home size={22} />
        <span>Home</span>
      </Link>

      <Link to="/tier" className={location.pathname === "/tier" ? "active" : ""}>
        <Layers size={22} />
        <span>Tier</span>
      </Link>

      <Link to="/counter" className={location.pathname === "/counter" ? "active" : ""}>
        <Swords size={22} />
        <span>Counter</span>
      </Link>

      <Link to="/about" className={location.pathname === "/about" ? "active" : ""}>
        <Info size={22} />
        <span>About</span>
      </Link>
    </nav>
  );
}
