
import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { HeroSection } from '@/components/home/HeroSection';
import { FeaturesSection } from '@/components/home/FeaturesSection';
import { RecentTestimoniesSection } from '@/components/home/RecentTestimoniesSection';
import { CTASection } from '@/components/home/CTASection';

const Index = () => {
  const [language, setLanguage] = useState<'en' | 'ar'>('en');

  return (
    <Layout>
      <HeroSection language={language} />
      <FeaturesSection language={language} />
      <RecentTestimoniesSection language={language} />
      <CTASection language={language} />
    </Layout>
  );
};

export default Index;
