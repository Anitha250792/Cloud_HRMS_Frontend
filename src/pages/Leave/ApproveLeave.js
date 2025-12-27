import { useEffect, useState } from "react";
import api from "../../api/api";

function ApproveLeave() {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLeaves();
  }, []);

  const loadLeaves = async () => {
    try {
      const res = await api.get("leave/");
      setLeaves(res.data.filter(l => l.status === "PENDING"));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const approveLeave = async (id) => {
    await api.post(`leave/${id}/approve/`);
    loadLeaves();
  };

  const rejectLeave = async (id) => {
    await api.post(`leave/${id}/reject/`);
    loadLeaves();
  };

  if (loading) return <p>Loading leaves...</p>;

  return (
    <div style={page}>
      <h2 style={title}>🛂 Leave Approvals</h2>

      <table style={table}>
        <thead>
          <tr>
            <th>Emp Code</th>
            <th>Name</th>
            <th>Type</th>
            <th>Dates</th>
            <th>Reason</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {leaves.map((l) => (
            <tr key={l.id}>
              <td>{l.emp_code}</td>
              <td>{l.employee_name}</td>
              <td>{l.leave_type}</td>
              <td>{l.start_date} → {l.end_date}</td>
              <td>{l.reason}</td>
              <td>
                <button style={approveBtn} onClick={() => approveLeave(l.id)}>
                  Approve
                </button>
                <button style={rejectBtn} onClick={() => rejectLeave(l.id)}>
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ApproveLeave;


const page = { padding: 24 };
const title = { fontSize: 26, fontWeight: 800 };

const table = {
  width: "100%",
  borderCollapse: "collapse",
};

const status = (s) => ({
  padding: "4px 10px",
  borderRadius: 8,
  fontWeight: 700,
  color:
    s === "APPROVED"
      ? "#065F46"
      : s === "REJECTED"
      ? "#7F1D1D"
      : "#92400E",
  background:
    s === "APPROVED"
      ? "#D1FAE5"
      : s === "REJECTED"
      ? "#FEE2E2"
      : "#FEF3C7",
});

const approveBtn = {
  background: "#16A34A",
  color: "#fff",
  border: "none",
  padding: "6px 10px",
  borderRadius: 6,
  marginRight: 6,
  cursor: "pointer",
};

const rejectBtn = {
  background: "#DC2626",
  color: "#fff",
  border: "none",
  padding: "6px 10px",
  borderRadius: 6,
  cursor: "pointer",
};
