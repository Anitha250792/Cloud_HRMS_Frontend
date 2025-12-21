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

/* 🎨 STYLING (Teal HRMS Theme) */

const pageWrapper = {
  padding: "90px 24px 24px",
  minHeight: "100vh",
  background: "linear-gradient(135deg, #F3FAFB 0%, #D1F0F2 50%, #F9FEFF 100%)",
};

const pageHeader = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: "20px",
};

const pageTitle = {
  margin: 0,
  fontSize: "24px",
  fontWeight: 700,
  color: "#003B3B",
};

const pageSubtitle = {
  margin: 0,
  fontSize: "13px",
  color: "#4b5563",
};

const primaryButton = {
  background: "#008080",
  color: "#ffffff",
  padding: "10px 16px",
  border: "none",
  borderRadius: "8px",
  textDecoration: "none",
  fontWeight: 600,
  cursor: "pointer",
};

const card = {
  background: "#ffffff",
  padding: "20px",
  borderRadius: "14px",
  boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
};

const cardTitle = {
  fontSize: "18px",
  fontWeight: "600",
  color: "#003B3B",
  marginBottom: "15px",
};

const emptyText = {
  padding: "20px",
  textAlign: "center",
  color: "#6b7280",
  fontSize: "14px",
};

const table = {
  width: "100%",
  borderCollapse: "collapse",
};

const theadRow = {
  background: "#E0FFFF",
};

const th = {
  padding: "10px 12px",
  fontSize: "13px",
  textAlign: "left",
  color: "#003B3B",
  borderBottom: "2px solid #CFFAFE",
};

const tbodyRow = {
  borderBottom: "1px solid #E2E8F0",
};

const td = {
  padding: "10px 12px",
  fontSize: "14px",
  color: "#334155",
};

export default AttendanceLive;
