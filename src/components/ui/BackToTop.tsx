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
      onClick={() => window.scrollTo({ top: 0 })}
      className="fixed bottom-5 left-5 z-40 hidden size-11 place-items-center rounded-full border bg-card text-muted-foreground hover:text-foreground md:grid"
      aria-label="Back to top"
    >
      <ChevronUp size={16} />
    </button>
  );
}
