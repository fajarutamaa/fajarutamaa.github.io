import { Suspense } from 'react';
import Image from 'next/image';
import { MapPin, Briefcase, GraduationCap, Download } from 'lucide-react';
import { SkillsGrid, Timeline } from '@/components/about';
import { SkillsGridSkeleton, TimelineSkeleton } from '@/components/skeletons';

export const metadata = {
  title: 'About - Fajar Dwi Utomo',
  description:
    'Learn more about Fajar Dwi Utomo, a Junior Software Engineer passionate about building things people love.',
};

export default function AboutPage() {
  return (
    <div className="container max-w-[680px] lg:max-w-[900px] py-12 space-y-16 animate-pageEnter">
      <section>
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="relative shrink-0">
            <Image
              src="/img/avatar.webp"
              alt="Fajar Dwi Utomo"
              width={160}
              height={160}
              quality={80}
              className="rounded-xl ring-1 ring-border"
              priority
            />
          </div>

          <div className="flex-1 space-y-4">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight mb-1">Fajar Dwi Utomo</h1>
              <p className="text-base text-muted-foreground">Junior Software Engineer</p>
            </div>

            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <MapPin size={14} />
                Indonesia
              </span>
              <span className="flex items-center gap-1.5">
                <Briefcase size={14} />
                Available for opportunities
              </span>
              <span className="flex items-center gap-1.5">
                <GraduationCap size={14} />
                Computer Science
              </span>
            </div>

            <a
              href="/cv.pdf"
              download
              className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              <Download size={14} />
              Download CV
            </a>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold tracking-tight">About Me</h2>
        <div className="prose prose-neutral dark:prose-invert max-w-none text-muted-foreground leading-relaxed text-[15px] space-y-4">
          <p>
            Hi! I&apos;m Fajar Dwi Utomo, a passionate Junior Software Engineer with a love for
            creating beautiful, functional, and user-friendly applications. I specialize in web
            development and enjoy working with modern technologies to build solutions that make a
            difference.
          </p>
          <p>
            Currently, I&apos;m working at{' '}
            <a
              href="https://gps.id"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              GPS.id
            </a>
            , where I contribute to building innovative solutions. I&apos;m constantly learning and
            exploring new technologies to improve my skills and deliver better products.
          </p>
          <p>
            When I&apos;m not coding, you can find me reading tech blogs, contributing to
            open-source projects, or sharing my knowledge through writing on{' '}
            <a
              href="https://medium.com/@fajardwiutomo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Medium
            </a>
            .
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold tracking-tight">Skills & Technologies</h2>
        <Suspense fallback={<SkillsGridSkeleton />}>
          <SkillsGrid />
        </Suspense>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold tracking-tight">Experience & Education</h2>
        <Suspense fallback={<TimelineSkeleton />}>
          <Timeline />
        </Suspense>
      </section>
    </div>
  );
}
