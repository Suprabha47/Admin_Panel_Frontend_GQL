import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { status } = useSelector((state) => state.user);
  if (!status) <Navigate to="/sign-in" replace />;
  return children;
};

export default ProtectedRoute;
