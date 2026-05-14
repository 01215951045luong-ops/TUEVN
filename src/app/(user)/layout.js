// src/app/(main)/layout.js
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function MainLayout({ children }) {
  return (
    <>
      <Header />
      <main style={{ minHeight: '80vh' }}>
        {children}
      </main>
      <Footer />
    </>
  );
}