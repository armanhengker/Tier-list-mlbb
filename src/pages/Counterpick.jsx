import React, { useEffect, useState } from "react";
import { getHeroes } from "../services/heroService";
import { counterpicksById } from "../data/counterpicks";
import HeroCard from "../components/HeroCard";
import "../styles/counterpanel.css";

export default function Counterpick() {
  const [q, setQ] = useState("");
  const [results, setResults] = useState([]);
  const [allHeroes, setAllHeroes] = useState([]);
  const [selected, setSelected] = useState(null);
  const [counters, setCounters] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await getHeroes({});
      setAllHeroes(data || []);
    })();
  }, []);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const { data } = await getHeroes({ search: q });
      if (mounted) setResults(data || []);
    })();
    return () => (mounted = false);
  }, [q]);

  useEffect(() => {
    if (!selected) return;
    const localCounter = counterpicksById[selected.id] || [];
    setCounters(localCounter);
  }, [selected]);

  const closePanel = () => setSelected(null);

  return (
    <div className="page counter-page">
      <h1>Counterpick</h1>
      <p className="muted" style={{ marginBottom: '20px' }}>
        Search and select a hero to view their counter picks
      </p>

      <input
        className="search-input"
        placeholder="Search hero..."
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />

      {q && results.length > 0 && (
        <div className="search-results">
          {results.map((h) => (
            <div
              key={h.id}
              className="result-row"
              onClick={() => {
                setSelected(h);
                setQ(""); // Clear search after selection
              }}
            >
              <img src={h.image_url} alt={h.hero_name} className="small-thumb" />
              <div>
                <div style={{ fontWeight: 600 }}>{h.hero_name}</div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                  {h.role}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {selected && (
        <>
          {/* Backdrop */}
          <div className="counterpanel-backdrop" onClick={closePanel} />
          
          {/* Panel */}
          <div className="counterpanel">
            <button className="closebtn" onClick={closePanel}>×</button>

            <div className="panel-header">
              <img src={selected.image_url} alt={selected.hero_name} className="panel-hero-img" />
              <h2>{selected.hero_name}</h2>
              <p className="panel-subtitle">Hero Counters</p>
            </div>

            {counters.length === 0 ? (
              <div className="muted">
                No counterpick data available for this hero yet.
              </div>
            ) : (
              <div className="panel-counters">
                {counters.map((id) => {
                  const hero = allHeroes.find(h => h.id === id);

                  if (!hero) {
                    return (
                      <HeroCard
                        key={id}
                        hero={{
                          id,
                          hero_name: "Loading...",
                          image_url: "/default.png"
                        }}
                      />
                    );
                  }

                  return <HeroCard key={id} hero={hero} />;
                })}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}