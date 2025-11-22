import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function AdminRoute() {
  const location = useLocation();
  const isAuthenticated = sessionStorage.getItem("isAdminAuthenticated") === "true";

  if (!isAuthenticated) {
    return <Navigate to="/admin-lock" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
