
import { useState } from 'react';
import { toast } from "@/components/ui/use-toast";
import { SubmissionFormProps, SubmissionType } from './types';
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
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Prepare submission data
    const submissionData = {
      type: submissionType,
      location,
      date,
      description,
      files: files.map(file => file.name),
      xmlData: xmlData ? true : false,
    };
    
    console.log("Submission data:", submissionData);
    
    // Simulate submission process
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: language === 'en' ? "Submission Received" : "تم استلام المساهمة",
        description: language === 'en' 
          ? "Your testimony is being processed securely. Thank you for your contribution."
          : "يتم معالجة شهادتك بشكل آمن. شكرا على مساهمتك.",
        duration: 5000,
      });
      
      // Reset form
      setFiles([]);
      setLocation("");
      setDate("");
      setDescription("");
      setXmlData(null);
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
      
      <FormFooter
        language={language}
        isSubmitting={isSubmitting}
      />
    </form>
  );
};
