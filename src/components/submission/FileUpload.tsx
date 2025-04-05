
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, Image, Video, Mic, FileText, X } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { SubmissionType } from "./types";

interface FileUploadProps {
  language: 'en' | 'ar';
  submissionType: SubmissionType;
  files: File[];
  setFiles: (files: File[]) => void;
  setLocation: (location: string) => void;
  setDate: (date: string) => void;
  setDescription: (description: string) => void;
  setXmlData: (data: any) => void;
}

export const FileUpload = ({
  language,
  submissionType,
  files,
  setFiles,
  setLocation,
  setDate,
  setDescription,
  setXmlData
}: FileUploadProps) => {
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
    setFiles(prev => prev.filter((_, i) => i !== index));
    if (submissionType === 'xml' && files.length <= 1) {
      setXmlData(null);
    }
  };
  
  const getAcceptedFileTypes = () => {
    switch (submissionType) {
      case 'photo': return "image/*";
      case 'video': return "video/*";
      case 'audio': return "audio/*";
      case 'xml': return ".xml";
      default: return "";
    }
  };
  
  const renderFileIcon = (type: SubmissionType) => {
    switch (type) {
      case 'photo': return <Image className="h-4 w-4 text-gray-500 mr-2" />;
      case 'video': return <Video className="h-4 w-4 text-gray-500 mr-2" />;
      case 'audio': return <Mic className="h-4 w-4 text-gray-500 mr-2" />;
      default: return <FileText className="h-4 w-4 text-gray-500 mr-2" />;
    }
  };
  
  return (
    <div className="space-y-3">
      <Label htmlFor="file-upload">
        {language === 'en'
          ? `Upload ${
              submissionType === 'photo' ? 'Images' : 
              submissionType === 'video' ? 'Videos' : 
              submissionType === 'audio' ? 'Audio Files' :
              'XML Files'
            }`
          : `تحميل ${
              submissionType === 'photo' ? 'صور' : 
              submissionType === 'video' ? 'مقاطع فيديو' : 
              submissionType === 'audio' ? 'ملفات صوتية' :
              'ملفات XML'
            }`
        }
      </Label>
      
      <div className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg p-6 flex flex-col items-center justify-center">
        <Upload className="h-8 w-8 text-gray-400 mb-2" />
        <p className="text-sm text-gray-500 text-center mb-4">
          {language === 'en'
            ? `Drag and drop your ${
                submissionType === 'photo' ? 'images' : 
                submissionType === 'video' ? 'videos' : 
                submissionType === 'audio' ? 'audio files' :
                'XML files'
              }, or click to select files`
            : `اسحب وأفلت ${
                submissionType === 'photo' ? 'صورك' : 
                submissionType === 'video' ? 'مقاطع الفيديو' : 
                submissionType === 'audio' ? 'ملفات الصوت' :
                'ملفات XML'
              } أو انقر لتحديد الملفات`
          }
        </p>
        <Input
          id="file-upload"
          type="file"
          multiple={submissionType !== 'xml'}
          accept={getAcceptedFileTypes()}
          className="hidden"
          onChange={handleFileChange}
        />
        <Button
          type="button"
          variant="outline"
          onClick={() => document.getElementById('file-upload')?.click()}
        >
          {language === 'en' ? 'Select Files' : 'اختر الملفات'}
        </Button>
      </div>
      
      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          <p className="text-sm font-medium">
            {language === 'en' ? 'Selected Files:' : 'الملفات المحددة:'}
          </p>
          {files.map((file, index) => (
            <div key={index} className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 p-2 rounded-md">
              <div className="flex items-center">
                {renderFileIcon(submissionType)}
                <span className="text-sm truncate max-w-[250px]">{file.name}</span>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => removeFile(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {submissionType === 'xml' && files.length > 0 && (
        <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900 rounded-md">
          <p className="text-sm font-medium text-green-800 dark:text-green-400">
            {language === 'en' ? 'XML File Processed Successfully' : 'تمت معالجة ملف XML بنجاح'}
          </p>
          <p className="text-xs text-green-600 dark:text-green-500">
            {language === 'en' 
              ? 'Relevant data has been extracted and populated in the form.' 
              : 'تم استخراج البيانات ذات الصلة وتعبئتها في النموذج.'}
          </p>
        </div>
      )}
    </div>
  );
};
