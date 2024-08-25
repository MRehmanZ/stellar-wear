import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const AdminRoute = ({ children }) => {
  const { user } = useAuth();

  const isAdmin = user && user.role === "Admin";

  return isAdmin ? children : <Navigate to="/login" />;
};

export default AdminRoute;
