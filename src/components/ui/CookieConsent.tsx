'use client';

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

const COOKIE_CONSENT_KEY = 'cookie-consent';

export function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      const timer = setTimeout(() => setShow(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-24 left-4 right-4 md:left-auto md:right-4 md:bottom-24 md:max-w-xs z-50 animate-slideUp">
      <div className="glass-card rounded-2xl p-4">
        <div className="flex items-start justify-between gap-3">
          <p className="text-xs text-muted-foreground leading-relaxed">
            This site uses Umami analytics to understand how visitors interact with the site. No
            personal data is collected.
          </p>
          <button
            type="button"
            onClick={accept}
            className="shrink-0 p-1 rounded-full hover:bg-muted/50 transition-colors"
            aria-label="Accept"
          >
            <X size={13} />
          </button>
        </div>
        <button
          type="button"
          onClick={accept}
          className="mt-2 text-xs font-medium text-primary hover:underline"
        >
          Got it
        </button>
      </div>
    </div>
  );
}
