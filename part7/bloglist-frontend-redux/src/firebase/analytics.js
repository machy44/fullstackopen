import { getAnalytics, logEvent } from 'firebase/analytics';
import { useEffect, useState } from 'react';
import { firebaseConfig } from './firebaseConfig';
import { initializeApp } from 'firebase/app';
import React, { createContext, useContext } from 'react';

export const AnalyticsContext = createContext({});
export const useAnalytics = () => useContext(AnalyticsContext);

const createEvents = (analytics) => {
  const loginEvent = (params) => logEvent(analytics, 'login', params);
  const blogCreated = (params) => logEvent(analytics, 'blog_creation', params);
  const blogCommented = (params) => logEvent(analytics, 'blog_commented', params);
  const apiPerformance = (params) => logEvent(analytics, 'api_performance', params);

  return {
    loginEvent,
    blogCreated,
    apiPerformance,
    blogCommented
  };
};

export function useAnalyticsSetup() {
  const [events, setEvents] = useState({});

  useEffect(() => {
    // eslint-disable-next-line no-undef
    if (!process.env.REACT_APP_ENABLE_ANALYTICS) {
      // We do not want to initialize analytics for test runs
      return;
    }

    initializeApp(firebaseConfig);
    const analytics = getAnalytics();
    const events = createEvents(analytics);
    setEvents(events);
  }, []);

  return { events };
}

export function AnalyticsProvider({ children }) {
  const { events } = useAnalyticsSetup();

  return <AnalyticsContext.Provider value={events}>{children}</AnalyticsContext.Provider>;
}
