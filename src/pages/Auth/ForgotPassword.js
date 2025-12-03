import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/api";
import { authStyles as styles } from "./authStyles";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const sendOtp = async () => {
    try {
      await api.post("auth/forgot-password/", { email });
      setMsg("✔ OTP sent to your email");
    } catch (err) {
      setMsg("❌ Failed to send OTP");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Forgot Password?</h2>
        <p style={styles.subtitle}>
          Enter your email to receive reset OTP.
        </p>

        {msg && <div style={styles.alert}>{msg}</div>}

        <div style={styles.inputGroup}>
          <label style={styles.label}>Email</label>
          <input
            style={styles.input}
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button style={styles.button} onClick={sendOtp}>
          Send OTP
        </button>

        <p style={styles.text}>
          <Link to="/login" style={styles.link}>
            Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;
