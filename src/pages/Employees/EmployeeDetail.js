// frontend/src/pages/Employees/EmployeeDetail.js
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../api/api";
import { Page } from "../../theme/pageStyles";
import { Form } from "../../theme/formStyles";


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



export default EmployeeDetail;
