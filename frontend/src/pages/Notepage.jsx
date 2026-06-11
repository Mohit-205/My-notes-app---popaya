import { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { getNoteById, createNote, updateNote } from "../api/notesApi";
import NoteForm from "../components/NoteForm";

export default function NotePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isNew = id === "new";
  const startInEdit = isNew || searchParams.get("edit") === "true";

  const [note, setNote] = useState(null);
  const [editing, setEditing] = useState(startInEdit);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isNew) return;
    getNoteById(id)
      .then(res => setNote(res.data.data))
      .catch(() => setError("Note not found."))
      .finally(() => setLoading(false));
  }, [id]);


  const handleSave = async (data) => {
    setSaving(true); setError("");
    try {
      if (isNew) {
        const res = await createNote(data);
        navigate(`/note/${res.data.data._id}`, { replace: true });
      } else {
        const res = await updateNote(id, data);
        setNote(res.data.data);
        setEditing(false);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save note.");
    } finally {
      setSaving(false);
    }
  };



  const fmt = (d) => new Date(d).toLocaleString("en-IN", {
    day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });

  if (loading) return (
    <div style={{ textAlign: "center", padding: 80, color: "var(--text2)" }}>Loading…</div>
  );

  return (
    <div style={{ maxWidth: 760, margin: "0 auto", padding: "32px 20px" }}>
      {/*Back*/}
      <button onClick={() => navigate("/")} style={{
        display: "flex", alignItems: "center", gap: 6, background: "none",
        border: "none", color: "var(--text2)", fontSize: 14, marginBottom: 28, padding: 0,
      }}>← Back to Notes</button>

      {error && (
        <div style={{
          background: "#3f1515", border: "1px solid var(--danger)", borderRadius: 8,
          padding: "12px 16px", color: "#fca5a5", marginBottom: 24,
        }}>{error}</div>
      )}

      {/*Edit or create mode*/}
      {(editing || isNew) ? (
        <div style={{
          background: "var(--surface)", border: "1px solid var(--border)",
          borderRadius: "var(--radius)", padding: 32,
        }}>
          <h2 style={{ marginBottom: 28, fontSize: 22 }}>
            {isNew ? "Create New Note" : "Edit Note"}
          </h2>
          <NoteForm
            initial={note || {}}
            onSubmit={handleSave}
            onCancel={isNew ? () => navigate("/") : () => setEditing(false)}
            loading={saving}
          />
        </div>
      ) : (
        /*View mode*/
        note && (
          <div style={{
            background: "var(--surface)", border: `1px solid ${note.pinned ? "var(--pin)" : "var(--border)"}`,
            borderRadius: "var(--radius)", padding: 36,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
              <h1 style={{ fontSize: 28, fontWeight: 700, flex: 1 }}>{note.title}</h1>
              <button onClick={() => setEditing(true)} style={{
                padding: "8px 20px", borderRadius: 8, border: "1px solid var(--accent)",
                background: "none", color: "var(--accent)", fontWeight: 600, fontSize: 14, marginLeft: 16,
              }}>Edit</button>
            </div>

            {note.tags?.length > 0 && (
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
                {note.tags.map(tag => (
                  <span key={tag} style={{
                    background: "var(--surface2)", color: "var(--accent2)",
                    borderRadius: 20, padding: "3px 12px", fontSize: 13,
                  }}>#{tag}</span>
                ))}
              </div>
            )}

            <div style={{
              color: "var(--text2)", fontSize: 13, marginBottom: 28,
              display: "flex", gap: 20, flexWrap: "wrap",
            }}>
              <span>Created: {fmt(note.createdAt)}</span>
              <span>Updated: {fmt(note.updatedAt)}</span>
            </div>

            <div style={{
              color: "var(--text)", fontSize: 16, lineHeight: 1.8,
              whiteSpace: "pre-wrap", borderTop: "1px solid var(--border)", paddingTop: 24,
            }}>
              {note.content || <span style={{ color: "var(--text2)" }}>No content</span>}
            </div>
          </div>
        )
      )}
    </div>
  );
}