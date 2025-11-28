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
    <div className="container max-w-[680px] lg:max-w-[900px] py-12 space-y-16">
      {/* Hero Section */}
      <section className="space-y-8">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Profile Image */}
          <div className="relative shrink-0">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-secondary/30 to-accent/30 rounded-2xl blur-2xl" />
            <Image
              src="/img/avatar.webp"
              alt="Fajar Dwi Utomo"
              width={200}
              height={200}
              className="relative rounded-2xl ring-4 ring-primary/20"
              priority
            />
          </div>

          {/* Info */}
          <div className="flex-1 space-y-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">Fajar Dwi Utomo</h1>
              <p className="text-xl text-muted-foreground">Junior Software Engineer</p>
            </div>

            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-primary" />
                <span>Indonesia</span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase size={16} className="text-primary" />
                <span>Available for opportunities</span>
              </div>
              <div className="flex items-center gap-2">
                <GraduationCap size={16} className="text-primary" />
                <span>Computer Science</span>
              </div>
            </div>

            {/* Download CV Button */}
            <a
              href="/cv.pdf"
              download
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              <Download size={18} />
              Download CV
            </a>
          </div>
        </div>
      </section>

      {/* About Me */}
      <section>
        <h2 className="text-2xl font-bold">About Me</h2>
        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-4 text-muted-foreground leading-relaxed">
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

      {/* Skills */}
      <section>
        <h2 className="text-2xl font-bold">Skills & Technologies</h2>
        <Suspense fallback={<SkillsGridSkeleton />}>
          <SkillsGrid />
        </Suspense>
      </section>

      {/* Experience & Education */}
      <section>
        <h2 className="text-2xl font-bold">Experience & Education</h2>
        <Suspense fallback={<TimelineSkeleton />}>
          <Timeline />
        </Suspense>
      </section>
    </div>
  );
}
