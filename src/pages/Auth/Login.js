import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import api from "../../api/api";

export default function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  /* ---------------- LOGIN ---------------- */
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/auth/login/", {
        email: formData.email,
        password: formData.password,
      });

      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);
      localStorage.setItem("role", res.data.role);

      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.error ||
        err.response?.data?.detail ||
        "Invalid email or password ❌"
      );
    }
  };

  /* ---------------- GOOGLE LOGIN ---------------- */
  const handleGoogleLogin = async (credential) => {
    try {
      const res = await api.post("/auth/google/", { credential });

      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);
      localStorage.setItem("role", res.data.role);

      navigate("/dashboard");
    } catch {
      setError("Google login failed ❌");
    }
  };

  return (
    <div style={page}>
      <div style={card}>
        <div style={icon}>🔒</div>

        <h2 style={title}>Welcome Back</h2>
        <p style={sub}>Login to access HRMS</p>

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
              style={{ ...input, paddingRight: 40 }}
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            <span
              style={eye}
              onClick={() => setShowPassword(!showPassword)}
              title="Show / Hide password"
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>

          <button style={btn}>Sign In</button>
        </form>

        {/* GOOGLE LOGIN */}
        <div style={googleWrap}>
          <GoogleLogin
            onSuccess={(res) => handleGoogleLogin(res.credential)}
            onError={() => setError("Google login failed ❌")}
          />
        </div>

        <p style={bottom}>
          New here?{" "}
          <Link to="/register" style={link}>
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
}

/* ---------- SAME STYLES AS REGISTER ---------- */

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

const eye = {
  position: "absolute",
  right: 12,
  top: 12,
  cursor: "pointer",
  fontSize: 16,
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

const googleWrap = {
  marginTop: 15,
  display: "flex",
  justifyContent: "center",
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
