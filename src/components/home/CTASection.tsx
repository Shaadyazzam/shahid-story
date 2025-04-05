
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface CTASectionProps {
  language: 'en' | 'ar';
}

export const CTASection = ({ language }: CTASectionProps) => {
  return (
    <section className="bg-palestine-green py-16 text-white">
      <div className="container px-4 max-w-4xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">
          {language === 'en' 
            ? 'Your story matters. Share it with the world.'
            : 'قصتك مهمة. شاركها مع العالم.'}
        </h2>
        <p className="text-lg mb-8">
          {language === 'en'
            ? 'Every testimony helps build a comprehensive record of events and contributes to the pursuit of justice.'
            : 'تساعد كل شهادة في بناء سجل شامل للأحداث وتسهم في تحقيق العدالة.'}
        </p>
        <Button 
          variant="white"
          size="lg" 
          className="border-white"
          asChild
        >
          <Link to="/submit">
            {language === 'en' ? 'Submit Your Testimony Now' : 'قدم شهادتك الآن'}
          </Link>
        </Button>
      </div>
    </section>
  );
};
