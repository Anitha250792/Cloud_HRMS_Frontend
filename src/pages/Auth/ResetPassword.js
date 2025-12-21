import { useState } from "react";
import api from "../../api/api";

function ResetPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/auth/reset-password/", { email, otp, password });
      setMsg("Password reset successful");
    } catch {
      setMsg("Reset failed");
    }
  };

  return (
    <form onSubmit={submit}>
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input placeholder="OTP" onChange={e => setOtp(e.target.value)} />
      <input placeholder="New password" onChange={e => setPassword(e.target.value)} />
      <button>Reset</button>
      {msg}
    </form>
  );
}

export default ResetPassword;
