import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/api";
import { authStyles as styles } from "./authStyles";

function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "EMPLOYEE",
    password1: "",
    password2: "",
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password1 !== formData.password2) {
      setError("Passwords do not match ❌");
      return;
    }

    try {
      await api.post("auth/register/", formData);
      navigate("/login");
    } catch (err) {
      setError(
        err.response?.data?.error ||
          err.response?.data?.detail ||
          "Registration failed ❌"
      );
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create Account</h2>
        <p style={styles.subtitle}>Register to access HRMS</p>

        {error && <div style={styles.alert}>{error}</div>}

        <form onSubmit={handleRegister}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Full Name</label>
            <input
              style={styles.input}
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              style={styles.input}
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Role</label>
            <select
              style={styles.input}
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
            >
              <option value="EMPLOYEE">Employee</option>
              <option value="HR">HR Admin</option>
            </select>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              style={styles.input}
              value={formData.password1}
              onChange={(e) =>
                setFormData({ ...formData, password1: e.target.value })
              }
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Confirm Password</label>
            <input
              type="password"
              style={styles.input}
              value={formData.password2}
              onChange={(e) =>
                setFormData({ ...formData, password2: e.target.value })
              }
              required
            />
          </div>

          <button style={styles.button}>Create Account</button>
        </form>

        <p style={{ marginTop: 16, textAlign: "center" }}>
          Already have an account?{" "}
          <Link to="/login" style={{ fontWeight: 600, color: "#2563eb" }}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
