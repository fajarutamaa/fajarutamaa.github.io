import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Mail, ScanLine } from 'lucide-react';

export function Hero() {
  return (
    <section className="grid gap-7 border-b pb-10 sm:grid-cols-[minmax(0,1fr)_clamp(11rem,28vw,16.5rem)] sm:items-center sm:gap-10 sm:pb-14">
      <figure className="profile-board flex min-w-0 items-center gap-3.5 rounded-2xl border p-2.5 sm:order-last sm:flex-col sm:items-stretch sm:rounded-[1.5rem] sm:p-4">
        <div
          aria-hidden="true"
          className="hidden items-center gap-2 font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-accent-foreground sm:flex"
        >
          <ScanLine size={14} />
          Profile
          <span className="ml-1 h-px flex-1 bg-primary/20" />
        </div>
        <Image
          src="/img/avatar.webp"
          alt="Portrait of Fajar Dwi Utomo"
          width={480}
          height={480}
          quality={80}
          sizes="(min-width: 944px) 230px, (min-width: 640px) 24vw, 68px"
          className="profile-image aspect-square w-[68px] shrink-0 rounded-xl object-cover sm:w-full"
          priority
        />
        <figcaption className="flex items-center gap-2 text-xs font-medium text-accent-foreground sm:pb-0.5">
          <span
            className="size-2 shrink-0 rounded-full bg-emerald-600 ring-2 ring-emerald-600/15 dark:bg-emerald-400 dark:ring-emerald-400/20"
            aria-hidden="true"
          />
          Open to opportunities
        </figcaption>
      </figure>

      <div>
        <p className="eyebrow sm:accent-kicker">Software engineer · Indonesia</p>
        <h1 className="mt-3 text-balance text-[clamp(2.75rem,7vw,4.625rem)] font-semibold leading-[1.03] tracking-[-0.07em]">
          Fajar Dwi Utomo<span className="text-primary">.</span>
        </h1>
        <p className="mt-5 max-w-[48ch] text-pretty leading-relaxed text-muted-foreground sm:text-lg">
          I build reliable, user-focused web applications. I&apos;m currently a junior software
          engineer at GPS.id, and I write about what I learn along the way.
        </p>
        <div className="mt-7 flex flex-wrap gap-2.5">
          <Link
            href="/projects"
            className="action-link group bg-primary px-3 text-primary-foreground hover:bg-primary/90 sm:px-4"
          >
            View projects
            <ArrowRight
              size={16}
              aria-hidden="true"
              className="motion-safe:transition-transform motion-safe:group-hover:translate-x-0.5"
            />
          </Link>
          <Link href="/contact" className="action-link border bg-card px-3 hover:bg-muted sm:px-4">
            <Mail size={16} aria-hidden="true" />
            Get in touch
          </Link>
        </div>
      </div>
    </section>
  );
}
