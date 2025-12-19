import { useEffect, useState } from "react";
import api from "../../api/api";

function MyLeaves() {
  const [leaves, setLeaves] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const empCode = user?.emp_code;

  useEffect(() => {
    if (!empCode) return;

    api.get(`/api/leave/my/${empCode}/`)
      .then(res => setLeaves(res.data))
      .catch(console.error);
  }, [empCode]);

  return (
    <div>
      <h2>My Leave Requests</h2>

      {leaves.map(l => (
        <div key={l.id}>
          <b>{l.leave_type}</b>
          <p>{l.start_date} → {l.end_date}</p>
          <span>{l.status}</span>
        </div>
      ))}

      {leaves.length === 0 && <p>No leave applied</p>}
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
