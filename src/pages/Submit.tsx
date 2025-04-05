
import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { SubmissionForm } from '@/components/submission/SubmissionForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AIAnalysisCard } from '@/components/analysis/AIAnalysisCard';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { InfoIcon } from 'lucide-react';

const Submit = () => {
  const [language, setLanguage] = useState<'en' | 'ar'>('en');
  const [showAnalysis, setShowAnalysis] = useState<boolean>(false);
  
  // Mock analysis data
  const mockAnalysisData = {
    mediaType: 'photo',
    detections: [
      { label: language === 'en' ? 'Damaged Building' : 'مبنى متضرر', confidence: 0.94, severity: 'high' as const },
      { label: language === 'en' ? 'Smoke/Fire' : 'دخان/حريق', confidence: 0.87, severity: 'high' as const },
      { label: language === 'en' ? 'Military Vehicle' : 'مركبة عسكرية', confidence: 0.63, severity: 'medium' as const },
      { label: language === 'en' ? 'Civilians' : 'مدنيون', confidence: 0.72, severity: 'medium' as const }
    ],
    authenticity: {
      score: 0.92,
      flags: [] 
    },
    metadata: [
      { 
        label: language === 'en' ? 'GPS Location' : 'موقع GPS', 
        value: '31.5326° N, 34.4667° E',
        available: true
      },
      { 
        label: language === 'en' ? 'Timestamp' : 'الطابع الزمني', 
        value: '2023-03-15 14:22:36 UTC',
        available: true
      },
      { 
        label: language === 'en' ? 'Device Model' : 'طراز الجهاز', 
        value: 'iPhone 13',
        available: true
      },
      { 
        label: language === 'en' ? 'Original File Hash' : 'تجزئة الملف الأصلي', 
        value: '8e7df4...',
        available: true
      },
      { 
        label: language === 'en' ? 'Weather Data' : 'بيانات الطقس', 
        value: '',
        available: false
      }
    ]
  };

  return (
    <Layout>
      <div className="container px-4 py-8 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-center">
          {language === 'en' ? 'Submit Your Testimony' : 'قدّم شهادتك'}
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8 text-center max-w-2xl mx-auto">
          {language === 'en' 
            ? 'Your evidence helps document violations and build a case for justice. All submissions are secure and can be anonymous.'
            : 'تساعد أدلتك في توثيق الانتهاكات وبناء قضية للعدالة. جميع المساهمات آمنة ويمكن أن تكون مجهولة المصدر.'}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Tabs defaultValue="submission">
              <TabsList className="mb-6">
                <TabsTrigger value="submission">
                  {language === 'en' ? 'Your Testimony' : 'شهادتك'}
                </TabsTrigger>
                <TabsTrigger value="analysis" disabled={!showAnalysis}>
                  {language === 'en' ? 'AI Analysis' : 'تحليل الذكاء الاصطناعي'}
                </TabsTrigger>
              </TabsList>
              <TabsContent value="submission">
                <Alert className="mb-6">
                  <InfoIcon className="h-4 w-4" />
                  <AlertTitle>
                    {language === 'en' ? 'Important' : 'هام'}
                  </AlertTitle>
                  <AlertDescription>
                    {language === 'en' 
                      ? 'For this demo, submitted content will not be stored. In the full version, all data is encrypted and securely preserved.'
                      : 'في هذا العرض التوضيحي، لن يتم تخزين المحتوى المقدم. في النسخة الكاملة، يتم تشفير جميع البيانات والحفاظ عليها بشكل آمن.'}
                  </AlertDescription>
                </Alert>
                
                <SubmissionForm language={language} />
                
                {/* For demo purposes only - triggers analysis view */}
                <div className="mt-4 text-center">
                  <button 
                    onClick={() => setShowAnalysis(true)} 
                    className="text-sm text-shahid-purple underline"
                  >
                    {language === 'en' ? 'Demo: Show AI Analysis' : 'عرض توضيحي: إظهار تحليل الذكاء الاصطناعي'}
                  </button>
                </div>
              </TabsContent>
              
              <TabsContent value="analysis">
                <AIAnalysisCard 
                  mediaType={mockAnalysisData.mediaType}
                  detections={mockAnalysisData.detections}
                  authenticity={mockAnalysisData.authenticity}
                  metadata={mockAnalysisData.metadata}
                  language={language}
                />
              </TabsContent>
            </Tabs>
          </div>
          
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
        </div>
      </div>
    </Layout>
  );
};

export default Submit;
