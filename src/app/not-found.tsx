'use client';

import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="text-center space-y-5 max-w-sm animate-fadeIn">
        <div className="space-y-1">
          <p className="text-6xl sm:text-7xl font-bold tracking-tight">
            <span className="gradient-text">404</span>
          </p>
          <p className="text-muted-foreground text-sm">Page not found</p>
        </div>

        <p className="text-sm text-muted-foreground/60 leading-relaxed max-w-xs mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        <div className="flex items-center justify-center gap-2 pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm glass-card rounded-full font-medium"
          >
            <Home size={14} />
            Home
          </Link>
          <button
            type="button"
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm glass-card rounded-full font-medium text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft size={14} />
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
