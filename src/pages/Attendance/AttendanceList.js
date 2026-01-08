import { useEffect, useState } from "react";
import api from "../../api/api";
import { Page } from "../../theme/pageStyles";

function AttendanceList() {
  const [record, setRecord] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadAttendance = async () => {
      try {
        const res = await api.get("attendance/my-today/");
        setRecord(res.data);
        setError("");
      } catch (err) {
        console.error("Attendance fetch failed", err);
        setError("Unable to load attendance");
      }
    };

    loadAttendance();
  }, []);

  return (
    <div style={Page.wrapper}>
      <h2 style={Page.title}>📋 Attendance</h2>

      <div style={Page.card}>
        {error && <p style={{ color: "red" }}>{error}</p>}

        {!error && !record && <p>No attendance marked today</p>}

        {record && (
          <>
            <p>Status: <b>{record.status}</b></p>
            <p>Check-in: {record.check_in || "—"}</p>
            <p>Check-out: {record.check_out || "—"}</p>
            <p>Working Hours: {record.working_hours || "0"}</p>
          </>
        )}
      </div>
    </div>
  );
}

export default AttendanceList;
