import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    // Not logged in → redirect to /auth
    return <Navigate to="/auth" replace />;
  }

  if (user.isAdmin) {
    // Admins always go to /admin
    if (!adminOnly) {
      return <Navigate to="/admin/cards" replace />;
    }
  }

  if (adminOnly && !user.isAdmin) {
    // Block regular users from admin-only routes
    return <Navigate to="/" replace />;
  }

  // Regular user accessing allowed route, or admin accessing admin route
  return <>{children}</>;
};

export default ProtectedRoute;
