
import { useState, useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { LOCAL_STORAGE_KEY, StoredTestimony } from '@/components/submission/types';
import { WhySubmitSidebar } from '@/components/submission/WhySubmitSidebar';
import { SubmissionTabs } from '@/components/submission/SubmissionTabs';

const Submit = () => {
  const [language, setLanguage] = useState<'en' | 'ar'>('en');
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
            <SubmissionTabs language={language} storedCount={storedCount} />
          </div>
          
          <WhySubmitSidebar language={language} />
        </div>
      </div>
    </Layout>
  );
};

export default Submit;
