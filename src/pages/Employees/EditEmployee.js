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

  /* ================= LOAD EMPLOYEE ================= */
  useEffect(() => {
    api
      .get("employees/${id}/") // ✅ FIXED PATH
      .then((res) => setForm(res.data))
      .catch(() => setError("Failed to load employee"))
      .finally(() => setLoading(false));
  }, [id]);

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* ================= SAVE ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      await api.put("employees/update/${id}/", {
        ...form,
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

        {/* EMP CODE */}
        <div style={Form.group}>
          <label style={Form.label}>Employee Code</label>
          <input
            name="emp_code"
            value={form.emp_code}
            onChange={handleChange}
            style={Form.input}
            disabled
          />
        </div>

        {/* NAME */}
        <div style={Form.group}>
          <label style={Form.label}>Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            style={Form.input}
            required
          />
        </div>

        {/* EMAIL */}
        <div style={Form.group}>
          <label style={Form.label}>Email</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            style={Form.input}
            disabled
          />
        </div>

        {/* DEPARTMENT */}
        <div style={Form.group}>
          <label style={Form.label}>Department</label>
          <input
            name="department"
            value={form.department}
            onChange={handleChange}
            style={Form.input}
          />
        </div>

        {/* ROLE */}
        <div style={Form.group}>
          <label style={Form.label}>Role</label>
          <input
            name="role"
            value={form.role}
            onChange={handleChange}
            style={Form.input}
          />
        </div>

        {/* SALARY */}
        <div style={Form.group}>
          <label style={Form.label}>Salary</label>
          <input
            name="salary"
            type="number"
            value={form.salary}
            onChange={handleChange}
            style={Form.input}
          />
        </div>

        {/* JOIN DATE */}
        <div style={Form.group}>
          <label style={Form.label}>Date Joined</label>
          <input
            name="date_joined"
            type="date"
            value={form.date_joined}
            onChange={handleChange}
            style={Form.input}
          />
        </div>

        <button style={Form.button} disabled={saving}>
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}

export default EditEmployee;

/* ================= STYLES ================= */

const styles = {
  center: {
    textAlign: "center",
    padding: 30,
    opacity: 0.7,
  },
};
