
import { useState, useEffect } from 'react';
import { LOCAL_STORAGE_KEY, StoredTestimony } from './types';

interface StoredTestimoniesDisplayProps {
  language: 'en' | 'ar';
}

export const StoredTestimoniesDisplay = ({ language }: StoredTestimoniesDisplayProps) => {
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
