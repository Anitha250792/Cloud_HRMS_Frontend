import { useEffect, useState } from "react";
import api from "../../api/api";
import { COLORS } from "../../theme/colors";


function MyLeaves() {
  const [leaves, setLeaves] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const empCode = user?.emp_code;

  useEffect(() => {
  const loadLeaves = async () => {
    try {
      const res = await api.get("leave/my/");
      setLeaves(res.data || []);
    } catch (err) {
      console.error("Leave API failed", err);
      setLeaves([]); // prevent crash
    }
  };

  loadLeaves();
}, []);


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
  page: { padding: 40, background: "linear-gradient(135deg,#2563EB,#1D4ED8)"
, minHeight: "100vh" },
  card: {
    maxWidth: 800,
    margin: "auto",
    background: "#fff",
    padding: 30,
    border: `1px solid ${COLORS.border}`,

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
