import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/api";
import { Page } from "../../theme/pageStyles";

function EmployeeSalary() {
  const { id } = useParams();
  const [records, setRecords] = useState([]);

  useEffect(() => {
    api.get(`payroll/employee/${id}/`).then(res => setRecords(res.data));
  }, [id]);

  return (
    <div style={Page.wrapper}>
      <h2 style={Page.title}>💼 Salary</h2>
      <div style={Page.card}>
        {records.map(r => (
          <p key={r.id}>{r.month}/{r.year} – ₹{r.net_salary}</p>
        ))}
      </div>
    </div>
  );
}

export default EmployeeSalary;
