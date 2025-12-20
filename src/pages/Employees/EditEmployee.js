import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/api";

function EditEmployee() {
  const { id } = useParams();
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

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  /* ================= LOAD EMPLOYEE (PRODUCTION SAFE) ================= */
  useEffect(() => {
    const loadEmployee = async () => {
      try {
        const res = await api.get(`/api/employees/${id}/`);
        setForm(res.data);
      } catch (err) {
        setError("❌ Failed to load employee");
      } finally {
        setLoading(false);
      }
    };

    loadEmployee();
  }, [id]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      await api.put(`/api/employees/update/${id}/`, {
        ...form,
        salary: Number(form.salary),
      });

      alert("✅ Employee updated successfully");
      navigate("/employees");
    } catch (err) {
      setError("❌ Failed to update employee");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p style={loadingText}>Loading employee details...</p>;
  }

  return (
    <div style={wrapper}>
      <h2 style={title}>✏️ Edit Employee</h2>

      <form style={formBox} onSubmit={handleSubmit}>
        {error && <div style={errorBox}>{error}</div>}

        {[
          ["Employee Code", "emp_code"],
          ["Name", "name"],
          ["Email", "email"],
          ["Department", "department"],
          ["Role", "role"],
          ["Salary", "salary"],
        ].map(([labelText, field]) => (
          <div key={field} style={formGroup}>
            <label style={label}>{labelText}</label>
            <input
              type={field === "salary" ? "number" : "text"}
              name={field}
              value={form[field]}
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

        <button style={button} disabled={saving}>
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}

export default EditEmployee;

/* ===================== STYLES (MATCH SIDEBAR BLUE) ===================== */

const wrapper = {
  minHeight: "100vh",
  padding: "90px 24px",
  background: "linear-gradient(135deg,#e0f2fe,#f0f9ff)",
};

const title = {
  fontSize: 26,
  fontWeight: 800,
  color: "#1e3a8a",
  marginBottom: 24,
  textAlign: "center",
};

const formBox = {
  maxWidth: 520,
  margin: "0 auto",
  background: "#ffffff",
  padding: 30,
  borderRadius: 18,
  boxShadow: "0 15px 35px rgba(37,99,235,0.25)",
};

const formGroup = { marginBottom: 16 };

const label = {
  display: "block",
  marginBottom: 6,
  fontWeight: 600,
  color: "#1e40af",
};

const input = {
  width: "100%",
  padding: 12,
  borderRadius: 10,
  border: "1px solid #bfdbfe",
  background: "#eff6ff",
  fontSize: 14,
  outline: "none",
};

const button = {
  width: "100%",
  padding: 14,
  background: "linear-gradient(135deg,#2563eb,#1d4ed8)",
  color: "#ffffff",
  borderRadius: 12,
  fontSize: 16,
  fontWeight: 700,
  border: "none",
  cursor: "pointer",
  boxShadow: "0 10px 25px rgba(37,99,235,0.45)",
};

const errorBox = {
  background: "#fee2e2",
  color: "#7f1d1d",
  padding: 12,
  borderRadius: 10,
  marginBottom: 16,
  fontWeight: 600,
  textAlign: "center",
};

const loadingText = {
  textAlign: "center",
  marginTop: 120,
  fontSize: 18,
  fontWeight: 600,
  color: "#1e3a8a",
};
