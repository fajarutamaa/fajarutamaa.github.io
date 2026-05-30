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
            await navigator.share({ title, url: shareUrl });
            toast.success('Shared successfully!');
            return;
          } catch {
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
    <div className="flex items-center gap-3">
      <span className="text-xs text-muted-foreground">Share</span>
      <div className="flex gap-2">
        {[
          { platform: 'twitter', icon: Twitter, label: 'Twitter' },
          { platform: 'linkedin', icon: Linkedin, label: 'LinkedIn' },
          { platform: 'facebook', icon: Facebook, label: 'Facebook' },
        ].map(({ platform, icon: Icon, label }) => (
          <button
            key={platform}
            onClick={() => handleShare(platform)}
            className="text-muted-foreground hover:text-foreground transition-colors duration-200"
            aria-label={`Share on ${label}`}
          >
            <Icon size={14} />
          </button>
        ))}
        {typeof navigator !== 'undefined' && 'share' in navigator && (
          <button
            onClick={() => handleShare('native')}
            className="text-muted-foreground hover:text-foreground transition-colors duration-200"
            aria-label="Share via native dialog"
          >
            <Share2 size={14} />
          </button>
        )}
      </div>
    </div>
  );
}
