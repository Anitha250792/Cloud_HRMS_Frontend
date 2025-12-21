import { useState, useEffect } from "react";
import api from "../../api/api";
import { authStyles as styles } from "./authStyles";

function VerifyOTP() {
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    setEmail(new URLSearchParams(window.location.search).get("email"));
  }, []);

  const verify = async () => {
    try {
      await api.post("/api/auth/verify-otp/", { email, otp });
      setMsg("OTP verified");
      window.location.href = "/reset-password?email=" + email;
    } catch {
      setMsg("Invalid OTP");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2>Verify OTP</h2>
        {msg && <div style={styles.alert}>{msg}</div>}
        <input style={styles.input} onChange={e => setOtp(e.target.value)} />
        <button style={styles.button} onClick={verify}>Verify</button>
      </div>
    </div>
  );
}

export default VerifyOTP;
