import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/api";

function PayrollDetail() {
  const { id } = useParams();
  const [payroll, setPayroll] = useState(null);

  useEffect(() => {
    api.get(`payroll/${id}/`).then((res) => setPayroll(res.data));
  }, [id]);

  if (!payroll) return <p>Loading...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Salary Details – {payroll.employee_name}</h2>

      <p>Month: {payroll.month}/{payroll.year}</p>
      <p>Basic Salary: ₹ {payroll.basic_salary}</p>
      <p>Gross Salary: ₹ {payroll.total_gross_salary}</p>
      <p>Net Salary: ₹ {payroll.total_net_salary}</p>

      <a
        href={`http://localhost:8000/api/payroll/download/${payroll.id}/`}
        target="_blank"
      >
        Download PDF
      </a>
    </div>
  );
}

export default PayrollDetail;
