import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/api";
import { Page } from "../../theme/pageStyles";

function EmployeeView() {
  const { id } = useParams();
  const [emp, setEmp] = useState(null);

  useEffect(() => {
    api.get(`employees/${id}/`).then(res => setEmp(res.data));
  }, [id]);

  if (!emp) return <p>Loading...</p>;

  return (
    <div style={Page.wrapper}>
      <h2 style={Page.title}>{emp.name}</h2>
      <div style={Page.card}>
        <p>{emp.email}</p>
        <p>{emp.department}</p>
      </div>
    </div>
  );
}

export default EmployeeView;
