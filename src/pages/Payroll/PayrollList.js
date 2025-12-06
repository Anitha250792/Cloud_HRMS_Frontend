import { useEffect, useState } from "react";
import api from "../../api/api";

function PayrollList() {
  const [payrolls, setPayrolls] = useState([]);

  useEffect(() => {
    loadPayroll();
  }, []);

  const loadPayroll = async () => {
    const res = await api.get("payroll/");
    setPayrolls(res.data);
  };

  return (
    <div className="page">
      <h2 className="title">📊 Payroll Records</h2>

      <table className="styled-table">
        <thead>
          <tr>
            <th>Employee</th>
            <th>Month</th>
            <th>Gross Salary</th>
            <th>Net Salary</th>
            <th>Payslip</th>
          </tr>
        </thead>

        <tbody>
          {payrolls.map((row) => (
            <tr key={row.id} className="row">
              <td>
                <strong>{row.employee_name}</strong>
                <br />
                <small>ID: {row.employee_code}</small>
              </td>

              <td>
                <span className="badge-blue">
                  {row.month_name} {row.year}
                </span>
              </td>

              <td>₹ {row.gross_salary}</td>
              <td className="salary-green">₹ {row.net_salary}</td>

              <td>
                <a
                  className="download-link"
                  href={`https://cloud-hrms-1.onrender.com/api/payroll/download/${row.id}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  📄 Download
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Styling */}
      <style>{`
        .page {
          padding: 25px;
          background: #f3f4f6;
          min-height: 100vh;
        }

        .title {
          font-size: 28px;
          font-weight: bold;
          color: #1e3a8a;
          margin-bottom: 20px;
        }

        .styled-table {
          width: 100%;
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
        }

        th {
          background: #1e3a8a;
          color: white;
          padding: 12px;
        }

        td {
          padding: 12px;
          border-bottom: 1px solid #e5e7eb;
        }

        .row:hover {
          background: #f0f9ff;
          transition: 0.2s;
        }

        .badge-blue {
          background: #2563eb;
          color: white;
          padding: 4px 10px;
          border-radius: 8px;
          font-size: 12px;
        }

        .salary-green {
          color: #047857;
          font-weight: bold;
        }

        .download-link {
          background: #059669;
          padding: 6px 12px;
          color: white;
          border-radius: 8px;
          font-size: 14px;
          text-decoration: none;
        }

        .download-link:hover {
          background: #047857;
        }
      `}</style>
    </div>
  );
}

export default PayrollList;
