declare global {
  interface Window {
    mixpanel?: {
      track_pageview: (properties?: Record<string, string>) => void;
      track: (eventName: string, properties?: Record<string, unknown>) => void;
    };
  }
}

export {};
