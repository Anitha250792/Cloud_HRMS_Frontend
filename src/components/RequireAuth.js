import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function RequireAuth() {
  const location = useLocation();
  const [isReady, setIsReady] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const access = localStorage.getItem("access");
    const role = localStorage.getItem("role");

    if (access && role) {
      setIsAuth(true);
    }

    setIsReady(true);
  }, []);

  // ⏳ Wait until router + auth check is ready
  if (!isReady) {
    return null; // or loading spinner
  }

  if (!isAuth) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  return <Outlet />;
}
