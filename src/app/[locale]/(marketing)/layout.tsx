import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export default function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <>
      <Header />
      <main id="main-content" role="main">
        {children}
      </main>
      <Footer />
    </>
  );
}
