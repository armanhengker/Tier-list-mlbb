import "./src/style.css";

export default function HeroCard({ hero }) {
  return (
    <div className="hero-card">
      <img src={hero.image_url} alt={hero.hero_name} />

      <h3>{hero.hero_name}</h3>
      <p className="title">{hero.title}</p>
    </div>
  );
}
