import { Navigate, Outlet, useLocation } from "react-router-dom";

function RequireAuth() {
  const location = useLocation();

  const token = localStorage.getItem("access");
  const role = localStorage.getItem("role");

  // ❌ Not logged in → login
  if (!token || !role) {
    return <Navigate to="/login" replace />;
  }

  // ✅ Logged in but trying to access /login
  if (location.pathname === "/login") {
    return (
      <Navigate
        to={
          role === "ADMIN" || role === "HR"
            ? "/admin-dashboard"
            : "/employee-dashboard"
        }
        replace
      />
    );
  }

  return <Outlet />;
}

export default RequireAuth;
