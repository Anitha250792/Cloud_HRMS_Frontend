import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/api";

export default function Register() {
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
      await api.post("/api/auth/register/", formData);
      navigate("/login");
    } catch (err) {
      setError(
        err.response?.data?.error || "Registration failed ❌"
      );
    }
  };

  return (
    <div style={page}>
      <div style={card}>
        <div style={icon}>📝</div>

        <h2 style={title}>Create Account</h2>
        <p style={sub}>Register to access HRMS</p>

        {error && <div style={errorBox}>{error}</div>}

        <form onSubmit={handleRegister} style={form}>
          <input
            type="text"
            placeholder="Full Name"
            required
            style={input}
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
          />

          <input
            type="email"
            placeholder="Email address"
            required
            style={input}
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />

          {/* ROLE (unchanged feature) */}
          <select
            style={input}
            value={formData.role}
            onChange={(e) =>
              setFormData({ ...formData, role: e.target.value })
            }
          >
            <option value="EMPLOYEE">Employee</option>
            <option value="HR">HR Admin</option>
          </select>

          <input
            type="password"
            placeholder="Password"
            required
            style={input}
            value={formData.password1}
            onChange={(e) =>
              setFormData({ ...formData, password1: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Confirm Password"
            required
            style={input}
            value={formData.password2}
            onChange={(e) =>
              setFormData({ ...formData, password2: e.target.value })
            }
          />

          <button style={btn}>Create Account</button>
        </form>

        <p style={bottom}>
          Already have an account?{" "}
          <Link to="/login" style={link}>Login</Link>
        </p>
      </div>
    </div>
  );
}

/* ---------- SAME STYLES AS LOGIN ---------- */

const page = {
  minHeight: "100vh",
  background: "linear-gradient(180deg,#eef2ff,#f8fafc)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const card = {
  width: 380,
  background: "#fff",
  borderRadius: 18,
  padding: "35px 30px",
  boxShadow: "0 15px 35px rgba(0,0,0,0.12)",
  textAlign: "center",
};

const icon = {
  width: 55,
  height: 55,
  borderRadius: "50%",
  background: "#2563eb",
  color: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "0 auto 15px",
  fontSize: 24,
};

const title = { fontSize: 22, fontWeight: 700 };
const sub = { fontSize: 14, color: "#6b7280", marginBottom: 20 };

const form = { display: "flex", flexDirection: "column", gap: 12 };

const input = {
  padding: 12,
  borderRadius: 10,
  border: "1px solid #e5e7eb",
  fontSize: 14,
  outline: "none",
};

const btn = {
  marginTop: 8,
  padding: 12,
  background: "#2563eb",
  color: "#fff",
  border: "none",
  borderRadius: 10,
  fontWeight: 600,
  cursor: "pointer",
};

const bottom = { marginTop: 15, fontSize: 14 };

const link = {
  color: "#2563eb",
  textDecoration: "none",
  fontWeight: 500,
};

const errorBox = {
  background: "#fee2e2",
  color: "#b91c1c",
  padding: 10,
  borderRadius: 8,
  marginBottom: 12,
};
