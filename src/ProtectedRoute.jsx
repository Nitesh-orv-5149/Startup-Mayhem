// ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    // Not logged in → redirect to /auth
    return <Navigate to="/auth" replace />;
  }

  if (user.isAdmin) {
    // Admin → redirect to admin dashboard
    return <Navigate to="/admin/cards" replace />;
  }

  // Regular user → redirect to homepage
  return <Navigate to="/" replace />;
};

export default ProtectedRoute;
