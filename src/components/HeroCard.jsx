import "../styles/style.css";

export default function HeroCard({ hero }) {
  return (
    <div className="hero-card">
      <img
        src={hero.image_url}
        alt={hero.hero_name}
        className="hero-img"
      />

      <h3 className="hero-name">{hero.hero_name}</h3>
      <p className="hero-title">{hero.title}</p>

      <div className="hero-meta">
        <span className="role">Role: {hero.role}</span>
        <span className="tier">Tier: {hero.tier_rating}</span>
      </div>
    </div>
  );
}
