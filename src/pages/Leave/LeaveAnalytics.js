// frontend/src/pages/Leave/LeaveAnalytics.js
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/api";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Tooltip,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

const COLORS = ["#0EA5E9", "#22C55E", "#F97316", "#A855F7", "#EC4899"];

function LeaveAnalytics() {
  const [typeData, setTypeData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
  try {
    const [typeRes, monthRes] = await Promise.all([
      api.get("leave/analytics/type/"),
      api.get("leave/analytics/monthly/"),
    ]);

    const typeResult = Array.isArray(typeRes.data)
      ? typeRes.data
      : Object.keys(typeRes.data).map(key => ({
          leave_type: key,
          count: typeRes.data[key],
        }));

    const monthResult = Array.isArray(monthRes.data)
      ? monthRes.data
      : [];

    setTypeData(typeResult);
    setMonthlyData(monthResult);

  } catch (err) {
    console.error("Leave analytics error:", err);
  }
};


  return (
    <div style={pageWrapper}>
      <div style={pageHeader}>
        <div>
          <h2 style={pageTitle}>📊 Leave Analytics</h2>
          <p style={pageSubtitle}>
            Visualize leave types and leave trend over months.
          </p>
        </div>

        <Link to="/" style={primaryButton}>
          ⬅ Back to Dashboard
        </Link>
      </div>

      <div style={grid}>
        {/* Pie chart */}
        <div style={card}>
          <h3 style={cardTitle}>Leave by Type</h3>
          {typeData.length === 0 ? (
            <p style={emptyText}>No leave data available.</p>
          ) : (
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Tooltip />
                <Pie
                  data={typeData}
                  dataKey="count"
                  nameKey="leave_type"
                  outerRadius={100}
                  label
                >
                  {typeData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Bar chart */}
        <div style={card}>
          <h3 style={cardTitle}>Monthly Leave Trend</h3>
          {monthlyData.length === 0 ? (
            <p style={emptyText}>No monthly leave data.</p>
          ) : (
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month_label" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="total_leave" name="Total Leaves" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
}

/* Styles */

const pageWrapper = {
  padding: "90px 24px 24px",
  minHeight: "100vh",
  background:
    "linear-gradient(135deg, #F3FAFB 0%, #D1F0F2 50%, #F9FEFF 100%)",
};

const pageHeader = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: 20,
};

const pageTitle = {
  margin: 0,
  fontSize: 24,
  fontWeight: 700,
  color: "#003B3B",
};

const pageSubtitle = {
  margin: 0,
  fontSize: 13,
  color: "#4b5563",
};

const primaryButton = {
  background: "#008080",
  color: "#ffffff",
  padding: "10px 16px",
  borderRadius: "8px",
  textDecoration: "none",
  fontWeight: 600,
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
  gap: 16,
};

const card = {
  background: "#ffffff",
  padding: "18px 20px",
  borderRadius: "14px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.06)",
};

const cardTitle = {
  fontSize: 18,
  fontWeight: 600,
  color: "#003B3B",
  marginBottom: 10,
};

const emptyText = {
  padding: 16,
  textAlign: "center",
  color: "#6b7280",
};

export default LeaveAnalytics;
