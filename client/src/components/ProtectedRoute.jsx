import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, isAdminLoggedIn }) => {
  return isAdminLoggedIn ? children : <Navigate to="/AdminLogin" replace />;
};

export default ProtectedRoute;
