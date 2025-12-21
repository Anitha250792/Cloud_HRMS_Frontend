import { useEffect, useState } from "react";
import api from "../../api/api";
import { Page } from "../../theme/pageStyles";

function EmployeeDirectory() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    api.get("employees/").then(res => setEmployees(res.data));
  }, []);

  return (
    <div style={Page.wrapper}>
      <h2 style={Page.title}>👥 Employee Directory</h2>

      <div style={Page.card}>
        {employees.map(e => (
          <p key={e.id}>{e.emp_code} – {e.name}</p>
        ))}
      </div>
    </div>
  );
}

export default EmployeeDirectory;
