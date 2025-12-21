import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/api";
import { Page } from "../../theme/pageStyles";
import { Form } from "../../theme/formStyles";

function EditEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get(`/api/employees/${id}/`)
      .then(res => setForm(res.data))
      .catch(() => setError("Failed to load employee"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    await api.put(`/api/employees/update/${id}/`, {
      ...form,
      salary: Number(form.salary),
    });
    navigate("/employees");
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div style={Page.wrapper}>
      <h2 style={Page.title}>✏️ Edit Employee</h2>

      <form style={{ ...Page.card, maxWidth: 520, margin: "0 auto" }} onSubmit={handleSubmit}>
        {error && <div style={Form.error}>{error}</div>}

        {Object.keys(form).map(field => (
          <div key={field} style={Form.group}>
            <label style={Form.label}>{field.replace("_", " ").toUpperCase()}</label>
            <input
              name={field}
              value={form[field] || ""}
              onChange={handleChange}
              style={Form.input}
            />
          </div>
        ))}

        <button style={Form.button}>Save Changes</button>
      </form>
    </div>
  );
}

export default EditEmployee;
