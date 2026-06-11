import { useState } from "react";

export default function NoteForm({ initial = {}, onSubmit, onCancel, loading }) {
  const [title, setTitle] = useState(initial.title || "");
  const [content, setContent] = useState(initial.content || "");
  const [tags, setTags] = useState((initial.tags || []).join(", "));
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!title.trim()) { setError("Title is required."); return; }
    setError("");
    const tagArr = tags.split(",").map(t => t.trim()).filter(Boolean);
    onSubmit({ title: title.trim(), content, tags: tagArr });
  };

  const inputStyle = {
    width: "100%", background: "var(--surface2)", border: "1px solid var(--border)",
    borderRadius: 8, padding: "11px 14px", color: "var(--text)",
    fontSize: 15, outline: "none", fontFamily: "inherit",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <div>
        <label style={{ display: "block", marginBottom: 6, color: "var(--text2)", fontSize: 13 }}>
          Title <span style={{ color: "var(--danger)" }}>*</span>
        </label>
        <input
          value={title}
          onChange={e => { setTitle(e.target.value); setError(""); }}
          placeholder="Note title"
          style={{ ...inputStyle, borderColor: error ? "var(--danger)" : "var(--border)" }}
        />
        {error && <p style={{ color: "var(--danger)", fontSize: 13, marginTop: 5 }}>{error}</p>}
      </div>

      <div>
        <label style={{ display: "block", marginBottom: 6, color: "var(--text2)", fontSize: 13 }}>Content</label>
        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder="Write your note here..."
          rows={10}
          style={{ ...inputStyle, resize: "vertical", lineHeight: 1.7 }}
        />
      </div>

      <div>
        <label style={{ display: "block", marginBottom: 6, color: "var(--text2)", fontSize: 13 }}>
          Tags <span style={{ color: "var(--text2)", fontWeight: 400 }}>(comma separated)</span>
        </label>
        <input
          value={tags}
          onChange={e => setTags(e.target.value)}
          placeholder="e.g. work, personal, ideas"
          style={inputStyle}
        />
      </div>

      <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
        {onCancel && (
          <button onClick={onCancel} style={{
            padding: "10px 24px", borderRadius: 8, border: "1px solid var(--border)",
            background: "none", color: "var(--text)", fontSize: 14,
          }}>Cancel</button>
        )}
        <button onClick={handleSubmit} disabled={loading} style={{
          padding: "10px 28px", borderRadius: 8, border: "none",
          background: "var(--accent)", color: "#fff", fontSize: 14,
          fontWeight: 600, opacity: loading ? 0.7 : 1,
        }}>
          {loading ? "Saving…" : "Save Note"}
        </button>
      </div>
    </div>
  );
}