'use client';

import { useEffect, useState } from 'react';
import { ChevronUp } from 'lucide-react';

export function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShow(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!show) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-24 left-4 md:bottom-8 md:left-8 z-40 p-2.5 rounded-full bg-card border border-border/50 shadow-md hover:shadow-lg hover:border-border transition-all duration-300 text-muted-foreground hover:text-foreground"
      aria-label="Back to top"
    >
      <ChevronUp size={18} />
    </button>
  );
}
