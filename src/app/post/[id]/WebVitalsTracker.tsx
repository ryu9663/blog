"use client";

import { useEffect } from "react";
import { onLCP, onFCP, onCLS, onINP, onTTFB, Metric } from "web-vitals";
import "@/types/mixpanel.d";

interface WebVitalsTrackerProps {
  title: string;
}

export default function WebVitalsTracker({ title }: WebVitalsTrackerProps) {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") return;
    if (localStorage.getItem("mixpanel_disabled") === "true") return;

    const sendToMixpanel = (metric: Metric) => {
      if (!window.mixpanel) return;

      window.mixpanel.track("Web Vital", {
        title,
        metric_name: metric.name,
        metric_value: metric.value,
        metric_rating: metric.rating,
        metric_id: metric.id,
        navigation_type: metric.navigationType,
      });
    };

    onLCP(sendToMixpanel);
    onFCP(sendToMixpanel);
    onCLS(sendToMixpanel);
    onINP(sendToMixpanel);
    onTTFB(sendToMixpanel);
  }, [title]);

  return null;
}
