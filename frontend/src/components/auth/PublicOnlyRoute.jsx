import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LoadingDots from '../layout/LoadingDots';

const FullScreenLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-cream-50">
    <LoadingDots label="Loading..." />
  </div>
);

/**
 * Wrap Login / Register / Forgot Password with this.
 * Already-authenticated users are bounced to the dashboard instead of seeing
 * the auth forms again.
 */
const PublicOnlyRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <FullScreenLoader />;

  if (user) {
    return <Navigate to="/app" replace />;
  }

  return children;
};

export default PublicOnlyRoute;
