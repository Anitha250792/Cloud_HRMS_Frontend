// frontend/src/pages/Attendance/AttendanceHeatmap.js
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/api";
import { Page } from "../../theme/pageStyles";
import { Form } from "../../theme/formStyles";


function AttendanceHeatmap() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmp, setSelectedEmp] = useState("");
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [heatmap, setHeatmap] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      const res = await api.get("employees/");
      setEmployees(res.data);
      if (res.data.length > 0) {
        setSelectedEmp(res.data[0].id);
      }
    } catch (err) {
      console.error("Error loading employees:", err);
    }
  };

  const loadHeatmap = async () => {
    if (!selectedEmp) return;
    setLoading(true);
    try {
      const res = await api.get(
        `attendance/heatmap/${selectedEmp}/${year}/${month}/`
      );
      setHeatmap(res.data);
    } catch (err) {
      console.error("Error loading heatmap:", err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    if (status === "PRESENT") return "#22C55E";
    if (status === "LATE") return "#FACC15";
    return "#F97373"; // ABSENT
  };

  const monthNames = [
    "",
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  return (
    <div style={pageWrapper}>
      {/* Header */}
      <div style={pageHeader}>
        <div>
          <h2 style={pageTitle}>📅 Attendance Heatmap</h2>
          <p style={pageSubtitle}>
            Visual overview of employee presence across the selected month.
          </p>
        </div>

        <Link to="/" style={primaryButton}>
          ⬅ Back to Dashboard
        </Link>
      </div>

      {/* Filters Card */}
      <div style={card}>
        <h3 style={cardTitle}>Filters</h3>
        <div style={filterRow}>
          {/* Employee */}
          <div style={filterItem}>
            <label style={filterLabel}>Employee</label>
            <select
              style={filterSelect}
              value={selectedEmp}
              onChange={(e) => setSelectedEmp(e.target.value)}
            >
              {employees.map((emp) => (
                <option key={emp.id} value={emp.id}>
                  {emp.name} (#{emp.emp_code})
                </option>
              ))}
            </select>
          </div>

          {/* Month */}
          <div style={filterItem}>
            <label style={filterLabel}>Month</label>
            <select
              style={filterSelect}
              value={month}
              onChange={(e) => setMonth(Number(e.target.value))}
            >
              {monthNames.map(
                (m, i) =>
                  i > 0 && (
                    <option key={i} value={i}>
                      {m}
                    </option>
                  )
              )}
            </select>
          </div>

          {/* Year */}
          <div style={filterItem}>
            <label style={filterLabel}>Year</label>
            <input
              type="number"
              style={filterSelect}
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
            />
          </div>

          {/* Button */}
          <div style={filterItem}>
            <button onClick={loadHeatmap} style={primaryButton}>
              🔍 Load Heatmap
            </button>
          </div>
        </div>
      </div>

      {/* Heatmap Card */}
      <div style={card}>
        <h3 style={cardTitle}>
          {monthNames[month]} {year} — Status
        </h3>

        {/* Legend */}
        <div style={legendRow}>
          <LegendDot color="#22C55E" label="Present" />
          <LegendDot color="#FACC15" label="Late" />
          <LegendDot color="#F97373" label="Absent" />
        </div>

        {loading ? (
          <p style={emptyText}>Loading heatmap...</p>
        ) : heatmap.length === 0 ? (
          <p style={emptyText}>
            No data yet. Click <b>Load Heatmap</b> to fetch records.
          </p>
        ) : (
          <div style={grid}>
            {heatmap.map((item, idx) => {
              const d = new Date(item.date);
              const day = d.getDate();
              const weekday = d.toLocaleDateString(undefined, {
                weekday: "short",
              });
              return (
                <div
                  key={idx}
                  style={{
                    ...cell,
                    background: getStatusColor(item.status),
                  }}
                >
                  <div style={cellDay}>{day}</div>
                  <div style={cellWeekday}>{weekday}</div>
                  <div style={cellStatus}>{item.status}</div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

/* Small legend helper */
function LegendDot({ color, label }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <span
        style={{
          width: 14,
          height: 14,
          borderRadius: 999,
          background: color,
          display: "inline-block",
        }}
      />
      <span style={{ fontSize: 13, color: "#374151" }}>{label}</span>
    </div>
  );
}

/* 🎨 Common Styles (Teal theme) */

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
  marginBottom: "20px",
};

const pageTitle = {
  margin: 0,
  fontSize: "24px",
  fontWeight: 700,
  color: "#003B3B",
};

const pageSubtitle = {
  margin: 0,
  fontSize: "13px",
  color: "#4b5563",
};

const primaryButton = {
  background: "#008080",
  color: "#ffffff",
  padding: "10px 16px",
  border: "none",
  borderRadius: "8px",
  textDecoration: "none",
  fontWeight: 600,
  cursor: "pointer",
};

const card = {
  background: "#ffffff",
  padding: "18px 20px",
  borderRadius: "14px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  marginBottom: "18px",
};

const cardTitle = {
  fontSize: "18px",
  fontWeight: 600,
  color: "#003B3B",
  marginBottom: "12px",
};

const filterRow = {
  display: "flex",
  flexWrap: "wrap",
  gap: "10px",
};

const filterItem = {
  display: "flex",
  flexDirection: "column",
  minWidth: "180px",
};

const filterLabel = {
  fontSize: "12px",
  fontWeight: 600,
  color: "#4b5563",
  marginBottom: "3px",
};

const filterSelect = {
  padding: "6px 10px",
  borderRadius: "8px",
  border: "1px solid #CBD5F5",
  fontSize: "13px",
};

const legendRow = {
  display: "flex",
  gap: "16px",
  marginBottom: "12px",
};

const emptyText = {
  padding: "20px",
  textAlign: "center",
  color: "#6b7280",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))",
  gap: "8px",
};

const cell = {
  borderRadius: "10px",
  padding: "6px 8px",
  color: "white",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "center",
  minHeight: "70px",
};

const cellDay = {
  fontSize: "18px",
  fontWeight: 700,
};

const cellWeekday = {
  fontSize: "11px",
};

const cellStatus = {
  marginTop: "4px",
  fontSize: "10px",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
};

export default AttendanceHeatmap;
