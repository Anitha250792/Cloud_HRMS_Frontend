import { useEffect, useState } from "react";
import api from "../../api/api";
import { COLORS } from "../../theme/colors";

function MyLeaves() {
  const [leaves, setLeaves] = useState([]);
  const [error, setError] = useState("");

  // ✅ SAFE JSON PARSE (CRITICAL)
  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    const loadLeaves = async () => {
      try {
        const res = await api.get("leave/my/");
        setLeaves(res.data || []);
        setError("");
      } catch (err) {
        console.error("Leave API failed", err);
        setLeaves([]);                // prevents crash
        setError("Unable to load leave data");
      }
    };

    loadLeaves();
  }, []);

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.heading}>My Leave Requests</h2>

        {/* ERROR */}
        {error && (
          <p style={{ color: "red", textAlign: "center" }}>
            {error}
          </p>
        )}

        {/* NO DATA */}
        {!error && leaves.length === 0 && (
          <p style={{ textAlign: "center" }}>No leave applied</p>
        )}

        {/* LIST */}
        {leaves.map((l) => (
          <div key={l.id} style={styles.leaveCard}>
            <div>
              <b>{l.leave_type}</b>
              <p style={{ margin: "4px 0", color: "#555" }}>
                {l.start_date} → {l.end_date}
              </p>
            </div>

            <span
              style={{
                ...styles.badge,
                background:
                  l.status === "APPROVED"
                    ? "#DCFCE7"
                    : l.status === "REJECTED"
                    ? "#FEE2E2"
                    : "#FEF3C7",
                color:
                  l.status === "APPROVED"
                    ? "#166534"
                    : l.status === "REJECTED"
                    ? "#991B1B"
                    : "#92400E",
              }}
            >
              {l.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyLeaves;

/* ---------------- STYLES ---------------- */
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
    boxShadow: "0 10px 25px rgba(0,0,0,.1)",
  },
  heading: {
    textAlign: "center",
    marginBottom: 20,
  },
  leaveCard: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 14,
    borderRadius: 10,
    background: "#f9fafb",
    marginBottom: 12,
  },
  badge: {
    padding: "6px 14px",
    borderRadius: 20,
    fontWeight: 600,
    fontSize: 14,
  },
};
