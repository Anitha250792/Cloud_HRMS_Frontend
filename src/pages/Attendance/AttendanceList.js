import { useEffect, useState } from "react";
import api from "../../api/api";
import { Page } from "../../theme/pageStyles";

function AttendanceList() {
  const [record, setRecord] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    api.get("attendance/my-today/")
      .then(res => {
        if (!mounted) return;
        setRecord(res.data || null);
        setError("");
      })
      .catch(err => {
        if (!mounted) return;
        console.error("Attendance fetch failed", err);
        setError("Attendance service unavailable");
        setRecord(null);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => { mounted = false; };
  }, []);

  return (
    <div style={Page.wrapper}>
      <h2 style={Page.title}>📋 Attendance</h2>

      <div style={Page.card}>
        {loading && <p>Loading attendance…</p>}

        {!loading && error && (
          <p style={{ color: "red" }}>{error}</p>
        )}

        {!loading && !error && !record && (
          <p>No attendance marked today</p>
        )}

        {!loading && record && (
          <>
            <p>Status: <b>{record.status || "—"}</b></p>
            <p>Check-in: {record.check_in || "—"}</p>
            <p>Check-out: {record.check_out || "—"}</p>
            <p>Working Hours: {record.working_hours ?? 0}</p>
          </>
        )}
      </div>
    </div>
  );
}

export default AttendanceList;
