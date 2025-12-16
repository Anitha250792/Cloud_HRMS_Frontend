import { useState } from "react";
import api from "../../api/api";

function AddPayroll() {
  const [employee, setEmployee] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const submitPayroll = async () => {
    setMsg("");
    setError("");

    if (!employee || !month || !year) {
      setError("⚠️ All fields are required");
      return;
    }

    try {
      const res = await api.post("payroll/generate-all/", {
  employee_id: Number(employee),
  month: Number(month),
  year: Number(year),
});


      setMsg("🎉 Payroll generated successfully!");
      console.log(res.data);
    } catch (err) {
      console.error("Generate salary error:", err);
      setError("❌ Failed to generate payroll");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Generate Payroll</h2>

        {msg && <p style={styles.success}>{msg}</p>}
        {error && <p style={styles.error}>{error}</p>}

        {/* Employee ID */}
        <div style={styles.mb}>
          <label style={styles.label}>Employee ID</label>
          <input
            type="number"
            style={styles.input}
            placeholder="Enter employee ID"
            value={employee}
            onChange={(e) => setEmployee(e.target.value)}
          />
        </div>

        {/* Month */}
        <div style={styles.mb}>
          <label style={styles.label}>Select Month</label>
          <select
            value={month}
            style={styles.input}
            onChange={(e) => setMonth(e.target.value)}
          >
            <option value="">Select Month</option>
            {[...Array(12)].map((_, i) => (
              <option key={i} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </div>

        {/* Year */}
        <div style={styles.mb}>
          <label style={styles.label}>Select Year</label>
          <select
            value={year}
            style={styles.input}
            onChange={(e) => setYear(e.target.value)}
          >
            <option value="">Select Year</option>
            {[2024, 2025, 2026].map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>

        <button style={styles.button} onClick={submitPayroll}>
          Generate Payroll
        </button>
      </div>
    </div>
  );
}

/* 🎨 Inline CSS Styles */
const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f4f7fc",
    padding: "20px",
  },

  card: {
    width: "100%",
    maxWidth: "420px",
    background: "#fff",
    padding: "30px",
    borderRadius: "15px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
    animation: "fadeIn 0.5s ease-in-out",
  },

  heading: {
    fontSize: "26px",
    fontWeight: "700",
    textAlign: "center",
    marginBottom: "20px",
    color: "#333",
  },

  mb: {
    marginBottom: "15px",
  },

  label: {
    fontWeight: "600",
    marginBottom: "6px",
    display: "block",
  },

  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #ccc",
    fontSize: "15px",
  },

  button: {
    width: "100%",
    padding: "12px",
    background: "#0d6efd",
    color: "#fff",
    fontSize: "17px",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    marginTop: "10px",
    fontWeight: "600",
  },

  success: {
    background: "#d4edda",
    padding: "10px",
    borderRadius: "10px",
    color: "#155724",
    fontWeight: "600",
    textAlign: "center",
  },

  error: {
    background: "#f8d7da",
    padding: "10px",
    borderRadius: "10px",
    color: "#721c24",
    fontWeight: "600",
    textAlign: "center",
  },
};

export default AddPayroll;
