import { useState } from "react";
import api from "../../api/api";

function ApplyLeave() {
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

    try {
      await api.post("leave/apply/", form);

      setMsg("✅ Leave applied successfully");
      setForm({
        leave_type: "",
        start_date: "",
        end_date: "",
        reason: "",
      });
    } catch (err) {
      setError(err.response?.data?.error || "Failed to apply leave");
    }
  };

  return (
    <div style={page}>
      <div style={card}>
        <h2 style={heading}>Apply Leave</h2>

        {msg && <p style={success}>{msg}</p>}
        {error && <p style={errorBox}>{error}</p>}

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

        <input
          type="date"
          name="start_date"
          value={form.start_date}
          onChange={handleChange}
          style={input}
        />

        <input
          type="date"
          name="end_date"
          value={form.end_date}
          onChange={handleChange}
          style={input}
        />

        <textarea
          name="reason"
          value={form.reason}
          onChange={handleChange}
          style={input}
          placeholder="Reason for leave"
        />

        <button onClick={applyLeave} style={btn}>
          Apply Leave
        </button>
      </div>
    </div>
  );
}

export default ApplyLeave;
