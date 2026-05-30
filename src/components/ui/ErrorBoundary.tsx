'use client';

import React from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-[300px] flex items-center justify-center p-8">
          <div className="text-center space-y-3">
            <p className="text-sm text-muted-foreground">Something went wrong.</p>
            <button
              onClick={() => this.setState({ hasError: false })}
              className="text-sm text-foreground underline underline-offset-4 hover:opacity-70 transition-opacity"
            >
              Try again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export function ErrorFallback({ error, reset }: { error?: Error; reset?: () => void }) {
  return (
    <div className="min-h-[300px] flex items-center justify-center p-8">
      <div className="text-center space-y-3">
        <p className="text-sm text-muted-foreground">
          {error?.message || 'Unable to load content.'}
        </p>
        {reset && (
          <button
            onClick={reset}
            className="text-sm text-foreground underline underline-offset-4 hover:opacity-70 transition-opacity"
          >
            Retry
          </button>
        )}
      </div>
    </div>
  );
}
