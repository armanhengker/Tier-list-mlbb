import { NavLink } from "react-router-dom";
import { Home, Layers, Swords, Info } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function MobileNav() {
  return (
    <>
      {/* Bottom Navigation */}
      <nav className="mobile-nav">
        <NavLink to="/" className="mobile-nav-item">
          <Home size={22} />
          <span>Home</span>
        </NavLink>

        <NavLink to="/tier" className="mobile-nav-item">
          <Layers size={22} />
          <span>Tier</span>
        </NavLink>

        <NavLink to="/counter" className="mobile-nav-item">
          <Swords size={22} />
          <span>Counter</span>
        </NavLink>

        <NavLink to="/about" className="mobile-nav-item">
          <Info size={22} />
          <span>About</span>
        </NavLink>
      </nav>

    </>
  );
}
