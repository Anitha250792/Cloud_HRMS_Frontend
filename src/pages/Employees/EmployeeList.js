import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/api";

function EmployeeList() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    const res = await api.get("employees/");
    setEmployees(res.data);
  };

  return (
    <div style={wrapper}>
      <div style={headerRow}>
        <h2 style={title}>👥 Employee Directory</h2>

        <Link to="/employees/add" style={addButton}>
          ➕ Add Employee
        </Link>
      </div>

      <div style={card}>
        <table style={table}>
          <thead>
            <tr style={theadRow}>
              <th style={th}>Name</th>
              <th style={th}>Email</th>
              <th style={th}>Department</th>
              <th style={th}>Salary</th>
              <th style={th}>Status</th>
              <th style={th}>Action</th>
            </tr>
          </thead>

          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id} style={tbodyRow}>
                <td style={td}>{emp.name}</td>
                <td style={td}>{emp.email}</td>
                <td style={td}>{emp.department}</td>
                <td style={td}>₹ {Number(emp.salary).toFixed(2)}</td>

                <td style={td}>
                  <span style={emp.is_active ? activeBadge : inactiveBadge}>
                    {emp.is_active ? "Active" : "Inactive"}
                  </span>
                </td>

                <td style={td}>
                  <Link to={`/employees/${emp.id}`} style={editLink}>
                     Edit
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

/* ---------- Styles ---------- */

const wrapper = {
  paddingTop: 90,
  padding: "20px",
  minHeight: "100vh",
  background: "linear-gradient(135deg,#ecfdf3,#d1fae5)",
};

const headerRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 16,
};

const title = {
  fontSize: 26,
  fontWeight: 700,
  color: "#065f46",
};

const addButton = {
  background: "#059669",
  color: "#fff",
  padding: "10px 16px",
  borderRadius: 10,
  textDecoration: "none",
  fontWeight: 600,
  fontSize: 14,
};

const card = {
  background: "#ffffff",
  padding: 20,
  borderRadius: 16,
  boxShadow: "0 10px 25px rgba(15,23,42,0.15)",
  overflowX: "auto",
};

const table = {
  width: "100%",
  borderCollapse: "separate",
  borderSpacing: "0 10px",
};

const theadRow = {
  background: "transparent",
};

const tbodyRow = {
  background: "#f9fafb",
  borderRadius: 12,
  height: 60,
};

const th = {
  padding: "12px 10px",
  textAlign: "left",
  color: "#064e3b",
  fontWeight: 700,
  fontSize: 14,
};

const td = {
  padding: "12px 10px",
  fontSize: 14,
  color: "#374151",
};

const activeBadge = {
  background: "#10b981",
  color: "white",
  padding: "5px 12px",
  borderRadius: 20,
  fontSize: 12,
};

const inactiveBadge = {
  background: "#ef4444",
  color: "white",
  padding: "5px 12px",
  borderRadius: 20,
  fontSize: 12,
};

const editLink = {
  color: "#2563eb",
  textDecoration: "none",
  fontWeight: 600,
};

export default EmployeeList;
