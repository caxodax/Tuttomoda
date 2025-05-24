import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAdminStore } from '../../stores/adminStore';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isLoggedIn = useAdminStore((state) => state.user.isLoggedIn);
  
  if (!isLoggedIn) {
    return <Navigate to="/admin/login" replace />;
  }
  
  return <>{children}</>;
};

export default ProtectedRoute;