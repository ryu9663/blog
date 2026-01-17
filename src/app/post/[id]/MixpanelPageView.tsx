"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    mixpanel?: {
      track_pageview: (properties?: Record<string, string>) => void;
    };
  }
}

interface MixpanelPageViewProps {
  title: string;
}

export default function MixpanelPageView({ title }: MixpanelPageViewProps) {
  useEffect(() => {
    if (window.mixpanel) {
      window.mixpanel.track_pageview({ title });
    }
  }, [title]);

  return null;
}
