// import React from 'react';
import { useNavigate } from 'react-router-dom';

// Custom hook to provide navigation
export function useAppNavigation() {
  const navigate = useNavigate();

  return {
    toOnboarding: () => navigate('/'),
    toEmailLogin: () => navigate('/email-login'),
    toScanning: () => navigate('/scanning'),
    toDashboard:  (subscriptions = []) =>
      navigate('/dashboard', { state: {subscriptions} }),
    // toCategoryView: (subscriptions = []) =>
    //   navigate('/category-view', { state: subscriptions }),
    toCategoryView: ({ subscriptions = [], title = '' } = {}) =>
      navigate('/category-view', { state: { subscriptions, title } }),
    toUnsubscribeProcess: () => navigate('/unsubscribe-process')
  };
}

export default function Navigation() {
  return null; 
}