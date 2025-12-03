import { isLoggedIn } from "../../utils/auth";

import { GoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/api";
import { authStyles as styles } from "./authStyles";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const loginUser = async () => {
    try {
      const res = await api.post("auth/login/", { email, password });
      localStorage.setItem("token", res.data.token);

      setMsg("Login Successful ✔️");
      setTimeout(() => {
        window.location.href = "/";
      }, 900);

    } catch (err) {
      setMsg("❌ Invalid email or password");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>HRMS Login</h2>
        <p style={styles.subtitle}>Access your employee portal</p>

        {msg && <div style={styles.alert}>{msg}</div>}

        <div style={styles.inputGroup}>
          <label style={styles.label}>Email</label>
          <input
            style={styles.input}
            type="text"
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

        <button style={styles.button} onClick={loginUser}>
          Login
        </button>
        {/* Google Login Button */}
<div style={{ marginTop: 20, textAlign: "center" }}>
  <GoogleLogin
    onSuccess={async (credentialResponse) => {
      try {
        const res = await api.post("/auth/google/", {
          token: credentialResponse.credential,
        });

        const tokens = res.data.token;

        localStorage.setItem("access", tokens.access);
        localStorage.setItem("refresh", tokens.refresh);

        alert("Google Login Successful ✔");
        window.location.href = "/";
      } catch (error) {
        console.error("Google login error:", error);
        alert("Google login failed ❌");
      }
    }}
    onError={() => {
      alert("Google Login Failed ❌");
    }}
  />
</div>

        <p style={styles.text}>
          New here?{" "}
          <Link to="/register" style={styles.link}>
            Create an Account
          </Link>
        </p>
      </div>
    </div>
  );
}



export default Login;
