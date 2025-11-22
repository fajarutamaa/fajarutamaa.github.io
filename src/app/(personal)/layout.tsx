'use client';

import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PullToRefresh, BottomNavigation } from '@/components/mobile';
import { useSwipeGesture } from '@/hooks/useSwipeGesture';

const Layout = ({ children }: { children: React.ReactNode }) => {
  // Enable swipe gestures for navigation
  useSwipeGesture();

  return (
    <PullToRefresh>
      <div className="relative min-h-screen">
        {/* Gradient Background */}
        <div className="gradient-bg">
          <div className="gradient-orb gradient-orb-1" />
          <div className="gradient-orb gradient-orb-2" />
        </div>

        <Header />
        <main className="min-h-screen pt-16 pb-20 md:pb-0">{children}</main>
        <Footer />

        {/* Bottom Navigation for Mobile */}
        <BottomNavigation />
      </div>
    </PullToRefresh>
  );
};

export default Layout;
