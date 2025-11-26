import "../styles/style.css";

export default function Filters({ onSearch }) {
  return (
    <div className="filter-bar">
      <input
        type="text"
        placeholder="Search hero..."
        className="search-input"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
}
