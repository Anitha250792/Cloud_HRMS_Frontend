import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/api";

import { Page } from "../../theme/pageStyles";
import { Form } from "../../theme/formStyles";


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

