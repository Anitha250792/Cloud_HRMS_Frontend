import { Navigate } from "react-router-dom";

import { Page } from "../../theme/pageStyles";
import { Form } from "../../theme/formStyles";


export default function RequireAuth({ children }) {
  const token = localStorage.getItem("access");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
