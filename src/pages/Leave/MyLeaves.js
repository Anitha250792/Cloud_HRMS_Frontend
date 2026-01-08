import { useEffect, useState } from "react";
import api from "../../api/api";
import { COLORS } from "../../theme/colors";

function MyLeaves() {
  const [leaves, setLeaves] = useState([]);
  const [error, setError] = useState("");

  // ✅ SAFE PARSE
  const userRaw = localStorage.getItem("user");
  const user = userRaw ? JSON.parse(userRaw) : null;

  useEffect(() => {
    const loadLeaves = async () => {
      try {
        const res = await api.get("leave/my/");
        setLeaves(Array.isArray(res.data) ? res.data : []);
        setError("");
      } catch (err) {
        console.error("Leave API failed", err);
        setLeaves([]);
        setError("Unable to load leave data");
      }
    };

    loadLeaves();
  }, []);

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.heading}>My Leave Requests</h2>

        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

        {!error && leaves.length === 0 && (
          <p style={{ textAlign: "center" }}>No leave applied</p>
        )}

        {leaves.map((l) => (
          <div key={l.id} style={styles.leaveCard}>
            <div>
              <b>{l.leave_type}</b>
              <p>{l.start_date} → {l.end_date}</p>
            </div>

            <span style={styles.badge}>{l.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyLeaves;

const styles = {
  page: {
    padding: 40,
    minHeight: "100vh",
    background: "linear-gradient(135deg,#2563EB,#1D4ED8)",
  },
  card: {
    maxWidth: 800,
    margin: "auto",
    background: "#fff",
    padding: 30,
    border: `1px solid ${COLORS.border}`,
    borderRadius: 16,
  },
  heading: { textAlign: "center", marginBottom: 20 },
  leaveCard: {
    display: "flex",
    justifyContent: "space-between",
    padding: 14,
    borderRadius: 10,
    background: "#f9fafb",
    marginBottom: 12,
  },
  badge: {
    padding: "6px 14px",
    borderRadius: 20,
    fontWeight: 600,
  },
};
