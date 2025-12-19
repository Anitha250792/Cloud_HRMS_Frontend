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

  useEffect(() => {
    loadAdminData();
  }, []);

  const loadAdminData = async () => {
    try {
      /* 👥 Employees */
      const empRes = await api.get("/api/employees/");
      const totalEmployees = empRes.data.length;

      /* 🌴 Leaves */
      const leaveRes = await api.get("/api/leave/");
      const pendingLeaves = leaveRes.data.filter(
        (l) => l.status === "PENDING"
      ).length;

      /* 🕒 Attendance */
      const attendanceRes = await api.get("/api/attendance/summary/today/");
      const presentToday =
        attendanceRes.data.present_employees || 0;

      /* 💰 Payroll */
      const payrollRes = await api.get("/api/payroll/summary/");
      const payrollTotal =
        payrollRes.data?.total_net_salary || 0;

      setStats({
        totalEmployees,
        presentToday,
        pendingLeaves,
        payrollTotal,
      });
    } catch (err) {
      console.error("Admin dashboard error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div style={loadingBox}>Loading HR Dashboard...</div>;
  }

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
