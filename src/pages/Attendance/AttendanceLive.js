import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/api";
import { Page } from "../../theme/pageStyles";
import { Form } from "../../theme/formStyles";


function AttendanceLive() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    loadLiveData();

    // Auto-refresh every 5 seconds
    const interval = setInterval(() => loadLiveData(), 5000);

    return () => clearInterval(interval);
  }, []);

  const loadLiveData = async () => {
  try {
    const res = await api.get("/api/attendance/realtime/");
    setRecords(res.data);
  } catch (err) {
    console.error(err);
  }
};


  return (
    <div style={pageWrapper}>
      {/* Page Header */}
      <div style={pageHeader}>
        <div>
          <h2 style={pageTitle}>📡 Live Check-in Stream</h2>
          <p style={pageSubtitle}>
            View most recent employee check-in and check-out activity.
          </p>
        </div>

        <Link to="/" style={primaryButton}>
          ⬅ Back to Dashboard
        </Link>
      </div>

      {/* Live Table */}
      <div style={card}>
        <h3 style={cardTitle}>Latest Activity (Auto Refreshing)</h3>

        {records.length === 0 ? (
          <p style={emptyText}>No check-ins yet.</p>
        ) : (
          <table style={table}>
            <thead>
              <tr style={theadRow}>
                <th style={th}>Employee</th>
                <th style={th}>Check-in</th>
                <th style={th}>Check-out</th>
              </tr>
            </thead>

            <tbody>
              {records.map((r, i) => (
                <tr key={i} style={tbodyRow}>
                  <td style={td}>{r.employee}</td>
                  <td style={td}>
                    {r.check_in
                      ? new Date(r.check_in).toLocaleString()
                      : "-"}
                  </td>
                  <td style={{ ...td, color: r.check_out ? "#059669" : "#DC2626" }}>
                    {r.check_out
                      ? new Date(r.check_out).toLocaleString()
                      : "Not Checked-out"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}



export default AttendanceLive;
