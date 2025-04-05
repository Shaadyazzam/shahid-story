
import { Shield } from 'lucide-react';

interface WhySubmitSidebarProps {
  language: 'en' | 'ar';
}

export const WhySubmitSidebar = ({ language }: WhySubmitSidebarProps) => {
  return (
    <div className="bg-gray-50 dark:bg-shahid-dark/30 p-6 rounded-lg border border-gray-100 dark:border-gray-800 h-fit">
      <h2 className="text-xl font-semibold mb-4">
        {language === 'en' ? 'Why Submit?' : 'لماذا تقدم؟'}
      </h2>
      <ul className="space-y-4">
        <li className="flex">
          <div className="mr-4">
            <div className="bg-shahid-purple/10 rounded-full w-8 h-8 flex items-center justify-center">
              <span className="text-shahid-purple font-bold">1</span>
            </div>
          </div>
          <div>
            <h3 className="font-medium">
              {language === 'en' ? 'Document History' : 'توثيق التاريخ'}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {language === 'en' 
                ? 'Create a permanent record of events that cannot be erased or denied.'
                : 'إنشاء سجل دائم للأحداث لا يمكن محوها أو إنكارها.'}
            </p>
          </div>
        </li>
        
        <li className="flex">
          <div className="mr-4">
            <div className="bg-shahid-purple/10 rounded-full w-8 h-8 flex items-center justify-center">
              <span className="text-shahid-purple font-bold">2</span>
            </div>
          </div>
          <div>
            <h3 className="font-medium">
              {language === 'en' ? 'Support Accountability' : 'دعم المساءلة'}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {language === 'en' 
                ? 'Provide evidence that can be used in future legal proceedings.'
                : 'تقديم أدلة يمكن استخدامها في الإجراءات القانونية المستقبلية.'}
            </p>
          </div>
        </li>
        
        <li className="flex">
          <div className="mr-4">
            <div className="bg-shahid-purple/10 rounded-full w-8 h-8 flex items-center justify-center">
              <span className="text-shahid-purple font-bold">3</span>
            </div>
          </div>
          <div>
            <h3 className="font-medium">
              {language === 'en' ? 'Raise Awareness' : 'زيادة الوعي'}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {language === 'en' 
                ? 'Help the world understand the reality of what is happening on the ground.'
                : 'مساعدة العالم على فهم واقع ما يحدث على الأرض.'}
            </p>
          </div>
        </li>
        
        <li className="flex">
          <div className="mr-4">
            <div className="bg-shahid-purple/10 rounded-full w-8 h-8 flex items-center justify-center">
              <span className="text-shahid-purple font-bold">4</span>
            </div>
          </div>
          <div>
            <h3 className="font-medium">
              {language === 'en' ? 'Secure Preservation' : 'الحفظ الآمن'}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {language === 'en' 
                ? 'Your testimony is securely stored with encryption and blockchain verification.'
                : 'يتم تخزين شهادتك بشكل آمن مع التشفير والتحقق من سلسلة الكتل.'}
            </p>
          </div>
        </li>
      </ul>
    </div>
  );
};
