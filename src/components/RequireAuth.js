import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function RequireAuth() {
  const location = useLocation();
  const access = localStorage.getItem("access");
  const role = localStorage.getItem("role");

  if (!access || !role) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
