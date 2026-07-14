import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LoadingDots from '../layout/LoadingDots';

const FullScreenLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-cream-50">
    <LoadingDots label="Loading your account..." />
  </div>
);

/**
 * Wrap any route that requires a logged-in user.
 * Unauthenticated visitors are sent to /login, remembering where they were headed
 * so LoginPage can send them back after a successful sign-in.
 */
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <FullScreenLoader />;

  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children;
};

export default ProtectedRoute;
