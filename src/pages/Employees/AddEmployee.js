import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import PageLayout from "../../components/PageLayout";


import { Page } from "../../theme/pageStyles";
import { Form } from "../../theme/formStyles";



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



export default AddEmployee;
