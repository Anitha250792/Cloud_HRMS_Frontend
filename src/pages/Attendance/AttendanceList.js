import { useEffect, useState } from "react";
import api from "../../api/api";
import { Page } from "../../theme/pageStyles";
import { Form } from "../../theme/formStyles";


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


export default AttendanceList;
