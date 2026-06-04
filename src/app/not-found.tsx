'use client';

import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center space-y-6 max-w-sm animate-fadeIn">
        <div className="space-y-1">
          <p className="text-7xl font-bold gradient-text tracking-tight">404</p>
          <p className="text-muted-foreground text-sm">This page doesn&apos;t exist</p>
        </div>

        <p className="text-sm text-muted-foreground/70 leading-relaxed">
          The link you followed may be broken, or the page may have been moved or deleted.
        </p>

        <div className="flex items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            <Home size={14} />
            Home
          </Link>
          <button
            type="button"
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-card border border-border/50 rounded-lg font-medium text-muted-foreground hover:text-foreground hover:border-border transition-all"
          >
            <ArrowLeft size={14} />
            Go back
          </button>
        </div>
      </div>
    </div>
  );
}
