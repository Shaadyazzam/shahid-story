
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
  );
};
