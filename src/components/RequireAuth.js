import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function RequireAuth() {
  const access = localStorage.getItem("access");
  const role = localStorage.getItem("role");
  const location = useLocation();

  // Not logged in
  if (!access || !role) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
