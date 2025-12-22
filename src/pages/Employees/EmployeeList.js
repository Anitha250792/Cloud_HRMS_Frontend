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

  /* ================= LOAD ================= */
  const loadEmployees = async () => {
    try {
      // ✅ FIXED URL (NO /api)
      const res = await api.get("employees/");
      setEmployees(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load employees");
    } finally {
      setLoading(false);
    }
  };

  /* ================= DELETE ================= */
  const deleteEmployee = async (emp) => {
    if (!window.confirm(`Deactivate ${emp.name}?`)) return;

    try {
      // ✅ FIXED URL (NO /api)
      await api.delete(`employees/delete/${emp.id}/`);
      loadEmployees();
    } catch (err) {
      console.error(err);
      alert("Failed to delete employee");
    }
  };

  if (loading) {
    return <p style={styles.center}>Loading employees…</p>;
  }

  if (error) {
    return <p style={{ ...styles.center, color: "red" }}>{error}</p>;
  }

  return (
    <div style={Page.wrapper}>
      <h2 style={Page.title}>👥 Employee List</h2>

      <div style={Page.card}>
        {employees.length === 0 ? (
          <p style={styles.center}>No employees found</p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Joined On</th>
                <th style={{ textAlign: "center" }}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {employees.map((emp) => (
                <tr key={emp.id}>
                  <td>{emp.emp_code || emp.id}</td>
                  <td style={{ fontWeight: 600 }}>{emp.name}</td>
                  <td>{emp.email}</td>
                  <td>
                    <span
                      style={{
                        ...styles.badge,
                        ...STATUS_STYLE[emp.is_active],
                      }}
                    >
                      {emp.is_active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td>{emp.date_joined}</td>
                  <td style={{ textAlign: "center" }}>
                    <button
                      style={styles.editBtn}
                      onClick={() => navigate(`/employees/edit/${emp.id}`)}
                    >
                      Edit
                    </button>
                    <button
                      style={styles.deleteBtn}
                      onClick={() => deleteEmployee(emp)}
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
  center: {
    textAlign: "center",
    padding: 20,
    opacity: 0.7,
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
  },

  badge: {
    padding: "4px 12px",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 700,
    display: "inline-block",
  },

  editBtn: {
    background: "#2563EB",
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    borderRadius: 8,
    cursor: "pointer",
    marginRight: 8,
    fontWeight: 600,
  },

  deleteBtn: {
    background: "#DC2626",
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    borderRadius: 8,
    cursor: "pointer",
    fontWeight: 600,
  },
};
