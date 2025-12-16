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

  useEffect(() => {
    api
      .get("employees/")
      .then((res) => {
        const emp = res.data.find((e) => e.id === Number(id));
        if (!emp) {
          setError("Employee not found");
        } else {
          setForm(emp);
        }
      })
      .catch(() => setError("Failed to load employee"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      await api.put(`employees/update/${id}/`, {
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

  if (loading) return <p style={loadingText}>Loading employee...</p>;

  return (
    <div style={wrapper}>
      <h2 style={title}>✏️ Edit Employee</h2>

      <form style={formBox} onSubmit={handleSubmit}>
        {error && <p style={errorBox}>{error}</p>}

        {Object.keys(form).map((field) => (
          <div style={formGroup} key={field}>
            <label style={label}>
              {field.replace("_", " ").toUpperCase()}
            </label>
            <input
              type={
                field === "date_joined"
                  ? "date"
                  : field === "salary"
                  ? "number"
                  : "text"
              }
              name={field}
              value={form[field]}
              onChange={handleChange}
              style={input}
              required
            />
          </div>
        ))}

        <button style={button} disabled={saving}>
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}

export default EditEmployee;

/* ================= STYLES ================= */

const loadingText = {
  textAlign: "center",
  marginTop: 80,
  fontSize: 18,
  fontWeight: 600,
  color: "#065f46",
};

const wrapper = {
  minHeight: "100vh",
  padding: "90px 24px",
  background: "linear-gradient(135deg,#ecfdf3,#d1fae5)",
};

const title = {
  fontSize: 26,
  fontWeight: 800,
  color: "#065f46",
  marginBottom: 25,
  textAlign: "center",
};

const formBox = {
  maxWidth: 520,
  margin: "0 auto",
  background: "#fff",
  padding: 28,
  borderRadius: 16,
  boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
};

const formGroup = {
  marginBottom: 16,
};

const label = {
  display: "block",
  marginBottom: 6,
  fontWeight: 600,
  color: "#065f46",
  fontSize: 14,
};

const input = {
  width: "100%",
  padding: 10,
  borderRadius: 8,
  border: "1px solid #cbd5e1",
  fontSize: 14,
};

const button = {
  width: "100%",
  padding: 12,
  background: "#059669",
  color: "white",
  borderRadius: 10,
  fontSize: 16,
  border: "none",
  cursor: "pointer",
  marginTop: 10,
};

const errorBox = {
  background: "#fee2e2",
  color: "#991b1b",
  padding: 10,
  borderRadius: 8,
  marginBottom: 16,
  fontWeight: 600,
  textAlign: "center",
};
