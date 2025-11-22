'use client';

import { useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';

const pageOrder = ['/', '/about', '/blog', '/projects', '/contact'];

export function useSwipeGesture() {
  const router = useRouter();
  const pathname = usePathname();
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    // Only enable on touch devices
    if (!('ontouchstart' in window)) return;

    const minSwipeDistance = 50;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      touchEndX.current = e.changedTouches[0].clientX;
      handleSwipe();
    };

    const handleSwipe = () => {
      const distance = touchStartX.current - touchEndX.current;
      const isLeftSwipe = distance > minSwipeDistance;
      const isRightSwipe = distance < -minSwipeDistance;

      if (!isLeftSwipe && !isRightSwipe) return;

      const currentIndex = pageOrder.findIndex((path) => pathname === path);
      if (currentIndex === -1) return;

      if (isLeftSwipe && currentIndex < pageOrder.length - 1) {
        // Swipe left - go to next page
        router.push(pageOrder[currentIndex + 1]);
      } else if (isRightSwipe && currentIndex > 0) {
        // Swipe right - go to previous page
        router.push(pageOrder[currentIndex - 1]);
      }
    };

    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [pathname, router]);
}
