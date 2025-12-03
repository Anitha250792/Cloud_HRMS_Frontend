// frontend/src/pages/Attendance/AttendanceList.js
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/api";

function AttendanceList() {
  const [records, setRecords] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [filterDate, setFilterDate] = useState("");
  const [filterEmp, setFilterEmp] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [attRes, empRes] = await Promise.all([
        api.get("attendance/"),
        api.get("employees/"),
      ]);
      setRecords(attRes.data);
      setEmployees(empRes.data);
    } catch (err) {
      console.error("Attendance list error:", err);
    }
  };

  const getEmpName = (id) => {
    const emp = employees.find((e) => e.id === id);
    return emp ? emp.name : `#${id}`;
  };

  const filtered = records.filter((r) => {
    let ok = true;
    if (filterDate) {
      ok = ok && r.date === filterDate;
    }
    if (filterEmp) {
      ok = ok && String(r.employee) === String(filterEmp);
    }
    return ok;
  });

  return (
    <div style={pageWrapper}>
      <div style={pageHeader}>
        <div>
          <h2 style={pageTitle}>🗂 Attendance Records</h2>
          <p style={pageSubtitle}>
            Complete log of check-in and check-out times.
          </p>
        </div>

        <Link to="/" style={primaryButton}>
          ⬅ Back to Dashboard
        </Link>
      </div>

      {/* Filters */}
      <div style={card}>
        <h3 style={cardTitle}>Filters</h3>
        <div style={filterRow}>
          <div style={filterItem}>
            <label style={filterLabel}>Date</label>
            <input
              type="date"
              style={filterInput}
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
            />
          </div>

          <div style={filterItem}>
            <label style={filterLabel}>Employee</label>
            <select
              style={filterInput}
              value={filterEmp}
              onChange={(e) => setFilterEmp(e.target.value)}
            >
              <option value="">All</option>
              {employees.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.name} (#{e.emp_code})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div style={card}>
        <h3 style={cardTitle}>Attendance List</h3>
        <div style={{ overflowX: "auto" }}>
          <table style={table}>
            <thead>
              <tr style={theadRow}>
                <th style={th}>ID</th>
                <th style={th}>Employee</th>
                <th style={th}>Date</th>
                <th style={th}>Check-in</th>
                <th style={th}>Check-out</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="5" style={emptyText}>
                    No attendance records found for selected filter.
                  </td>
                </tr>
              ) : (
                filtered.map((r) => (
                  <tr key={r.id} style={tbodyRow}>
                    <td style={td}>{r.id}</td>
                    <td style={td}>{getEmpName(r.employee)}</td>
                    <td style={td}>{r.date}</td>
                    <td style={td}>
                      {r.check_in
                        ? new Date(r.check_in).toLocaleTimeString()
                        : "-"}
                    </td>
                    <td style={td}>
                      {r.check_out
                        ? new Date(r.check_out).toLocaleTimeString()
                        : "—"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* Styles (reuse teal theme) */

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
  borderRadius: "8px",
  textDecoration: "none",
  fontWeight: 600,
};

const card = {
  background: "#ffffff",
  padding: "18px 20px",
  borderRadius: "14px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
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
  minWidth: "200px",
};

const filterLabel = {
  fontSize: "12px",
  fontWeight: 600,
  color: "#4b5563",
  marginBottom: "3px",
};

const filterInput = {
  padding: "6px 10px",
  borderRadius: "8px",
  border: "1px solid #CBD5F5",
  fontSize: "13px",
};

const table = {
  width: "100%",
  borderCollapse: "collapse",
};

const theadRow = {
  background: "#E0FFFF",
};

const th = {
  padding: "10px 12px",
  fontSize: "13px",
  textAlign: "left",
  color: "#003B3B",
  borderBottom: "2px solid #CFFAFE",
};

const tbodyRow = {
  borderBottom: "1px solid #E2E8F0",
};

const td = {
  padding: "8px 10px",
  fontSize: "13px",
  color: "#334155",
};

const emptyText = {
  padding: "18px",
  textAlign: "center",
  color: "#6b7280",
  fontSize: "13px",
};

export default AttendanceList;
