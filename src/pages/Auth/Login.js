import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import api from "../../api/api";

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({ email: "", password: "" });

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
        "Invalid email or password"
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
      setError("Google login failed");
    }
  };

  return (
    <div style={page}>
      <div style={card}>
        {/* HEADER */}
        <div style={logo}>HRMS</div>
        <h2 style={title}>Welcome Back 👋</h2>
        <p style={sub}>Login to continue to your dashboard</p>

        {error && <div style={errorBox}>{error}</div>}

        {/* FORM */}
        <form onSubmit={handleLogin} style={form}>
          {/* EMAIL */}
          <div style={field}>
            <input
              type="email"
              required
              style={input}
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <label style={label}>Email address</label>
          </div>

          {/* PASSWORD */}
          <div style={field}>
            <input
              type={showPassword ? "text" : "password"}
              required
              style={{ ...input, paddingRight: 44 }}
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            <label style={label}>Password</label>

            <span
              style={eye}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>

          <button style={btn}>Sign In</button>
        </form>

        {/* DIVIDER */}
        <div style={divider}>
          <span style={line}></span>
          <span style={or}>OR</span>
          <span style={line}></span>
        </div>

        {/* GOOGLE LOGIN */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <GoogleLogin
            onSuccess={(res) => handleGoogleLogin(res.credential)}
            onError={() => setError("Google Login Failed")}
            width="260"
          />
        </div>

        <p style={bottom}>
          New here?{" "}
          <Link to="/register" style={link}>
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const page = {
  minHeight: "100vh",
  background: "linear-gradient(135deg,#0f172a,#1e293b,#020617)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: 20,
};

const card = {
  width: 380,
  padding: "36px 32px",
  borderRadius: 20,
  background: "rgba(255,255,255,0.08)",
  backdropFilter: "blur(18px)",
  boxShadow: "0 20px 60px rgba(0,0,0,0.55)",
  color: "#fff",
  textAlign: "center",
};

const logo = {
  width: 64,
  height: 64,
  borderRadius: "50%",
  background: "linear-gradient(135deg,#6366f1,#4f46e5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "0 auto 16px",
  fontWeight: 800,
  fontSize: 18,
};

const title = { fontSize: 26, fontWeight: 800 };
const sub = { fontSize: 14, opacity: 0.8, marginBottom: 24 };

const form = { display: "flex", flexDirection: "column", gap: 18 };

const field = { position: "relative" };

const input = {
  width: "100%",
  padding: "16px 14px 10px",
  background: "rgba(255,255,255,0.12)",
  border: "1px solid rgba(255,255,255,0.25)",
  borderRadius: 12,
  color: "#fff",
  outline: "none",
  fontSize: 15,
};

const label = {
  position: "absolute",
  top: 8,
  left: 14,
  fontSize: 12,
  color: "#c7d2fe",
};

const eye = {
  position: "absolute",
  right: 12,
  top: 18,
  cursor: "pointer",
  fontSize: 18,
};

const btn = {
  marginTop: 10,
  padding: "14px",
  background: "linear-gradient(135deg,#6366f1,#4f46e5)",
  borderRadius: 14,
  border: "none",
  color: "#fff",
  fontSize: 16,
  fontWeight: 700,
  cursor: "pointer",
};

const divider = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  margin: "22px 0",
};

const line = {
  flex: 1,
  height: 1,
  background: "rgba(255,255,255,0.3)",
};

const or = { fontSize: 13, opacity: 0.7 };

const bottom = { marginTop: 18, fontSize: 14, opacity: 0.9 };
const link = { color: "#a5b4fc", fontWeight: 600 };

const errorBox = {
  background: "rgba(239,68,68,0.2)",
  border: "1px solid rgba(239,68,68,0.5)",
  color: "#fecaca",
  padding: 12,
  borderRadius: 12,
  marginBottom: 18,
};
