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

  /* ================= LOAD ================= */
  useEffect(() => {
    api
      .get(`employees/${id}/`)
      .then((res) => setForm(res.data))
      .catch(() => setError("Failed to load employee"))
      .finally(() => setLoading(false));
  }, [id]);

  /* ================= CHANGE ================= */
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  /* ================= SAVE ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      await api.put(`employees/update/${id}/`, {
        name: form.name,
        department: form.department,
        role: form.role,
        salary: Number(form.salary),
      });
      navigate("/employees");
    } catch {
      setError("Failed to update employee");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p style={styles.center}>Loading employee details…</p>;
  }

  return (
    <div style={Page.wrapper}>
      <h2 style={Page.title}>✏️ Edit Employee</h2>

      <form
        onSubmit={handleSubmit}
        style={{ ...Page.card, maxWidth: 560, margin: "0 auto" }}
      >
        {error && <div style={Form.error}>{error}</div>}

        <Field label="Employee Code" value={form.emp_code} disabled />
        <Field label="Name" name="name" value={form.name} onChange={handleChange} />
        <Field label="Email" value={form.email} disabled />
        <Field label="Department" name="department" value={form.department} onChange={handleChange} />
        <Field label="Role" name="role" value={form.role} onChange={handleChange} />
        <Field label="Salary" name="salary" type="number" value={form.salary} onChange={handleChange} />
        <Field label="Date Joined" type="date" value={form.date_joined} disabled />

        <button style={Form.button} disabled={saving}>
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}

/* ---------- Reusable Field ---------- */
const Field = ({ label, name, value, onChange, type = "text", disabled }) => (
  <div style={Form.group}>
    <label style={Form.label}>{label}</label>
    <input
      name={name}
      type={type}
      value={value || ""}
      onChange={onChange}
      disabled={disabled}
      style={{
        ...Form.input,
        opacity: disabled ? 0.6 : 1,
        cursor: disabled ? "not-allowed" : "text",
      }}
    />
  </div>
);

const styles = {
  center: {
    textAlign: "center",
    padding: 30,
    opacity: 0.7,
  },
};

export default EditEmployee;
