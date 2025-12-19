import { useEffect, useState } from "react";
import api from "../api/api";

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalEmployees: 0,
    presentToday: 0,
    pendingLeaves: 0,
    payrollTotal: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const res = await api.get("/api/dashboard/stats/");
      console.log("Dashboard stats:", res.data);

      setStats({
        totalEmployees: res.data.total_employees || 0,
        pendingLeaves: res.data.pending_leaves || 0,
        payrollTotal: res.data.payroll_this_month || 0,
        presentToday: res.data.present_today || 0, // optional
      });
    } catch (err) {
      console.error(err);
      setError("Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div style={loadingBox}>Loading HR Dashboard…</div>;
  if (error) return <div style={loadingBox}>{error}</div>;

  return (
    <div style={page}>
      <h2 style={title}>📊 HR / Admin Dashboard</h2>

      <div style={grid}>
        <Card label="Total Employees" value={stats.totalEmployees} />
        <Card label="Present Today" value={stats.presentToday} />
        <Card label="Pending Leaves" value={stats.pendingLeaves} />
        <Card
          label="Payroll This Month"
          value={`₹ ${stats.payrollTotal}`}
        />
      </div>
    </div>
  );
}

/* ---------------- CARD ---------------- */
function Card({ label, value }) {
  return (
    <div style={card}>
      <p style={labelStyle}>{label}</p>
      <h3 style={valueStyle}>{value}</h3>
    </div>
  );
}

/* ---------------- STYLES ---------------- */
const page = { minHeight: "100vh", padding: 24, background: "#F9FAFB" };
const title = { fontSize: 26, fontWeight: 800, marginBottom: 20 };
const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: 16,
};
const card = {
  background: "#fff",
  padding: 22,
  borderRadius: 16,
  boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
};
const labelStyle = { fontSize: 13, color: "#6B7280" };
const valueStyle = { fontSize: 28, fontWeight: 800, color: "#2563EB" };
const loadingBox = { fontSize: 18, textAlign: "center", paddingTop: 50 };

export default AdminDashboard;
