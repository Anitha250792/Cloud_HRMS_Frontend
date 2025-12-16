import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";

function EmployeeList() {
  const navigate = useNavigate();

  const [employees, setEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      const res = await api.get("employees/");
      setEmployees(res.data);
    } catch (err) {
      console.error("Employee list error:", err);
    }
  };

  const handleDelete = async () => {
    if (!selectedEmployee) return;

    setDeleting(true);
    setError("");

    try {
      await api.delete(`employees/delete/${selectedEmployee.id}/`);
      setShowModal(false);
      setSelectedEmployee(null);
      loadEmployees();
    } catch (err) {
      setError("❌ Unable to delete employee. Linked records exist.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div style={page}>
      <h2 style={title}>👥 Employee Directory</h2>

      <div style={tableWrapper}>
        <table style={table}>
          <thead>
            <tr style={theadRow}>
              <th style={th}>Code</th>
              <th style={th}>Name</th>
              <th style={th}>Email</th>
              <th style={th}>Department</th>
              <th style={th}>Role</th>
              <th style={th}>Salary</th>
              <th style={th}>Joined</th>
              <th style={th}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {employees.map((e, index) => (
              <tr
                key={e.id}
                style={{
                  ...tr,
                  background: index % 2 === 0 ? "#ffffff" : "#f8fafc",
                }}
              >
                <td style={td}>{e.emp_code}</td>
                <td style={{ ...td, fontWeight: 600, color: "#065f46" }}>
                  {e.name}
                </td>
                <td style={td}>{e.email}</td>
                <td style={td}>
                  <span style={deptBadge}>{e.department}</span>
                </td>
                <td style={td}>
                  <span style={roleBadge}>{e.role}</span>
                </td>
                <td style={{ ...td, fontWeight: 600, color: "#0f2476ff" }}>
                  ₹{e.salary}
                </td>
                <td style={td}>{e.date_joined}</td>

                <td style={td}>
                  <div style={actionGroup}>
                    {/* EDIT */}
                    <button
                      style={editBtn}
                      onClick={() =>
                        navigate(`/employees/edit/${e.id}`)
                      }
                    >
                      ✏ Edit
                    </button>

                    {/* DELETE */}
                    <button
                      style={deleteBtn}
                      onClick={() => {
                        setSelectedEmployee(e);
                        setShowModal(true);
                      }}
                    >
                      🗑 Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {employees.length === 0 && (
              <tr>
                <td colSpan="8" style={empty}>
                  No employees found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ===== DELETE MODAL ===== */}
      {showModal && (
        <div style={modalOverlay}>
          <div style={modalBox}>
            <h3 style={{ marginBottom: 10 }}>Delete Employee</h3>

            <p>
              Are you sure you want to delete{" "}
              <strong>{selectedEmployee?.name}</strong>?
            </p>

            {error && <p style={errorText}>{error}</p>}

            <div style={modalActions}>
              <button
                style={cancelBtn}
                onClick={() => {
                  setShowModal(false);
                  setError("");
                }}
              >
                Cancel
              </button>

              <button
                style={confirmBtn}
                onClick={handleDelete}
                disabled={deleting}
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EmployeeList;

/* ===================== STYLES ===================== */

const page = {
  padding: 30,
  minHeight: "100vh",
  background: "linear-gradient(135deg,#ecfeff,#f0fdf4)",
};

const title = {
  fontSize: 30,
  fontWeight: 800,
  color: "#06144eff",
  marginBottom: 25,
};

const tableWrapper = {
  overflowX: "auto",
  borderRadius: 16,
};

const table = {
  width: "100%",
  borderCollapse: "collapse",
  background: "white",
  boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
};

const theadRow = {
  background: "linear-gradient(135deg,#047857,#065f46)",
};

const th = {
  padding: "14px",
  color: "white",
  fontWeight: 700,
  fontSize: 14,
};

const tr = {
  transition: "background 0.2s",
};

const td = {
  padding: "12px",
  fontSize: 14,
  color: "#1f2937",
};

const deptBadge = {
  background: "#dbeafe",
  color: "#1e40af",
  padding: "4px 12px",
  borderRadius: 20,
  fontSize: 12,
  fontWeight: 600,
};

const roleBadge = {
  background: "#fef3c7",
  color: "#92400e",
  padding: "4px 12px",
  borderRadius: 20,
  fontSize: 12,
  fontWeight: 600,
};

const actionGroup = {
  display: "flex",
  gap: 8,
};

const editBtn = {
  background: "linear-gradient(135deg,#2563eb,#1d4ed8)",
  color: "white",
  border: "none",
  borderRadius: 8,
  padding: "6px 12px",
  fontWeight: 600,
  cursor: "pointer",
};

const deleteBtn = {
  background: "linear-gradient(135deg,#dc2626,#b91c1c)",
  color: "white",
  border: "none",
  borderRadius: 8,
  padding: "6px 12px",
  fontWeight: 600,
  cursor: "pointer",
};

const empty = {
  textAlign: "center",
  padding: 30,
  color: "#6b7280",
  fontWeight: 600,
};

const modalOverlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 999,
};

const modalBox = {
  background: "#fff",
  padding: 25,
  borderRadius: 14,
  width: 380,
  boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
};

const modalActions = {
  display: "flex",
  justifyContent: "flex-end",
  gap: 10,
  marginTop: 20,
};

const cancelBtn = {
  padding: "8px 14px",
  borderRadius: 8,
  border: "1px solid #ccc",
  background: "#f8fafc",
  cursor: "pointer",
};

const confirmBtn = {
  padding: "8px 14px",
  borderRadius: 8,
  border: "none",
  background: "#dc2626",
  color: "white",
  cursor: "pointer",
};

const errorText = {
  color: "#dc2626",
  marginTop: 8,
  fontWeight: 600,
};
