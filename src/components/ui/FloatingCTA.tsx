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
    <div className="fixed bottom-24 md:bottom-8 right-4 z-50 animate-fadeIn">
      <div className="relative group">
        <Link
          href="/contact"
          className="flex items-center gap-2 px-5 py-3 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          <MessageCircle size={18} />
          <span className="text-sm font-medium hidden sm:inline">Let&apos;s Talk</span>
        </Link>
        <button
          type="button"
          onClick={() => setIsDismissed(true)}
          className="absolute -top-1 -right-1 p-0.5 rounded-full bg-muted-foreground/20 hover:bg-muted-foreground/40 transition-colors"
          aria-label="Dismiss"
        >
          <X size={12} />
        </button>
      </div>
    </div>
  );
}
