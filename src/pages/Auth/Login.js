import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/api";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("auth/login/", {
        email,
        password,
      });

      // dj-rest-auth response
      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);
      localStorage.setItem("role", res.data.user.role);

      navigate(
        res.data.user.role === "HR"
          ? "/admin-dashboard"
          : "/employee-dashboard",
        { replace: true }
      );
    } catch (err) {
      setError("Invalid email or password ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={page}>
      <div style={card}>
        <div style={icon}>🔐</div>

        <h2 style={title}>Welcome Back</h2>
        <p style={subtitle}>Login to access HRMS</p>

        {error && <div style={errorBox}>{error}</div>}

        <form onSubmit={handleLogin} style={form}>
          {/* EMAIL */}
          <input
            style={input}
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* PASSWORD + TOGGLE */}
          <div style={passwordWrap}>
            <input
              style={input}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              style={eye}
              onClick={() => setShowPassword(!showPassword)}
              title={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>

          <button style={btn} disabled={loading}>
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        {/* LINKS */}
        <div style={links}>
          <Link to="/forgot-password" style={link}>
            Forgot password?
          </Link>
        </div>

        <p style={bottomText}>
          New here?{" "}
          <Link to="/register" style={linkBold}>
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;

/* ================= STYLES (PROFESSIONAL BLUE) ================= */

const page = {
  minHeight: "100vh",
  background: "linear-gradient(180deg,#eef2ff,#f8fafc)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const card = {
  width: 380,
  background: "#fff",
  padding: "36px 32px",
  borderRadius: 18,
  boxShadow: "0 18px 40px rgba(0,0,0,0.12)",
  textAlign: "center",
};

const icon = {
  width: 56,
  height: 56,
  borderRadius: "50%",
  background: "#2563eb",
  color: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "0 auto 16px",
  fontSize: 24,
};

const title = { fontSize: 22, fontWeight: 700 };
const subtitle = { fontSize: 14, color: "#6b7280", marginBottom: 20 };

const form = { display: "flex", flexDirection: "column", gap: 14 };

const input = {
  width: "100%",
  padding: "12px 42px 12px 12px",
  borderRadius: 10,
  border: "1px solid #e5e7eb",
  fontSize: 14,
  outline: "none",
  boxSizing: "border-box",
};

const passwordWrap = {
  position: "relative",
};

const eye = {
  position: "absolute",
  right: 12,
  top: "50%",
  transform: "translateY(-50%)",
  cursor: "pointer",
  fontSize: 16,
  userSelect: "none",
};

const btn = {
  marginTop: 6,
  padding: 12,
  background: "#2563eb",
  color: "#fff",
  border: "none",
  borderRadius: 10,
  fontWeight: 600,
  cursor: "pointer",
};

const links = {
  marginTop: 14,
};

const bottomText = {
  marginTop: 18,
  fontSize: 14,
  color: "#374151",
};

const link = {
  color: "#2563eb",
  textDecoration: "none",
  fontWeight: 500,
};

const linkBold = {
  color: "#2563eb",
  textDecoration: "none",
  fontWeight: 700,
};

const errorBox = {
  background: "#fee2e2",
  color: "#b91c1c",
  padding: 10,
  borderRadius: 8,
  marginBottom: 12,
};
