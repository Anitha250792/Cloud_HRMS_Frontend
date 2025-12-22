import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import { Page } from "../../theme/pageStyles";

const STATUS_STYLE = {
  true: { background: "#DCFCE7", color: "#166534" },
  false: { background: "#FEE2E2", color: "#7F1D1D" },
};

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
      setEmployees(res.data);
    } catch {
      setError("Failed to load employees");
    } finally {
      setLoading(false);
    }
  };

  const deleteEmployee = async (emp) => {
    if (!window.confirm(`Deactivate ${emp.name}?`)) return;
    await api.delete(`employees/delete/${emp.id}/`);
    loadEmployees();
  };

  if (loading) return <Center>Loading employees…</Center>;
  if (error) return <Center error>{error}</Center>;

  return (
    <div style={Page.wrapper}>
      <h2 style={Page.title}>👥 Employee List</h2>

      <div style={Page.card}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Emp ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Joined</th>
              <th style={{ textAlign: "center" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((e) => (
              <tr key={e.id}>
                <td>{e.emp_code || e.id}</td>
                <td>{e.name}</td>
                <td>{e.email}</td>
                <td>
                  <span style={{ ...styles.badge, ...STATUS_STYLE[e.is_active] }}>
                    {e.is_active ? "Active" : "Inactive"}
                  </span>
                </td>
                <td>{e.date_joined}</td>
                <td style={{ textAlign: "center" }}>
                  <button style={styles.edit} onClick={() => navigate(`/employees/edit/${e.id}`)}>Edit</button>
                  <button style={styles.delete} onClick={() => deleteEmployee(e)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const Center = ({ children, error }) => (
  <p style={{ textAlign: "center", padding: 20, color: error ? "red" : "#64748B" }}>
    {children}
  </p>
);

const styles = {
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  badge: {
    padding: "4px 12px",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 700,
  },
  edit: {
    background: "#2563EB",
    color: "#fff",
    padding: "6px 12px",
    borderRadius: 8,
    marginRight: 6,
    border: "none",
  },
  delete: {
    background: "#DC2626",
    color: "#fff",
    padding: "6px 12px",
    borderRadius: 8,
    border: "none",
  },
};

export default EmployeeList;
