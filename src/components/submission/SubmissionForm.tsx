
import { useState, useEffect } from 'react';
import { toast } from "@/components/ui/use-toast";
import { SubmissionFormProps, SubmissionType, StoredTestimony, LOCAL_STORAGE_KEY, MAX_TESTIMONIES, MAX_STORAGE_SIZE_MB } from './types';
import { SubmissionTypeSelector } from './SubmissionTypeSelector';
import { FileUpload } from './FileUpload';
import { TestimonyDetails } from './TestimonyDetails';
import { FormFooter } from './FormFooter';

export const SubmissionForm = ({ language }: SubmissionFormProps) => {
  const [submissionType, setSubmissionType] = useState<SubmissionType>('text');
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [xmlData, setXmlData] = useState<any>(null);
  
  // Calculate the current storage usage from localStorage
  const calculateStorageUsage = (): number => {
    try {
      const data = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (!data) return 0;
      
      // Approximate size in MB (length * 2 bytes per character / 1024^2 bytes per MB)
      return (data.length * 2) / (1024 * 1024);
    } catch (error) {
      console.error('Error calculating storage size:', error);
      return 0;
    }
  };
  
  // Save testimony to localStorage
  const saveToLocalStorage = (testimony: StoredTestimony) => {
    try {
      // Get existing testimonies
      const existingData = localStorage.getItem(LOCAL_STORAGE_KEY);
      const testimonies: StoredTestimony[] = existingData ? JSON.parse(existingData) : [];
      
      // Add new testimony
      const updatedTestimonies = [testimony, ...testimonies].slice(0, MAX_TESTIMONIES);
      
      // Check size before saving
      const dataToSave = JSON.stringify(updatedTestimonies);
      const sizeMB = (dataToSave.length * 2) / (1024 * 1024);
      
      if (sizeMB > MAX_STORAGE_SIZE_MB) {
        throw new Error(`Storage limit of ${MAX_STORAGE_SIZE_MB}MB exceeded`);
      }
      
      // Save to localStorage
      localStorage.setItem(LOCAL_STORAGE_KEY, dataToSave);
      return true;
    } catch (error) {
      console.error('Error saving to localStorage:', error);
      if (error instanceof Error && error.name === 'QuotaExceededError') {
        toast({
          title: language === 'en' ? "Storage Limit Reached" : "تم الوصول إلى حد التخزين",
          description: language === 'en' 
            ? "Please clear some space before submitting more testimonies." 
            : "يرجى إخلاء بعض المساحة قبل تقديم المزيد من الشهادات.",
          variant: "destructive",
        });
      }
      return false;
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Prepare submission data
    const newTestimony: StoredTestimony = {
      id: `testimony-${Date.now()}`,
      type: submissionType,
      location,
      date,
      description,
      files: files.map(file => file.name),
      submittedAt: new Date().toISOString(),
      hasXmlData: xmlData ? true : false,
    };
    
    console.log("Submission data:", newTestimony);
    
    // Simulate submission process
    setTimeout(() => {
      setIsSubmitting(false);
      
      // Save to localStorage
      const saved = saveToLocalStorage(newTestimony);
      
      if (saved) {
        toast({
          title: language === 'en' ? "Submission Saved" : "تم حفظ المساهمة",
          description: language === 'en' 
            ? "Your testimony has been saved locally. Thank you for your contribution."
            : "تم حفظ شهادتك محليًا. شكرا على مساهمتك.",
          duration: 5000,
        });
        
        // Reset form
        setFiles([]);
        setLocation("");
        setDate("");
        setDescription("");
        setXmlData(null);
      } else {
        toast({
          title: language === 'en' ? "Storage Error" : "خطأ في التخزين",
          description: language === 'en' 
            ? "Unable to save your testimony locally. Storage may be full."
            : "غير قادر على حفظ شهادتك محليًا. قد تكون مساحة التخزين ممتلئة.",
          variant: "destructive",
          duration: 5000,
        });
      }
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-white dark:bg-shahid-dark rounded-lg shadow-sm border border-gray-100 dark:border-gray-800">
      <SubmissionTypeSelector 
        language={language}
        submissionType={submissionType}
        setSubmissionType={setSubmissionType}
      />
      
      {submissionType !== 'text' && (
        <FileUpload
          language={language}
          submissionType={submissionType}
          files={files}
          setFiles={setFiles}
          setLocation={setLocation}
          setDate={setDate}
          setDescription={setDescription}
          setXmlData={setXmlData}
        />
      )}
      
      <TestimonyDetails
        language={language}
        location={location}
        setLocation={setLocation}
        date={date}
        setDate={setDate}
        description={description}
        setDescription={setDescription}
      />
      
      {/* Storage usage indicator */}
      <div className="text-xs text-gray-500 flex justify-between items-center">
        <span>
          {language === 'en' 
            ? `Local storage: ${calculateStorageUsage().toFixed(2)}/${MAX_STORAGE_SIZE_MB}MB` 
            : `التخزين المحلي: ${calculateStorageUsage().toFixed(2)}/${MAX_STORAGE_SIZE_MB}MB`}
        </span>
        {calculateStorageUsage() > 0 && (
          <button 
            type="button" 
            className="text-xs text-shahid-purple hover:underline"
            onClick={() => {
              if (window.confirm(language === 'en' 
                ? 'Are you sure you want to clear all stored testimonies?' 
                : 'هل أنت متأكد أنك تريد مسح جميع الشهادات المخزنة؟')) {
                localStorage.removeItem(LOCAL_STORAGE_KEY);
                toast({
                  title: language === 'en' ? "Storage Cleared" : "تم مسح التخزين",
                  description: language === 'en' 
                    ? "All stored testimonies have been removed."
                    : "تمت إزالة جميع الشهادات المخزنة.",
                });
              }
            }}
          >
            {language === 'en' ? 'Clear storage' : 'مسح التخزين'}
          </button>
        )}
      </div>
      
      <FormFooter
        language={language}
        isSubmitting={isSubmitting}
      />
    </form>
  );
};
