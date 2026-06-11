import { useState, useEffect } from "react";

export default function SearchBar({ onSearch }) {
  const [value, setValue] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => onSearch(value), 300);
    return () => clearTimeout(timer);
  }, [value]);

  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 10,
      background: "var(--surface)", border: "1px solid var(--border)",
      borderRadius: "var(--radius)", padding: "10px 16px",
      flex: 1, maxWidth: 480,
    }}>
      <span style={{ color: "var(--text2)", fontSize: 18 }}>🔍</span>
      <input
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="Search notes by title or content..."
        style={{
          background: "none", border: "none", outline: "none",
          color: "var(--text)", fontSize: 15, width: "100%",
        }}
      />
      {value && (
        <button
          onClick={() => { setValue(""); onSearch(""); }}
          style={{ background: "none", border: "none", color: "var(--text2)", fontSize: 18 }}
        >✕</button>
      )}
    </div>
  );
}