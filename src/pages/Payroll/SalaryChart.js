import { useEffect, useState } from "react";
import api from "../../api/api";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

function SalaryChart() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [data, setData] = useState([]);

  useEffect(() => {
    loadData();
  }, [year]);

  const loadData = async () => {
    try {
      const res = await api.get(`/payroll/stats/?year=${year}`);
      const formatted = res.data.map((row) => ({
        month: "M" + row.month,
        total_gross_salary: Number(row.total_gross_salary),
        total_net_salary: Number(row.total_net_salary),
      }));
      setData(formatted);
    } catch (err) {
      console.error("Chart load error:", err);
    }
  };

  return (
    <div style={{ padding: "24px" }}>
      <h2 style={{ color: "#0052cc", marginBottom: "10px" }}>
        Payroll Overview – {year}
      </h2>

      <div style={{ marginBottom: "12px" }}>
        <label>Year: </label>
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          style={{ padding: "4px 8px", width: "100px" }}
        />
      </div>

      {data.length === 0 ? (
        <p>No payroll data for this year.</p>
      ) : (
        <div style={{ height: 320, background: "#fff", padding: 16, borderRadius: 12, boxShadow: "0 4px 10px rgba(0,0,0,0.05)" }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="total_gross_salary"
                stroke="#60a5fa"
                strokeWidth={3}
                name="Gross Salary"
              />
              <Line
                type="monotone"
                dataKey="total_net_salary"
                stroke="#0f766e"
                strokeWidth={3}
                name="Net Salary"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

export default SalaryChart;
