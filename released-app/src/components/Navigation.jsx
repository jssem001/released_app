// import React from 'react';
import { useNavigate } from 'react-router-dom';

// Custom hook to provide navigation
export function useAppNavigation() {
  const navigate = useNavigate();

  return {
    toOnboarding: () => navigate('/'),
    toEmailLogin: () => navigate('/email-login'),
    toScanning: () => navigate('/scanning'),
    toDashboard: () => navigate('/dashboard'),
    toCategoryView: () => navigate('/category-view'),
    toUnsubscribeProcess: () => navigate('/unsubscribe-process')
  };
}

export default function Navigation() {
  return null; // This is just a placeholder component
}