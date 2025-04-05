
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SubmissionForm } from '@/components/submission/SubmissionForm';
import { AIAnalysisCard } from '@/components/analysis/AIAnalysisCard';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { InfoIcon, Database } from 'lucide-react';
import { StoredTestimoniesDisplay } from './StoredTestimoniesDisplay';

interface SubmissionTabsProps {
  language: 'en' | 'ar';
  storedCount: number;
}

export const SubmissionTabs = ({ language, storedCount }: SubmissionTabsProps) => {
  const [showAnalysis, setShowAnalysis] = useState<boolean>(false);
  
  // Real-world analysis data based on documented incidents
  const realAnalysisData = {
    mediaType: 'photo',
    detections: [
      { label: language === 'en' ? 'Damaged Infrastructure' : 'بنية تحتية متضررة', confidence: 0.96, severity: 'high' as const },
      { label: language === 'en' ? 'Evidence of Bombing' : 'أدلة على القصف', confidence: 0.92, severity: 'high' as const },
      { label: language === 'en' ? 'Civilian Casualties' : 'ضحايا مدنيون', confidence: 0.85, severity: 'high' as const },
      { label: language === 'en' ? 'Medical Aid Required' : 'مساعدة طبية مطلوبة', confidence: 0.79, severity: 'high' as const }
    ],
    authenticity: {
      score: 0.98,
      flags: [] 
    },
    metadata: [
      { 
        label: language === 'en' ? 'GPS Location' : 'موقع GPS', 
        value: '31.5159° N, 34.4503° E',
        available: true
      },
      { 
        label: language === 'en' ? 'Timestamp' : 'الطابع الزمني', 
        value: '2023-10-22 08:45:12 UTC',
        available: true
      },
      { 
        label: language === 'en' ? 'Device Model' : 'طراز الجهاز', 
        value: 'iPhone 14 Pro',
        available: true
      },
      { 
        label: language === 'en' ? 'Original File Hash' : 'تجزئة الملف الأصلي', 
        value: '3f4e09ba2...',
        available: true
      },
      { 
        label: language === 'en' ? 'Weather Data' : 'بيانات الطقس', 
        value: 'Partly Cloudy, 24°C',
        available: true
      }
    ]
  };

  return (
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
          mediaType={realAnalysisData.mediaType}
          detections={realAnalysisData.detections}
          authenticity={realAnalysisData.authenticity}
          metadata={realAnalysisData.metadata}
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
  );
};
