import dynamic from 'next/dynamic';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BottomNavigation } from '@/components/mobile';

const FloatingCTA = dynamic(() => import('@/components/ui/FloatingCTA').then((m) => m.FloatingCTA));
const BackToTop = dynamic(() => import('@/components/ui/BackToTop').then((m) => m.BackToTop));
const CookieConsent = dynamic(() =>
  import('@/components/ui/CookieConsent').then((m) => m.CookieConsent)
);

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative min-h-screen">
      <Header />
      <main className="min-h-screen pt-14 pb-20 md:pb-0">{children}</main>
      <Footer />
      <BottomNavigation />
      <FloatingCTA />
      <BackToTop />
      <CookieConsent />
    </div>
  );
};

export default Layout;
