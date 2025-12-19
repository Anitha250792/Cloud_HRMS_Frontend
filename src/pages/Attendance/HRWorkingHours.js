import { useEffect, useState } from "react";
import api from "../../api/api";

function HRWorkingHours() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    loadRecords();
  }, []);

 const loadRecords = async () => {
  try {
    const res = await api.get("/api/attendance/");
    setRecords(res.data);
  } catch (err) {
    console.error("Failed to load attendance records", err);
  }
};


  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.heading}>⏱ Employee Working Hours</h2>

        <div style={styles.tableWrap}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Employee</th>
                <th style={styles.th}>Check In</th>
                <th style={styles.th}>Check Out</th>
                <th style={styles.th}>Hours</th>
                <th style={styles.th}>Status</th>
              </tr>
            </thead>

            <tbody>
              {records.map((r, i) => (
                <tr
                  key={r.id}
                  style={{
                    background: i % 2 === 0 ? "#ffffff" : "#f8fafc",
                  }}
                >
                  <td style={styles.td}>{r.employee}</td>
                  <td style={styles.td}>
                    {r.check_in ? formatTime(r.check_in) : "—"}
                  </td>
                  <td style={styles.td}>
                    {r.check_out ? formatTime(r.check_out) : "—"}
                  </td>
                  <td style={styles.td}>
                    {r.hours_worked ?? "—"}
                  </td>
                  <td style={styles.td}>
                    <span style={{ ...styles.badge, ...statusStyle[r.status] }}>
                      {r.status}
                    </span>
                  </td>
                </tr>
              ))}

              {records.length === 0 && (
                <tr>
                  <td colSpan="5" style={styles.empty}>
                    No attendance records found
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

export default HRWorkingHours;

/* ================= HELPERS ================= */

const formatTime = (val) =>
  new Date(val).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

/* ================= STYLES ================= */

const styles = {
  page: {
    minHeight: "100vh",
    padding: 40,
    background: "linear-gradient(135deg,#eef2ff,#ecfdf5)",
    display: "flex",
    justifyContent: "center",
  },

  card: {
    width: "100%",
    maxWidth: 1100,
    background: "#fff",
    padding: 30,
    borderRadius: 18,
    boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
  },

  heading: {
    textAlign: "center",
    fontSize: 26,
    fontWeight: 800,
    marginBottom: 25,
    color: "#1e293b",
  },

  tableWrap: {
    overflowX: "auto",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
  },

  th: {
    background: "linear-gradient(135deg,#2563eb,#1d4ed8)",
    color: "#fff",
    padding: 14,
    textAlign: "left",
  },

  td: {
    padding: 14,
    fontSize: 14,
    color: "#334155",
  },

  badge: {
    padding: "6px 14px",
    borderRadius: 999,
    fontWeight: 700,
    fontSize: 13,
  },

  empty: {
    padding: 30,
    textAlign: "center",
    color: "#64748b",
    fontWeight: 600,
  },
};

const statusStyle = {
  PRESENT: {
    background: "#dcfce7",
    color: "#166534",
  },
  LATE: {
    background: "#fef3c7",
    color: "#92400e",
  },
  ABSENT: {
    background: "#fee2e2",
    color: "#7f1d1d",
  },
};
