
import { FileText, Eye, Archive, Shield } from 'lucide-react';

interface FeaturesSectionProps {
  language: 'en' | 'ar';
}

export const FeaturesSection = ({ language }: FeaturesSectionProps) => {
  return (
    <section className="py-16 bg-gray-50 dark:bg-shahid-dark/30">
      <div className="container px-4 max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
          {language === 'en' ? 'How Shahid Works' : 'كيف يعمل شاهد'}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white dark:bg-shahid-dark p-6 rounded-lg shadow-sm text-center">
            <div className="w-12 h-12 bg-palestine-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="h-6 w-6 text-palestine-green" />
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
            <div className="w-12 h-12 bg-palestine-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Eye className="h-6 w-6 text-palestine-green" />
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
            <div className="w-12 h-12 bg-palestine-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Archive className="h-6 w-6 text-palestine-green" />
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
            <div className="w-12 h-12 bg-palestine-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-6 w-6 text-palestine-green" />
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
  );
};
