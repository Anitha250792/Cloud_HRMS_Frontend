import { Navigate, Outlet } from "react-router-dom";

export default function RequireAuth() {
  const access = localStorage.getItem("access");
  const role = localStorage.getItem("role");

  // 🔒 Not logged in
  if (!access || !role) {
    return <Navigate to="/login" replace />;
  }

  // ✅ Logged in
  return <Outlet />;
}
