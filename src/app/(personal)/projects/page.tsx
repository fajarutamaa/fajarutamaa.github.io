import { Suspense } from 'react';
import { getBookmarks } from '@/lib/notion/queries';
import { ProjectFilter } from '@/components/ui/ProjectFilter';
import { BookmarkSkeleton } from '@/components/skeletons';
import { PageIntro } from '@/components/layout/PageIntro';

export const metadata = {
  title: 'Projects - Fajar Dwi Utomo',
  description: 'Explore my portfolio of projects and bookmarks.',
};

export const revalidate = 3600;

async function ProjectsGrid() {
  const projects = await getBookmarks();
  return <ProjectFilter projects={projects} />;
}

export default function ProjectsPage() {
  return (
    <div className="site-container space-y-8 py-10 sm:space-y-10 sm:py-14">
      <PageIntro
        label="Work & resources"
        title="Projects & bookmarks"
        description="Projects I’ve worked on and resources I’ve found useful along the way."
      />

      <section>
        <Suspense fallback={<BookmarkSkeleton />}>
          <ProjectsGrid />
        </Suspense>
      </section>
    </div>
  );
}
