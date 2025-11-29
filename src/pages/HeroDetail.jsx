import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getHeroById } from "../services/heroService";

export default function HeroDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hero, setHero] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    (async () => {
      const { data } = await getHeroById(id);
      if (active) {
        setHero(data);
        setLoading(false);
      }
    })();
    return () => (active = false);
  }, [id]);

  if (loading) return <div className="page"></div>;
  if (!hero) return <div className="page">Hero not found</div>;

  return (
    <div className="page hero-detail-wrapper">

      <button className="detail-back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="hero-detail-container">

        <div className="detail-left">
          <img
            src={hero.image_url}
            alt={hero.hero_name}
            className="hero-detail-img"
          />
        </div>

        <div className="detail-right">
          <h1 className="hero-detail-name">{hero.hero_name}</h1>
          <p className="hero-detail-sub">{hero.title}</p>

          <div className="detail-info-grid">
            <div className="detail-item">
              <span>Role</span>
              <strong>{hero.role}</strong>
            </div>

            <div className="detail-item">
              <span>Lane</span>
              <strong>{hero.lane.join(", ")}</strong>
            </div>

            <div className="detail-item">
              <span>Speciality</span>
              <strong>{hero.speciality}</strong>
            </div>

            <div className="detail-item">
              <span>Tier</span>
              <strong className="tier-badge">{hero.tier_rating}</strong>
            </div>

            <div className="detail-item">
              <span>Release</span>
              <strong>{hero.release_year}</strong>
            </div>
          </div>

          <p className="hero-detail-desc">{hero.description}</p>
        </div>

      </div>
    </div>
  );
}
