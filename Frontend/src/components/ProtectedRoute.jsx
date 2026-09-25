import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, role }) {

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));


  // Token lekapothe login ki pampisthundi
  if (!token) {
    return <Navigate to="/login" replace />;
  }


  // Role check (optional)
  if (role && user?.role !== role) {
    return <Navigate to="/" replace />;
  }


  return children;
}

export default ProtectedRoute;