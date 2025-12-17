import React, { useEffect, useState } from "react";
import { getHeroes } from "../services/heroService";
// import { counterpicksById } from "../data/counterpicks"; // HAPUS INI KARENA KITA PAKAI DATABASE
import HeroCard from "../components/HeroCard";
import "../styles/counterpanel.css";

export default function Counterpick() {
  const [q, setQ] = useState("");
  const [results, setResults] = useState([]);
  const [allHeroes, setAllHeroes] = useState([]);
  const [selected, setSelected] = useState(null);
  const [counters, setCounters] = useState([]);

  // 1. Ambil semua hero saat pertama kali load (untuk referensi data counter)
  useEffect(() => {
    (async () => {
      const { data } = await getHeroes({});
      setAllHeroes(data || []);
    })();
  }, []);

  // 2. Fitur Pencarian Hero
  useEffect(() => {
    let mounted = true;
    (async () => {
      const { data } = await getHeroes({ search: q });
      if (mounted) setResults(data || []);
    })();
    return () => (mounted = false);
  }, [q]);

  // 3. LOGIKA BARU: Saat hero dipilih, ambil data counter dari DATABASE (bukan file lokal)
  useEffect(() => {
    if (!selected) return;

    // Ambil data array dari kolom database 'counterpicks' (JSONB)
    const dbCounters = selected.counterpicks || [];
    
    // Kita perlu mengubah data JSON (nama/object) menjadi Object Hero Lengkap
    // agar HeroCard bisa menampilkan gambar dan role dengan benar.
    const resolvedCounters = dbCounters.map(item => {
        // Cek apakah format di database berupa String ("Fanny") atau Object ({name: "Fanny"})
        const heroName = typeof item === 'object' && item.name ? item.name : item;

        // Cari data hero lengkap di allHeroes berdasarkan nama
        // Gunakan toLowerCase agar pencarian tidak case-sensitive
        return allHeroes.find(h => 
            h.hero_name.toLowerCase() === heroName.toLowerCase()
        );
    }).filter(item => item !== undefined); // Hapus jika hero tidak ditemukan di database

    setCounters(resolvedCounters);
  }, [selected, allHeroes]);

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
                {/* UPDATE: Karena 'counters' sekarang sudah berisi object hero lengkap 
                   dari logika useEffect di atas, kita tinggal map langsung.
                */}
                {counters.map((hero) => (
                  <HeroCard key={hero.id} hero={hero} />
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}