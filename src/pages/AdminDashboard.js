import { useEffect, useState } from "react";
import api from "../api/api";

function AdminDashboard() {
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [pendingLeaves, setPendingLeaves] = useState(0);
  const [payrollTotal, setPayrollTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAdminData();
  }, []);

  const loadAdminData = async () => {
    try {
      const res = await api.get("/api/dashboard/stats/");
      console.log("Admin stats:", res.data);

      setTotalEmployees(res.data.total_employees || 0);
      setPendingLeaves(res.data.pending_leaves || 0);
      setPayrollTotal(res.data.payroll_this_month || 0);
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
