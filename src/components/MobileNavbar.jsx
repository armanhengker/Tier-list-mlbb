import { NavLink } from "react-router-dom";
import { Home, List, Crosshair, Info } from "lucide-react";

export default function MobileNavbar() {
  return (
    <nav className="mobile-navbar">
      <NavLink to="/" className="mobile-nav-item">
        <Home size={20} />
        <span>Home</span>
      </NavLink>

      <NavLink to="/tier" className="mobile-nav-item">
        <List size={20} />
        <span>Tier</span>
      </NavLink>

      <NavLink to="/counter" className="mobile-nav-item">
        <Crosshair size={20} />
        <span>Counter</span>
      </NavLink>

      <NavLink to="/about" className="mobile-nav-item">
        <Info size={20} />
        <span>About</span>
      </NavLink>
    </nav>
  );
}
