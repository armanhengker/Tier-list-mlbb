import React, { useEffect, useState } from "react";
import HeroCard from "../components/HeroCard";
import SkeletonCard from "../components/SkeletonCard";
import { supabase } from "../../supabaseClient";

export default function Home() {
  const [q, setQ] = useState("");
  const [heroes, setHeroes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;

    (async () => {
      setLoading(true);

      // Ambil SEMUA hero
      let query = supabase
        .from("heroes")
        .select("*")
        .order("id", { ascending: true });

      // Search — kolom yang benar adalah hero_name
      if (q.trim() !== "") {
        query = query.ilike("hero_name", `%${q}%`);
      }

      const { data, error } = await query;

      if (!error && mounted) {
        setHeroes(data || []);
      } else if (error) {
        console.error("Supabase error:", error);
      }

      if (mounted) setLoading(false);
    })();

    return () => {
      mounted = false;
    };
  }, [q]);

  return (
    <div className="page">
      <div className="page-header">
        <h1>All Heroes</h1>

        <input
          type="search"
          placeholder="Search hero..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="search-input"
        />
      </div>

      {loading ? (
        <div className="grid-heroes">
          {Array.from({ length: 12 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : (
        <div className="grid-heroes">
          {heroes.map((h) => (
            <HeroCard key={h.id} hero={h} />
          ))}
        </div>
      )}
    </div>
  );
}
