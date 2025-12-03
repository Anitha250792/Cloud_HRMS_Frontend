// components/EmployeeTable.js
import React, { useEffect, useState } from "react";
import API from "../services/api";

function EmployeeTable() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    API.get("employees/")
      .then((res) => setEmployees(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="table-responsive mt-3">
      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>Emp Code</th>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Role</th>
            <th>Salary</th>
            <th>Joined</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr key={emp.id}>
              <td>{emp.emp_code}</td>
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>{emp.department}</td>
              <td>{emp.role}</td>
              <td>{emp.salary}</td>
              <td>{emp.date_joined}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeTable;
