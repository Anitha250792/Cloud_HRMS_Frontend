import { useEffect, useState } from "react";
import api from "../../api/api";
import { COLORS } from "../../theme/colors";


function LeaveList() {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
  api.get("leave/my/")
    .then(res => setLeaves(res.data))
    .catch(err => console.error("MyLeaves error:", err));
}, []);


  const loadLeaves = async () => {
  try {
    const res = await api.get("leave/my/");
    setLeaves(res.data);
  } catch (err) {
    console.error("Leave list error:", err);
  }
};


  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.heading}>📋 Leave Management</h2>

        <div style={styles.tableWrap}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>ID</th>
                <th style={styles.th}>Employee</th>
                <th style={styles.th}>Type</th>
                <th style={styles.th}>Dates</th>
                <th style={styles.th}>Reason</th>
                <th style={styles.th}>Status</th>
              </tr>
            </thead>

            <tbody>
              {leaves.map((l, index) => (
                <tr
                  key={l.id}
                  style={{
                    ...styles.tr,
                    background: "linear-gradient(135deg,#2563EB,#1D4ED8)",
                  }}
                >
                  <td style={styles.td}>{l.id}</td>
                  <td style={{ ...styles.td, fontWeight: 600 }}>
                    {l.employee_name}
                  </td>
                  <td style={styles.td}>{l.leave_type}</td>
                  <td style={styles.td}>
                    {l.start_date} → {l.end_date}
                  </td>
                  <td style={styles.td}>{l.reason}</td>
                  <td style={styles.td}>
                    <span
                      style={{
                        ...styles.badge,
                        ...statusStyle[l.status],
                      }}
                    >
                      {statusIcon[l.status]} {l.status}
                    </span>
                  </td>
                </tr>
              ))}

              {leaves.length === 0 && (
                <tr>
                  <td colSpan="6" style={styles.empty}>
                    No leave records found 💤
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default LeaveList;

/* ===================== STYLES ===================== */

const styles = {
  page: {
    minHeight: "100vh",
    padding: 40,
    background: "linear-gradient(135deg,#2563EB,#1D4ED8)",
    display: "flex",
    justifyContent: "center",
  },

  card: {
    width: "100%",
    maxWidth: 1100,
    background: "#ffffff",
    padding: 30,
    border: `1px solid ${COLORS.border}`,
    boxShadow: "0 20px 40px rgba(0,0,0,0.12)",
  },

  heading: {
    textAlign: "center",
    fontSize: 28,
    fontWeight: 800,
    marginBottom: 25,
    color: "#1e293b",
  },

  tableWrap: {
    overflowX: "auto",
    borderRadius: 14,
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
  },

  th: {
    position: "sticky",
    top: 0,
    background: "linear-gradient(135deg,#2563eb,#1d4ed8)",
    color: "#fff",
    padding: "14px",
    fontSize: 14,
    textAlign: "left",
    zIndex: 1,
  },

  tr: {
    transition: "all 0.2s ease",
  },

  td: {
    padding: "14px",
    fontSize: 14,
    color: "#334155",
  },

  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    padding: "6px 14px",
    borderRadius: 999,
    fontSize: 13,
    fontWeight: 700,
  },

  empty: {
    textAlign: "center",
    padding: 30,
    fontSize: 16,
    color: "#64748b",
    fontWeight: 600,
  },
};

/* ===== Status Colors & Icons ===== */

const statusStyle = {
  APPROVED: {
    background: "#dcfce7",
    color: "#166534",
  },
  REJECTED: {
    background: "#fee2e2",
    color: "#7f1d1d",
  },
  PENDING: {
    background: "#fef9c3",
    color: "#854d0e",
  },
};

const statusIcon = {
  APPROVED: "✔",
  REJECTED: "✖",
  PENDING: "⏳",
};
