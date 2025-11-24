import "./src/style.css";

export default function Filters({ onSearchChange }) {
  return (
    <div className="filters">
      <input
        type="text"
        placeholder="Search hero..."
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
}
