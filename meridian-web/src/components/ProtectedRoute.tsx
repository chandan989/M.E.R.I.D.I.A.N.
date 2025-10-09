import { useOne } from "../contexts/OneContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { did, isLoading } = useOne();

  // Don't redirect while loading authentication state
  if (isLoading) {
    return null; // or a loading spinner
  }

  return did ? <Outlet /> : <Navigate to="/connect" replace />;
};

export default ProtectedRoute;
