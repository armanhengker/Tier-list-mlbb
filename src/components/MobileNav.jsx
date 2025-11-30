import { NavLink } from "react-router-dom";
import { Home, Layers, Swords, Info } from "lucide-react";

export default function MobileNav() {
  return (
    <nav className="mobile-nav">
      <NavLink to="/">
        <Home size={22} />
        <span>Home</span>
      </NavLink>
      <NavLink to="/tier">
        <Layers size={22} />
        <span>Tier</span>
      </NavLink>
      <NavLink to="/counter">
        <Swords size={22} />
        <span>Counter</span>
      </NavLink>
      <NavLink to="/about">
        <Info size={22} />
        <span>About</span>
      </NavLink>
    </nav>
  );
}
