import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

function EmployeeDashboard() {
  const navigate = useNavigate();

  /* ================= STATE ================= */
  const [attendance, setAttendance] = useState(null);
  const [leaveCount, setLeaveCount] = useState(0);
  const [leaveBalance, setLeaveBalance] = useState(0);
  const [workingDays, setWorkingDays] = useState(0);
  const [payroll, setPayroll] = useState(null);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");

  const hasLoaded = useRef(false);

  /* ================= LOAD DATA ================= */
  useEffect(() => {
    if (hasLoaded.current) return;
    hasLoaded.current = true;
    loadEmployeeData();
  }, []);

  const loadEmployeeData = async () => {
    try {
      const [
        attendanceRes,
        leaveRes,
        balanceRes,
        payrollRes,
        summaryRes
      ] = await Promise.all([
        api.get("attendance/my-today/"),
        api.get("leave/my/"),
        api.get("leave/balance/"),
        api.get("payroll/my/"),
        api.get("attendance/summary/")
      ]);

      /* ---------- ATTENDANCE ---------- */
      setAttendance(
        attendanceRes?.data && typeof attendanceRes.data === "object"
          ? attendanceRes.data
          : null
      );

      /* ---------- WORKING DAYS ---------- */
      setWorkingDays(summaryRes?.data?.worked_days ?? 0);

      /* ---------- LEAVES ---------- */
      const pending = Array.isArray(leaveRes.data)
        ? leaveRes.data.filter(l => l.status === "PENDING").length
        : 0;
      setLeaveCount(pending);

      setLeaveBalance(balanceRes?.data?.balance?.PAID ?? 0);

      /* ---------- PAYROLL ---------- */
      if (Array.isArray(payrollRes.data) && payrollRes.data.length > 0) {
        setPayroll(payrollRes.data[0]);
      } else {
        setPayroll(null);
      }

    } catch (err) {
      console.error("Employee dashboard error:", err);
      setAttendance(null);
      setLeaveCount(0);
      setLeaveBalance(0);
      setWorkingDays(0);
      setPayroll(null);
    } finally {
      setLoading(false);
    }
  };

  /* ================= ACTIONS ================= */
  const handleCheckIn = async () => {
    if (attendance?.check_in) return;
    try {
      const res = await api.post("attendance/check-in/");
      setMsg(res.data.message || "Checked in");
      loadEmployeeData();
    } catch (err) {
      setMsg(err.response?.data?.error || "Check-in failed");
    }
  };

  const handleCheckOut = async () => {
    if (!attendance?.check_in || attendance?.check_out) return;
    try {
      const res = await api.post("attendance/check-out/");
      setMsg(res.data.message || "Checked out");
      loadEmployeeData();
    } catch (err) {
      setMsg(err.response?.data?.error || "Check-out failed");
    }
  };

  /* ================= UI STATE ================= */
  if (loading) {
    return <div style={loadingBox}>Loading dashboard…</div>;
  }

  const checkedIn = Boolean(attendance?.check_in);
  const checkedOut = Boolean(attendance?.check_out);

  const status =
    attendance?.status ||
    (!attendance
      ? "Not Marked"
      : checkedIn && checkedOut
      ? "Completed"
      : checkedIn
      ? "Checked In"
      : "Not Marked");

  /* ================= UI ================= */
  return (
    <div style={page}>
      {/* TOP BAR */}
      <div style={topBar}>
        <div style={logoBox}>
          <div style={logo}>EMS</div>
          <div>
            <div style={companyName}>EMS Pro</div>
            <div style={companySub}>Employee Portal</div>
          </div>
        </div>

        <input style={search} placeholder="Search attendance, leaves…" disabled />

        <div style={bellWrapper} onClick={() => navigate("/leave/my")}>
          🔔
          {leaveCount > 0 && <span style={badge}>{leaveCount}</span>}
        </div>
      </div>

      <h2 style={title}>👋 Welcome Back</h2>
      <p style={subtitle}>Here’s your overview for today</p>

      {/* STATS */}
      <div style={grid}>
        <Card label="Today's Attendance" value={status} color="#10B981" />
        <Card label="Pending Leaves" value={leaveCount} color="#3B82F6" />
        <Card label="Leave Balance" value={leaveBalance} color="#F59E0B" />
        <Card label="Working Days" value={workingDays} color="#0EA5E9" />
        <Card
          label="Working Hours Today"
          value={attendance?.working_hours ?? 0}
          color="#06B6D4"
        />
      </div>

      {/* ATTENDANCE ACTIONS */}
      <div style={attendanceBox}>
        <h3 style={sectionTitle}>🕒 Attendance</h3>

        {msg && <p style={{ color: "#2563EB" }}>{msg}</p>}

        <button
          onClick={handleCheckIn}
          disabled={checkedIn}
          style={{ ...btn, background: checkedIn ? "#9CA3AF" : "#10B981" }}
        >
          Check In
        </button>

        <button
          onClick={handleCheckOut}
          disabled={!checkedIn || checkedOut}
          style={{ ...btn, background: checkedOut ? "#9CA3AF" : "#EF4444" }}
        >
          Check Out
        </button>
      </div>

      {/* PAYROLL */}
      <div style={salaryBox}>
        <h3 style={sectionTitle}>💰 Latest Payroll</h3>
        {payroll ? (
          <p>
            Month: <b>{payroll.month}/{payroll.year}</b><br />
            Net Salary: <b>₹ {payroll.net_salary}</b>
          </p>
        ) : (
          <p>No payroll generated yet</p>
        )}
      </div>
    </div>
  );
}

/* ================= CARD ================= */
function Card({ label, value, color }) {
  return (
    <div style={{ ...card, borderLeft: `6px solid ${color}` }}>
      <p style={labelStyle}>{label}</p>
      <h3 style={{ ...valueStyle, color }}>{value}</h3>
    </div>
  );
}

/* ================= STYLES ================= */
const page = { minHeight: "100vh", padding: 24, background: "linear-gradient(135deg,#EEF2FF,#F0F9FF)" };
const title = { fontSize: 28, fontWeight: 800 };
const subtitle = { color: "#64748B", marginBottom: 20 };
const grid = { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 18 };
const card = { background: "#fff", padding: 20, borderRadius: 14 };
const labelStyle = { fontSize: 16, color: "#475569" };
const valueStyle = { fontSize: 26, fontWeight: 700 };
const attendanceBox = { marginTop: 30, padding: 20, background: "#fff", borderRadius: 16 };
const sectionTitle = { fontSize: 20, fontWeight: 700 };
const btn = { padding: "10px 20px", color: "#fff", border: "none", borderRadius: 8, marginRight: 10 };
const salaryBox = { marginTop: 30, padding: 20, background: "#fff", borderRadius: 16 };
const loadingBox = { fontSize: 20, textAlign: "center", paddingTop: 50 };
const topBar = { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 };
const logoBox = { display: "flex", alignItems: "center", gap: 12 };
const logo = { width: 42, height: 42, borderRadius: 12, background: "#2563EB", color: "#fff", fontWeight: 900, display: "flex", alignItems: "center", justifyContent: "center" };
const companyName = { fontWeight: 800 };
const companySub = { fontSize: 12, color: "#64748B" };
const search = { flex: 1, margin: "0 20px", padding: "10px 14px", borderRadius: 10, border: "1px solid #E5E7EB", background: "#F9FAFB" };
const bellWrapper = { position: "relative", fontSize: 22, cursor: "pointer" };
const badge = { position: "absolute", top: -6, right: -6, background: "#EF4444", color: "#fff", fontSize: 11, padding: "2px 6px", borderRadius: 999 };

export default EmployeeDashboard;
