import { useState } from "react";
import api from "../../api/api";

function ApplyLeave() {
  const user = JSON.parse(localStorage.getItem("user")); // ✅
  const employeeCode = user?.emp_code;                  // ✅

  const [form, setForm] = useState({
    leave_type: "",
    start_date: "",
    end_date: "",
    reason: "",
  });

  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const applyLeave = async () => {
    setMsg("");
    setError("");

    if (!employeeCode) {
      setError("Employee code not found. Please login again.");
      return;
    }

    try {
      await api.post("/api/leave/apply/", {
        employee: employeeCode,   // ✅ REQUIRED
        ...form,
      });

      setMsg("✅ Leave applied successfully");
      setForm({
        leave_type: "",
        start_date: "",
        end_date: "",
        reason: "",
      });
    } catch (err) {
      setError(
        err.response?.data?.error ||
        "Failed to apply leave"
      );
    }
  };

  return (
    <div style={page}>
      <div style={card}>
        <h2>Apply Leave</h2>

        {msg && <p style={success}>{msg}</p>}
        {error && <p style={errorBox}>{error}</p>}

        <input
          value={employeeCode || ""}
          disabled
          style={{ ...input, background: "#f1f5f9" }}
        />

        <select
          name="leave_type"
          value={form.leave_type}
          onChange={handleChange}
          style={input}
        >
          <option value="">Select Leave Type</option>
          <option value="CASUAL">Casual</option>
          <option value="SICK">Sick</option>
          <option value="EARNED">Earned</option>
          <option value="UNPAID">Unpaid</option>
        </select>

        <input type="date" name="start_date" onChange={handleChange} style={input} />
        <input type="date" name="end_date" onChange={handleChange} style={input} />
        <textarea name="reason" onChange={handleChange} style={input} />

        <button onClick={applyLeave} style={btn}>Apply Leave</button>
      </div>
    </div>
  );
}

export default ApplyLeave;


/* styles */
const page = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "#f4f7fc",
};
const card = { background: "#fff", padding: 30, borderRadius: 12, width: 400 };
const input = { width: "100%", padding: 10, marginBottom: 12 };
const btn = {
  width: "100%",
  padding: 12,
  background: "#2563eb",
  color: "#fff",
  border: "none",
  borderRadius: 6,
};
const success = { background: "#d1fae5", padding: 10, marginBottom: 10 };
const errorBox = { background: "#fee2e2", padding: 10, marginBottom: 10 };
