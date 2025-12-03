import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/api";

function AttendanceActions() {
  const [employees, setEmployees] = useState([]);
  const [employeeId, setEmployeeId] = useState("");
  const [message, setMessage] = useState("");
  const [lastRecord, setLastRecord] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      const res = await api.get("employees/");
      setEmployees(res.data);
    } catch (err) {
      console.error("Error loading employees", err);
    }
  };

  const handleCheck = async (type) => {
    if (!employeeId) {
      setMessage("Please select an employee first.");
      setLastRecord(null);
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const url =
        type === "in"
          ? "attendance/check_in/"
          : "attendance/check_out/";

      const res = await api.post(url, { employee_id: employeeId });
      setMessage(res.data.message || "Action success.");

      const listRes = await api.get(
        `attendance/?employee=${employeeId}&ordering=-id`
      );
      setLastRecord(listRes.data[0] || null);

    } catch (err) {
      console.error(err);
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={pageWrapper}>
      <div style={pageHeader}>
        <div>
          <h2 style={pageTitle}>⏱ Employee Check-in / Check-out</h2>
          <p style={pageSubtitle}>
            Mark real-time attendance for employees with a single click.
          </p>
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <Link to="/" style={secondaryButton}>
            ⬅ Back to Dashboard
          </Link>
          <Link to="/attendance" style={primaryOutlineButton}>
            📋 View Attendance List
          </Link>
        </div>
      </div>

      <div style={card}>
        <div style={formRow}>
          <div style={{ flex: 2 }}>
            <label style={label}>Select Employee</label>
            <select
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              style={select}
            >
              <option value="">-- Choose Employee --</option>
              {employees.map((emp) => (
                <option key={emp.id} value={emp.id}>
                  {emp.emp_code} - {emp.name}
                </option>
              ))}
            </select>
          </div>

          <div style={{ flex: 1, display: "flex", gap: "8px", marginTop: "24px" }}>
            <button
              type="button"
              style={primaryButton}
              onClick={() => handleCheck("in")}
              disabled={loading}
            >
              ✅ Check-in
            </button>

            <button
              type="button"
              style={dangerButton}
              onClick={() => handleCheck("out")}
              disabled={loading}
            >
              🔚 Check-out
            </button>
          </div>
        </div>

        {message && <div style={infoBox}>{message}</div>}

        {lastRecord && (
          <div style={lastRecordBox}>
            <h4 style={smallTitle}>Last Attendance Record</h4>

            <p style={statLine}>
              <strong>Date:</strong> {lastRecord.date}
            </p>

            <p style={statLine}>
              <strong>Check-in:</strong>{" "}
              {lastRecord.check_in
                ? new Date(lastRecord.check_in).toLocaleString()
                : "-"}
            </p>

            <p style={statLine}>
              <strong>Check-out:</strong>{" "}
              {lastRecord.check_out
                ? new Date(lastRecord.check_out).toLocaleString()
                : "-"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

/* 🎨 STYLING – TEAL HRMS THEME */

const pageWrapper = {
  padding: "90px 24px 24px",
  minHeight: "100vh",
  background: "linear-gradient(135deg, #F3FAFB 0%, #D1F0F2 50%, #F9FEFF 100%)",
};

const pageHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "18px",
};

const pageTitle = {
  margin: 0,
  color: "#003B3B",
  fontSize: "24px",
  fontWeight: 700,
};

const pageSubtitle = {
  margin: 0,
  color: "#4b5563",
  fontSize: "13px",
};

const card = {
  background: "#ffffff",
  borderRadius: "14px",
  padding: "20px 22px",
  boxShadow: "0 12px 30px rgba(15, 23, 42, 0.12)",
  border: "1px solid rgba(0, 128, 128, 0.08)",
};

const formRow = {
  display: "flex",
  flexWrap: "wrap",
  gap: "16px",
};

const label = {
  fontSize: "13px",
  fontWeight: 600,
  color: "#003B3B",
  marginBottom: "4px",
};

const select = {
  width: "100%",
  borderRadius: "8px",
  border: "1px solid #cbd5e1",
  padding: "8px 10px",
  fontSize: "14px",
  outline: "none",
};

const primaryButton = {
  flex: 1,
  background: "#008080",
  color: "#ffffff",
  border: "none",
  borderRadius: "8px",
  padding: "9px 10px",
  fontSize: "14px",
  fontWeight: 600,
  cursor: "pointer",
};

const dangerButton = {
  flex: 1,
  background: "#EF4444",
  color: "#ffffff",
  border: "none",
  borderRadius: "8px",
  padding: "9px 10px",
  fontSize: "14px",
  fontWeight: 600,
  cursor: "pointer",
};

const secondaryButton = {
  background: "#ffffff",
  color: "#008080",
  borderRadius: "8px",
  padding: "8px 14px",
  border: "1px solid #008080",
  textDecoration: "none",
  fontSize: "13px",
  fontWeight: 600,
};

const primaryOutlineButton = {
  background: "#008080",
  color: "#ffffff",
  borderRadius: "8px",
  padding: "8px 14px",
  border: "none",
  textDecoration: "none",
  fontSize: "13px",
  fontWeight: 600,
};

const infoBox = {
  marginTop: "16px",
  background: "#E0F2FE",
  borderRadius: "8px",
  padding: "8px 10px",
  fontSize: "13px",
  color: "#0F172A",
  border: "1px solid #93C5FD",
};

const lastRecordBox = {
  marginTop: "18px",
  padding: "10px 12px",
  borderRadius: "10px",
  background: "#F9FAFB",
  border: "1px dashed #D1D5DB",
};

const smallTitle = {
  fontSize: "14px",
  fontWeight: 600,
  color: "#111827",
  marginBottom: "6px",
};

const statLine = {
  fontSize: "13px",
  color: "#4b5563",
  marginBottom: "4px",
};

export default AttendanceActions;
