import { Link, useLocation } from "react-router-dom";

export default function MobileNavbar() {
  const location = useLocation();
  const path = location.pathname;

  const menu = [
    { label: "Home", to: "/", icon: "🏠" },
    { label: "Tier", to: "/tier", icon: "⭐" },
    { label: "Counter", to: "/counter", icon: "⚔️" },
    { label: "Hero", to: "/hero", icon: "🧩" },
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 w-full bg-white border-t flex justify-around py-2 z-50 md:hidden"
      style={{ boxShadow: "0 -2px 10px rgba(0,0,0,0.05)" }}
    >
      {menu.map((item) => (
        <Link
          key={item.to}
          to={item.to}
          className={`flex flex-col items-center text-xs ${
            path === item.to ? "text-blue-600 font-bold" : "text-gray-600"
          }`}
        >
          <span className="text-xl">{item.icon}</span>
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
