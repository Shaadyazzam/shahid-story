
import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { TestimonyCard } from '@/components/testimonials/TestimonyCard';
import { Link } from 'react-router-dom';
import { Shield, FileText, Eye, Archive } from 'lucide-react';

const Index = () => {
  const [language, setLanguage] = useState<'en' | 'ar'>('en');
  
  // Recent testimonies data (would come from API)
  const recentTestimonies = [
    {
      id: '1',
      type: 'photo' as const,
      title: language === 'en' ? 'Hospital Damage in Gaza City' : 'أضرار المستشفى في مدينة غزة',
      summary: language === 'en' ? 
        'On March 10, 2023, the Al-Shifa Hospital in Gaza City was severely damaged by an airstrike. Medical equipment was destroyed and patients had to be evacuated under dangerous conditions.' : 
        'في 10 مارس 2023، تضرر مستشفى الشفاء في مدينة غزة بشدة من غارة جوية. تم تدمير المعدات الطبية وكان لا بد من إجلاء المرضى في ظروف خطيرة.',
      location: language === 'en' ? 'Gaza City' : 'مدينة غزة',
      date: '2023-03-10',
      mediaUrl: '/placeholder.svg',
      category: 'Medical'
    },
    {
      id: '2',
      type: 'text' as const,
      title: language === 'en' ? 'Residential Building Collapse in Khan Younis' : 'انهيار مبنى سكني في خان يونس',
      summary: language === 'en' ? 
        'I witnessed the collapse of a six-story residential building in Khan Younis after heavy shelling. Many families were trapped under the rubble, and rescue teams struggled to reach them due to continued attacks in the area.' : 
        'شهدت انهيار مبنى سكني من ستة طوابق في خان يونس بعد قصف عنيف. علقت العديد من العائلات تحت الأنقاض، وكافحت فرق الإنقاذ للوصول إليهم بسبب استمرار الهجمات في المنطقة.',
      location: language === 'en' ? 'Khan Younis' : 'خان يونس',
      date: '2023-03-15',
      category: 'Bombing'
    },
    {
      id: '3',
      type: 'video' as const,
      title: language === 'en' ? 'Food Shortage in Rafah' : 'نقص الغذاء في رفح',
      summary: language === 'en' ? 
        'This video shows hundreds of people waiting in line for food distribution in Rafah. Many have been displaced from their homes and have not had adequate food supplies for weeks.' : 
        'يظهر هذا الفيديو مئات الأشخاص ينتظرون في طابور لتوزيع الطعام في رفح. لقد نزح الكثيرون من منازلهم ولم يحصلوا على إمدادات غذائية كافية لأسابيع.',
      location: language === 'en' ? 'Rafah' : 'رفح',
      date: '2023-03-20',
      mediaUrl: '/placeholder.svg',
      category: 'Displacement'
    }
  ];

  return (
    <Layout>
      {/* Hero section */}
      <section className="hero-gradient text-white py-20 md:py-32">
        <div className="container px-4 max-w-5xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-6">
            {language === 'en' ? 'Document. Verify. Share.' : 'وثّق. تحقق. شارك.'}
          </h1>
          
          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">
            {language === 'en' 
              ? 'An AI-powered platform to document war crimes and human rights violations in Palestine through verified testimonies and evidence.'
              : 'منصة مدعومة بالذكاء الاصطناعي لتوثيق جرائم الحرب وانتهاكات حقوق الإنسان في فلسطين من خلال شهادات وأدلة موثقة.'}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="bg-shahid-purple hover:bg-shahid-purple/90" asChild>
              <Link to="/submit">
                {language === 'en' ? 'Submit Your Testimony' : 'قدّم شهادتك'}
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
              <Link to="/testimonials">
                {language === 'en' ? 'View Testimonials' : 'عرض الشهادات'}
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features section */}
      <section className="py-16 bg-gray-50 dark:bg-shahid-dark/30">
        <div className="container px-4 max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            {language === 'en' ? 'How Shahid Works' : 'كيف يعمل شاهد'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white dark:bg-shahid-dark p-6 rounded-lg shadow-sm text-center">
              <div className="w-12 h-12 bg-shahid-purple/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="h-6 w-6 text-shahid-purple" />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                {language === 'en' ? 'Document' : 'وثّق'}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {language === 'en'
                  ? 'Submit your testimony through text, photos, videos, or audio recordings.'
                  : 'قدم شهادتك من خلال النص أو الصور أو مقاطع الفيديو أو التسجيلات الصوتية.'}
              </p>
            </div>
            
            <div className="bg-white dark:bg-shahid-dark p-6 rounded-lg shadow-sm text-center">
              <div className="w-12 h-12 bg-shahid-purple/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="h-6 w-6 text-shahid-purple" />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                {language === 'en' ? 'Verify' : 'تحقق'}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {language === 'en'
                  ? 'AI analysis verifies content authenticity and extracts critical metadata.'
                  : 'يتحقق تحليل الذكاء الاصطناعي من أصالة المحتوى ويستخرج البيانات الوصفية الهامة.'}
              </p>
            </div>
            
            <div className="bg-white dark:bg-shahid-dark p-6 rounded-lg shadow-sm text-center">
              <div className="w-12 h-12 bg-shahid-purple/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Archive className="h-6 w-6 text-shahid-purple" />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                {language === 'en' ? 'Preserve' : 'حفظ'}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {language === 'en'
                  ? 'Evidence is securely stored and preserved for future legal proceedings.'
                  : 'يتم تخزين الأدلة وحفظها بشكل آمن للإجراءات القانونية المستقبلية.'}
              </p>
            </div>
            
            <div className="bg-white dark:bg-shahid-dark p-6 rounded-lg shadow-sm text-center">
              <div className="w-12 h-12 bg-shahid-purple/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-6 w-6 text-shahid-purple" />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                {language === 'en' ? 'Protect' : 'حماية'}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {language === 'en'
                  ? 'Privacy protection through face blurring, voice anonymization, and encryption.'
                  : 'حماية الخصوصية من خلال تمويه الوجه وإخفاء الصوت والتشفير.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Recent testimonies section */}
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
      
      {/* CTA section */}
      <section className="bg-shahid-purple py-16 text-white">
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
            size="lg" 
            variant="outline" 
            className="border-white text-white hover:bg-white hover:text-shahid-purple"
            asChild
          >
            <Link to="/submit">
              {language === 'en' ? 'Submit Your Testimony Now' : 'قدم شهادتك الآن'}
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
