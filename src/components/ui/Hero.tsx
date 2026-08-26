import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Briefcase } from 'lucide-react';

export function Hero() {
  return (
    <div className="animate-fadeIn">
      <div className="flex items-center gap-4">
        <div className="relative shrink-0">
          <Image
            src="/img/avatar.webp"
            alt="Fajar Dwi Utomo"
            width={56}
            height={56}
            quality={80}
            className="relative w-14 h-14 rounded-2xl ring-1 ring-border object-cover transition-all duration-500 hover:ring-2 hover:ring-primary/30"
            priority
          />
          <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-background" />
        </div>

        <div className="flex-1 min-w-0">
          <Link
            href="/"
            className="font-semibold text-lg tracking-tight hover:opacity-70 transition-opacity duration-300 inline-block"
          >
            Fajar Dwi Utomo
          </Link>
          <p className="text-sm text-muted-foreground mt-0.5">Junior Software Engineer</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 mt-4">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Available
        </span>
        <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
          <MapPin size={12} />
          Indonesia
        </span>
        <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
          <Briefcase size={12} />
          GPS.id
        </span>
      </div>
    </div>
  );
}
