import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";

function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "EMPLOYEE",
    password1: "",
    password2: "",
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password1 !== formData.password2) {
      setError("Passwords do not match");
      return;
    }

    try {
      await api.post("/api/auth/register/", formData);
      navigate("/login");
    } catch {
      setError("Registration failed");
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <input placeholder="Name" onChange={e => setFormData({ ...formData, name: e.target.value })} />
      <input placeholder="Email" onChange={e => setFormData({ ...formData, email: e.target.value })} />
      <select onChange={e => setFormData({ ...formData, role: e.target.value })}>
        <option value="EMPLOYEE">Employee</option>
        <option value="HR">HR</option>
      </select>
      <input type="password" placeholder="Password" onChange={e => setFormData({ ...formData, password1: e.target.value })} />
      <input type="password" placeholder="Confirm" onChange={e => setFormData({ ...formData, password2: e.target.value })} />
      {error && <p>{error}</p>}
      <button>Create account</button>
    </form>
  );
}

export default Register;
