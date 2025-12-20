import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";

function AddEmployee() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
  setError("");
  setLoading(true);

  const payload = {
    emp_code: form.emp_code.trim(),
    name: form.name.trim(),
    email: form.email.trim(),
    department: form.department.trim(),
    role: form.role.trim(),
    salary: Number(form.salary),
    date_joined: form.date_joined,
  };

  try {
    const res = await api.post("/api/employees/create/", payload);

    if (res.data.action === "created") {
      alert("✅ Employee created successfully");
      navigate("/employees");
    }

    if (res.data.action === "edit") {
      alert("ℹ️ Employee already exists. Redirecting to Edit page...");
      navigate(`/employees/edit/${res.data.employee_id}`);
    }
  } catch (err) {
    if (err.response?.data) {
      const firstError = Object.values(err.response.data)[0][0];
      setError(firstError);
    } else {
      setError("❌ Failed to add employee");
    }
  } finally {
    setLoading(false);
  }
};

  return (
    <div style={wrapper}>
      <h2 style={title}> Add New Employee</h2>

      <form style={formBox} onSubmit={handleSubmit}>
        {error && <p style={errorBox}>{error}</p>}

        {[
          ["Employee Code", "emp_code"],
          ["Name", "name"],
          ["Email", "email"],
          ["Department", "department"],
          ["Role", "role"],
          ["Salary", "salary"],
        ].map(([labelText, name]) => (
          <div key={name} style={formGroup}>
            <label style={label}>{labelText}</label>
            <input
              type={name === "salary" ? "number" : "text"}
              name={name}
              value={form[name]}
              onChange={handleChange}
              style={input}
              required
            />
          </div>
        ))}

        <div style={formGroup}>
          <label style={label}>Date Joined</label>
          <input
            type="date"
            name="date_joined"
            value={form.date_joined}
            onChange={handleChange}
            style={input}
            required
          />
        </div>

        <button style={button} disabled={loading}>
          {loading ? "Saving..." : "Save Employee"}
        </button>
      </form>
    </div>
  );
}

/* ================= STYLES ================= */

const wrapper = {
  minHeight: "100vh",
  padding: "90px 24px",
  background: "linear-gradient(135deg,#e0f2fe,#f0f9ff)",
};

const title = {
  fontSize: 26,
  fontWeight: 800,
  color: "#0c4a6e",
  marginBottom: 25,
  textAlign: "center",
};

const formBox = {
  maxWidth: 520,
  margin: "0 auto",
  background: "#ffffff",
  padding: 28,
  borderRadius: 18,
  boxShadow: "0 15px 35px rgba(2,132,199,0.18)",
};

const formGroup = { marginBottom: 18 };

const label = {
  display: "block",
  marginBottom: 6,
  fontWeight: 600,
  color: "#0369a1",
};

const input = {
  width: "100%",
  padding: 12,
  borderRadius: 10,
  border: "1px solid #bae6fd",
  background: "#f0f9ff",
  outline: "none",
  fontSize: 14,
};

const button = {
  width: "100%",
  padding: 14,
  background: "linear-gradient(135deg,#0284c7,#0369a1)",
  color: "#ffffff",
  borderRadius: 12,
  fontSize: 16,
  fontWeight: 700,
  border: "none",
  cursor: "pointer",
  boxShadow: "0 8px 20px rgba(2,132,199,0.35)",
};

const errorBox = {
  background: "#fee2e2",
  color: "#7f1d1d",
  padding: 12,
  borderRadius: 10,
  marginBottom: 16,
  fontWeight: 600,
};

export default AddEmployee;
