import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BottomNavigation } from '@/components/mobile';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative min-h-screen">
      <Header />
      <main className="min-h-screen pt-14 pb-20 md:pb-0">{children}</main>
      <Footer />
      <BottomNavigation />
    </div>
  );
};

export default Layout;
