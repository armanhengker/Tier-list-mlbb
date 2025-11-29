import React from "react";

export default function Filters({ roles = [], lanes = [], onChange }) {
  return (
    <div className="filters-row">
      <select onChange={(e) => onChange({ role: e.target.value })}>
        <option value="">All roles</option>
        {roles.map((r) => (
          <option key={r} value={r}>
            {r}
          </option>
        ))}
      </select>

      <select onChange={(e) => onChange({ lane: e.target.value })}>
        <option value="">All lanes</option>
        {lanes.map((l) => (
          <option key={l} value={l}>
            {l}
          </option>
        ))}
      </select>
    </div>
  );
}
