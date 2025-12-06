import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/api";

function EditEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    loadEmployee();
  }, []);

  const loadEmployee = async () => {
    try {
      const res = await api.get(`employees/${id}/`);
      setEmployee(res.data);
    } catch (error) {
      console.error("Error loading employee", error);
    }
  };

  if (!employee) return <h2 style={{ padding: 50 }}>Loading...</h2>;

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.put(`employees/${id}/`, employee);
      alert("Employee updated successfully!");
      navigate("/employees");
    } catch (error) {
      console.error("Error updating employee", error);
      alert("Update failed!");
    }
  };

  return (
    <div style={wrapper}>
      <div style={card}>
        <h2 style={title}>Edit Employee</h2>

        <form onSubmit={handleSubmit} style={form}>
          <label style={label}>Name</label>
          <input
            type="text"
            name="name"
            value={employee.name}
            onChange={handleChange}
            style={input}
          />

          <label style={label}>Email</label>
          <input
            type="email"
            name="email"
            value={employee.email}
            onChange={handleChange}
            style={input}
          />

          <label style={label}>Department</label>
          <input
            type="text"
            name="department"
            value={employee.department}
            onChange={handleChange}
            style={input}
          />

          <label style={label}>Salary</label>
          <input
            type="number"
            name="salary"
            value={employee.salary}
            onChange={handleChange}
            style={input}
          />

          <label style={label}>Status</label>
          <select
            name="status"
            value={employee.status}
            onChange={handleChange}
            style={input}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          <button style={saveButton}>✔ Save Changes</button>
        </form>
      </div>
    </div>
  );
}

/* ---------- Styles ---------- */
const wrapper = {
  paddingTop: 90,
  padding: 20,
  minHeight: "100vh",
  background: "linear-gradient(135deg,#ecfdf3,#d1fae5)",
};

const card = {
  maxWidth: 500,
  margin: "auto",
  background: "white",
  padding: 25,
  borderRadius: 16,
  boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
};

const title = {
  marginBottom: 20,
  color: "#065f46",
  fontWeight: 700,
};

const form = {
  display: "flex",
  flexDirection: "column",
  gap: 12,
};

const label = {
  fontSize: 14,
  fontWeight: 600,
  color: "#064e3b",
};

const input = {
  padding: 10,
  borderRadius: 10,
  border: "1px solid #d1d5db",
};

const saveButton = {
  background: "#059669",
  color: "white",
  border: "none",
  padding: "12px 16px",
  borderRadius: 10,
  marginTop: 8,
  fontWeight: 700,
  cursor: "pointer",
};

export default EditEmployee;
