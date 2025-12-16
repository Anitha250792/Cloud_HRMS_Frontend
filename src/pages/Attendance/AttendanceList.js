import { useEffect, useState } from "react";
import api from "../../api/api";

function AttendanceList() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadRecords = async () => {
    try {
      const res = await api.get("/attendance/records/"); // <- backend API we will add
      setRecords(res.data);
    } catch (err) {
      console.log("Error loading attendance:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadRecords();
  }, []);

  return (
    <div style={page}>
      <div style={card}>
        <h2 style={title}>Employee Attendance Overview</h2>

        {loading ? (
          <p style={{ opacity: 0.8 }}>Loading...</p>
        ) : (
          <table style={table}>
            <thead>
              <tr>
                <th style={th}>Employee</th>
                <th style={th}>Check-In</th>
                <th style={th}>Check-Out</th>
                <th style={th}>Hours</th>
                <th style={th}>Status</th>
              </tr>
            </thead>

            <tbody>
              {records.map((rec) => (
                <tr key={rec.id} style={row}>
                  <td style={td}>{rec.employee}</td>
                  <td style={td}>{rec.check_in || "—"}</td>
                  <td style={td}>{rec.check_out || "—"}</td>
                  <td style={td}>
                    {rec.hours_worked ? `${rec.hours_worked} hrs` : "—"}
                  </td>
                  <td style={td}>
                    <span
                      style={{
                        padding: "6px 10px",
                        borderRadius: 8,
                        color: "white",
                        background:
                          rec.status === "PRESENT"
                            ? "#10b981"
                            : rec.status === "LATE"
                            ? "#f59e0b"
                            : "#ef4444",
                      }}
                    >
                      {rec.status}
                    </span>
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

/* ---------------------- STYLES ---------------------- */

const page = {
  minHeight: "100vh",
  background: "linear-gradient(135deg,#0f0c29,#302b63,#24243e)",
  padding: 30,
  color: "white",
};

const card = {
  background: "rgba(255,255,255,0.07)",
  padding: 30,
  borderRadius: 20,
  border: "1px solid rgba(255,255,255,0.15)",
  backdropFilter: "blur(20px)",
  boxShadow: "0 8px 25px rgba(0,0,0,0.6)",
};

const title = {
  fontSize: 24,
  fontWeight: 700,
  marginBottom: 20,
};

const table = {
  width: "100%",
  borderCollapse: "collapse",
};

const th = {
  textAlign: "left",
  padding: "12px",
  borderBottom: "1px solid rgba(255,255,255,0.2)",
};

const td = {
  padding: "12px",
  borderBottom: "1px solid rgba(255,255,255,0.1)",
};

const row = {
  background: "rgba(255,255,255,0.03)",
};

export default AttendanceList;
