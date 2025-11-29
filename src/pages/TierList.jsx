import React, { useEffect, useState } from "react";
import Filters from "../components/Filters";
import HeroCard from "../components/HeroCard";
import { getHeroes } from "../services/heroService";

const TIERS = ["Pick or Ban", "SS", "S", "A", "B", "Situasional"];

export default function TierList() {
  const [heroes, setHeroes] = useState([]);
  const [roles, setRoles] = useState([]);
  const [lanes, setLanes] = useState([]);
  const [filter, setFilter] = useState({ role: "", lane: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      const { data, error } = await getHeroes();
      if (!error && mounted) {
        const all = data || [];
        setHeroes(all);
        // roles unique
        setRoles([...new Set(all.map((h) => (h.role || "").split("/")[0].trim()))].filter(Boolean));
        // lanes unique flatten
        const allLanes = all.flatMap((h) => h.lane || []);
        setLanes([...new Set(allLanes)].filter(Boolean));
      } else {
        console.error(error);
      }
      if (mounted) setLoading(false);
    })();
    return () => (mounted = false);
  }, []);

  const applyFilter = (list) =>
    list.filter((h) => {
      const roleOk = filter.role ? (h.role || "").toLowerCase().includes(filter.role.toLowerCase()) : true;
      const laneOk = filter.lane ? (h.lane || []).some((l) => l.toLowerCase().includes(filter.lane.toLowerCase())) : true;
      return roleOk && laneOk;
    });

  return (
    <div className="page">
      <h1>Tier List</h1>
      <Filters roles={roles} lanes={lanes} onChange={(f) => setFilter((p) => ({ ...p, ...f }))} />

      {loading ? <div></div> : TIERS.map((t) => (
        <section key={t} className="tier-section">
          <h2 className="tier-title">{t}</h2>
          <div className="grid-heroes">
            {applyFilter(heroes.filter((h) => (h.tier_rating || "").toLowerCase() === t.toLowerCase())).map((h) => (
              <HeroCard key={h.id} hero={h} />
            ))}

            {applyFilter(heroes.filter((h) => (h.tier_rating || "").toLowerCase() === t.toLowerCase())).length === 0 && (
              <div className="no-heroes">No heroes in this tier</div>
            )}
          </div>
        </section>
      ))}
    </div>
  );
}
