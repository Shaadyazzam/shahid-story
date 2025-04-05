
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, Calendar, Shield, Upload, FileText, Image, Video, Mic, X, Check } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface SubmissionFormProps {
  language: 'en' | 'ar';
}

export const SubmissionForm = ({ language }: SubmissionFormProps) => {
  const [submissionType, setSubmissionType] = useState<'text' | 'photo' | 'video' | 'audio'>('text');
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFiles(Array.from(e.target.files));
    }
  };
  
  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate submission process
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: language === 'en' ? "Submission Received" : "تم استلام المساهمة",
        description: language === 'en' 
          ? "Your testimony is being processed securely. Thank you for your contribution."
          : "يتم معالجة شهادتك بشكل آمن. شكرا على مساهمتك.",
        duration: 5000,
      });
      
      // Reset form
      setFiles([]);
      setLocation("");
      setDate("");
      setDescription("");
    }, 2000);
  };
  
  const renderSubmissionTypeIcon = (type: 'text' | 'photo' | 'video' | 'audio') => {
    switch (type) {
      case 'text': return <FileText className="h-5 w-5" />;
      case 'photo': return <Image className="h-5 w-5" />;
      case 'video': return <Video className="h-5 w-5" />;
      case 'audio': return <Mic className="h-5 w-5" />;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-white dark:bg-shahid-dark rounded-lg shadow-sm border border-gray-100 dark:border-gray-800">
      <div className="flex flex-wrap gap-2">
        {['text', 'photo', 'video', 'audio'].map((type) => (
          <Button
            key={type}
            type="button"
            variant={submissionType === type ? "default" : "outline"}
            className="flex items-center gap-2"
            onClick={() => setSubmissionType(type as any)}
          >
            {renderSubmissionTypeIcon(type as any)}
            <span>
              {language === 'en'
                ? type.charAt(0).toUpperCase() + type.slice(1)
                : type === 'text' ? 'نص' 
                : type === 'photo' ? 'صورة'
                : type === 'video' ? 'فيديو'
                : 'صوت'
              }
            </span>
          </Button>
        ))}
      </div>
      
      {submissionType !== 'text' && (
        <div className="space-y-3">
          <Label htmlFor="file-upload">
            {language === 'en'
              ? `Upload ${submissionType === 'photo' ? 'Images' : submissionType === 'video' ? 'Videos' : 'Audio Files'}`
              : `تحميل ${submissionType === 'photo' ? 'صور' : submissionType === 'video' ? 'مقاطع فيديو' : 'ملفات صوتية'}`
            }
          </Label>
          
          <div className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg p-6 flex flex-col items-center justify-center">
            <Upload className="h-8 w-8 text-gray-400 mb-2" />
            <p className="text-sm text-gray-500 text-center mb-4">
              {language === 'en'
                ? `Drag and drop your ${submissionType === 'photo' ? 'images' : submissionType === 'video' ? 'videos' : 'audio files'}, or click to select files`
                : `اسحب وأفلت ${submissionType === 'photo' ? 'صورك' : submissionType === 'video' ? 'مقاطع الفيديو' : 'ملفات الصوت'} أو انقر لتحديد الملفات`
              }
            </p>
            <Input
              id="file-upload"
              type="file"
              multiple
              accept={
                submissionType === 'photo' ? "image/*" :
                submissionType === 'video' ? "video/*" :
                "audio/*"
              }
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
                    {submissionType === 'photo' ? <Image className="h-4 w-4 text-gray-500 mr-2" /> :
                     submissionType === 'video' ? <Video className="h-4 w-4 text-gray-500 mr-2" /> :
                     <Mic className="h-4 w-4 text-gray-500 mr-2" />}
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
        </div>
      )}
      
      <div className="space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="location" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              {language === 'en' ? 'Location' : 'الموقع'}
            </Label>
            <Input
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder={language === 'en' ? 'City, Area...' : 'المدينة، المنطقة...'}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="date" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {language === 'en' ? 'Date of Incident' : 'تاريخ الحادث'}
            </Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="description">
            {language === 'en' ? 'Your Testimony' : 'شهادتك'}
          </Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={language === 'en'
              ? 'Please describe what happened in as much detail as you are comfortable sharing...'
              : 'يرجى وصف ما حدث بأكبر قدر ممكن من التفاصيل التي تشعر بالراحة في مشاركتها...'
            }
            rows={6}
          />
        </div>
      </div>
      
      <div className="border-t border-gray-100 dark:border-gray-800 pt-4">
        <div className="flex items-start space-x-2 mb-4">
          <Shield className="h-4 w-4 text-shahid-purple mt-0.5" />
          <p className="text-xs text-gray-500">
            {language === 'en'
              ? 'All submissions are encrypted and can be made anonymously. We implement face blurring and voice anonymization when needed.'
              : 'جميع المساهمات مشفرة ويمكن تقديمها بشكل مجهول. نطبق تمويه الوجه وإخفاء الصوت عند الحاجة.'
            }
          </p>
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting} className="min-w-[120px]">
          {isSubmitting ? (
            <>
              <span className="spinner mr-2"></span>
              {language === 'en' ? 'Submitting...' : 'جاري الإرسال...'}
            </>
          ) : (
            <>
              <Check className="h-4 w-4 mr-2" />
              {language === 'en' ? 'Submit' : 'إرسال'}
            </>
          )}
        </Button>
      </div>
    </form>
  );
};
