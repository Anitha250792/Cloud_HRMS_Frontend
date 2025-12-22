import { useEffect, useState } from "react";
import api from "../../api/api";
import { Page } from "../../theme/pageStyles";

function LiveAttendance() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    api.get("attendance/live/")
      .then(res => setRecords(res.data));
  }, []);

  return (
    <div style={Page.wrapper}>
      <h2 style={Page.title}>📡 Live Attendance</h2>

      <div style={Page.card}>
        {records.map(r => (
          <p key={r.id}>{r.employee_name} — {r.status}</p>
        ))}
      </div>
    </div>
  );
}

export default LiveAttendance;
