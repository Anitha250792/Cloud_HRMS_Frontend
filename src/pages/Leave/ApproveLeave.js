import { useEffect, useState } from "react";
import api from "../../api/api";

function ApproveLeave() {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadLeaves();
  }, []);

  const loadLeaves = async () => {
    try {
      const res = await api.get("leave/pending/");
      setLeaves(Array.isArray(res.data) ? res.data : []);
      setError("");
    } catch (err) {
      console.error("Load leaves failed", err);
      setError("Unable to load leave requests");
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
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: 24 }}>
      <h2 style={{ fontSize: 26, fontWeight: 800 }}>🛂 Leave Approvals</h2>

      {leaves.length === 0 && <p>No pending leave requests</p>}

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
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
                <button
                  style={approveBtn}
                  onClick={() => approveLeave(l.id)}
                >
                  Approve
                </button>
                <button
                  style={rejectBtn}
                  onClick={() => rejectLeave(l.id)}
                >
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
