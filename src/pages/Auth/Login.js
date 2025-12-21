import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/api";

function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/api/auth/login/", formData);

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
      setError(
        err.response?.data?.non_field_errors?.[0] ||
        "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <form onSubmit={handleLogin} style={{ width: 380, padding: 30, background: "#fff", borderRadius: 16 }}>
        <h2>Login</h2>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <input
          type="email"
          placeholder="Email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          required
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />

        <button disabled={loading}>
          {loading ? "Signing in..." : "Login"}
        </button>

        <p>
          <Link to="/forgot-password">Forgot password?</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
