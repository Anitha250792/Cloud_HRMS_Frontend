import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/api";

function EmployeeSalary() {
  const { id } = useParams();
  const [records, setRecords] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const res = await api.get(`payroll/employee/${id}/`);
    setRecords(res.data);
  };

  return (
    <div style={wrapper}>
      <h2 style={title}>💼 Employee Salary Details</h2>

      <div style={card}>
        <table style={table}>
          <thead>
            <tr>
              <th style={th}>Month</th>
              <th style={th}>Gross</th>
              <th style={th}>Net</th>
              <th style={th}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {records.map((p) => (
              <tr key={p.id} style={tbodyRow}>
                <td style={td}>
                  {p.month}/{p.year}
                </td>
                <td style={td}>₹ {p.gross_salary}</td>
                <td style={td}>₹ {p.net_salary}</td>

                <td style={td}>
                  <button
                    style={smallBtn}
                    onClick={() =>
                      window.open(
                        `http://127.0.0.1:8000/api/payroll/download/${p.id}/`
                      )
                    }
                  >
                    📄 PDF
                  </button>

                  <button
                    style={smallBtnBlue}
                    onClick={() =>
                      window.open(
                        `http://127.0.0.1:8000/api/payroll/email/${p.id}/`
                      )
                    }
                  >
                    ✉ Email
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* Same styles as PayrollList */

const wrapper = {
  paddingTop: 90,
  padding: 20,
  minHeight: "100vh",
  background: "linear-gradient(135deg,#ecfdf3,#d1fae5)",
};

const title = {
  fontSize: 26,
  fontWeight: 700,
  color: "#065f46",
  marginBottom: 16,
};

const card = {
  background: "white",
  padding: 20,
  borderRadius: 16,
  boxShadow: "0 10px 25px rgba(15,23,42,0.15)",
};

const table = {
  width: "100%",
  borderCollapse: "separate",
  borderSpacing: "0 10px",
};

const th = {
  color: "#064e3b",
  fontWeight: 700,
  padding: "12px 10px",
};

const tbodyRow = {
  background: "#f9fafb",
  borderRadius: 8,
};

const td = {
  padding: "12px 10px",
};

const smallBtn = {
  background: "#059669",
  color: "white",
  padding: "6px 12px",
  border: "none",
  borderRadius: 8,
  cursor: "pointer",
  marginRight: 8,
};

const smallBtnBlue = {
  background: "#2563eb",
  color: "white",
  padding: "6px 12px",
  border: "none",
  borderRadius: 8,
  cursor: "pointer",
};

export default EmployeeSalary;
