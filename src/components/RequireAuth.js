import { Navigate, Outlet, useLocation } from "react-router-dom";

function isTokenExpired(token) {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp * 1000 < Date.now();
  } catch {
    return true;
  }
}

function RequireAuth() {
  const location = useLocation();
  const token = localStorage.getItem("access");
  const role = localStorage.getItem("role");

  // ⛔ Not logged in
  if (!token || !role) {
    return <Navigate to="/login" replace />;
  }

  // ⛔ Token expired
  if (isTokenExpired(token)) {
    localStorage.clear();
    return <Navigate to="/login" replace />;
  }

  // ✅ Auth OK
  return <Outlet />;
}

export default RequireAuth;
