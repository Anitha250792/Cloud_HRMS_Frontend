import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/api";
import { authStyles as styles } from "./authStyles";

function Register() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const registerUser = async () => {
    try {
      await api.post("auth/register/", { name, email, password });
      setMsg("✔ Registration successful! Login now.");
    } catch (err) {
      setMsg("❌ Failed to register");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create Account</h2>
        <p style={styles.subtitle}>Join HRMS Cloud</p>

        {msg && <div style={styles.alert}>{msg}</div>}

        <div style={styles.inputGroup}>
          <label style={styles.label}>Full Name</label>
          <input
            style={styles.input}
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

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

        <div style={styles.inputGroup}>
          <label style={styles.label}>Password</label>
          <input
            style={styles.input}
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button style={styles.button} onClick={registerUser}>
          Register
        </button>

        <p style={styles.text}>
          Already have an account?{" "}
          <Link to="/login" style={styles.link}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
