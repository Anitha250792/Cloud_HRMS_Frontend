import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/api";
import { authStyles as s } from "./authStyles";

function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({ email: "", password: "" });

  const handleLogin = async (e) => {
  e.preventDefault();
  setError("");
  setLoading(true);

  try {
    const res = await api.post("auth/login/", {
      email: form.email,
      password: form.password,
    });

    // ✅ TOKENS
    localStorage.setItem("access", res.data.access);
    localStorage.setItem("refresh", res.data.refresh);

    // ✅ ROLE
    localStorage.setItem("role", res.data.role);

    // ✅ USER (THIS WAS MISSING ❗)
    localStorage.setItem("user", JSON.stringify(res.data.user));

    navigate(
      res.data.role === "HR"
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
    <div style={s.page}>
      <div style={s.card}>
        <div style={s.icon}>🔒</div>
        <h2 style={s.title}>Login</h2>
        <p style={s.subtitle}>Login to access HRMS</p>

        {error && <div style={s.alertError}>{error}</div>}

        <form onSubmit={handleLogin} style={s.form}>
          <input
            type="email"
            placeholder="Email"
            style={s.input}
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <div style={s.field}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              style={s.input}
              required
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />
            <span
              style={s.eye}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>

          <button style={s.button} disabled={loading}>
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        <p style={s.bottomText}>
          New here?{" "}
          <Link to="/register" style={s.link}>
            Create account
          </Link>
        </p>

        <p style={s.bottomText}>
          <Link to="/forgot-password" style={s.link}>
            Forgot password?
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
