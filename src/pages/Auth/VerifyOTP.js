import { useState, useEffect } from "react";
import api from "../../api/api";
import { authStyles as styles } from "./authStyles";


function VerifyOTP() {
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setEmail(params.get("email"));
  }, []);

  const verifyOtp = async () => {
    try {
      await api.post("auth/verify-otp/", { email, otp });
      setMsg("OTP Verified ✔️");

      setTimeout(() => {
        window.location.href = "/reset-password?email=" + email;
      }, 1000);

    } catch (err) {
      setMsg("❌ Invalid OTP");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>

        <h2 style={styles.title}>Verify OTP</h2>
        <p style={styles.subtitle}>Enter the OTP sent to your email: {email}</p>

        {msg && <div style={styles.alert}>{msg}</div>}

        <div style={styles.inputGroup}>
          <label style={styles.label}>OTP</label>
          <input
            style={styles.input}
            placeholder="Enter OTP"
            onChange={(e) => setOtp(e.target.value)}
          />
        </div>

        <button style={styles.button} onClick={verifyOtp}>
          Verify OTP
        </button>

      </div>
    </div>
  );
}



export default VerifyOTP;
