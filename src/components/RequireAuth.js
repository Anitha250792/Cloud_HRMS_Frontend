import { Navigate, Outlet, useLocation } from "react-router-dom";

function RequireAuth() {
  const location = useLocation();

  const access = localStorage.getItem("access");
  const role = localStorage.getItem("role");

  // 🔴 Not logged in → go to login
  if (!access) {
    return <Navigate to="/login" replace />;
  }

  // 🔵 Logged in but on wrong dashboard → redirect by role
  if (location.pathname === "/") {
    return (
      <Navigate
        to={role === "HR" ? "/admin-dashboard" : "/employee-dashboard"}
        replace
      />
    );
  }

  return <Outlet />;
}

export default RequireAuth;
