// frontend/src/pages/Employees/EmployeeDetail.js
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../api/api";

function EmployeeDetail() {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [attendance, setAttendance] = useState([]);
  const [payrolls, setPayrolls] = useState([]);

  useEffect(() => {
    loadAll();
  }, [id]);

  const loadAll = async () => {
    try {
      const [empRes, attRes, payRes] = await Promise.all([
        api.get(`employees/${id}/`),
        api.get("attendance/"),
        api.get("payroll/"),
      ]);

      setEmployee(empRes.data);
      setAttendance(attRes.data.filter((a) => String(a.employee) === String(id)));
      setPayrolls(payRes.data.filter((p) => String(p.employee) === String(id)));
    } catch (err) {
      console.error("Employee detail load error:", err);
    }
  };

  const openPayslip = (payId) => {
    window.open(`http://127.0.0.1:8000/api/payroll/download/${payId}/`);
  };

  if (!employee) {
    return (
      <div style={pageWrapper}>
        <p style={{ color: "#4b5563" }}>Loading employee details...</p>
      </div>
    );
  }

  return (
    <div style={pageWrapper}>
      <div style={pageHeader}>
        <div>
          <h2 style={pageTitle}>👤 {employee.name}</h2>
          <p style={pageSubtitle}>
            Employee #{employee.emp_code} • {employee.department} • {employee.role}
          </p>
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          <Link to="/" style={primaryButton}>
            ⬅ Dashboard
          </Link>
          <Link to="/employees" style={outlineButton}>
            👥 All Employees
          </Link>
        </div>
      </div>

      {/* Employee Info */}
      <div style={card}>
        <h3 style={cardTitle}>Profile</h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
          <InfoP label="Employee Code" value={employee.emp_code} />
          <InfoP label="Email" value={employee.email} />
          <InfoP label="Department" value={employee.department} />
          <InfoP label="Role" value={employee.role} />
          <InfoP label="Salary" value={`₹ ${employee.salary}`} />
          <InfoP label="Date Joined" value={employee.date_joined} />
        </div>
      </div>

      {/* Attendance History */}
      <div style={card}>
        <h3 style={cardTitle}>Attendance History</h3>
        {attendance.length === 0 ? (
          <p style={emptyText}>No attendance records yet.</p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={table}>
              <thead>
                <tr style={theadRow}>
                  <th style={th}>Date</th>
                  <th style={th}>Check-in</th>
                  <th style={th}>Check-out</th>
                </tr>
              </thead>
              <tbody>
                {attendance.map((a) => (
                  <tr key={a.id} style={tbodyRow}>
                    <td style={td}>{a.date}</td>
                    <td style={td}>
                      {a.check_in
                        ? new Date(a.check_in).toLocaleTimeString()
                        : "-"}
                    </td>
                    <td style={td}>
                      {a.check_out
                        ? new Date(a.check_out).toLocaleTimeString()
                        : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Payroll History */}
      <div style={card}>
        <h3 style={cardTitle}>Payroll History</h3>
        {payrolls.length === 0 ? (
          <p style={emptyText}>No payroll generated for this employee yet.</p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={table}>
              <thead>
                <tr style={theadRow}>
                  <th style={th}>Month</th>
                  <th style={th}>Gross</th>
                  <th style={th}>Net</th>
                  <th style={th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {payrolls.map((p) => (
                  <tr key={p.id} style={tbodyRow}>
                    <td style={td}>
                      {p.month}/{p.year}
                    </td>
                    <td style={td}>₹ {p.gross_salary}</td>
                    <td style={td}>₹ {p.net_salary}</td>
                    <td style={td}>
                      <button
                        style={pillButton}
                        onClick={() => openPayslip(p.id)}
                      >
                        📄 Download Payslip
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

/* Small helpers */

function InfoP({ label, value }) {
  return (
    <div style={{ minWidth: 200 }}>
      <div style={{ fontSize: 11, textTransform: "uppercase", color: "#6b7280" }}>
        {label}
      </div>
      <div style={{ fontSize: 14, color: "#111827", fontWeight: 500 }}>
        {value}
      </div>
    </div>
  );
}

/* Styles */

const pageWrapper = {
  padding: "90px 24px 24px",
  background:
    "linear-gradient(135deg, #F3FAFB 0%, #D1F0F2 50%, #F9FEFF 100%)",
  minHeight: "100vh",
};

const pageHeader = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: 20,
};

const pageTitle = {
  margin: 0,
  fontSize: 24,
  fontWeight: 700,
  color: "#003B3B",
};

const pageSubtitle = {
  margin: 0,
  fontSize: 13,
  color: "#4b5563",
};

const primaryButton = {
  background: "#008080",
  color: "#ffffff",
  padding: "8px 14px",
  borderRadius: "999px",
  textDecoration: "none",
  fontWeight: 600,
};

const outlineButton = {
  background: "transparent",
  color: "#008080",
  padding: "8px 14px",
  borderRadius: "999px",
  textDecoration: "none",
  fontWeight: 600,
  border: "1px solid #008080",
};

const card = {
  background: "#ffffff",
  padding: "18px 20px",
  borderRadius: "14px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.06)",
  marginBottom: 16,
};

const cardTitle = {
  fontSize: 18,
  fontWeight: 600,
  color: "#003B3B",
  marginBottom: 10,
};

const emptyText = {
  padding: 16,
  textAlign: "center",
  color: "#6b7280",
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
  fontSize: 13,
  textAlign: "left",
  color: "#003B3B",
  borderBottom: "2px solid #CFFAFE",
};

const tbodyRow = {
  borderBottom: "1px solid #E5E7EB",
};

const td = {
  padding: "8px 10px",
  fontSize: 13,
  color: "#334155",
};

const pillButton = {
  background: "#008080",
  color: "white",
  border: "none",
  borderRadius: "999px",
  padding: "6px 12px",
  fontSize: 12,
  cursor: "pointer",
};

export default EmployeeDetail;
