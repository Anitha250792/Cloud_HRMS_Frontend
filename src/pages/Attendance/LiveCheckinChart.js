import { useEffect, useState } from "react";
import api from "../../api/api";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";

function LiveCheckinChart() {
  const [data, setData] = useState([]);

  const loadData = async () => {
    try {
      const res = await api.get("attendance/realtime/");
      const raw = res.data;

      const transformed = raw.map((item, index) => ({
        time: new Date(item.check_in).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        count: index + 1,
      }));

      setData(transformed);
    } catch (err) {
      console.error("Live check-in error:", err);
    }
  };

  useEffect(() => {
    loadData(); // first load

    const interval = setInterval(() => {
      loadData();
    }, 10000); // refresh every 10 sec

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Real-Time Check-in Activity</h2>

      {data.length === 0 ? (
        <p>No check-ins yet today.</p>
      ) : (
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#007bff"
              strokeWidth={3}
              dot={true}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default LiveCheckinChart;
