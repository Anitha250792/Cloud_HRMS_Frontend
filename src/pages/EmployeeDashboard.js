import { useEffect, useRef, useState } from "react";
import api from "../api/api";

function EmployeeDashboard() {
  const [attendance, setAttendance] = useState(null);
  const [leaveCount, setLeaveCount] = useState(0);
  const [payroll, setPayroll] = useState(null);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");
  const hasLoaded = useRef(false);

  useEffect(() => {
    if (hasLoaded.current) return;
    hasLoaded.current = true;
    loadEmployeeData();
  }, []);

  const loadEmployeeData = async () => {
    try {
      setAttendance((await api.get("attendance/my-today/")).data);
      setLeaveCount((await api.get("leave/my/")).data.length);
      const payrollRes = await api.get("payroll/my/");
      setPayroll(payrollRes.data[0] || null);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckIn = async () => {
    const res = await api.post("attendance/check_in/");
    setMsg(res.data.message);
    loadEmployeeData();
  };

  const handleCheckOut = async () => {
    const res = await api.post("attendance/check_out/");
    setMsg(res.data.message);
    loadEmployeeData();
  };

  if (loading) return <Center>Loading dashboard…</Center>;

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
        <div style={bell}>🔔</div>
      </div>

      <h1>👋 Welcome Back</h1>

      <div style={grid}>
        <Card label="Attendance" value={attendance?.status || "Not Marked"} />
        <Card label="My Leaves" value={leaveCount} />
        <Card label="Salary" value={`₹ ${payroll?.net_salary || 0}`} />
      </div>

      <div style={box}>
        <button onClick={handleCheckIn} style={btn("#10B981")}>Check In</button>
        <button onClick={handleCheckOut} style={btn("#EF4444")}>Check Out</button>
        {msg && <p>{msg}</p>}
      </div>
    </div>
  );
}

const Card = ({ label, value }) => (
  <div style={card}>
    <p>{label}</p>
    <h2>{value}</h2>
  </div>
);

const Center = ({ children }) => (
  <div style={{ textAlign: "center", paddingTop: 80 }}>{children}</div>
);

/* STYLES */
const page = { padding: 24, background: "#F8FAFC", minHeight: "100vh" };
const topBar = { display: "flex", justifyContent: "space-between", marginBottom: 20 };
const logoBox = { display: "flex", gap: 10, alignItems: "center" };
const logo = { width: 42, height: 42, borderRadius: 12, background: "#2563EB", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800 };
const companyName = { fontWeight: 800 };
const companySub = { fontSize: 12, color: "#64748B" };
const bell = { fontSize: 22, cursor: "pointer" };
const grid = { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 16 };
const card = { background: "#fff", padding: 20, borderRadius: 16 };
const box = { marginTop: 30 };
const btn = (bg) => ({ background: bg, color: "#fff", padding: "10px 20px", borderRadius: 8, marginRight: 10 });

export default EmployeeDashboard;
