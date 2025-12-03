import { useEffect, useState } from "react";
import api from "../../api/api";
import { Link } from "react-router-dom";

function EmployeeDirectory() {
  const [employees, setEmployees] = useState([]);
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const empRes = await api.get("employees/");
    setEmployees(empRes.data);

    const today = new Date().toISOString().split("T")[0];

    const attRes = await api.get("attendance/");
    const todayRecords = attRes.data.filter((rec) => rec.date === today);

    setAttendance(todayRecords);
  };

  const getAttendance = (emp_id) => {
    return attendance.find((a) => a.employee === emp_id);
  };

  return (
    <div className="container mt-4" style={{ maxWidth: "1000px" }}>
      <div
        className="card p-4 shadow-lg border-0"
        style={{ borderRadius: "15px" }}
      >
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="fw-bold text-primary">👥 Employee Directory</h2>

          <Link
            to="/"
            className="btn btn-secondary"
            style={{ fontWeight: 600 }}
          >
            ← Back to Dashboard
          </Link>
        </div>

        <table className="table table-striped table-bordered mt-3">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Department</th>
              <th>Email</th>
              <th>Check In</th>
              <th>Check Out</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {employees.map((emp) => {
              const att = getAttendance(emp.id);

              return (
                <tr key={emp.id}>
                  <td>{emp.emp_code}</td>
                  <td>{emp.name}</td>
                  <td>{emp.department}</td>
                  <td>{emp.email}</td>

                  <td>{att?.check_in || "—"}</td>
                  <td>{att?.check_out || "—"}</td>

                  <td>
                    {att?.check_in ? (
                      <span className="badge bg-success">Present</span>
                    ) : (
                      <span className="badge bg-danger">Absent</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {employees.length === 0 && (
          <p className="text-center mt-3 text-muted">No employees found.</p>
        )}
      </div>
    </div>
  );
}

export default EmployeeDirectory;
