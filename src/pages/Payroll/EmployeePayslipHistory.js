import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../api/api";

function EmployeePayslipHistory() {
  const { id } = useParams(); // employee id
  const [employeeName, setEmployeeName] = useState("");
  const [payslips, setPayslips] = useState([]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const res = await api.get(`/payroll/employee/${id}/`);
      setEmployeeName(res.data.employee);
      setPayslips(res.data.payslips);
    } catch (err) {
      console.error("Error loading payslip history:", err);
    }
  };

  const downloadPDF = (payrollId) => {
    window.open(`https://cloud-hrms-1.onrender.com/api/payroll/download/${payrollId}/`, "_blank");
  };

  const sendEmail = async (payrollId) => {
    try {
      await api.post(`/payroll/email/${payrollId}/`);
      alert("Payslip email sent ✅");
    } catch (err) {
      console.error(err);
      alert("Failed to send payslip email");
    }
  };

  return (
    <div style={{ padding: "24px" }}>
      <h2 style={{ color: "#0052cc", marginBottom: "10px" }}>
        Payslip History – {employeeName || `Employee #${id}`}
      </h2>

      {payslips.length === 0 ? (
        <p>No payslips generated for this employee yet.</p>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            background: "#fff",
            boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
          }}
        >
          <thead>
            <tr style={{ background: "#f3f4f6" }}>
              <th style={thStyle}>Month</th>
              <th style={thStyle}>Year</th>
              <th style={thStyle}>Gross (₹)</th>
              <th style={thStyle}>Net (₹)</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {payslips.map((p) => (
              <tr key={p.id}>
                <td style={tdStyle}>{p.month}</td>
                <td style={tdStyle}>{p.year}</td>
                <td style={tdStyle}>{p.gross_salary}</td>
                <td style={tdStyle}>{p.net_salary}</td>
                <td style={tdStyle}>
                  <button style={btnSm} onClick={() => downloadPDF(p.id)}>
                    📄 PDF
                  </button>
                  <button style={btnOutline} onClick={() => sendEmail(p.id)}>
                    ✉ Email
                  </button>
                  <Link to={`/payroll/${p.id}`} style={linkSm}>
                    Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const thStyle = {
  padding: "10px",
  borderBottom: "1px solid #e5e7eb",
  textAlign: "left",
  fontSize: "13px",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
};

const tdStyle = {
  padding: "10px",
  borderBottom: "1px solid #e5e7eb",
  fontSize: "14px",
};

const btnSm = {
  padding: "4px 8px",
  marginRight: "6px",
  background: "#0052cc",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  fontSize: "12px",
  cursor: "pointer",
};

const btnOutline = {
  padding: "4px 8px",
  marginRight: "6px",
  background: "transparent",
  color: "#0052cc",
  border: "1px solid #0052cc",
  borderRadius: "6px",
  fontSize: "12px",
  cursor: "pointer",
};

const linkSm = {
  fontSize: "12px",
  textDecoration: "none",
  color: "#2563eb",
};

export default EmployeePayslipHistory;
