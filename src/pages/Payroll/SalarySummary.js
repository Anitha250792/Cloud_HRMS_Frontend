import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend
} from "recharts";
import axios from "axios";

export default function SalaryChart() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    axios
      .get("https://cloud-hrms-1.onrender.com/api/payroll/chart/")
      .then((res) => setChartData(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-3">📈 Monthly Salary Chart</h2>

      {chartData.length === 0 ? (
        <p>No payroll data available yet.</p>
      ) : (
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />

            <Line
              type="monotone"
              dataKey="gross_salary"
              stroke="#007bff"
              strokeWidth={3}
              name="Gross Salary"
            />

            <Line
              type="monotone"
              dataKey="net_salary"
              stroke="#28a745"
              strokeWidth={3}
              name="Net Salary"
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
