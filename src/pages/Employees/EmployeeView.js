import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../api/api";

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

/* Styles */

const wrapper = {
  minHeight: "100vh",
  padding: "90px 24px",
  background: "linear-gradient(135deg,#ecfdf3,#d1fae5)",
};

const title = {
  fontSize: 24,
  fontWeight: 700,
  color: "#065f46",
  marginBottom: 20,
};

const card = {
  maxWidth: 500,
  margin: "0 auto",
  background: "#fff",
  padding: 24,
  borderRadius: 14,
  fontSize: 16,
  lineHeight: "1.7",
  boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
};

const editButton = {
  display: "inline-block",
  marginTop: 20,
  padding: "10px 16px",
  background: "#2563eb",
  color: "white",
  borderRadius: 8,
  textDecoration: "none",
  fontWeight: 600,
};

const loading = {
  paddingTop: 100,
  textAlign: "center",
  color: "#444",
};

export default EmployeeView;
