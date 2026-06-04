import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '../lib/analytics';

export function useAnalytics() {
  const location = useLocation();
  const lastTracked = useRef<string | null>(null);

  useEffect(() => {
    const url = window.location.origin + location.pathname + location.search;

    if (lastTracked.current === url) return;
    lastTracked.current = url;

    const timer = window.setTimeout(() => {
      trackPageView(url, document.title);
    }, 100);

    return () => window.clearTimeout(timer);
  }, [location.pathname, location.search]);
}
