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
      const res = await api.get("leave/");
      const pending = Array.isArray(res.data)
        ? res.data.filter(l => l.status === "PENDING")
        : [];
      setLeaves(pending);
    } catch (err) {
      console.error(err);
      setError("Unable to load leave requests");
    } finally {
      setLoading(false);
    }
  };

  const approveLeave = async (id) => {
    try {
      await api.post(`leave/${id}/approve/`);
      loadLeaves();
    } catch (err) {
      alert(err.response?.data?.error || "Approval failed");
    }
  };

  const rejectLeave = async (id) => {
    try {
      await api.post(`leave/${id}/reject/`);
      loadLeaves();
    } catch (err) {
      alert(err.response?.data?.error || "Rejection failed");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: 24 }}>
      <h2>🛂 Leave Approvals</h2>

      {leaves.length === 0 && <p>No pending requests</p>}

      <table width="100%">
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
          {leaves.map(l => (
            <tr key={l.id}>
              <td>{l.employee_name || "—"}</td>
              <td>{l.leave_type}</td>
              <td>{l.start_date} → {l.end_date}</td>
              <td>{l.reason}</td>
              <td>
                <button onClick={() => approveLeave(l.id)}>Approve</button>
                <button onClick={() => rejectLeave(l.id)}>Reject</button>
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
