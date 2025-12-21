import { useEffect, useState } from "react";
import api from "../../api/api";
import { Page } from "../../theme/pageStyles";

function AttendanceSummary() {
  const [today, setToday] = useState({});
  const [month, setMonth] = useState({});

  useEffect(() => {
    api.get("attendance/summary_today/").then(r => setToday(r.data));
    api.get("attendance/summary_month/").then(r => setMonth(r.data));
  }, []);

  return (
    <div style={Page.wrapper}>
      <h2 style={Page.title}>📊 Attendance Summary</h2>

      <div style={Page.card}>
        <p>Present Today: {today.present_today}</p>
        <p>Absent Today: {today.absent_today}</p>
        <p>Total Hours (Month): {month.total_hours_worked}</p>
      </div>
    </div>
  );
}

export default AttendanceSummary;
