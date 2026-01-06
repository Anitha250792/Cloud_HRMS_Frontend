import React, { useEffect, useState } from "react";
import axios from "axios";

const PayrollTable = () => {
  const [payrolls, setPayrolls] = useState([]);

  useEffect(() => {
    axios.get("https://cloud-hrms-1.onrender.com/api/payroll/")
      .then(res => setPayrolls(res.data))
      .catch(err => console.log(err));
  }, []);

  const downloadPayslip = (id) => {
    window.open(`https://cloud-hrms-1.onrender.com/api/payroll/${id}/download/`, "_blank");
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Payroll Records</h2>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "20px",
        }}
      >
        <thead>
          <tr style={{ background: "#1E88E5", color: "white" }}>
            <th>ID</th>
            <th>Employee</th>
            <th>Month</th>
            <th>Net Salary</th>
            <th>Payslip</th>
          </tr>
        </thead>

        <tbody>
          {payrolls.map((p) => (
            <tr key={p.id} style={{ borderBottom: "1px solid #ddd" }}>
              <td>{p.id}</td>
              <td>{p.employee_name}</td>
              <td>{p.month}/{p.year}</td>
              <td>{p.net_salary}</td>
              <td>
                <button
                  onClick={() => downloadPayslip(p.id)}
                  style={{
                    backgroundColor: "green",
                    color: "white",
                    padding: "6px 12px",
                    borderRadius: "5px",
                    border: "none",
                    cursor: "pointer"
                  }}
                >
                  Download
                </button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
};

export default PayrollTable;
