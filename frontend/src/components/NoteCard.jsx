import { useNavigate } from "react-router-dom";

export default function NoteCard({ note, onDelete, onPin }) {
  const navigate = useNavigate();

  const preview = note.content
    ? note.content.replace(/\n/g, " ").slice(0, 120) + (note.content.length > 120 ? "…" : "")
    : "No content";

  const fmt = (d) => new Date(d).toLocaleDateString("en-IN", {
    day: "2-digit", month: "short", year: "numeric",
  });

  return (
    <div
      onClick={() => navigate(`/note/${note._id}`)}
      style={{
        background: "var(--surface)", border: `1px solid ${note.pinned ? "var(--pin)" : "var(--border)"}`,
        borderRadius: "var(--radius)", padding: "20px 22px", cursor: "pointer",
        transition: "border-color 0.2s, transform 0.15s",
        position: "relative",
      }}
      onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
      onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
    >
      {note.pinned && (
        <span style={{
          position: "absolute", top: 14, right: 14,
          fontSize: 14, color: "var(--pin)",
        }}>📌</span>
      )}

      <h3 style={{
        fontSize: 16, fontWeight: 600, marginBottom: 8,
        color: "var(--text)", paddingRight: note.pinned ? 28 : 0,
        whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
      }}>{note.title}</h3>

      <p style={{ color: "var(--text2)", fontSize: 14, marginBottom: 14, lineHeight: 1.5 }}>
        {preview}
      </p>

      {note.tags?.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12 }}>
          {note.tags.map(tag => (
            <span key={tag} style={{
              background: "var(--surface2)", color: "var(--accent2)",
              borderRadius: 20, padding: "2px 10px", fontSize: 12,
            }}>#{tag}</span>
          ))}
        </div>
      )}

      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        borderTop: "1px solid var(--border)", paddingTop: 12, marginTop: 4,
      }}>
        <span style={{ color: "var(--text2)", fontSize: 12 }}>
          Updated {fmt(note.updatedAt)}
        </span>
        <div style={{ display: "flex", gap: 8 }} onClick={e => e.stopPropagation()}>
          <button
            onClick={() => onPin(note._id, !note.pinned)}
            title={note.pinned ? "Unpin" : "Pin"}
            style={{
              background: "none", border: "none",
              color: note.pinned ? "var(--pin)" : "var(--text2)",
              fontSize: 16, padding: 4,
            }}
          >📌</button>
          <button
            onClick={() => navigate(`/note/${note._id}?edit=true`)}
            style={{
              background: "none", border: "none",
              color: "var(--accent2)", fontSize: 16, padding: 4,
            }}
          >✏️</button>
          <button
            onClick={() => onDelete(note._id)}
            style={{
              background: "none", border: "none",
              color: "var(--danger)", fontSize: 16, padding: 4,
            }}
          >🗑️</button>
        </div>
      </div>
    </div>
  );
}