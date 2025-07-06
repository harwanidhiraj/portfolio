import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: any }) => {
  const token = localStorage.getItem("admin_token");
  return token ? children : <Navigate to="/admin/login" />;
};

export default ProtectedRoute;
