import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/api";
import { authStyles as s } from "./authStyles";

function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "EMPLOYEE",
    password1: "",
    password2: "",
  });

  const submit = async (e) => {
    e.preventDefault();
    if (form.password1 !== form.password2) {
      setError("Passwords do not match ❌");
      return;
    }

    try {
      await api.post("auth/register/", form);
      navigate("/login");
    } catch {
      setError("Registration failed ❌");
    }
  };

  return (
    <div style={s.page}>
      <div style={s.card}>
        <h2 style={s.title}>Create Account</h2>
        <p style={s.subtitle}>Register to access HRMS</p>

        {error && <div style={s.alertError}>{error}</div>}

        <form onSubmit={submit} style={s.form}>
          <input style={s.input} placeholder="Full Name" required
            onChange={(e)=>setForm({...form,name:e.target.value})} />

          <input style={s.input} type="email" placeholder="Email" required
            onChange={(e)=>setForm({...form,email:e.target.value})} />

          <select style={s.input}
            onChange={(e)=>setForm({...form,role:e.target.value})}>
            <option value="EMPLOYEE">Employee</option>
            <option value="HR">HR Admin</option>
          </select>

          <div style={s.field}>
            <input
              type={show ? "text" : "password"}
              placeholder="Password"
              style={s.input}
              required
              onChange={(e)=>setForm({...form,password1:e.target.value})}
            />
            <span style={s.eye} onClick={()=>setShow(!show)}>
              {show ? "🙈" : "👁️"}
            </span>
          </div>

          <input
            type="password"
            placeholder="Confirm Password"
            style={s.input}
            required
            onChange={(e)=>setForm({...form,password2:e.target.value})}
          />

          <button style={s.button}>Create Account</button>
        </form>

        <p style={s.bottomText}>
          Already have an account?{" "}
          <Link to="/login" style={s.link}>Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
