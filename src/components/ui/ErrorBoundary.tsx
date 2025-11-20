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
                <div className="min-h-[400px] flex items-center justify-center p-8">
                    <div className="text-center space-y-4 max-w-md">
                        <div className="w-16 h-16 mx-auto rounded-full bg-red-500/10 flex items-center justify-center">
                            <svg
                                className="w-8 h-8 text-red-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                />
                            </svg>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-foreground mb-2">
                                Something went wrong
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                We encountered an error while loading this content. Please try again.
                            </p>
                        </div>

                        <button
                            onClick={() => this.setState({ hasError: false })}
                            className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
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

// Functional wrapper for easier use
export function ErrorFallback({
    error,
    reset
}: {
    error?: Error;
    reset?: () => void;
}) {
    return (
        <div className="min-h-[400px] flex items-center justify-center p-8">
            <div className="text-center space-y-4 max-w-md">
                <div className="w-16 h-16 mx-auto rounded-full bg-red-500/10 flex items-center justify-center">
                    <svg
                        className="w-8 h-8 text-red-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                    </svg>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                        Unable to load content
                    </h3>
                    <p className="text-sm text-muted-foreground">
                        {error?.message || 'An unexpected error occurred. Please try again later.'}
                    </p>
                </div>

                {reset && (
                    <button
                        onClick={reset}
                        className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
                    >
                        Retry
                    </button>
                )}
            </div>
        </div>
    );
}
