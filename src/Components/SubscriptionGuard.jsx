import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { hasLostSubscription } from '../utils/subscriptionUtils';
import Loader from './Loader';

const SubscriptionGuard = ({ children }) => {
  const { user, isInitialized } = useAuthContext();
  const location = useLocation();

  // Show loading while auth is initializing
  if (!isInitialized) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader text="Loading..." />
      </div>
    );
  }

  // If user is not authenticated, let the parent handle it
  if (!user?.user) {
    return children;
  }

  // Check if user has lost subscription
  const subscriptionLost = hasLostSubscription(user);

  // If subscription is lost and user is not on subscription page, redirect
  if (subscriptionLost && location.pathname !== '/dashboard/subscription') {
    return <Navigate to="/dashboard/subscription" replace />;
  }

  // If subscription is active or user is on subscription page, allow access
  return children;
};

export default SubscriptionGuard; 