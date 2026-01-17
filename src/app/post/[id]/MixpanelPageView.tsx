"use client";

import { useEffect } from "react";
import "@/types/mixpanel.d";

interface MixpanelPageViewProps {
  title: string;
}

export default function MixpanelPageView({ title }: MixpanelPageViewProps) {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") return;
    if (localStorage.getItem("mixpanel_disabled") === "true") return;
    if (window.mixpanel) {
      window.mixpanel.track_pageview({ title });
    }
  }, [title]);

  return null;
}
