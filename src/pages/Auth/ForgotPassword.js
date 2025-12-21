import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/api";
import { authStyles as s } from "./authStyles";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const sendOtp = async () => {
    try {
      await api.post("auth/forgot-password/", { email });
      setMsg("OTP sent to your email ✔️");
    } catch {
      setMsg("Failed to send OTP ❌");
    }
  };

  return (
    <div style={s.page}>
      <div style={s.card}>
        <h2 style={s.title}>Forgot Password</h2>
        <p style={s.subtitle}>Enter email to receive OTP</p>

        {msg && <div style={s.alertSuccess}>{msg}</div>}

        <input
          style={s.input}
          placeholder="Email"
          onChange={(e)=>setEmail(e.target.value)}
        />

        <button style={s.button} onClick={sendOtp}>Send OTP</button>

        <p style={s.bottomText}>
          <Link to="/login" style={s.link}>Back to Login</Link>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;
