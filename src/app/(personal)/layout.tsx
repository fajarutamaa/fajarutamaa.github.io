import dynamic from 'next/dynamic';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BottomNavigation } from '@/components/mobile/BottomNavigation';

const BackToTop = dynamic(() => import('@/components/ui/BackToTop').then((m) => m.BackToTop));
const CookieConsent = dynamic(() =>
  import('@/components/ui/CookieConsent').then((m) => m.CookieConsent)
);

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-dvh flex-col pb-[calc(60px+env(safe-area-inset-bottom,0px))] md:pb-0">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-3 focus:z-50 focus:rounded-lg focus:bg-card focus:px-4 focus:py-2"
      >
        Skip to content
      </a>
      <Header />
      <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
        {children}
      </main>
      <Footer />
      <BottomNavigation />
      <BackToTop />
      <CookieConsent />
    </div>
  );
};

export default Layout;
