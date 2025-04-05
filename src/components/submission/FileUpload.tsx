
import { FileUploadWrapper } from "./FileUploadWrapper";
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

export const FileUpload = (props: FileUploadProps) => {
  return <FileUploadWrapper {...props} />;
};
