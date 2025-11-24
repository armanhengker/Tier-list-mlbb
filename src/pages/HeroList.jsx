import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";

export default function HeroList() {
  const [heroes, setHeroes] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchLocal() {
    const { data, error } = await supabase
      .from("heroes")
      .select("*")
      .order("id");

    if (error) console.error(error);
    return data || [];
  }

  async function fetchVercel() {
    const res = await fetch("/api/heroes");
    return await res.json();
  }

  useEffect(() => {
    async function load() {
      let result;

      if (window.location.hostname === "localhost") {
        result = await fetchLocal();
      } else {
        result = await fetchVercel();
      }

      setHeroes(result);
      setLoading(false);
    }

    load();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Daftar Hero</h1>
      <ul>
        {heroes.map(h => (
          <li key={h.id}>{h.hero_name} — {h.title}</li>
        ))}
      </ul>
    </div>
  );
}
