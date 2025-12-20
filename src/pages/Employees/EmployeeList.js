import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";

import { Page } from "../../theme/pageStyles";
import { Form } from "../../theme/formStyles";


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

