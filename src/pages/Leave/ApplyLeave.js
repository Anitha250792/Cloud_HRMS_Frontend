import { useState } from "react";
import api from "../../api/api";

function ApplyLeave() {
  const [form, setForm] = useState({
    employee_id: "",
    leave_type: "",
    start_date: "",
    end_date: "",
    reason: "",
  });

  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const updateForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const applyLeave = async () => {
    setMsg("");
    setError("");

    try {
     await api.post("/leaves/apply/", {
  employee: form.employee_id,
  leave_type: form.leave_type,
  start_date: form.start_date,
  end_date: form.end_date,
  reason: form.reason,
});

      setMsg("Leave Applied Successfully ✔️");
    } catch (err) {
      console.log(err.response?.data);
      setError(err.response?.data?.error || "Something went wrong ❌");
    }
  };

  return (
    <div style={styles.leaveContainer}>
      <div style={styles.leaveCard}>
        <h2 style={styles.heading}>Apply Leave</h2>

        {msg && <p style={styles.success}>{msg}</p>}
        {error && <p style={styles.error}>{error}</p>}

        {/* Employee ID */}
        <div style={styles.mb3}>
          <label style={styles.label}>Employee ID</label>
          <input
            name="employee_id"
            style={styles.input}
            onChange={updateForm}
            placeholder="Enter your employee ID"
          />
        </div>

        {/* Leave Type */}
        <div style={styles.mb3}>
          <label style={styles.label}>Leave Type</label>
          <select name="leave_type" style={styles.input} onChange={updateForm}>
            <option value="">Select Leave Type</option>
            <option value="SICK">Sick Leave</option>
            <option value="CASUAL">Casual Leave</option>
            <option value="ANNUAL">Annual Leave</option>
          </select>
        </div>

        {/* Dates */}
        <div style={styles.mb3}>
          <label style={styles.label}>Start Date</label>
          <input
            type="date"
            name="start_date"
            style={styles.input}
            onChange={updateForm}
          />
        </div>

        <div style={styles.mb3}>
          <label style={styles.label}>End Date</label>
          <input
            type="date"
            name="end_date"
            style={styles.input}
            onChange={updateForm}
          />
        </div>

        {/* Reason */}
        <div style={styles.mb3}>
          <label style={styles.label}>Reason</label>
          <textarea
            name="reason"
            style={styles.textarea}
            placeholder="Enter your reason"
            rows="3"
            onChange={updateForm}
          ></textarea>
        </div>

        <button style={styles.button} onClick={applyLeave}>
          Apply Leave
        </button>
      </div>
    </div>
  );
}

/* --------------------------------
   🎨 COMPLETE STYLES OBJECT
--------------------------------- */
const styles = {
  leaveContainer: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f4f7fc",
    padding: "20px",
  },

  leaveCard: {
    width: "100%",
    maxWidth: "450px",
    background: "#fff",
    padding: "30px",
    borderRadius: "15px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
  },

  heading: {
    textAlign: "center",
    marginBottom: "20px",
    fontWeight: "700",
    color: "#333",
    fontSize: "24px",
  },

  mb3: {
    marginBottom: "15px",
  },

  label: {
    fontWeight: "600",
    marginBottom: "5px",
    display: "block",
  },

  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "10px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },

  textarea: {
    width: "100%",
    padding: "10px",
    borderRadius: "10px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },

  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#0d6efd",
    color: "#fff",
    fontSize: "16px",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    marginTop: "10px",
  },

  success: {
    background: "#d4edda",
    color: "#155724",
    padding: "10px",
    borderRadius: "10px",
    textAlign: "center",
    fontWeight: "600",
  },

  error: {
    background: "#f8d7da",
    color: "#721c24",
    padding: "10px",
    borderRadius: "10px",
    textAlign: "center",
    fontWeight: "600",
  },
};

/* ✔ important: EXPORT THE COMPONENT */
export default ApplyLeave;
