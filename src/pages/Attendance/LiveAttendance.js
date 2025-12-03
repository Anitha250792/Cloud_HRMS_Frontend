import { useEffect, useState } from "react";
import api from "../../api/api";

function LiveAttendance() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    loadAttendance();
  }, []);

  const loadAttendance = async () => {
    try {
      const res = await api.get("/attendance/live/");
      setRecords(res.data);
    } catch (err) {
      console.log("Live attendance error:", err);
    }
  };

  return (
    <div style={{ padding: "80px 20px" }}>
      <h2>📡 Live Attendance</h2>

      <table style={{ width: "100%", background: "white" }}>
        <thead>
          <tr>
            <th>Employee</th>
            <th>Status</th>
            <th>Last Update</th>
          </tr>
        </thead>

        <tbody>
          {records.map((r) => (
            <tr key={r.id}>
              <td>{r.employee_name}</td>
              <td>{r.status}</td>
              <td>{r.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LiveAttendance;
