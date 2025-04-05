
import { useState, useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { SubmissionForm } from '@/components/submission/SubmissionForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AIAnalysisCard } from '@/components/analysis/AIAnalysisCard';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { InfoIcon, Database } from 'lucide-react';
import { LOCAL_STORAGE_KEY, StoredTestimony } from '@/components/submission/types';

const Submit = () => {
  const [language, setLanguage] = useState<'en' | 'ar'>('en');
  const [showAnalysis, setShowAnalysis] = useState<boolean>(false);
  const [storedCount, setStoredCount] = useState<number>(0);
  
  useEffect(() => {
    // Get the count of stored testimonies
    try {
      const data = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (data) {
        const testimonies: StoredTestimony[] = JSON.parse(data);
        setStoredCount(testimonies.length);
      }
      
      // Update count whenever localStorage changes
      const handleStorageChange = () => {
        const updatedData = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (updatedData) {
          const testimonies: StoredTestimony[] = JSON.parse(updatedData);
          setStoredCount(testimonies.length);
        } else {
          setStoredCount(0);
        }
      };
      
      window.addEventListener('storage', handleStorageChange);
      // Special event for same-tab updates
      document.addEventListener('localStorageUpdated', handleStorageChange);
      
      return () => {
        window.removeEventListener('storage', handleStorageChange);
        document.removeEventListener('localStorageUpdated', handleStorageChange);
      };
    } catch (error) {
      console.error('Error reading from localStorage:', error);
    }
  }, []);
  
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
                {storedCount > 0 && (
                  <TabsTrigger value="stored">
                    <Database className="h-4 w-4 mr-1" />
                    {language === 'en' ? `Stored (${storedCount})` : `مخزن (${storedCount})`}
                  </TabsTrigger>
                )}
              </TabsList>
              <TabsContent value="submission">
                <Alert className="mb-6">
                  <InfoIcon className="h-4 w-4" />
                  <AlertTitle>
                    {language === 'en' ? 'Important' : 'هام'}
                  </AlertTitle>
                  <AlertDescription>
                    {language === 'en' 
                      ? 'For this demo, submitted content will be stored in your browser\'s local storage. There\'s a 5MB limit to ensure performance.'
                      : 'في هذا العرض التوضيحي، سيتم تخزين المحتوى المرسل في التخزين المحلي للمتصفح الخاص بك. هناك حد 5 ميغابايت لضمان الأداء.'}
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
              
              <TabsContent value="stored">
                <div className="bg-white dark:bg-shahid-dark p-4 rounded-lg border border-gray-100 dark:border-gray-800">
                  <h2 className="text-xl font-semibold mb-4">
                    {language === 'en' ? 'Stored Testimonies' : 'الشهادات المخزنة'}
                  </h2>
                  <StoredTestimoniesDisplay language={language} />
                </div>
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

// Component to display stored testimonies
const StoredTestimoniesDisplay = ({ language }: { language: 'en' | 'ar' }) => {
  const [testimonies, setTestimonies] = useState<StoredTestimony[]>([]);
  
  useEffect(() => {
    try {
      const data = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (data) {
        const stored: StoredTestimony[] = JSON.parse(data);
        setTestimonies(stored);
      }
    } catch (error) {
      console.error('Error reading stored testimonies:', error);
    }
  }, []);
  
  if (testimonies.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        {language === 'en' ? 'No stored testimonies found.' : 'لم يتم العثور على شهادات مخزنة.'}
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      {testimonies.map(testimony => (
        <div key={testimony.id} className="border border-gray-100 dark:border-gray-700 p-4 rounded-lg">
          <div className="flex justify-between items-start mb-2">
            <div>
              <span className="inline-block px-2 py-1 text-xs rounded-full bg-shahid-purple/10 text-shahid-purple">
                {testimony.type.toUpperCase()}
              </span>
            </div>
            <span className="text-xs text-gray-500">
              {new Date(testimony.submittedAt).toLocaleString()}
            </span>
          </div>
          
          <h3 className="font-medium mb-1">
            {testimony.location || (language === 'en' ? 'Unknown location' : 'موقع غير معروف')}
          </h3>
          
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
            {testimony.description || (language === 'en' ? 'No description provided' : 'لم يتم تقديم وصف')}
          </p>
          
          {testimony.files.length > 0 && (
            <div className="mt-2">
              <p className="text-xs font-medium text-gray-500 mb-1">
                {language === 'en' ? 'Attached files:' : 'الملفات المرفقة:'}
              </p>
              <div className="flex flex-wrap gap-1">
                {testimony.files.map((file, index) => (
                  <span key={index} className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                    {file}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Submit;
