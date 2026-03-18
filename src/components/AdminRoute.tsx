import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppAuth } from "@/contexts/AuthContext";

export default function AdminRoute() {
  const { user, isAdmin, isStaff } = useAppAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  if (!isAdmin && !isStaff) {
    return <Navigate to="/portal" replace />;
  }

  return <Outlet />;
}
