export default function ConfirmDialog({ message, onConfirm, onCancel }) {
  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)",
      display: "flex", alignItems: "center", justifyContent: "center",
      zIndex: 1000,
    }}>
      <div style={{
        background: "var(--surface)", border: "1px solid var(--border)",
        borderRadius: "var(--radius)", padding: 32, maxWidth: 400, width: "90%",
        boxShadow: "var(--shadow)",
      }}>
        <h3 style={{ marginBottom: 12, fontSize: 18 }}>Confirm Delete</h3>
        <p style={{ color: "var(--text2)", marginBottom: 28 }}>{message}</p>
        <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
          <button onClick={onCancel} style={{
            padding: "9px 20px", borderRadius: 8, border: "1px solid var(--border)",
            background: "none", color: "var(--text)", fontSize: 14,
          }}>Cancel</button>
          <button onClick={onConfirm} style={{
            padding: "9px 20px", borderRadius: 8, border: "none",
            background: "var(--danger)", color: "#fff", fontSize: 14, fontWeight: 600,
          }}>Delete</button>
        </div>
      </div>
    </div>
  );
}