import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children, allowedRoles }) => {
  const { isAuthenticated, authData } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  if (!allowedRoles?.includes(authData?.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoutes;
