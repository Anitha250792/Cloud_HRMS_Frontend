import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import { Page } from "../../theme/pageStyles";

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/api/employees/").then(res => setEmployees(res.data));
  }, []);

  return (
    <div style={Page.wrapper}>
      <h2 style={Page.title}>👥 Employees</h2>

      <div style={Page.card}>
        {employees.map(e => (
          <div key={e.id} style={{ display: "flex", justifyContent: "space-between" }}>
            <span>{e.name}</span>
            <button onClick={() => navigate(`/employees/edit/${e.id}`)}>Edit</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EmployeeList;
