import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../api/api";

import { Page } from "../../theme/pageStyles";
import { Form } from "../../theme/formStyles";


function EmployeeView() {
  const { id } = useParams();
  const [emp, setEmp] = useState(null);

  useEffect(() => {
    loadEmployee();
  }, []);

  const loadEmployee = async () => {
    const res = await api.get(`employees/${id}/`);
    setEmp(res.data);
  };

  if (!emp) return <p style={loading}>Loading...</p>;

  return (
    <div style={wrapper}>
      <h2 style={title}>👤 Employee Profile</h2>

      <div style={card}>
        <p><strong>Name:</strong> {emp.name}</p>
        <p><strong>Email:</strong> {emp.email}</p>
        <p><strong>Department:</strong> {emp.department}</p>
        <p><strong>Role:</strong> {emp.role}</p>
        <p><strong>Salary:</strong> ₹ {emp.salary}</p>
        <p><strong>Joined:</strong> {emp.date_joined}</p>

        <Link to={`/employees/${id}/edit`} style={editButton}>
          ✏ Edit Employee
        </Link>
      </div>
    </div>
  );
}

export default EmployeeView;
