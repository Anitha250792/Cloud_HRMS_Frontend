import { useEffect, useState } from "react";
import api from "../../api/api";
import { COLORS } from "../../theme/colors";


function LeaveApproval() {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadLeaves = async () => {
    try {
      const res = await api.get("leave/");
      setLeaves(res.data.filter((l) => l.status === "PENDING"));
    } catch (err) {
      console.error("Failed to load leaves", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLeaves();
  }, []);

  const updateStatus = async (id, action) => {
    try {
      await api.post(`leave/${id}/${action}/`);
      loadLeaves();
    } catch {
      alert("Action failed");
    }
  };

  if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.heading}>📝 Pending Leave Approvals</h2>

        <table style={styles.table}>
          <thead>
            <tr>
              <th>Employee</th>
              <th>Type</th>
              <th>Dates</th>
              <th>Reason</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {leaves.map((l) => (
              <tr key={l.id}>
                <td>{l.employee_name}</td>
                <td>{l.leave_type}</td>
                <td>
                  {l.start_date} → {l.end_date}
                </td>
                <td>{l.reason}</td>
                <td>
                  <button
                    style={{ ...styles.btn, background: COLORS.primary }}
                    onClick={() => updateStatus(l.id, "approve")}
                  >
                    Approve
                  </button>
                  <button
                    style={{ ...styles.btn, background: "#dc2626" }}
                    onClick={() => updateStatus(l.id, "reject")}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}

            {leaves.length === 0 && (
              <tr>
                <td colSpan="5" style={{ textAlign: "center", padding: 20 }}>
                  No pending leaves 🎉
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LeaveApproval;

const styles = {
  page: {
    minHeight: "100vh",
    padding: 40,
    background: "#f3f4f6",
    display: "flex",
    justifyContent: "center",
  },
  card: {
    width: "100%",
    maxWidth: 1100,
    background: "#fff",
    padding: 30,
    borderRadius: 16,
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
  },
  heading: {
    fontSize: 26,
    fontWeight: 700,
    marginBottom: 20,
    textAlign: "center",
  },
  table: { width: "100%", borderCollapse: "collapse" },
  btn: {
    padding: "8px 14px",
    color: "#fff",
    border: `1px solid ${COLORS.border}`,

    borderRadius: 8,
    marginRight: 8,
    cursor: "pointer",
    fontWeight: 600,
  },
};
