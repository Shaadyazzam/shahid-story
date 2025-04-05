
import { Button } from "@/components/ui/button";
import { X, Image, Video, Mic, FileText } from "lucide-react";
import { SubmissionType } from "./types";

interface FileListProps {
  files: File[];
  submissionType: SubmissionType;
  language: 'en' | 'ar';
  onRemove: (index: number) => void;
}

export const FileList = ({ files, submissionType, language, onRemove }: FileListProps) => {
  const renderFileIcon = (type: SubmissionType) => {
    switch (type) {
      case 'photo': return <Image className="h-4 w-4 text-gray-500 mr-2" />;
      case 'video': return <Video className="h-4 w-4 text-gray-500 mr-2" />;
      case 'audio': return <Mic className="h-4 w-4 text-gray-500 mr-2" />;
      default: return <FileText className="h-4 w-4 text-gray-500 mr-2" />;
    }
  };
  
  return (
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
            onClick={() => onRemove(index)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  );
};
