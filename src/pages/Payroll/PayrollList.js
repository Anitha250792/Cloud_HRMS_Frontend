import { useEffect, useState } from "react";
import api from "../../api/api";
import { Link } from "react-router-dom";

function PayrollList() {
  const [payrolls, setPayrolls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  useEffect(() => {
    loadPayroll();
  }, []);

  const loadPayroll = async () => {
    try {
      const res = await api.get("payroll/");
      setPayrolls(res.data);
    } catch (err) {
      console.error("Payroll load error:", err);
    }
  };

  const generateAll = async () => {
    if (!month || !year) {
      alert("Please select month & year");
      return;
    }

    setLoading(true);
    try {
      await api.post("payroll/generate_all_payroll/", {
        month: Number(month),
        year: Number(year),
      });
      alert("Payroll generation started!");
      loadPayroll();
    } catch (error) {
      console.error("Generate all payroll error:", error);
      alert("Failed");
    }
    setLoading(false);
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Payroll Management</h2>

        {/* Controls Row */}
        <div style={styles.controlsRow}>
          <select
            style={styles.select}
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          >
            <option value="">Month</option>
            {[...Array(12)].map((_, i) => (
              <option value={i + 1} key={i}>
                {i + 1}
              </option>
            ))}
          </select>

          <select
            style={styles.select}
            value={year}
            onChange={(e) => setYear(e.target.value)}
          >
            <option value="">Year</option>
            {[2024, 2025, 2026].map((y) => (
              <option value={y} key={y}>
                {y}
              </option>
            ))}
          </select>

          <button
            onClick={generateAll}
            disabled={loading}
            style={styles.generateBtn}
          >
            Generate All
          </button>

          <Link to="/payroll/add" style={styles.addBtn}>
            Add Payroll
          </Link>
        </div>

        {/* Table */}
        <table style={styles.table}>
          <thead>
            <tr style={styles.theadRow}>
              <th style={styles.th}>Employee</th>
              <th style={styles.th}>Month</th>
              <th style={styles.th}>Basic</th>
              <th style={styles.th}>Net</th>
              <th style={styles.th}>Payslip</th>
            </tr>
          </thead>

          <tbody>
            {payrolls.map((p) => (
              <tr key={p.id} style={styles.tr}>
                <td style={styles.td}>{p.employee_name}</td>
                <td style={styles.td}>
                  {p.month}/{p.year}
                </td>
                <td style={styles.td}>₹ {p.basic_salary}</td>
                <td style={styles.td}>₹ {p.net_salary}</td>
                <td style={styles.td}>
                  <a
                    href={`http://localhost:8000/api/payroll/download/${p.id}/`}
                    target="_blank"
                    rel="noreferrer"
                    style={styles.link}
                  >
                    📄 PDF
                  </a>{" "}
                  |{" "}
                  <Link to={`/employee/${p.employee}/salary`} style={styles.link}>
                    🔍 View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ---- Styles ---- */
const styles = {
  page: {
    minHeight: "100vh",
    background: "#f4f7fc",
    padding: "40px",
    display: "flex",
    justifyContent: "center",
  },
  card: {
    width: "100%",
    maxWidth: "1000px",
    background: "#fff",
    padding: "30px",
    borderRadius: "15px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
  },
  heading: {
    fontSize: 28,
    fontWeight: 700,
    marginBottom: 20,
    textAlign: "center",
    color: "#334155",
  },
  controlsRow: {
    display: "flex",
    gap: 12,
    marginBottom: 20,
  },
  select: {
    padding: "10px",
    borderRadius: "10px",
    border: "1px solid #ccc",
    fontSize: "15px",
  },
  generateBtn: {
    background: "#059669",
    color: "white",
    padding: "10px 16px",
    borderRadius: "10px",
    fontWeight: 600,
    cursor: "pointer",
  },
  addBtn: {
    background: "#2563eb",
    color: "white",
    padding: "10px 16px",
    borderRadius: "10px",
    textDecoration: "none",
    fontWeight: 600,
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    background: "#2563eb",
    color: "white",
    padding: "12px",
    textAlign: "left",
  },
  td: {
    padding: "12px",
    borderBottom: "1px solid #e5e7eb",
  },
  tr: {
    transition: "0.2s",
  },
  link: {
    textDecoration: "none",
    color: "#2563eb",
    fontWeight: 600,
  },
};

export default PayrollList;
