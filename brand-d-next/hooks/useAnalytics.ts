'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

type TrackOptions = {
  elementId?: string;
  metadata?: Record<string, any>;
};

export function useAnalytics() {
  const pathname = usePathname();
  const scrollTracked = useRef(new Set<number>());

  const trackEvent = async (eventType: string, options?: TrackOptions) => {
    try {
      // Use sendBeacon for non-blocking analytics, fallback to fetch
      const payload = JSON.stringify({
        eventType,
        path: pathname,
        ...options,
      });

      if (navigator.sendBeacon) {
        navigator.sendBeacon('/api/events', payload);
      } else {
        await fetch('/api/events', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: payload,
          keepalive: true,
        });
      }
    } catch (e) {
      console.error('Failed to track event', e);
    }
  };

  // Automated Scroll Depth Tracking
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      const depth = (scrolled / scrollHeight) * 100;

      const milestones = [25, 50, 75, 100];
      
      milestones.forEach((milestone) => {
        if (depth >= milestone && !scrollTracked.current.has(milestone)) {
          scrollTracked.current.add(milestone);
          trackEvent(`scroll_${milestone}`);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Reset tracked milestones on route change
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [pathname]);

  return { trackEvent };
}
