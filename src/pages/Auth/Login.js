import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/api";
import { authStyles as s } from "./authStyles";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  /* =====================================================
     🔐 AUTO REDIRECT IF ALREADY LOGGED IN
     ===================================================== */
  useEffect(() => {
    const token = localStorage.getItem("access");
    const role = localStorage.getItem("role");

    if (token && role) {
      navigate(
        role === "ADMIN" || role === "HR"
          ? "/admin-dashboard"
          : "/employee-dashboard",
        { replace: true }
      );
    }
  }, [navigate]);

  /* =====================================================
     🔑 LOGIN HANDLER
     ===================================================== */
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("auth/login/", {
        email: form.email,
        password: form.password,
      });

      const { access, refresh, role, user } = res.data;

      // ✅ Save auth data
      localStorage.setItem("access", access);
      localStorage.setItem("refresh", refresh);
      localStorage.setItem("role", role);
      localStorage.setItem("user", JSON.stringify(user));

      // ✅ Redirect by role
      navigate(
        role === "ADMIN" || role === "HR"
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

  /* =====================================================
     🧾 UI
     ===================================================== */
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
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
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
