import { useEffect, useState } from "react";
import api from "../../api/api";
import { Page } from "../../theme/pageStyles";

function HRWorkingHours() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    api.get("/api/attendance/records/")
      .then(res => setRecords(res.data));
  }, []);

  return (
    <div style={Page.wrapper}>
      <h2 style={Page.title}>⏱ Working Hours</h2>

      <div style={Page.card}>
        {records.map(r => (
          <p key={r.id}>
            {r.employee} — {r.hours_worked} hrs — {r.status}
          </p>
        ))}
      </div>
    </div>
  );
}

export default HRWorkingHours;
