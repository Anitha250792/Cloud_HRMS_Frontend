import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import api from "../../api/api";

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleLogin = async (e) => {
  e.preventDefault();
  setError("");

  try {
    const res = await api.post("/api/auth/login/", {
      email: formData.email,
      password: formData.password,
    });

    localStorage.setItem("access", res.data.access);
    localStorage.setItem("refresh", res.data.refresh);

    navigate("/dashboard");
  } catch (err) {
    setError("Invalid email or password ❌");
  }
};

const handleGoogleLogin = async (credential) => {
  try {
    const res = await api.post("/api/auth/google/", { credential });

    localStorage.setItem("access", res.data.access);
    localStorage.setItem("refresh", res.data.refresh);

    navigate("/dashboard");
  } catch {
    setError("Google login failed ❌");
  }
};


  return (
    <div style={page}>
      <div style={card}>
        <div style={icon}>🔒</div>
        <h2 style={title}>Admin Login</h2>
        <p style={sub}>Access Admin Dashboard</p>

        {error && <div style={errorBox}>{error}</div>}

        <form onSubmit={handleLogin} style={form}>
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

          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
              style={input}
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            <span style={eye} onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>

          <button style={btn}>Sign In</button>
        </form>

        <div style={divider}>OR</div>

        <GoogleLogin
          onSuccess={(res) => handleGoogleLogin(res.credential)}
          onError={() => setError("Google Login Failed")}
        />

        <p style={bottom}>
          New user? <Link to="/register">Create account</Link>
        </p>
      </div>
    </div>
  );
}

/* ---------- styles ---------- */

const page = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "#f1f5f9",
};

const card = {
  width: 360,
  background: "#fff",
  padding: 30,
  borderRadius: 16,
  boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
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
};

const title = { fontSize: 22, fontWeight: 700 };
const sub = { fontSize: 14, color: "#6b7280", marginBottom: 20 };

const form = { display: "flex", flexDirection: "column", gap: 12 };

const input = {
  padding: 12,
  borderRadius: 10,
  border: "1px solid #e5e7eb",
};

const eye = {
  position: "absolute",
  right: 12,
  top: 12,
  cursor: "pointer",
};

const btn = {
  padding: 12,
  background: "#2563eb",
  color: "#fff",
  border: "none",
  borderRadius: 10,
  fontWeight: 600,
};

const divider = { margin: "15px 0", color: "#9ca3af" };

const bottom = { marginTop: 15, fontSize: 14 };

const errorBox = {
  background: "#fee2e2",
  color: "#b91c1c",
  padding: 10,
  borderRadius: 8,
  marginBottom: 10,
};
