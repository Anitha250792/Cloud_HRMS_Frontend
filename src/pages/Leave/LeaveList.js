import { useEffect, useState } from "react";
import api from "../../api/api";

function LeaveList() {
  const [leave, setLeave] = useState([]);

  useEffect(() => {
    loadLeave();
  }, []);

  const loadLeave = async () => {
    try {
      const res = await api.get("/leaves/");
      setLeave(res.data);
    } catch (err) {
      console.error("Failed to load leaves:", err);
    }
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Leave List</h2>

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
            {leave.map((l) => (
              <tr key={l.id} style={styles.tr}>
                <td style={styles.td}>{l.id}</td>
                <td style={styles.td}>{l.employee_name}</td>
                <td style={styles.td}>{l.leave_type}</td>
                <td style={styles.td}>
                  {l.start_date} → {l.end_date}
                </td>
                <td style={styles.td}>{l.reason}</td>
                <td style={styles.td}>
                  <span
                    style={{
                      ...styles.status,
                      backgroundColor:
                        l.status === "APPROVED"
                          ? "#d4edda"
                          : l.status === "REJECTED"
                          ? "#f8d7da"
                          : "#fff3cd",
                      color:
                        l.status === "APPROVED"
                          ? "#155724"
                          : l.status === "REJECTED"
                          ? "#721c24"
                          : "#856404",
                    }}
                  >
                    {l.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* 🎨 Styles */
const styles = {
  pageContainer: {
    padding: "40px",
    display: "flex",
    justifyContent: "center",
    background: "#f4f7fc",
    minHeight: "100vh",
  },

  card: {
    width: "100%",
    maxWidth: "900px",
    background: "#fff",
    padding: "30px",
    borderRadius: "15px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
  },

  heading: {
    fontSize: "28px",
    fontWeight: "700",
    marginBottom: "20px",
    color: "#333",
    textAlign: "center",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "10px",
  },

  th: {
    padding: "12px",
    background: "#0d6efd",
    color: "#fff",
    fontWeight: "600",
    border: "1px solid #ddd",
    textAlign: "left",
  },

  td: {
    padding: "12px",
    border: "1px solid #ddd",
    background: "#fff",
  },

  tr: {
    transition: "0.2s ease",
  },

  status: {
    padding: "6px 12px",
    borderRadius: "8px",
    fontWeight: "600",
    display: "inline-block",
  },
};

export default LeaveList;
