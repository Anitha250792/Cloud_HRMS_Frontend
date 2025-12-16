import { useState } from "react";
import api from "../../api/api";

function ResetPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await api.post("auth/reset-password/", {
        email,
        otp,
        password,
      });

      setSuccess("✅ Password reset successfully. You can login now.");
      setEmail("");
      setOtp("");
      setPassword("");
    } catch (err) {
      setError(err.response?.data?.error || "Password reset failed");
    }
  };

  return (
    <div style={wrapper}>
      <div style={card}>
        <h2>🔑 Reset Password</h2>

        {error && <div style={errorBox}>{error}</div>}
        {success && <div style={successBox}>{success}</div>}

        <form onSubmit={handleSubmit} style={formBox}>
          <input
            style={input}
            type="email"
            placeholder="Registered Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            style={input}
            type="text"
            placeholder="OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />

          <input
            style={input}
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button style={btn}>Reset Password</button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;

/* ===================== STYLES ===================== */

const wrapper = {
  minHeight: "100vh",
  background: "linear-gradient(135deg,#eef2ff,#f0f9ff)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const card = {
  width: 380,
  background: "#fff",
  padding: 30,
  borderRadius: 16,
  boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
};

const formBox = {
  marginTop: 20,
  display: "flex",
  flexDirection: "column",
  gap: 12,
};

const input = {
  padding: 12,
  borderRadius: 8,
  border: "1px solid #d1d5db",
  fontSize: 14,
};

const btn = {
  marginTop: 10,
  padding: 12,
  borderRadius: 10,
  background: "#2563EB",
  color: "#fff",
  border: "none",
  fontWeight: 600,
  cursor: "pointer",
};

const errorBox = {
  background: "#fee2e2",
  color: "#991b1b",
  padding: 10,
  borderRadius: 8,
  marginTop: 10,
};

const successBox = {
  background: "#dcfce7",
  color: "#166534",
  padding: 10,
  borderRadius: 8,
  marginTop: 10,
};
