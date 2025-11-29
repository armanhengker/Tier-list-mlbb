import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import Home from "./pages/Home";
import TierList from "./pages/TierList";
import Counterpick from "./pages/Counterpick";
import HeroDetail from "./pages/HeroDetail";
import About from "./pages/About";

import Sidebar from "./components/Sidebar";
import PageLoader from "./components/PageLoader";

export default function App() {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  // 🔥 APPLY THEME DARI LOCALSTORAGE SAAT HALAMAN DILOAD
  useEffect(() => {
    const saved = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", saved);
  }, []);

  // Loading tiap ganti page
  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, [location.pathname]);

  return (
    <div className="app-layout">
      <Sidebar />   {/* tidak perlu passing toggleTheme */}

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
