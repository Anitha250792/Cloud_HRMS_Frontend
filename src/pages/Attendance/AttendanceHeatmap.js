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

export default AttendanceHeatmap;
