'use client';

import { Twitter, Linkedin, Facebook, Share2 } from 'lucide-react';
import { toast } from 'sonner';

interface ShareButtonsProps {
  title: string;
  url: string;
}

export function ShareButtons({ title, url }: ShareButtonsProps) {
  const shareUrl = typeof window !== 'undefined' ? window.location.href : url;

  const handleShare = async (platform: string) => {
    let shareLink = '';

    switch (platform) {
      case 'twitter':
        shareLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'linkedin':
        shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'facebook':
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      case 'native':
        if (navigator.share) {
          try {
            await navigator.share({
              title,
              url: shareUrl,
            });
            toast.success('Shared successfully!');
            return;
          } catch {
            // User cancelled or error - do nothing
            return;
          }
        }
        break;
    }

    if (shareLink) {
      window.open(shareLink, '_blank', 'noopener,noreferrer,width=600,height=400');
    }
  };

  return (
    <div className="flex items-center gap-3 p-6 rounded-xl border border-border bg-muted/30">
      <span className="text-sm font-medium text-muted-foreground">Share:</span>
      <div className="flex gap-2">
        <button
          onClick={() => handleShare('twitter')}
          className="p-2 rounded-lg bg-background hover:bg-primary/10 hover:text-primary transition-all duration-200 group"
          aria-label="Share on Twitter"
        >
          <Twitter size={18} className="transition-transform group-hover:scale-110" />
        </button>
        <button
          onClick={() => handleShare('linkedin')}
          className="p-2 rounded-lg bg-background hover:bg-primary/10 hover:text-primary transition-all duration-200 group"
          aria-label="Share on LinkedIn"
        >
          <Linkedin size={18} className="transition-transform group-hover:scale-110" />
        </button>
        <button
          onClick={() => handleShare('facebook')}
          className="p-2 rounded-lg bg-background hover:bg-primary/10 hover:text-primary transition-all duration-200 group"
          aria-label="Share on Facebook"
        >
          <Facebook size={18} className="transition-transform group-hover:scale-110" />
        </button>
        {typeof navigator !== 'undefined' && 'share' in navigator && (
          <button
            onClick={() => handleShare('native')}
            className="p-2 rounded-lg bg-background hover:bg-primary/10 hover:text-primary transition-all duration-200 group"
            aria-label="Share via native dialog"
          >
            <Share2 size={18} className="transition-transform group-hover:scale-110" />
          </button>
        )}
      </div>
    </div>
  );
}
