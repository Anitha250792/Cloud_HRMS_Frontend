import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/api";

function PayrollDetail() {
  const { id } = useParams();
  const [payroll, setPayroll] = useState(null);

  useEffect(() => {
    loadDetail();
  }, []);

  const loadDetail = async () => {
    const res = await api.get(`payroll/${id}/`);
    setPayroll(res.data);
  };

  if (!payroll) return <p>Loading...</p>;

  return (
    <div className="page">
      <h2 className="title">💼 Payroll Details</h2>

      <div className="card">
        <p><strong>Employee:</strong> {payroll.employee_name}</p>
        <p><strong>Employee Code:</strong> {payroll.employee_code}</p>
        <p><strong>Month:</strong> {payroll.month_name} {payroll.year}</p>
        <p><strong>Basic Salary:</strong> ₹ {payroll.basic_salary}</p>
        <p><strong>Gross Salary:</strong> ₹ {payroll.gross_salary}</p>
        <p><strong style={{ color: "#047857" }}>Net Salary: ₹ {payroll.net_salary}</strong></p>

        <a
          className="btn"
          href={`https://cloud-hrms-1.onrender.com/api/payroll/download/${payroll.id}/`}
          target="_blank"
          rel="noopener noreferrer"
        >
          📄 Download Payslip
        </a>
      </div>

      <style>{`
        .page { padding: 25px; background: #f3f4f6; min-height: 100vh; }
        .title { font-size: 26px; font-weight: bold; color: #1e40af; }
        .card {
          background: white; padding: 25px; border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1); max-width: 500px;
        }
        .btn {
          display: inline-block;
          background: #2563eb;
          padding: 10px 18px;
          margin-top: 20px;
          color: white;
          border-radius: 8px;
          text-decoration: none;
          font-weight: bold;
        }
        .btn:hover { background: #1e3a8a; }
      `}</style>
    </div>
  );
}

export default PayrollDetail;
