import { Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import Home from "./pages/Home";
import TierList from "./pages/TierList";
import Counterpick from "./pages/Counterpick";
import HeroDetail from "./pages/HeroDetail";
import About from "./pages/About";

import Sidebar from "./components/Sidebar";
import PageLoader from "./components/PageLoader";

export default function App() {
  const [theme, setTheme] = useState("dark");
  const [loading, setLoading] = useState(false);

  const location = useLocation();

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, []);

  // 🔥 Trigger loading setiap ganti halaman
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 500); 
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div className="app-layout">
      <Sidebar onToggleTheme={toggleTheme} />

      {loading && <PageLoader />}

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tier" element={<TierList />} />
          <Route path="/counter" element={<Counterpick />} />
          <Route path="/hero/:id" element={<HeroDetail />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
    </div>
  );
}
