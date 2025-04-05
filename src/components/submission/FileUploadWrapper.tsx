
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
      
      // Parse XML file if selected
      if (submissionType === 'xml' && selectedFiles[0]) {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            try {
              // Parse XML content
              const parser = new DOMParser();
              const xmlDoc = parser.parseFromString(event.target.result as string, "text/xml");
              
              // Extract basic data from XML if available
              const extractedLocation = xmlDoc.querySelector('location')?.textContent || '';
              const extractedDate = xmlDoc.querySelector('date')?.textContent || '';
              const extractedDescription = xmlDoc.querySelector('description')?.textContent || '';
              
              if (extractedLocation) setLocation(extractedLocation);
              if (extractedDate) setDate(extractedDate);
              if (extractedDescription) setDescription(extractedDescription);
              
              // Store parsed XML data for submission
              setXmlData(xmlDoc);
              
              toast({
                title: language === 'en' ? "XML File Parsed" : "تم تحليل ملف XML",
                description: language === 'en' 
                  ? "The XML file was successfully processed." 
                  : "تم معالجة ملف XML بنجاح.",
              });
            } catch (error) {
              console.error("XML parsing error:", error);
              toast({
                title: language === 'en' ? "XML Parsing Error" : "خطأ في تحليل XML",
                description: language === 'en' 
                  ? "Could not parse the XML file. Please check the format." 
                  : "تعذر تحليل ملف XML. يرجى التحقق من التنسيق.",
                variant: "destructive",
              });
            }
          }
        };
        reader.readAsText(selectedFiles[0]);
      }
    }
  };
  
  const removeFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    
    if (submissionType === 'xml' && updatedFiles.length === 0) {
      setXmlData(null);
    }
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

      {submissionType === 'xml' && files.length > 0 && (
        <XmlSuccessIndicator language={language} />
      )}
    </div>
  );
};
