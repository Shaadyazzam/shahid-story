
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { TestimonyCard } from '@/components/testimonials/TestimonyCard';
import { getRecentTestimonies } from '@/data/recentTestimonies';

interface RecentTestimoniesSectionProps {
  language: 'en' | 'ar';
}

export const RecentTestimoniesSection = ({ language }: RecentTestimoniesSectionProps) => {
  const recentTestimonies = getRecentTestimonies(language);
  
  return (
    <section className="py-16">
      <div className="container px-4 max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">
            {language === 'en' ? 'Recent Testimonies' : 'الشهادات الأخيرة'}
          </h2>
          <Button variant="ghost" asChild>
            <Link to="/testimonials">
              {language === 'en' ? 'View all' : 'عرض الكل'}
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentTestimonies.map((testimony) => (
            <TestimonyCard
              key={testimony.id}
              id={testimony.id}
              type={testimony.type}
              title={testimony.title}
              summary={testimony.summary}
              location={testimony.location}
              date={testimony.date}
              mediaUrl={testimony.mediaUrl}
              language={language}
              category={testimony.category}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
