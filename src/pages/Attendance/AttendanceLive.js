import { useEffect, useState } from "react";
import api from "../../api/api";
import { Page } from "../../theme/pageStyles";

function AttendanceLive() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const load = () =>
      api.get("attendance/realtime/")
        .then(res => setRecords(res.data));

    load();
    const t = setInterval(load, 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={Page.wrapper}>
      <h2 style={Page.title}>📡 Live Attendance</h2>

      <div style={Page.card}>
        {records.map((r, i) => (
          <p key={i}>{r.employee} — {r.check_in}</p>
        ))}
      </div>
    </div>
  );
}

export default AttendanceLive;
