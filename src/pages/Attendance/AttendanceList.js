import { useEffect, useState } from "react";
import api from "../../api/api";
import { Page } from "../../theme/pageStyles";

function AttendanceList() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    api.get("attendance/records/")
      .then(res => setRecords(res.data))
      .catch(console.error);
  }, []);

  return (
    <div style={Page.wrapper}>
      <h2 style={Page.title}>📋 Attendance Records</h2>

      <div style={Page.card}>
        {records.map(r => (
          <p key={r.id}>
            {r.employee} — {r.status} — {r.hours_worked ?? "—"}
          </p>
        ))}
      </div>
    </div>
  );
}

export default AttendanceList;
