import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

export default function RequireAuth() {
  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const access = localStorage.getItem("access");
    const role = localStorage.getItem("role");

    if (access && role) {
      setAllowed(true);
    } else {
      setAllowed(false);
    }

    setLoading(false);
  }, []);

  // 🔑 IMPORTANT: NEVER return null
  if (loading) {
    return (
      <div style={{ padding: 40, textAlign: "center" }}>
        Checking authentication…
      </div>
    );
  }

  if (!allowed) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
