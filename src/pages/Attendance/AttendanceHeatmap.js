import { useEffect, useState } from "react";
import api from "../../api/api";
import { Page } from "../../theme/pageStyles";

function AttendanceHeatmap() {
  const [heatmap, setHeatmap] = useState([]);

  useEffect(() => {
    api.get("attendance/heatmap/")
      .then(res => setHeatmap(res.data))
      .catch(console.error);
  }, []);

  return (
    <div style={Page.wrapper}>
      <h2 style={Page.title}>📅 Attendance Heatmap</h2>

      <div style={Page.card}>
        {heatmap.length === 0
          ? <p>No data</p>
          : heatmap.map((d, i) => (
              <p key={i}>{d.date} — {d.status}</p>
            ))
        }
      </div>
    </div>
  );
}

export default AttendanceHeatmap;
