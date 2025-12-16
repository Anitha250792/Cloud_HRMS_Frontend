import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";

function ResetPassword() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    old_password: "",
    new_password: "",
    confirm_password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (form.new_password !== form.confirm_password) {
      return setError("New password and confirm password do not match ❌");
    }
    if (form.new_password.length < 6) {
      return setError("Password must be at least 6 characters ❌");
    }

    try {
      const res = await api.post("auth/reset-password/", {
        old_password: form.old_password,
        new_password: form.new_password,
      });

      if (res.status === 200) {
        setSuccess("Password updated successfully ✔ Redirecting…");
        setTimeout(() => navigate("/login"), 1500);
      }
    } catch (err) {
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError("Failed to reset password ❌");
      }
    }
  };

  return (
    <div style={wrapper}>
      <div style={card}>
        <h2 style={{ marginBottom: 15 }}>Reset Password 🔒</h2>

        {error && <div style={errorBox}>{error}</div>}
        {success && <div style={successBox}>{success}</div>}

        <form style={formBox} onSubmit={handleReset}>
          <input
            type="password"
            placeholder="Old Password"
            required
            style={input}
            onChange={(e) => setForm({ ...form, old_password: e.target.value })}
          />

          <input
            type="password"
            placeholder="New Password"
            required
            style={input}
            onChange={(e) => setForm({ ...form, new_password: e.target.value })}
          />

          <input
            type="password"
            placeholder="Confirm New Password"
            required
            style={input}
            onChange={(e) => setForm({ ...form, confirm_password: e.target.value })}
          />

          <button style={btn}>Update Password</button>
        </form>
      </div>
    </div>
  );
}

/* styles omitted for brevity — reuse the same style block I sent earlier */
export default ResetPassword;
