
export interface SubmissionFormProps {
  language: 'en' | 'ar';
}

export type SubmissionType = 'text' | 'photo' | 'video' | 'audio';

export interface StoredTestimony {
  id: string;
  type: SubmissionType;
  date: string;
  location: string;
  description: string;
  files: string[];
  submittedAt: string;
  hasXmlData: boolean;
}

export const LOCAL_STORAGE_KEY = 'shahid_testimonies';
export const MAX_TESTIMONIES = 10; // Maximum number of testimonies to store
export const MAX_STORAGE_SIZE_MB = 5; // Maximum storage size in MB
