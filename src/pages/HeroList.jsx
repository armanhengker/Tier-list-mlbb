import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Filters from "../components/Filters";
import HeroCard from "../components/HeroCard";
import "../styles/style.css";

export default function HeroList() {
  const [heroes, setHeroes] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadHeroes() {
      try {
        const res = await fetch("http://localhost:3000/api/heroes");
        const json = await res.json();

        // 🔥 API kamu mengembalikan ARRAY langsung, bukan { data: [] }
        if (Array.isArray(json)) {
          setHeroes(json);
          setFiltered(json);
        } else {
          console.error("Unexpected API format:", json);
          setHeroes([]);
          setFiltered([]);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setHeroes([]);
        setFiltered([]);
      } finally {
        setLoading(false);
      }
    }

    loadHeroes();
  }, []);

  const handleSearch = (keyword) => {
    const result = heroes.filter((h) =>
      h.hero_name.toLowerCase().includes(keyword.toLowerCase())
    );
    setFiltered(result);
  };

  if (loading) return <p className="loading">Loading...</p>;

  return (
    <div className="container">
      <Navbar />

      <Filters onSearch={handleSearch} />

      <div className="hero-grid">
        {filtered.map((hero) => (
          <HeroCard key={hero.id} hero={hero} />
        ))}
      </div>
    </div>
  );
}
