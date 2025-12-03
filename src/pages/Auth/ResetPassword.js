import { useEffect, useState } from "react";
import api from "../../api/api";
import { authStyles as styles } from "./authStyles";


function ResetPassword() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setEmail(params.get("email"));
  }, []);

  const resetPass = async () => {
    try {
      await api.post("auth/reset-password/", { email, password });
      setMsg("Password reset successful ✔️");

      setTimeout(() => {
        window.location.href = "/login";
      }, 1000);

    } catch (err) {
      setMsg("❌ Failed to reset password");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>

        <h2 style={styles.title}>Set New Password</h2>
        <p style={styles.subtitle}>Reset password for: {email}</p>

        {msg && <div style={styles.alert}>{msg}</div>}

        <div style={styles.inputGroup}>
          <label style={styles.label}>New Password</label>
          <input
            style={styles.input}
            type="password"
            placeholder="Enter new password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button style={styles.button} onClick={resetPass}>
          Reset Password
        </button>

      </div>
    </div>
  );
}


export default ResetPassword;
