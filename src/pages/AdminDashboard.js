import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

/* ================= DASHBOARD ================= */
function AdminDashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalEmployees: 0,
    presentToday: 0,
    onLeave: 0,
    pendingLeaves: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
  try {
    const res = await api.get("dashboard/stats/");
    setStats({
      totalEmployees: res.data.total_employees ?? 0,
      presentToday: res.data.present_today ?? 0,
      pendingLeaves: res.data.pending_leaves ?? 0,
      onLeave: 0,
    });
  } catch (err) {
    console.error(err);
    setError("Failed to load dashboard");
  } finally {
    setLoading(false);
  }
};


  if (loading) return <CenterText>Loading dashboard…</CenterText>;
  if (error) return <CenterText>{error}</CenterText>;

  return (
    <div style={page}>
      {/* ================= TOP BAR ================= */}
      <div style={topBar}>
        {/* LOGO */}
        <div style={logoBox}>
          <div style={logo}>EMS</div>
          <div>
            <div style={companyName}>EMS Pro</div>
            <div style={companySub}>Employee Management</div>
          </div>
        </div>

        {/* SEARCH */}
        <input
          style={search}
          placeholder="Search employees, departments, reports..."
        />

        {/* ACTIONS */}
        <div style={actions}>
          {/* NOTIFICATION */}
          <div
            style={bellWrapper}
            onClick={() => navigate("/leave/approve")}
            title="Pending Leave Requests"
          >
            🔔
            {stats.pendingLeaves > 0 && (
              <span style={badge}>{stats.pendingLeaves}</span>
            )}
          </div>

          {/* PROFILE */}
          <div style={profile}>
            <div style={avatar}>A</div>
            <div>
              <div style={profileName}>Admin User</div>
              <div style={profileRole}>HR Manager</div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= HEADER ================= */}
      <h1 style={title}>Dashboard</h1>
      <p style={subtitle}>Welcome back! Here's what's happening today.</p>

      {/* ================= STATS ================= */}
      <div style={statsGrid}>
        <StatCard label="Total Employees" value={stats.totalEmployees} color="#2563EB" />
        <StatCard label="Present Today" value={stats.presentToday} color="#16A34A" />
        <StatCard label="On Leave" value={stats.onLeave} color="#F97316" />
        <StatCard label="Pending Approvals" value={stats.pendingLeaves} color="#DC2626" />
      </div>

      {/* ================= MAIN GRID ================= */}
      <div style={mainGrid}>
        <Card title="Attendance Overview">
          📈 Attendance chart (next step)
        </Card>

        <Card title="Department Distribution">
          📊 Department chart (next step)
        </Card>

        <Card title="Recent Activity">
          <Activity text="New employee onboarded" />
          <Activity text="Attendance marked today" />
          <Activity text="Leave request submitted" />
        </Card>

        <Card title="Pending Leave Requests">
          <LeaveItem name="Employee A" />
          <LeaveItem name="Employee B" />
          <LeaveItem name="Employee C" />
          <p style={viewAll} onClick={() => navigate("/leave/approve")}>
            View All Requests
          </p>
        </Card>
      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

const StatCard = ({ label, value, color }) => (
  <div style={statCard}>
    <p style={statLabel}>{label}</p>
    <h2 style={{ ...statValue, color }}>{value}</h2>
  </div>
);

const Card = ({ title, children }) => (
  <div style={card}>
    <h3 style={cardTitle}>{title}</h3>
    <div style={cardBody}>{children}</div>
  </div>
);

const Activity = ({ text }) => (
  <div style={activity}>{text}</div>
);

const LeaveItem = ({ name }) => (
  <div style={leaveItem}>
    <span>{name}</span>
    <span style={pending}>Pending</span>
  </div>
);

const CenterText = ({ children }) => (
  <div style={center}>{children}</div>
);

/* ================= STYLES ================= */

const page = { minHeight: "100vh", background: "#F8FAFC", padding: 24 };

const topBar = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: 24,
};

const logoBox = { display: "flex", alignItems: "center", gap: 12 };

const logo = {
  width: 42,
  height: 42,
  borderRadius: 12,
  background: "#2563EB",
  color: "#fff",
  fontWeight: 900,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const companyName = { fontWeight: 800 };
const companySub = { fontSize: 12, color: "#64748B" };

const search = {
  flex: 1,
  margin: "0 20px",
  padding: "10px 14px",
  borderRadius: 10,
  border: "1px solid #E5E7EB",
};

const actions = { display: "flex", alignItems: "center", gap: 20 };

const bellWrapper = {
  position: "relative",
  fontSize: 20,
  cursor: "pointer",
};

const badge = {
  position: "absolute",
  top: -6,
  right: -6,
  background: "#EF4444",
  color: "#fff",
  fontSize: 11,
  padding: "2px 6px",
  borderRadius: 999,
};

const profile = { display: "flex", alignItems: "center", gap: 10 };
const avatar = {
  width: 36,
  height: 36,
  borderRadius: "50%",
  background: "#2563EB",
  color: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: 700,
};
const profileName = { fontSize: 14, fontWeight: 600 };
const profileRole = { fontSize: 12, color: "#64748B" };

const title = { fontSize: 28, fontWeight: 800 };
const subtitle = { color: "#6B7280", marginBottom: 20 };

const statsGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px,1fr))",
  gap: 16,
  marginBottom: 24,
};

const statCard = {
  background: "#fff",
  padding: 20,
  borderRadius: 16,
  boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
};

const statLabel = { fontSize: 13, color: "#6B7280" };
const statValue = { fontSize: 28, fontWeight: 800 };

const mainGrid = {
  display: "grid",
  gridTemplateColumns: "2fr 1fr",
  gap: 20,
};

const card = {
  background: "#fff",
  borderRadius: 16,
  padding: 20,
  boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
};

const cardTitle = { fontSize: 18, fontWeight: 700, marginBottom: 10 };
const cardBody = { color: "#64748B" };

const activity = { padding: "8px 0", borderBottom: "1px solid #E5E7EB" };

const leaveItem = {
  display: "flex",
  justifyContent: "space-between",
  padding: "8px 0",
};

const pending = {
  background: "#FEF3C7",
  color: "#92400E",
  padding: "2px 8px",
  borderRadius: 999,
  fontSize: 12,
};

const viewAll = {
  marginTop: 10,
  color: "#2563EB",
  cursor: "pointer",
  fontSize: 13,
};

const center = { textAlign: "center", paddingTop: 80, fontSize: 18 };

export default AdminDashboard;
