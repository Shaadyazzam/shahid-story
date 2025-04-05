
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload } from "lucide-react";
import { SubmissionType } from "./types";

interface FileUploadZoneProps {
  language: 'en' | 'ar';
  submissionType: SubmissionType;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FileUploadZone = ({ language, submissionType, onFileChange }: FileUploadZoneProps) => {
  const getAcceptedFileTypes = () => {
    switch (submissionType) {
      case 'photo': return "image/*";
      case 'video': return "video/*";
      case 'audio': return "audio/*";
      case 'xml': return ".xml";
      default: return "";
    }
  };
  
  return (
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
        onChange={onFileChange}
      />
      <Button
        type="button"
        variant="outline"
        onClick={() => document.getElementById('file-upload')?.click()}
      >
        {language === 'en' ? 'Select Files' : 'اختر الملفات'}
      </Button>
    </div>
  );
};
