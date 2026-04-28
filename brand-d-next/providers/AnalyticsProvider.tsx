'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    // Fire page_view on route change
    const trackPageView = async () => {
      try {
        await fetch('/api/events', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            eventType: 'page_view',
            path: pathname,
            metadata: { timestamp: new Date().toISOString() }
          }),
          // Keepalive ensures the request finishes even if the user navigates away
          keepalive: true 
        });
      } catch (e) {
        console.error("Tracking failed", e);
      }
    };

    trackPageView();
  }, [pathname]);

  return <>{children}</>;
}
