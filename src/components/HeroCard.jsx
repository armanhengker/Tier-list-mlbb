import React from 'react';
import { Link } from 'react-router-dom';

export default function HeroCard({ hero }) {
  return (
    <Link to={`/hero/${hero.id}`} className="hero-card no-underline">
      <img src={hero.image_url} alt={hero.hero_name} loading="lazy" />
      <div className="hero-name">{hero.hero_name}</div>
    </Link>
  );
}
