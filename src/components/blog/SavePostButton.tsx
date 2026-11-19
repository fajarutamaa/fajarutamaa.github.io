'use client';

import { Bookmark, BookmarkCheck } from 'lucide-react';
import { toast } from 'sonner';
import { useSavedPosts } from '@/hooks/useSavedPosts';

interface SavePostButtonProps {
  slug: string;
  title: string;
  compact?: boolean;
}

export function SavePostButton({ slug, title, compact = false }: SavePostButtonProps) {
  const { savedPosts, toggleSavedPost, ready } = useSavedPosts();
  const saved = savedPosts.has(slug);
  const Icon = saved ? BookmarkCheck : Bookmark;

  return (
    <button
      type="button"
      disabled={!ready}
      aria-label={`Save "${title}" to reading list`}
      aria-pressed={saved}
      title={saved ? 'Remove from reading list' : 'Save to reading list'}
      onClick={() => {
        try {
          toggleSavedPost(slug);
          toast.success(saved ? 'Removed from reading list' : 'Saved to reading list');
        } catch {
          toast.error('Could not update your reading list. Check your browser storage settings.');
        }
      }}
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-border/60 transition-colors hover:bg-muted/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-50 ${
        saved ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
      } ${compact ? 'min-w-11' : 'px-3 text-sm font-medium'}`}
    >
      <Icon size={17} aria-hidden="true" />
      {!compact && (saved ? 'Saved' : 'Save for later')}
    </button>
  );
}
