import { useEffect, useState } from "react";
import api from "../api/api";

function EmployeeDashboard() {
  const [attendance, setAttendance] = useState(null);
  const [leaveCount, setLeaveCount] = useState(0);
  const [payroll, setPayroll] = useState(null);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    loadEmployeeData();
  }, []);

  const loadEmployeeData = async () => {
    try {
      /* ✅ TODAY ATTENDANCE */
      const attendanceRes = await api.get("attendance/my-today/");
      setAttendance(attendanceRes.data);

      /* ✅ MY LEAVES */
      const leaveRes = await api.get("leave/my/");
      setLeaveCount(leaveRes.data.length);

      /* ✅ MY PAYROLL (LATEST) */
      const payrollRes = await api.get("payroll/my/");
      if (payrollRes.data.length > 0) {
        setPayroll(payrollRes.data[0]);
      }

    } catch (err) {
      console.error("Employee dashboard error:", err);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- CHECK IN ---------------- */
  const handleCheckIn = async () => {
    try {
      const res = await api.post("attendance/check-in/");
      setMsg(res.data.message);
      loadEmployeeData();
    } catch (err) {
      setMsg(err.response?.data?.error || "Check-in failed");
    }
  };

  /* ---------------- CHECK OUT ---------------- */
  const handleCheckOut = async () => {
    try {
      const res = await api.post("attendance/check-out/");
      setMsg(res.data.message);
      loadEmployeeData();
    } catch (err) {
      setMsg(err.response?.data?.error || "Check-out failed");
    }
  };

  if (loading) return <div style={loadingBox}>Loading dashboard...</div>;

  const checkedIn = attendance?.check_in;
  const checkedOut = attendance?.check_out;

  const status =
    attendance?.status ||
    (!attendance
      ? "Not Marked"
      : checkedIn && checkedOut
      ? "Completed"
      : checkedIn
      ? "Checked In"
      : "Not Marked");

  return (
    <div style={page}>
      <h2 style={title}>👋 Welcome Back</h2>
      <p style={subtitle}>Here’s your overview for today</p>

      {/* STATUS GRID */}
      <div style={grid}>
        <Card label="Today's Attendance" value={status} color="#10B981" />
        <Card label="My Leaves" value={leaveCount} color="#3B82F6" />
        <Card
          label="Last Salary"
          value={`₹ ${payroll?.net_salary || 0}`}
          color="#8B5CF6"
        />
        <Card
          label="Working Hours Today"
          value={attendance?.working_hours || 0}
          color="#06B6D4"
        />
      </div>

      {/* CHECK IN / OUT */}
      <div style={attendanceBox}>
        <h3 style={sectionTitle}>🕒 Attendance</h3>

        {msg && <p style={{ color: "#2563EB" }}>{msg}</p>}

        <div style={{ marginTop: 10 }}>
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

/* ---------------- UI CARD ---------------- */
function Card({ label, value, color }) {
  return (
    <div style={{ ...card, borderLeft: `6px solid ${color}` }}>
      <p style={labelStyle}>{label}</p>
      <h3 style={{ ...valueStyle, color }}>{value}</h3>
    </div>
  );
}

/* ---------------- STYLES ---------------- */

const page = {
  minHeight: "100vh",
  padding: 24,
  background: "linear-gradient(135deg,#EEF2FF,#F0F9FF)",
};

const title = {
  fontSize: 28,
  fontWeight: 800,
};

const subtitle = {
  color: "#64748B",
  marginBottom: 20,
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: 18,
};

const card = {
  background: "#fff",
  padding: 20,
  borderRadius: 14,
};

const labelStyle = {
  fontSize: 16,
  color: "#475569",
};

const valueStyle = {
  fontSize: 26,
  fontWeight: 700,
};

const attendanceBox = {
  marginTop: 30,
  padding: 20,
  background: "#fff",
  borderRadius: 16,
};

const sectionTitle = {
  fontSize: 20,
  fontWeight: 700,
};

const btn = {
  padding: "10px 20px",
  color: "#fff",
  border: "none",
  borderRadius: 8,
  marginRight: 10,
  cursor: "pointer",
};

const salaryBox = {
  marginTop: 30,
  padding: 20,
  background: "#fff",
  borderRadius: 16,
};

const loadingBox = {
  fontSize: 20,
  textAlign: "center",
  paddingTop: 50,
};

export default EmployeeDashboard;
