import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import api from "../../api/api";

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  /* ------------------ LOCAL LOGIN ------------------ */
  const handleLocalLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login/", {
        email: formData.email,
        password: formData.password,
      });

      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);
      localStorage.setItem("role", res.data.role);

      if (res.data.role === "HR") navigate("/admin-dashboard");
      else navigate("/employee-dashboard");

    } catch (err) {
      console.log(err);
      setError("Invalid login credentials");
    }
  };

  /* ------------------ GOOGLE LOGIN ------------------ */
  const handleGoogleLogin = async (credential) => {
  try {
    const res = await api.post("/auth/google/", { credential });

    localStorage.setItem("access", res.data.access);
    localStorage.setItem("refresh", res.data.refresh);
    localStorage.setItem("role", res.data.role);

    if (res.data.role === "HR") navigate("/admin-dashboard");
    else navigate("/employee-dashboard");

  } catch (err) {
    console.log(err);
    setError("Google Login Failed ❌");
  }
};


  return (
    <div style={page}>
      <div style={glass}>
        
        {/* LEFT */}
        <div style={left}>
          <h1 style={h1}>Welcome Back 👋</h1>
          <p style={sub}>Secure access for Employees & HR Admins</p>

          <ul style={list}>
            <li>✔ Local Login</li>
            <li>✔ Google Login</li>
            <li>✔ Role-Based Dashboards</li>
            <li>✔ JWT Authentication</li>
          </ul>
        </div>

        {/* RIGHT */}
        <div style={right}>
          <h2 style={title}>Sign In</h2>

          {error && <div style={errorBox}>{error}</div>}

          {/* LOCAL LOGIN FORM */}
          <form onSubmit={handleLocalLogin} style={form}>
            <label style={label}>Email</label>
            <input
              type="email"
              required
              placeholder="you@company.com"
              style={input}
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />

            <label style={label}>Password</label>
            <div style={passwordWrap}>
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="••••••••"
                style={{ ...input, paddingRight: 40 }}
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />

              <span
                style={eyeIcon}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>

            <button type="submit" style={btn}>
              Sign In
            </button>
          </form>

          {/* Register + Reset Password */}
          <div style={row}>
            <Link to="/register" style={link}>New User?</Link>
            <Link to="/forgot-password" style={link}>Reset Password</Link>
          </div>

          {/* DIVIDER */}
          <div style={divider}>
            <span style={line}></span>
            <span>OR</span>
            <span style={line}></span>
          </div>

          {/* GOOGLE LOGIN BUTTON */}
          <GoogleLogin
            onSuccess={(res) => handleGoogleLogin(res.credential)}
            onError={() => setError("Google Login Failed")}
            width="260"
          />

        </div>
      </div>
    </div>
  );
}

/* -------- PREMIUM STYLING (same as Register) -------- */

const page = {
  minHeight: "100vh",
  background: "linear-gradient(135deg,#0f0c29,#302b63,#24243e)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 30,
};

const glass = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  background: "rgba(255,255,255,0.07)",
  borderRadius: 25,
  padding: 40,
  backdropFilter: "blur(25px)",
  border: "1px solid rgba(255,255,255,0.15)",
  color: "white",
  width: "90%",
  maxWidth: 950,
  boxShadow: "0 8px 35px rgba(0,0,0,0.6)",
};

const left = { paddingRight: 25, borderRight: "1px solid rgba(255,255,255,0.15)" };
const right = { paddingLeft: 25 };

const h1 = { fontSize: 32, fontWeight: 800 };
const sub = { opacity: 0.8 };

const list = { marginTop: 20, lineHeight: 1.7, opacity: 0.85 };

const title = { fontSize: 26, marginBottom: 20 };

const form = { display: "flex", flexDirection: "column", gap: 12 };

const label = { fontSize: 14, opacity: 0.9 };

const input = {
  padding: "12px 14px",
  background: "rgba(255,255,255,0.12)",
  borderRadius: 12,
  border: "1px solid rgba(255,255,255,0.25)",
  color: "#fff",
  outline: "none",
  fontSize: 15,
};

const passwordWrap = { position: "relative" };

const eyeIcon = {
  position: "absolute",
  right: 10,
  top: 10,
  cursor: "pointer",
  fontSize: 18,
};

const btn = {
  marginTop: 10,
  padding: "12px 14px",
  background: "linear-gradient(135deg,#6366f1,#4f46e5)",
  borderRadius: 12,
  border: "none",
  color: "#fff",
  fontWeight: 700,
  cursor: "pointer",
  fontSize: 16,
};

const row = {
  marginTop: 12,
  display: "flex",
  justifyContent: "space-between",
};

const link = { color: "#a5b4fc", textDecoration: "underline" };

const divider = {
  marginTop: 20,
  marginBottom: 15,
  display: "flex",
  alignItems: "center",
  gap: 8,
};

const line = { flex: 1, height: 1, background: "rgba(255,255,255,0.25)" };

const errorBox = {
  padding: 12,
  background: "rgba(255,0,0,0.18)",
  border: "1px solid rgba(255,0,0,0.4)",
  color: "#ffb3b3",
  borderRadius: 12,
  marginBottom: 15,
};

export default Login;
