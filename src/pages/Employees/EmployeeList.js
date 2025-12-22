import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import { Page } from "../../theme/pageStyles";

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      const res = await api.get("employees/");
      console.log("EMPLOYEES RESPONSE 👉", res.data);
      setEmployees(res.data);
    } catch (err) {
      console.error("Failed to load employees ❌", err);
      setError("Failed to load employees");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p style={{ textAlign: "center" }}>Loading employees…</p>;
  if (error) return <p style={{ color: "red", textAlign: "center" }}>{error}</p>;

  return (
    <div style={Page.wrapper}>
      <h2 style={Page.title}>👥 Employees</h2>

      <div style={Page.card}>
        {employees.length === 0 && (
          <p style={{ textAlign: "center", opacity: 0.6 }}>
            No employees found
          </p>
        )}

        {employees.map((e) => (
          <div
            key={e.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "12px 0",
              borderBottom: "1px solid #e5e7eb",
            }}
          >
            <div>
              <strong>{e.name}</strong>
              <div style={{ fontSize: 13, opacity: 0.7 }}>
                {e.department} · {e.role}
              </div>
            </div>

            <button
              onClick={() => navigate(`/employees/edit/${e.id}`)}
              style={{
                background: "#2563EB",
                color: "#fff",
                border: "none",
                padding: "6px 14px",
                borderRadius: 8,
                cursor: "pointer",
              }}
            >
              Edit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EmployeeList;
