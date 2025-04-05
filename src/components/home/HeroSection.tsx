
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  language: 'en' | 'ar';
}

export const HeroSection = ({ language }: HeroSectionProps) => {
  return (
    <section className="hero-gradient text-white py-20 md:py-28">
      <div className="container px-4 max-w-5xl mx-auto text-center">
        {/* Updated Palestinian Flag with correct proportions */}
        <div className="relative palestine-flag mx-auto mb-8 max-w-md rounded overflow-hidden">
          <div className="palestine-flag-black"></div>
          <div className="palestine-flag-white"></div>
          <div className="palestine-flag-green"></div>
          <div className="palestine-triangle"></div>
        </div>

        <h1 className="text-3xl md:text-5xl font-bold mb-6">
          {language === 'en' ? 'Document. Verify. Share.' : 'وثّق. تحقق. شارك.'}
        </h1>
        
        <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">
          {language === 'en' 
            ? 'An AI-powered platform to document war crimes and human rights violations in Palestine through verified testimonies and evidence.'
            : 'منصة مدعومة بالذكاء الاصطناعي لتوثيق جرائم الحرب وانتهاكات حقوق الإنسان في فلسطين من خلال شهادات وأدلة موثقة.'}
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" className="bg-palestine-green hover:bg-palestine-green/90" asChild>
            <Link to="/submit">
              {language === 'en' ? 'Submit Your Testimony' : 'قدّم شهادتك'}
            </Link>
          </Button>
          <Button size="lg" variant="white" className="border border-white/30" asChild>
            <Link to="/testimonials">
              {language === 'en' ? 'View Testimonials' : 'عرض الشهادات'}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
