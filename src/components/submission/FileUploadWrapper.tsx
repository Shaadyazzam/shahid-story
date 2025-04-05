
import { useState } from 'react';
import { toast } from "@/components/ui/use-toast";
import { FileTypeSelector } from "./FileTypeSelector";
import { FileUploadZone } from "./FileUploadZone";
import { FileList } from "./FileList";
import { XmlSuccessIndicator } from "./XmlSuccessIndicator";
import { SubmissionType } from "./types";

interface FileUploadWrapperProps {
  language: 'en' | 'ar';
  submissionType: SubmissionType;
  files: File[];
  setFiles: (files: File[]) => void;
  setLocation: (location: string) => void;
  setDate: (date: string) => void;
  setDescription: (description: string) => void;
  setXmlData: (data: any) => void;
}

export const FileUploadWrapper = ({
  language,
  submissionType,
  files,
  setFiles,
  setLocation,
  setDate,
  setDescription,
  setXmlData
}: FileUploadWrapperProps) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files);
      setFiles(selectedFiles);
    }
  };
  
  const removeFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
  };

  return (
    <div className="space-y-3">
      <FileTypeSelector language={language} submissionType={submissionType} />
      
      <FileUploadZone 
        language={language}
        submissionType={submissionType}
        onFileChange={handleFileChange}
      />
      
      {files.length > 0 && (
        <FileList 
          files={files} 
          submissionType={submissionType}
          language={language}
          onRemove={removeFile}
        />
      )}
    </div>
  );
};
