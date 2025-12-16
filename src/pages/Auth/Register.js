import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/api";

function Register() {
  const navigate = useNavigate();

  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [shake, setShake] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "EMPLOYEE",
    password1: "",
    password2: "",
  });

  /* ---------------------------- REGISTER HANDLER ---------------------------- */
  const handleRegister = async (e) => {
    e.preventDefault();

    if (formData.password1 !== formData.password2) {
      triggerError("Passwords do not match ❌");
      return;
    }

    try {
      const res = await api.post("/auth/register/", {
        name: formData.name,
        email: formData.email,
        role: formData.role,
        password1: formData.password1,
        password2: formData.password2,
      });

      setSuccess(true);

      // Smooth redirect after success toast
      setTimeout(() => navigate("/login"), 1200);
    } catch (err) {
      console.log(err);

      if (err.response?.data?.email) triggerError("Email already exists ❌");
      else if (err.response?.data?.error) triggerError(err.response.data.error);
      else triggerError("Registration failed ❌");
    }
  };

  const triggerError = (msg) => {
    setError(msg);
    setShake(true);
    setTimeout(() => setShake(false), 400);
  };

  return (
    <div style={page}>
      {success && <div style={toast}>✔ Registered Successfully!</div>}

      <div style={glass}>
        {/* LEFT SECTION */}
        <div style={left}>
          <h1 style={h1}>Create Your Account</h1>
          <p style={sub}>Secure access to HRMS Cloud</p>
          <ul style={list}>
            <li>✓ HR & Employee Roles</li>
            <li>✓ JWT Security</li>
            <li>✓ Payroll • Leave • Attendance</li>
          </ul>
        </div>

        {/* RIGHT SECTION */}
        <div style={right}>
          <h2 style={title}>Sign Up ✨</h2>

          {error && (
            <div style={{ ...errorBox, animation: shake ? "shake 0.3s" : "" }}>
              {error}
            </div>
          )}

          <form onSubmit={handleRegister} style={form}>

            {/* FULL NAME */}
            <div style={{ position: "relative" }}>
  <input
    type="text"
    required
    value={formData.name}
    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
    style={{
      ...floatingInput,
      borderColor: formData.name ? "#a5b4fc" : "rgba(255,255,255,0.25)",
    }}
  />

  <label
    style={{
      ...floatingLabel,
      top: formData.name ? "-8px" : "14px",
      fontSize: formData.name ? 12 : 14,
      color: formData.name ? "#a5b4fc" : "rgba(255,255,255,0.7)",
    }}
  >
    Full Name
  </label>
</div>

            {/* EMAIL */}
            <div style={{ position: "relative" }}>
  <input
    type="email"
    required
    value={formData.email}
    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
    style={{
      ...floatingInput,
      borderColor: formData.email ? "#a5b4fc" : "rgba(255,255,255,0.25)",
    }}
  />

  <label
    style={{
      ...floatingLabel,
      top: formData.email ? "-8px" : "14px",
      fontSize: formData.email ? 12 : 14,
      color: formData.email ? "#a5b4fc" : "rgba(255,255,255,0.7)",
    }}
  >
    Email Address
  </label>
</div>


            {/* ROLE */}
            <label style={label}>Select Role</label>
            <select
              style={input}
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
            >
              <option value="EMPLOYEE">Employee</option>
              <option value="HR">HR Admin</option>
            </select>

            {/* PASSWORD */}
            <div style={passwordWrap}>
              <input
                type={showPass ? "text" : "password"}
                required
                placeholder="Password"
                style={{ ...input, paddingRight: 45 }}
                value={formData.password1}
                onChange={(e) =>
                  setFormData({ ...formData, password1: e.target.value })
                }
              />
              <span style={eyeIcon} onClick={() => setShowPass(!showPass)}>
                {showPass ? "🙈" : "👁️"}
              </span>
            </div>

            {/* CONFIRM PASSWORD */}
            <div style={passwordWrap}>
              <input
                type={showConfirm ? "text" : "password"}
                required
                placeholder="Confirm Password"
                style={{ ...input, paddingRight: 45 }}
                value={formData.password2}
                onChange={(e) =>
                  setFormData({ ...formData, password2: e.target.value })
                }
              />
              <span style={eyeIcon} onClick={() => setShowConfirm(!showConfirm)}>
                {showConfirm ? "🙈" : "👁️"}
              </span>
            </div>

            <button type="submit" style={btn}>
              Create Account
            </button>
          </form>

          <p style={smallTxt}>
            Already registered?{" "}
            <Link to="/login" style={link}>
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

/* ------------------------- STYLES ------------------------- */

const page = {
  minHeight: "100vh",
  background: "linear-gradient(135deg,#0f0c29,#302b63,#24243e)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: 30,
};

const glass = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  width: "90%",
  maxWidth: 950,
  padding: 40,
  background: "rgba(255,255,255,0.07)",
  borderRadius: 25,
  border: "1px solid rgba(255,255,255,0.15)",
  boxShadow: "0 8px 35px rgba(0,0,0,0.6)",
  backdropFilter: "blur(25px)",
  color: "white",
};

const left = { paddingRight: 30, borderRight: "1px solid rgba(255,255,255,0.15)" };
const right = { paddingLeft: 30 };

const h1 = { fontSize: 32, fontWeight: 800 };
const sub = { opacity: 0.7 };
const list = { marginTop: 20, opacity: 0.85, lineHeight: "1.7em" };

const title = { fontSize: 26, marginBottom: 20 };
const form = { display: "flex", flexDirection: "column", gap: 14 };
const label = { opacity: 0.9 };

const input = {
  padding: "12px 14px",
  background: "rgba(255,255,255,0.12)",
  border: "1px solid rgba(255,255,255,0.25)",
  borderRadius: 12,
  color: "white",
  outline: "none",
  fontSize: 15,
};

const passwordWrap = { position: "relative" };
const eyeIcon = {
  position: "absolute",
  right: 12,
  top: 12,
  cursor: "pointer",
};

const btn = {
  marginTop: 10,
  padding: "12px 0",
  background: "linear-gradient(135deg,#6366f1,#4f46e5)",
  borderRadius: 12,
  border: "none",
  color: "white",
  fontWeight: 700,
  fontSize: 16,
  cursor: "pointer",
};

const smallTxt = { marginTop: 15 };
const link = { color: "#a5b4fc" };

const errorBox = {
  background: "rgba(255,0,0,0.18)",
  border: "1px solid rgba(255,0,0,0.4)",
  padding: 12,
  borderRadius: 12,
  color: "#ffb3b3",
  marginBottom: 12,
};

const toast = {
  position: "absolute",
  top: 30,
  padding: "10px 20px",
  borderRadius: 12,
  background: "rgba(34,197,94,0.9)",
  color: "white",
  fontWeight: "bold",
};

const group = { position: "relative" };
const floatingInput = {
  width: "100%",
  padding: "16px 12px 6px 12px",
  background: "rgba(255,255,255,0.12)",
  borderRadius: 12,
  border: "1px solid rgba(255,255,255,0.25)",
  color: "white",
  outline: "none",
};

const floatingLabel = {
  position: "absolute",
  left: 12,
  top: 14,
  opacity: 0.9,
  fontSize: 14,
  transition: "0.2s",
};

export default Register;
