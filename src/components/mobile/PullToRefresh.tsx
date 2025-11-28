'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { RefreshCw } from 'lucide-react';

interface PullToRefreshProps {
  children: React.ReactNode;
  onRefresh?: () => Promise<void>;
}

export function PullToRefresh({ children, onRefresh }: PullToRefreshProps) {
  const [isPulling, setIsPulling] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  // Use refs to track state inside event listeners without triggering re-renders of the effect
  const isRefreshingRef = useRef(isRefreshing);
  const startY = useRef(0);
  const currentPullDistance = useRef(0);
  const router = useRouter();

  const threshold = 80; // Distance needed to trigger refresh

  // Update ref when state changes
  useEffect(() => {
    isRefreshingRef.current = isRefreshing;
  }, [isRefreshing]);

  useEffect(() => {
    // Only enable on touch devices
    if (typeof window === 'undefined' || !('ontouchstart' in window)) return;

    const handleTouchStart = (e: TouchEvent) => {
      // Only trigger when at top of page
      if (window.scrollY === 0) {
        startY.current = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (startY.current === 0 || isRefreshingRef.current || window.scrollY > 0) return;

      const currentY = e.touches[0].clientY;
      const distance = currentY - startY.current;

      if (distance > 0) {
        // Only update state if significantly changed to avoid too many re-renders
        // But we need to track it for the logic
        currentPullDistance.current = distance;

        // Use requestAnimationFrame for smoother visual updates if needed,
        // but for now just throttling state updates or only updating when needed
        // We still need to update state to show the indicator
        setIsPulling(true);
        setPullDistance(Math.min(distance, threshold * 1.5));
      }
    };

    const handleTouchEnd = async () => {
      const distance = currentPullDistance.current;

      if (distance >= threshold && !isRefreshingRef.current) {
        setIsRefreshing(true);

        try {
          if (onRefresh) {
            await onRefresh();
          } else {
            // Default: refresh the page
            router.refresh();
            await new Promise((resolve) => setTimeout(resolve, 1000));
          }
        } finally {
          setIsRefreshing(false);
        }
      }

      setIsPulling(false);
      setPullDistance(0);
      currentPullDistance.current = 0;
      startY.current = 0;
    };

    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: true });
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [onRefresh, router]); // Removed pullDistance and isRefreshing from dependencies

  return (
    <div className="relative">
      {/* Pull to Refresh Indicator */}
      <div
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center pointer-events-none transition-all duration-200"
        style={{
          transform: `translateY(${isPulling || isRefreshing ? pullDistance - 60 : -60}px)`,
          opacity: isPulling || isRefreshing ? 1 : 0,
        }}
      >
        <div className="bg-background/90 backdrop-blur-sm border border-border rounded-full p-3 shadow-lg">
          <RefreshCw
            size={20}
            className={`text-primary ${isRefreshing ? 'animate-spin' : ''}`}
            style={{
              transform: `rotate(${Math.min((pullDistance / threshold) * 360, 360)}deg)`,
            }}
          />
        </div>
      </div>

      {children}
    </div>
  );
}
