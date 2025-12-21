import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/api";
import { Page } from "../../theme/pageStyles";

function EmployeeDetail() {
  const { id } = useParams();
  const [emp, setEmp] = useState(null);

  useEffect(() => {
    api.get(`employees/${id}/`).then(res => setEmp(res.data));
  }, [id]);

  if (!emp) return <p>Loading...</p>;

  return (
    <div style={Page.wrapper}>
      <h2 style={Page.title}>👤 {emp.name}</h2>

      <div style={{ ...Page.card, maxWidth: 600, margin: "0 auto" }}>
        <p><b>Email:</b> {emp.email}</p>
        <p><b>Department:</b> {emp.department}</p>
        <p><b>Role:</b> {emp.role}</p>
        <p><b>Salary:</b> ₹{emp.salary}</p>
      </div>
    </div>
  );
}

export default EmployeeDetail;
