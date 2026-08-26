'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { MessageCircle, X } from 'lucide-react';

export function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight * 0.6;
      setIsVisible(window.scrollY > heroHeight);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible || isDismissed) return null;

  return (
    <div className="fixed bottom-24 md:bottom-6 right-4 z-50 animate-fadeIn">
      <div className="relative group">
        <Link
          href="/contact"
          className="flex items-center gap-2 px-4 py-2.5 glass-card rounded-full"
        >
          <MessageCircle size={16} className="text-primary" />
          <span className="text-[13px] font-medium hidden sm:inline">Let&apos;s Talk</span>
        </Link>
        <button
          type="button"
          onClick={() => setIsDismissed(true)}
          className="absolute -top-1 -right-1 p-0.5 rounded-full glass hover:bg-muted/50 transition-colors"
          aria-label="Dismiss"
        >
          <X size={11} />
        </button>
      </div>
    </div>
  );
}
