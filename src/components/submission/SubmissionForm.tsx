
import { useState } from 'react';
import { SubmissionFormProps, SubmissionType } from './types';
import { SubmissionTypeSelector } from './SubmissionTypeSelector';
import { FileUpload } from './FileUpload';
import { TestimonyDetails } from './TestimonyDetails';
import { FormFooter } from './FormFooter';
import { StorageUsageIndicator } from './StorageUsageIndicator';
import { useTestimonyStorage } from '@/hooks/useTestimonyStorage';
import { useSubmitForm } from './useSubmitForm';

export const SubmissionForm = ({ language }: SubmissionFormProps) => {
  const [submissionType, setSubmissionType] = useState<SubmissionType>('text');
  const [files, setFiles] = useState<File[]>([]);
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [xmlData, setXmlData] = useState<any>(null);
  
  const { calculateStorageUsage, saveTestimony, clearStorage } = useTestimonyStorage(language);
  
  const resetForm = () => {
    setFiles([]);
    setLocation("");
    setDate("");
    setDescription("");
    setXmlData(null);
  };
  
  const { handleSubmit, isSubmitting } = useSubmitForm({
    language,
    submissionType,
    files,
    location,
    date,
    description,
    xmlData,
    saveTestimony,
    resetForm
  });

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
      <StorageUsageIndicator 
        language={language}
        calculateStorageUsage={calculateStorageUsage}
        clearStorage={clearStorage}
      />
      
      <FormFooter
        language={language}
        isSubmitting={isSubmitting}
      />
    </form>
  );
};
