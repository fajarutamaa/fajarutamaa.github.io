import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BottomNavigation } from '@/components/mobile';
import { FloatingCTA } from '@/components/ui/FloatingCTA';
import { BackToTop } from '@/components/ui/BackToTop';
import { CookieConsent } from '@/components/ui/CookieConsent';

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
