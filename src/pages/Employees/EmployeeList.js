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
      const res = await api.get("/api/employees/");
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
      await api.delete(`/api/employees/delete/${selectedEmployee.id}/`);
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
                <td style={{ ...td, fontWeight: 600, color: "#0369a1" }}>
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
/* ===================== STYLES ===================== */

const page = {
  padding: 30,
  minHeight: "100vh",
  background: "linear-gradient(135deg,#e0f2fe,#f0f9ff)",
};

const title = {
  fontSize: 30,
  fontWeight: 800,
  color: "#0c4a6e",
  marginBottom: 25,
};

const tableWrapper = {
  overflowX: "auto",
  borderRadius: 16,
};

const table = {
  width: "100%",
  borderCollapse: "collapse",
  background: "#ffffff",
  boxShadow: "0 12px 35px rgba(2,132,199,0.15)",
};

const theadRow = {
  background: "linear-gradient(135deg,#0284c7,#0369a1)",
};

const th = {
  padding: "14px",
  color: "#ffffff",
  fontWeight: 700,
  fontSize: 14,
};

const tr = {
  transition: "background 0.2s",
};

const td = {
  padding: "12px",
  fontSize: 14,
  color: "#0f172a",
};

const deptBadge = {
  background: "#e0f2fe",
  color: "#0369a1",
  padding: "4px 12px",
  borderRadius: 20,
  fontSize: 12,
  fontWeight: 600,
};

const roleBadge = {
  background: "#dbeafe",
  color: "#1e40af",
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
  background: "linear-gradient(135deg,#3b82f6,#2563eb)",
  color: "#ffffff",
  border: "none",
  borderRadius: 8,
  padding: "6px 12px",
  fontWeight: 600,
  cursor: "pointer",
};

const deleteBtn = {
  background: "linear-gradient(135deg,#ef4444,#dc2626)",
  color: "#ffffff",
  border: "none",
  borderRadius: 8,
  padding: "6px 12px",
  fontWeight: 600,
  cursor: "pointer",
};

const empty = {
  textAlign: "center",
  padding: 30,
  color: "#64748b",
  fontWeight: 600,
};

/* ===== MODAL ===== */

const modalOverlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(2,132,199,0.25)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 999,
};

const modalBox = {
  background: "#ffffff",
  padding: 25,
  borderRadius: 16,
  width: 380,
  boxShadow: "0 25px 50px rgba(2,132,199,0.35)",
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
  border: "1px solid #bae6fd",
  background: "#f0f9ff",
  color: "#0369a1",
  fontWeight: 600,
  cursor: "pointer",
};

const confirmBtn = {
  padding: "8px 14px",
  borderRadius: 8,
  border: "none",
  background: "linear-gradient(135deg,#ef4444,#dc2626)",
  color: "#ffffff",
  fontWeight: 600,
  cursor: "pointer",
};

const errorText = {
  color: "#dc2626",
  marginTop: 8,
  fontWeight: 600,
};
