import { useEffect, useState } from "react";
import api from "../api/api";

function AdminDashboard() {
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [pendingLeaves, setPendingLeaves] = useState(0);
  const [todayPresent, setTodayPresent] = useState(0);
  const [payrollTotal, setPayrollTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  api.get("/api/dashboard/stats/").then(res => {
    setTotalEmployees(res.data.total_employees);
  });
}, []);

  const loadAdminData = async () => {
    try {
      /* ✅ TOTAL ACTIVE EMPLOYEES */
      const empRes = await api.get("employees/");
      setTotalEmployees(empRes.data.length);

      /* ✅ PENDING LEAVES */
      const leaveRes = await api.get("leave/");
      const pending = leaveRes.data.filter(
        (l) => l.status === "PENDING"
      );
      setPendingLeaves(pending.length);

      /* ✅ PRESENT TODAY (CORRECT ENDPOINT) */
      const attendanceRes = await api.get("attendance/summary/today/");
      setTodayPresent(attendanceRes.data.present_employees || 0);

      /* ✅ PAYROLL SUMMARY */
      const payrollRes = await api.get("payroll/summary/");
      setPayrollTotal(payrollRes.data?.total_net_salary || 0);

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
        <Card label="Total Employees" value={totalEmployees} />
        <Card label="Present Today" value={todayPresent} />
        <Card label="Pending Leaves" value={pendingLeaves} />
        <Card label="Payroll This Month" value={`₹ ${payrollTotal}`} />
      </div>
    </div>
  );
}

/* ---------------- UI CARD ---------------- */
function Card({ label, value }) {
  return (
    <div style={card}>
      <p style={labelStyle}>{label}</p>
      <h3 style={valueStyle}>{value}</h3>
    </div>
  );
}

/* ---------------- STYLES ---------------- */

const page = {
  minHeight: "100vh",
  padding: 24,
  background: "#F9FAFB",
};

const title = {
  fontSize: 26,
  fontWeight: 800,
  color: "#1E3A8A",
  marginBottom: 20,
};

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

const labelStyle = {
  fontSize: 13,
  color: "#6B7280",
};

const valueStyle = {
  fontSize: 28,
  fontWeight: 800,
  color: "#2563EB",
};

const loadingBox = {
  fontSize: 18,
  textAlign: "center",
  paddingTop: 50,
};

export default AdminDashboard;
