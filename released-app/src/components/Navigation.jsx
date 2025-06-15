// import React from 'react';
import { useNavigate } from 'react-router-dom';

// Custom hook to provide navigation
export function useAppNavigation() {
  const navigate = useNavigate();

  const sanitizeSubs = (subs) => {
   if (!Array.isArray(subs)) return [];
    return subs.map(s => ({
      id: s.id,
      from: s.from,
      subject: s.subject,
      unsubscribeLink: s.unsubscribeLink,
      listUnsubscribeUrl: s.listUnsubscribeUrl || null,
    }));
  };

  return {
    toOnboarding: () => navigate('/'),
    toEmailLogin: () => navigate('/email-login'),
    toSettings: () => navigate('/settings'),
    toPremium: () => navigate('/premium'),
    toStatistics: () => navigate('/statistics'),
    toScanning: () => navigate('/scanning'),
    toDashboard:  (subscriptions = []) =>
      navigate('/dashboard', { state: { subscriptions: sanitizeSubs(subscriptions) } }),
    toCategoryView: ({ subscriptions = [], title = '' } = {}) =>
      navigate('/category-view', { state: { subscriptions: sanitizeSubs(subscriptions), title } }),
    toUnsubscribeProcess: ({ subscriptions = [] } = {}) =>
      navigate('/unsubscribe-process', { state: { subscriptions: sanitizeSubs(subscriptions) } }),
  };
}

export default function Navigation() {
  return null; 
}