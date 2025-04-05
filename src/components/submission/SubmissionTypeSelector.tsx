
import { Button } from "@/components/ui/button";
import { FileText, Image, Video, Mic } from "lucide-react";
import { SubmissionType } from "./types";

interface SubmissionTypeSelectorProps {
  language: 'en' | 'ar';
  submissionType: SubmissionType;
  setSubmissionType: (type: SubmissionType) => void;
}

export const SubmissionTypeSelector = ({
  language,
  submissionType,
  setSubmissionType
}: SubmissionTypeSelectorProps) => {
  const renderSubmissionTypeIcon = (type: SubmissionType) => {
    switch (type) {
      case 'text': return <FileText className="h-5 w-5" />;
      case 'photo': return <Image className="h-5 w-5" />;
      case 'video': return <Video className="h-5 w-5" />;
      case 'audio': return <Mic className="h-5 w-5" />;
      case 'xml': return <FileText className="h-5 w-5" />;
    }
  };

  const typesArray: SubmissionType[] = ['text', 'photo', 'video', 'audio', 'xml'];
  
  return (
    <div className="flex flex-wrap gap-2">
      {typesArray.map((type) => (
        <Button
          key={type}
          type="button"
          variant={submissionType === type ? "default" : "outline"}
          className="flex items-center gap-2"
          onClick={() => setSubmissionType(type)}
        >
          {renderSubmissionTypeIcon(type)}
          <span>
            {language === 'en'
              ? type.charAt(0).toUpperCase() + type.slice(1)
              : type === 'text' ? 'نص' 
              : type === 'photo' ? 'صورة'
              : type === 'video' ? 'فيديو'
              : type === 'audio' ? 'صوت'
              : 'XML'
            }
          </span>
        </Button>
      ))}
    </div>
  );
};
