import { useEffect, useState } from "react";
import api from "../../api/api";

function LeaveApproval() {
  const [leave, setLeave] = useState([]);

  useEffect(() => {
    loadPendingLeave();
  }, []);

  const loadPendingLeave = async () => {
    const res = await api.get("/api/leaves/");
    setLeave(res.data.filter((l) => l.status === "PENDING"));
  };

  const updateStatus = async (id, status) => {
    await api.post(`/api/leaves/${id}/${status}/`);
    loadPendingLeave();
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.heading}>📝 Pending Leave Requests</h2>

        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>Employee</th>
              <th style={styles.th}>Type</th>
              <th style={styles.th}>Dates</th>
              <th style={styles.th}>Reason</th>
              <th style={styles.th}>Actions</th>
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
                  <button
                    style={{ ...styles.btn, ...styles.approve }}
                    onClick={() => updateStatus(l.id, "approve")}
                  >
                    ✔ Approve
                  </button>

                  <button
                    style={{ ...styles.btn, ...styles.reject }}
                    onClick={() => updateStatus(l.id, "reject")}
                  >
                    ✖ Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ---- Styles ---- */
const styles = {
  page: {
    minHeight: "100vh",
    background: "#f4f7fc",
    padding: "40px",
    display: "flex",
    justifyContent: "center",
  },
  card: {
    width: "100%",
    maxWidth: "1000px",
    background: "#fff",
    padding: "30px",
    borderRadius: "15px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
  },
  heading: {
    textAlign: "center",
    fontSize: 26,
    fontWeight: 700,
    marginBottom: 20,
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    background: "#1d4ed8",
    color: "white",
    padding: "12px",
    textAlign: "left",
  },
  td: {
    padding: "12px",
    borderBottom: "1px solid #e5e7eb",
  },
  tr: { transition: "0.2s" },
  btn: {
    padding: "8px 14px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontWeight: 600,
    marginRight: 8,
  },
  approve: {
    background: "#10b981",
    color: "white",
  },
  reject: {
    background: "#ef4444",
    color: "white",
  },
};

export default LeaveApproval;
