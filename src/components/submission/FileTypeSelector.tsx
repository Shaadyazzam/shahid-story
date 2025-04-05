
import { Label } from "@/components/ui/label";
import { SubmissionType } from "./types";

interface FileTypeSelectorProps {
  language: 'en' | 'ar';
  submissionType: SubmissionType;
}

export const FileTypeSelector = ({ language, submissionType }: FileTypeSelectorProps) => {
  return (
    <Label htmlFor="file-upload">
      {language === 'en'
        ? `Upload ${
            submissionType === 'photo' ? 'Images' : 
            submissionType === 'video' ? 'Videos' : 
            submissionType === 'audio' ? 'Audio Files' :
            'Files'
          }`
        : `تحميل ${
            submissionType === 'photo' ? 'صور' : 
            submissionType === 'video' ? 'مقاطع فيديو' : 
            submissionType === 'audio' ? 'ملفات صوتية' :
            'ملفات'
          }`
      }
    </Label>
  );
};
