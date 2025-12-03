import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";

function AddEmployee() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    emp_code: "",
    name: "",
    email: "",
    department: "",
    role: "",
    salary: "",
    date_joined: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("employees/", form);
    navigate("/employees");
  };

  return (
    <div style={wrapper}>
      <h2 style={title}> Add Employee</h2>

      <form style={formBox} onSubmit={handleSubmit}>
        {Object.keys(form).map((field) => (
          <div style={formGroup} key={field}>
            <label style={label}>{field.replace("_", " ").toUpperCase()}</label>
            <input
              type={field === "date_joined" ? "date" : "text"}
              name={field}
              value={form[field]}
              onChange={handleChange}
              style={input}
              required
            />
          </div>
        ))}

        <button style={button}>Save Employee</button>
      </form>
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

const formBox = {
  maxWidth: 500,
  margin: "0 auto",
  background: "#fff",
  padding: 24,
  borderRadius: 14,
  boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
};

const formGroup = { marginBottom: 16 };

const label = {
  display: "block",
  marginBottom: 6,
  fontWeight: 600,
  color: "#065f46",
};

const input = {
  width: "100%",
  padding: 10,
  borderRadius: 8,
  border: "1px solid #ccc",
  outline: "none",
};

const button = {
  width: "100%",
  padding: 12,
  background: "#059669",
  color: "white",
  borderRadius: 8,
  fontSize: 16,
  border: "none",
  cursor: "pointer",
};

export default AddEmployee;
