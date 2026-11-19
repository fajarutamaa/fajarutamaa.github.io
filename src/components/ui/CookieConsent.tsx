'use client';

import { useEffect, useState } from 'react';

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
    <div className="fixed inset-x-4 bottom-[calc(72px+env(safe-area-inset-bottom,0px))] z-50 animate-slideUp md:bottom-5 md:left-auto md:right-5 md:max-w-sm">
      <div className="flex items-center gap-3 rounded-xl border bg-card p-3 shadow-sm">
        <p className="text-xs leading-relaxed text-muted-foreground">
          This site uses Umami analytics to understand how visitors interact with the site. No
          personal data is collected.
        </p>
        <button
          type="button"
          onClick={accept}
          className="shrink-0 rounded-lg bg-accent px-3 py-3 text-xs font-medium text-accent-foreground"
        >
          Got it
        </button>
      </div>
    </div>
  );
}
