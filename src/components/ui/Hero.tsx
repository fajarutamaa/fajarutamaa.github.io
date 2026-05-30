import Image from 'next/image';
import Link from 'next/link';

export function Hero() {
  return (
    <div className="flex items-center gap-4 animate-fadeIn">
      <div className="relative shrink-0">
        <Image
          src="/img/avatar.webp"
          alt="Fajar Dwi Utomo"
          width={44}
          height={44}
          quality={80}
          className="relative w-11 h-11 rounded-full ring-1 ring-border transition-opacity duration-500 hover:opacity-80"
          priority
        />
      </div>

      <div className="flex-1 min-w-0">
        <Link
          href="/"
          className="font-semibold text-base hover:opacity-70 transition-opacity duration-300 inline-block"
        >
          Fajar Dwi Utomo
        </Link>
        <p className="text-sm text-muted-foreground">Junior Software Engineer</p>
      </div>
    </div>
  );
}
