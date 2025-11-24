import { useEffect, useState } from "react";
import HeroCard from "../components/HeroCard";
import Navbar from "../components/Navbar";
import Filters from "../components/Filters";

import "./HeroList.css";

export default function HeroList() {
  const [heroes, setHeroes] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadHeroes() {
      const res = await fetch("/api/heroes");
      const json = await res.json();

      setHeroes(json.data || []);
      setFiltered(json.data || []);

      setLoading(false);
    }
    loadHeroes();
  }, []);

  function handleSearch(text) {
    const lower = text.toLowerCase();

    setFiltered(
      heroes.filter(h =>
        h.hero_name.toLowerCase().includes(lower) ||
        h.title.toLowerCase().includes(lower)
      )
    );
  }

  return (
    <>
      <Navbar />

      <Filters onSearchChange={handleSearch} />

      <div className="page-container">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid">
            {filtered.map(hero => (
              <HeroCard key={hero.id} hero={hero} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
