import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import { Page } from "../../theme/pageStyles";

const STATUS_STYLE = {
  true: { background: "#dcfce7", color: "#166534" },
  false: { background: "#fee2e2", color: "#7f1d1d" },
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
    } catch (err) {
      console.error(err);
      setError("Failed to load employees");
    } finally {
      setLoading(false);
    }
  };

  const deleteEmployee = async (id) => {
    if (!window.confirm("Deactivate this employee?")) return;

    try {
      await api.delete(`employees/${id}/`);
      loadEmployees();
    } catch (err) {
      alert("Failed to delete employee");
    }
  };

  if (loading) return <p style={{ textAlign: "center" }}>Loading employees…</p>;
  if (error) return <p style={{ color: "red", textAlign: "center" }}>{error}</p>;

  return (
    <div style={Page.wrapper}>
      <h2 style={Page.title}>👥 Employee List</h2>

      <div style={Page.card}>
        {employees.length === 0 ? (
          <p style={{ textAlign: "center", opacity: 0.6 }}>
            No employees found
          </p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Joined On</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {employees.map((emp) => (
                <tr key={emp.id}>
                  <td>{emp.emp_code || emp.id}</td>
                  <td>{emp.name}</td>
                  <td>{emp.email}</td>
                  <td>
                    <span
                      style={{
                        ...styles.badge,
                        ...(STATUS_STYLE[emp.is_active] || {}),
                      }}
                    >
                      {emp.is_active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td>{emp.date_joined}</td>
                  <td>
                    <button
                      style={styles.editBtn}
                      onClick={() =>
                        navigate(`/employees/edit/${emp.id}`)
                      }
                    >
                      Edit
                    </button>
                    <button
                      style={styles.deleteBtn}
                      onClick={() => deleteEmployee(emp.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default EmployeeList;

/* ================= STYLES ================= */

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
  editBtn: {
    background: "#2563EB",
    color: "#fff",
    border: "none",
    padding: "6px 10px",
    borderRadius: 6,
    cursor: "pointer",
    marginRight: 6,
  },
  deleteBtn: {
    background: "#DC2626",
    color: "#fff",
    border: "none",
    padding: "6px 10px",
    borderRadius: 6,
    cursor: "pointer",
  },
};
