import { useDid } from "../contexts/DidContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { did } = useDid();

  return did ? <Outlet /> : <Navigate to="/connect" replace />;
};

export default ProtectedRoute;
