
import { ReactNode, useState } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const [language, setLanguage] = useState<'en' | 'ar'>('en');

  return (
    <div className={language === 'ar' ? 'font-arabic' : ''}>
      <Navbar language={language} setLanguage={setLanguage} />
      <main className="pt-16">
        {children}
      </main>
      <Footer language={language} />
    </div>
  );
};
