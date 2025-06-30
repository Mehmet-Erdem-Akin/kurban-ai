"use client";

import { GoogleAnalytics } from "@next/third-parties/google";
import { useEffect } from "react";

const Analytics = () => {
  const GA_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_VERIFICATION;

  useEffect(() => {
    // Google Search Console verification
    if (typeof window !== "undefined") {
      // Track page views for SEO analytics
      window.gtag?.("event", "page_view", {
        page_title: document.title,
        page_location: window.location.href,
      });
    }
  }, []);

  if (!GA_ID) return null;

  return (
    <>
      <GoogleAnalytics gaId={GA_ID} />

      {/* Additional tracking for SEO events */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            // Track SEO-relevant events
            function trackSEOEvent(action, category, label) {
              if (typeof gtag !== 'undefined') {
                gtag('event', action, {
                  event_category: category,
                  event_label: label,
                  value: 1
                });
              }
            }
            
            // Make function globally available
            window.trackSEOEvent = trackSEOEvent;
            
            // Track scroll depth for SEO
            let scrollDepthTracked = false;
            window.addEventListener('scroll', function() {
              const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
              if (scrollPercent > 50 && !scrollDepthTracked) {
                trackSEOEvent('scroll_depth', 'engagement', '50_percent');
                scrollDepthTracked = true;
              }
            });
          `,
        }}
      />
    </>
  );
};

export default Analytics;
