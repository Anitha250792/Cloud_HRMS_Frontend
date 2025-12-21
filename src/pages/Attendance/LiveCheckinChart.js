import { useEffect, useState } from "react";
import api from "../../api/api";
import { Page } from "../../theme/pageStyles";
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid
} from "recharts";

function LiveCheckinChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    api.get("attendance/realtime/")
      .then(res =>
        setData(res.data.map((r, i) => ({
          time: new Date(r.check_in).toLocaleTimeString(),
          count: i + 1
        })))
      );
  }, []);

  return (
    <div style={Page.card}>
      <h3>📈 Live Check-ins</h3>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Line dataKey="count" stroke="#2563EB" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default LiveCheckinChart;
