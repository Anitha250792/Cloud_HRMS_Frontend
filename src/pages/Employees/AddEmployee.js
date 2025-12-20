import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import PageLayout from "../../components/PageLayout";
import { THEME } from "../../theme";

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

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await api.post("/api/employees/create/", {
        ...form,
        salary: Number(form.salary),
      });
      navigate("/employees");
    } catch {
      setError("Failed to create employee");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageLayout title="➕ Add Employee">
      <form style={styles.card} onSubmit={handleSubmit}>
        {error && <div style={styles.error}>{error}</div>}

        {Object.keys(form).map((field) => (
          <div key={field} style={styles.group}>
            <label style={styles.label}>
              {field.replace("_", " ").toUpperCase()}
            </label>
            <input
              type={field === "salary" ? "number" : field === "date_joined" ? "date" : "text"}
              name={field}
              value={form[field]}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>
        ))}

        <button style={styles.button} disabled={loading}>
          {loading ? "Saving..." : "Save Employee"}
        </button>
      </form>
    </PageLayout>
  );
}

const styles = {
  card: {
    maxWidth: 520,
    margin: "0 auto",
    background: "#fff",
    padding: 28,
    borderRadius: 18,
    boxShadow: "0 15px 35px rgba(37,99,235,0.25)",
  },
  group: { marginBottom: 16 },
  label: {
    fontWeight: 600,
    color: THEME.primaryDark,
    marginBottom: 6,
    display: "block",
  },
  input: {
    width: "100%",
    padding: 12,
    borderRadius: 10,
    border: `1px solid ${THEME.border}`,
    background: THEME.light,
  },
  button: {
    width: "100%",
    padding: 14,
    background: THEME.primary,
    color: "#fff",
    borderRadius: 12,
    fontWeight: 700,
    border: "none",
    cursor: "pointer",
  },
  error: {
    background: "#FEE2E2",
    color: THEME.danger,
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
    fontWeight: 600,
  },
};

export default AddEmployee;
