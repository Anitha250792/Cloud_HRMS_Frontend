import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

export default function RequireAuth() {
  const [checked, setChecked] = useState(false);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const access = localStorage.getItem("access");
    const role = localStorage.getItem("role");

    if (access && role) setAllowed(true);
    setChecked(true);
  }, []);

  if (!checked) return null;

  if (!allowed) return <Navigate to="/login" replace />;

  return <Outlet />;
}
