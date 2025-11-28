import React from 'react';

interface SkeletonProps {
  className?: string;
}

/**
 * Base skeleton component with shimmer animation
 */
export function Skeleton({ className = '' }: SkeletonProps) {
  return <div className={`bg-muted animate-shimmer rounded ${className}`} />;
}

/**
 * Skeleton for text content
 */
export function SkeletonText({
  lines = 1,
  className = '',
  lastLineWidth = '75%',
}: {
  lines?: number;
  className?: string;
  lastLineWidth?: string;
}) {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className="h-4"
          {...(i === lines - 1 && lines > 1 ? { style: { width: lastLineWidth } } : {})}
        />
      ))}
    </div>
  );
}

/**
 * Skeleton for avatar/circular images
 */
export function SkeletonAvatar({
  size = 'md',
  className = '',
}: {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
  };

  return <Skeleton className={`rounded-full ${sizeClasses[size]} ${className}`} />;
}

/**
 * Skeleton for badges/tags
 */
export function SkeletonBadge({
  className = '',
  width = 'w-16',
}: {
  className?: string;
  width?: string;
}) {
  return <Skeleton className={`h-6 ${width} rounded-full ${className}`} />;
}

/**
 * Skeleton for card containers
 */
export function SkeletonCard({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`p-6 rounded-xl border border-border bg-card ${className}`}>{children}</div>
  );
}
