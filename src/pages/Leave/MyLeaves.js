import { useEffect, useState } from "react";
import api from "../../api/api";

function MyLeaves() {
  const [leaves, setLeaves] = useState([]);
  const empCode = localStorage.getItem("emp_code");

  useEffect(() => {
    api.get(`leave/my/${empCode}/`).then(res => setLeaves(res.data));
  }, [empCode]);

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.heading}>🧾 My Leave Requests</h2>

        {leaves.map(l => (
          <div key={l.id} style={styles.leaveCard}>
            <div>
              <b>{l.leave_type}</b>
              <p>{l.start_date} → {l.end_date}</p>
            </div>
            <span style={{
              ...styles.badge,
              background:
                l.status === "APPROVED" ? "#dcfce7" :
                l.status === "REJECTED" ? "#fee2e2" :
                "#fef9c3",
              color:
                l.status === "APPROVED" ? "#166534" :
                l.status === "REJECTED" ? "#7f1d1d" :
                "#854d0e"
            }}>
              {l.status}
            </span>
          </div>
        ))}

        {leaves.length === 0 && <p>No leave applied</p>}
      </div>
    </div>
  );
}

export default MyLeaves;

const styles = {
  page: { padding: 40, background: "#f8fafc", minHeight: "100vh" },
  card: {
    maxWidth: 800,
    margin: "auto",
    background: "#fff",
    padding: 30,
    borderRadius: 16,
    boxShadow: "0 10px 25px rgba(0,0,0,.1)",
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
