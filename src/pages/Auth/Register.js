import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../api/api";

function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
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
      setError("Passwords do not match");
      return;
    }

    try {
      await api.post("auth/register/", form);
      navigate("/login");
    } catch {
      setError("Registration failed");
    }
  };

  return (
    <div style={page}>
      <div style={card}>
        <h2>Create Account</h2>
        {error && <div style={errorBox}>{error}</div>}

        <form onSubmit={submit}>
          <input style={input} placeholder="Name"
            onChange={e=>setForm({...form,name:e.target.value})} />
          <input style={input} placeholder="Email"
            onChange={e=>setForm({...form,email:e.target.value})} />
          <select style={input}
            onChange={e=>setForm({...form,role:e.target.value})}>
            <option value="EMPLOYEE">Employee</option>
            <option value="HR">HR</option>
          </select>
          <input style={input} type="password" placeholder="Password"
            onChange={e=>setForm({...form,password1:e.target.value})} />
          <input style={input} type="password" placeholder="Confirm Password"
            onChange={e=>setForm({...form,password2:e.target.value})} />

          <button style={btn}>Register</button>
        </form>

        <p><Link to="/login">Back to login</Link></p>
      </div>
    </div>
  );
}

export default Register;
