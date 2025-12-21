import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/api";
import { Page } from "../../theme/pageStyles";
import { Form } from "../../theme/formStyles";


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


export default EmployeeSalary;
