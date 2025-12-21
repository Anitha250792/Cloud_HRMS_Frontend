import { useEffect, useState } from "react";
import api from "../../api/api";
import { Page } from "../../theme/pageStyles";
import { Form } from "../../theme/formStyles";


function HRWorkingHours() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    loadRecords();
  }, []);

 const loadRecords = async () => {
  try {
    const res = await api.get("/api/attendance/records/");
    setRecords(res.data);
  } catch (err) {
    console.error(err);
  }
};


  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.heading}>⏱ Employee Working Hours</h2>

        <div style={styles.tableWrap}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Employee</th>
                <th style={styles.th}>Check In</th>
                <th style={styles.th}>Check Out</th>
                <th style={styles.th}>Hours</th>
                <th style={styles.th}>Status</th>
              </tr>
            </thead>

            <tbody>
              {records.map((r, i) => (
                <tr
                  key={r.id}
                  style={{
                    background: i % 2 === 0 ? "#ffffff" : "#f8fafc",
                  }}
                >
                  <td style={styles.td}>{r.employee}</td>
                  <td style={styles.td}>
                    {r.check_in ? formatTime(r.check_in) : "—"}
                  </td>
                  <td style={styles.td}>
                    {r.check_out ? formatTime(r.check_out) : "—"}
                  </td>
                  <td style={styles.td}>
                    {r.hours_worked ?? "—"}
                  </td>
                  <td style={styles.td}>
                    <span style={{ ...styles.badge, ...statusStyle[r.status] }}>
                      {r.status}
                    </span>
                  </td>
                </tr>
              ))}

              {records.length === 0 && (
                <tr>
                  <td colSpan="5" style={styles.empty}>
                    No attendance records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default HRWorkingHours;

/* ================= HELPERS ================= */

const formatTime = (val) =>
  new Date(val).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
