import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getNotes, deleteNote, updateNote } from "../api/notesApi";
import NoteCard from "../components/NoteCard";
import SearchBar from "../components/SearchBar";
import ConfirmDialog from "../components/ConfirmDialog";

export default function HomePage() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);
  const navigate = useNavigate();

  const fetchNotes = useCallback(async (q = "") => {
    setLoading(true); setError("");
    try {
      const res = await getNotes(q);
      setNotes(res.data.data);
    } catch {
      setError("Failed to load notes. Make sure the backend is running.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchNotes(search); }, [search]);

  const handleDelete = async () => {
    try {
      await deleteNote(deleteTarget);
      setNotes(prev => prev.filter(n => n._id !== deleteTarget));
    } catch { setError("Failed to delete note."); }
    finally { setDeleteTarget(null); }
  };

  const handlePin = async (id, pinned) => {
    try {
      const res = await updateNote(id, { pinned });
      setNotes(prev => prev.map(n => n._id === id ? res.data.data : n)
        .sort((a, b) => b.pinned - a.pinned || new Date(b.updatedAt) - new Date(a.updatedAt)));
    } catch { setError("Failed to update note."); }
  };

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 20px" }}>
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        flexWrap: "wrap", gap: 16, marginBottom: 36,
      }}>
        <div>
          <h1 style={{ fontSize: 30, fontWeight: 700, color: "var(--text)" }}>
            <span style={{ color: "var(--accent)" }}>✦</span> My Notes
          </h1>
          <p style={{ color: "var(--text2)", fontSize: 14, marginTop: 4 }}>
            {notes.length} note{notes.length !== 1 ? "s" : ""}
          </p>
        </div>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
          <SearchBar onSearch={setSearch} />
          <button
            onClick={() => navigate("/note/new")}
            style={{
              padding: "10px 22px", borderRadius: 8, border: "none",
              background: "var(--accent)", color: "#fff", fontWeight: 600, fontSize: 14,
              whiteSpace: "nowrap",
            }}
          >+ New Note</button>
        </div>
      </div>


      {/*Error*/}

      {error && (
        <div style={{
          background: "#3f1515", border: "1px solid var(--danger)", borderRadius: 8,
          padding: "12px 16px", color: "#fca5a5", marginBottom: 24,
        }}>{error}</div>
      )}



      {/*Loading*/}

      {loading && (
        <div style={{ textAlign: "center", padding: 60, color: "var(--text2)" }}>
          Loading notes…
        </div>
      )}




      {/*Empty state*/}
      {!loading && notes.length === 0 && (
        <div style={{
          textAlign: "center", padding: "80px 20px",
          border: "2px dashed var(--border)", borderRadius: "var(--radius)",
          color: "var(--text2)",
        }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>📝</div>
          <h2 style={{ fontSize: 22, color: "var(--text)", marginBottom: 8 }}>
            {search ? "No notes match your search" : "No notes yet"}
          </h2>
          <p style={{ marginBottom: 24 }}>
            {search ? "Try a different keyword" : "Create your first note to get started"}
          </p>
          {!search && (
            <button onClick={() => navigate("/note/new")} style={{
              padding: "11px 28px", borderRadius: 8, border: "none",
              background: "var(--accent)", color: "#fff", fontWeight: 600,
            }}>Create Note</button>
          )}
        </div>
      )}




      {/*Notes grid*/}
      {!loading && notes.length > 0 && (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: 20,
        }}>
          {notes.map(note => (
            <NoteCard
              key={note._id}
              note={note}
              onDelete={setDeleteTarget}
              onPin={handlePin}
            />
          ))}
        </div>
      )}




      {/*Confirm dialog*/}
      {deleteTarget && (
        <ConfirmDialog
          message="This note will be permanently deleted. Are you sure?"
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}


      
    </div>
  );
}