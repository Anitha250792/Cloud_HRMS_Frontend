import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

function Dashboard() {
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [todaySummary, setTodaySummary] = useState(null);
  const [pendingLeaves, setPendingLeaves] = useState(0);
  const [payrollSummary, setPayrollSummary] = useState(null);
  const [salaryChartData, setSalaryChartData] = useState([]);
  const [chartType, setChartType] = useState("line");
  const googleName = localStorage.getItem("google_name");
const googlePic = localStorage.getItem("google_picture");


  // LOAD DASHBOARD DATA
  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const empRes = await api.get("employees/");
      setTotalEmployees(empRes.data.length);

      const todayRes = await api.get("attendance/summary_today/");
      setTodaySummary(todayRes.data);

      const leaveRes = await api.get("leaves/");
      setPendingLeaves(leaveRes.data.filter(l => l.status === "PENDING").length);

      const payrollRes = await api.get("payroll/summary/");
      setPayrollSummary(payrollRes.data);

      const chartRes = await api.get("payroll/stats/");
      const normalized = chartRes.data.map(m => ({
        month: "M" + m.month,
        total_gross_salary: Number(m.total_gross_salary),
        total_net_salary: Number(m.total_net_salary),
      }));
      setSalaryChartData(normalized);
    } catch (err) {
      console.error("Dashboard load error:", err);
    }
  };

  const totalGross = salaryChartData.reduce((a, v) => a + v.total_gross_salary, 0);
  const totalNet = salaryChartData.reduce((a, v) => a + v.total_net_salary, 0);

  return (
    <div style={{ background: "#f3fdf7", minHeight: "100vh" }}>
      
      {/* FIXED HEADER */}
      <header style={headerBar}>
  <div>
    <h2 style={headerTitle}>HRMS Cloud Dashboard</h2>
    <p style={headerSubtitle}>Payroll • Attendance • Leaves</p>
  </div>

  <nav style={headerNav}>
    <Link to="/employees" style={headerLink}>👥 Employees</Link>
    <Link to="/attendance/actions" style={headerLink}>⏱ Attendance</Link>
    <Link to="/payroll" style={headerLink}>💰 Payroll</Link>
    <Link to="/leave" style={headerLink}>📝 Leaves</Link>
  </nav>

  {/* Google Profile */}
  {googlePic && (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <img
        src={googlePic}
        alt="user"
        style={{ width: 40, height: 40, borderRadius: "50%" }}
      />
      <span style={{ fontWeight: 600, color: "#065f46" }}>
        {googleName}
      </span>
    </div>
  )}
</header>


      {/* MAIN CONTENT */}
      <main style={{ paddingTop: 90 }}>
        
        {/* KPI CARDS */}
        <div style={kpiGrid}>
          <div style={card}>
            <p style={cardLabel}>Total Employees</p>
            <h2 style={cardValue}>{totalEmployees}</h2>
            <p style={cardHint}>Active employees</p>
          </div>

          <div style={card}>
            <p style={cardLabel}>Present Today</p>
            <h2 style={cardValue}>{todaySummary?.present_today || 0}</h2>
            <p style={cardHint}>Absent: {todaySummary?.absent_today || 0}</p>
          </div>

          <div style={card}>
            <p style={cardLabel}>Pending Leaves</p>
            <h2 style={cardValue}>{pendingLeaves}</h2>
            <p style={cardHint}>Manager action required</p>
          </div>

          <div style={card}>
            <p style={cardLabel}>This Month Net Pay</p>
            <h2 style={cardValue}>₹ {payrollSummary?.total_net_salary || 0}</h2>
            <p style={cardHint}>Gross: ₹ {payrollSummary?.total_gross_salary || 0}</p>
          </div>
        </div>

        {/* CHART + SUMMARY */}
        <div style={middleGrid}>
          
          {/* Salary Graph */}
          <section style={card}>
            <div style={cardHeaderRow}>
              <h3 style={panelTitle}>Monthly Salary Analytics</h3>

              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={() => setChartType("line")} style={chartType === "line" ? activeTab : inactiveTab}>📈</button>
                <button onClick={() => setChartType("bar")} style={chartType === "bar" ? activeTab : inactiveTab}>📊</button>
                <button onClick={() => setChartType("pie")} style={chartType === "pie" ? activeTab : inactiveTab}>🥧</button>
              </div>
            </div>

            {salaryChartData.length === 0 ? (
              <p style={emptyText}>No payroll data yet</p>
            ) : chartType === "line" ? (
              <ResponsiveContainer width="100%" height={260}>
                <LineChart data={salaryChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line dataKey="total_gross_salary" stroke="#10b981" strokeWidth={3} />
                  <Line dataKey="total_net_salary" stroke="#0ea5e9" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            ) : chartType === "bar" ? (
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={salaryChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="total_gross_salary" fill="#10b981" />
                  <Bar dataKey="total_net_salary" fill="#0ea5e9" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Tooltip />
                  <Pie
                    data={[
                      { name: "Gross", value: totalGross },
                      { name: "Net", value: totalNet },
                    ]}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={90}
                    fill="#10b981"
                    label
                  />
                </PieChart>
              </ResponsiveContainer>
            )}
          </section>

          {/* Summary */}
          <section style={card}>
            <h3 style={panelTitle}>Today & Month Summary</h3>

            {todaySummary && (
              <div>
                <h4 style={subTitle}>Today</h4>
                <p style={statLine}>Total: {todaySummary.total_employees}</p>
                <p style={statLine}>Present: {todaySummary.present_today}</p>
                <p style={statLine}>Absent: {todaySummary.absent_today}</p>
                <p style={statLine}>Late: {todaySummary.late_employees}</p>
              </div>
            )}

            {payrollSummary && (
              <div style={{ marginTop: 12 }}>
                <h4 style={subTitle}>Payroll {payrollSummary.month}/{payrollSummary.year}</h4>
                <p style={statLine}>Employees Paid: {payrollSummary.salary_generated_for}</p>
                <p style={statLine}>Net Salary: ₹ {payrollSummary.total_net_salary}</p>
                <p style={statLine}>Overtime Pay: ₹ {payrollSummary.total_overtime_pay}</p>
              </div>
            )}
          </section>
        </div>

        {/* Quick Actions */}
        <section style={card}>
          <h3 style={panelTitle}>Quick Actions</h3>

          <div style={quickGrid}>
            <Link to="/employees/add" style={actionButton}>➕ Add Employee</Link>
            <Link to="/employees" style={actionButton}>👥 Employees</Link>
            <Link to="/attendance/actions" style={actionButton}>⏱ Attendance</Link>
            <Link to="/leave-analytics" style={actionButton}>📊 Leave Analytics</Link>
            <Link to="/payroll" style={actionButton}>💰 Payroll</Link>
            <button
  style={actionButton}
  onClick={async () => {
    const now = new Date();
    const month = now.getMonth(); // previous month
    const year = now.getFullYear();

    await api.post("payroll/generate-all/", { year, month });
    alert("Payroll generation started!");
  }}
>
  ⚙ Generate Payroll for All Employees
</button>

          </div>
        </section>

      </main>
    </div>
  );
}

/* THEME STYLES (KEEP SAME AS YOURS — FIXED) */

const headerBar = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  height: 70,
  padding: "0 24px",
  background: "#fff",
  boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  zIndex: 1000,
};

const headerTitle = {
  margin: 0,
  color: "#065f46",
  fontWeight: 700,
};

const headerSubtitle = {
  margin: 0,
  color: "#6b7280",
  fontSize: 12,
};

const headerNav = { display: "flex", gap: 10 };

const headerLink = {
  padding: "6px 10px",
  borderRadius: 20,
  background: "#ecfdf5",
  color: "#065f46",
  fontSize: 13,
  textDecoration: "none",
  fontWeight: 600,
};

const kpiGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: 16,
  padding: "16px 24px",
};

const card = {
  background: "#ffffff",
  borderRadius: 14,
  padding: 18,
  boxShadow: "0 10px 25px rgba(15,23,42,0.08)",
};

const cardLabel = {
  fontSize: 12,
  color: "#6b7280",
};

const cardValue = {
  fontSize: 26,
  fontWeight: 700,
  color: "#065f46",
};

const cardHint = {
  fontSize: 13,
  color: "#6b7280",
};

const middleGrid = {
  display: "grid",
  gridTemplateColumns: "2fr 1fr",
  gap: 18,
  padding: "8px 24px",
};

const panelTitle = {
  fontSize: 18,
  fontWeight: 600,
  color: "#064e3b",
};

const cardHeaderRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 10,
};

const subTitle = {
  fontSize: 14,
  color: "#065f46",
  fontWeight: 600,
};

const statLine = {
  fontSize: 13,
  color: "#374151",
};

const quickGrid = {
  display: "flex",
  flexWrap: "wrap",
  gap: 10,
  marginTop: 10,
};

const actionButton = {
  textDecoration: "none",
  background: "#059669",
  color: "#fff",
  padding: "8px 14px",
  borderRadius: 20,
  fontSize: 13,
};

const activeTab = {
  background: "#059669",
  color: "#fff",
  border: "none",
  padding: "4px 10px",
  borderRadius: 20,
};

const inactiveTab = {
  background: "#e5e7eb",
  color: "#374151",
  border: "none",
  padding: "4px 10px",
  borderRadius: 20,
};

const emptyText = { color: "#6b7280" };

export default Dashboard;
