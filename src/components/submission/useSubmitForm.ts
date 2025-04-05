
import { useState } from 'react';
import { toast } from "@/components/ui/use-toast";
import { SubmissionType, StoredTestimony } from './types';

interface SubmitFormOptions {
  language: 'en' | 'ar';
  submissionType: SubmissionType;
  files: File[];
  location: string;
  date: string;
  description: string;
  xmlData: any;
  saveTestimony: (testimony: StoredTestimony) => boolean;
  resetForm: () => void;
}

export const useSubmitForm = ({
  language,
  submissionType,
  files,
  location,
  date,
  description,
  xmlData,
  saveTestimony,
  resetForm
}: SubmitFormOptions) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      const saved = saveTestimony(newTestimony);
      
      if (saved) {
        toast({
          title: language === 'en' ? "Submission Saved" : "تم حفظ المساهمة",
          description: language === 'en' 
            ? "Your testimony has been saved locally. Thank you for your contribution."
            : "تم حفظ شهادتك محليًا. شكرا على مساهمتك.",
          duration: 5000,
        });
        
        // Reset form
        resetForm();
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

  return { handleSubmit, isSubmitting };
};
