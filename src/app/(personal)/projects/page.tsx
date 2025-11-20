import { Suspense } from 'react';
import { getBookmarks } from '@/lib/notion/queries';
import { BookmarkCard, ErrorBoundary } from '@/components/ui';
import { BookmarkSkeleton } from '@/components/skeletons';

export const metadata = {
    title: 'Projects - Fajar Dwi Utomo',
    description: 'Explore my portfolio of projects and bookmarks.',
};

// Enable ISR
export const revalidate = 3600;

async function ProjectsGrid() {
    const projects = await getBookmarks();

    if (!projects || projects.length === 0) {
        return (
            <div className="text-center py-20">
                <p className="text-muted-foreground">No projects found.</p>
            </div>
        );
    }

    return (
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {projects.map((project, index) => (
                <BookmarkCard key={project.id} bookmark={project} index={index} />
            ))}
        </div>
    );
}

export default function ProjectsPage() {
    return (
        <div className="container max-w-[680px] lg:max-w-[900px] py-12 space-y-12">
            {/* Header */}
            <section className="space-y-4 animate-fadeIn">
                <h1 className="text-4xl font-bold">Projects & Bookmarks</h1>
                <p className="text-lg text-muted-foreground leading-relaxed">
                    A collection of projects I&apos;ve worked on and resources I find valuable.
                </p>
            </section>

            {/* Projects Grid */}
            <section className="animate-fadeIn" style={{ animationDelay: '100ms' }}>
                <ErrorBoundary>
                    <Suspense fallback={<BookmarkSkeleton />}>
                        <ProjectsGrid />
                    </Suspense>
                </ErrorBoundary>
            </section>
        </div>
    );
}
