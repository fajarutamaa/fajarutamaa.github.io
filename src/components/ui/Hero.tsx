import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export function Hero() {
  return (
    <div className="flex items-start gap-4">
      {/* Avatar with floating animation */}
      <div className="relative shrink-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 rounded-full blur-xl animate-pulse" />
        <Image
          src="/img/avatar.webp"
          alt="Fajar Dwi Utomo"
          width={48}
          height={48}
          className="relative w-12 h-12 rounded-full ring-2 ring-primary/20 transition-transform duration-300 hover:scale-110 hover:ring-primary/40"
          priority
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <Link
          href="/"
          className="font-semibold text-lg hover:text-primary transition-colors duration-200 inline-block"
        >
          Fajar Dwi Utomo
        </Link>
        <p className="text-muted-foreground font-medium flex items-center gap-1.5">
          Junior Software Engineer
          <span className="inline-block animate-wave">👋</span>
        </p>
      </div>
    </div>
  );
}
