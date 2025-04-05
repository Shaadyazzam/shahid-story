
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, MapPin, Calendar, Share2 } from "lucide-react";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";

interface TestimonyCardProps {
  id: string;
  type: 'text' | 'photo' | 'video' | 'audio';
  title: string;
  summary: string;
  location: string;
  date: string;
  mediaUrl?: string;
  language: 'en' | 'ar';
  category: string;
}

export const TestimonyCard = ({
  id,
  type,
  title,
  summary,
  location,
  date,
  mediaUrl,
  language,
  category
}: TestimonyCardProps) => {
  const [expanded, setExpanded] = useState(false);
  
  const handleShare = () => {
    navigator.clipboard.writeText(`https://shahid.org/testimonials/${id}`);
    toast({
      title: language === 'en' ? 'Link copied to clipboard' : 'تم نسخ الرابط',
      duration: 3000,
    });
  };
  
  const formattedDate = new Date(date).toLocaleDateString(
    language === 'en' ? 'en-US' : 'ar-EG', 
    { year: 'numeric', month: 'short', day: 'numeric' }
  );
  
  const categoryLabel = language === 'en' ? category : 
    category === 'Bombing' ? 'قصف' :
    category === 'Medical' ? 'طبي' :
    category === 'Displacement' ? 'نزوح' : category;

  return (
    <div className="testimony-card">
      {mediaUrl && type !== 'text' && (
        <div className="relative w-full h-48">
          {type === 'photo' && (
            <img 
              src={mediaUrl} 
              alt={title}
              className="w-full h-full object-cover"
            />
          )}
          {type === 'video' && (
            <div className="media-placeholder h-full">
              <video 
                controls
                className="w-full h-full object-cover"
                poster="/images/video-placeholder.jpg"
              >
                <source src={mediaUrl} type="video/mp4" />
                {language === 'en' ? 'Your browser does not support video playback.' : 'متصفحك لا يدعم تشغيل الفيديو.'}
              </video>
            </div>
          )}
          {type === 'audio' && (
            <div className="media-placeholder h-full flex flex-col items-center justify-center p-6">
              <div className="mb-3 text-shahid-gray">
                {language === 'en' ? 'Audio Testimony' : 'شهادة صوتية'}
              </div>
              <audio controls className="w-full">
                <source src={mediaUrl} type="audio/mpeg" />
                {language === 'en' ? 'Your browser does not support audio playback.' : 'متصفحك لا يدعم تشغيل الصوت.'}
              </audio>
            </div>
          )}
          <Badge 
            variant="secondary" 
            className="absolute top-2 left-2 bg-white dark:bg-shahid-dark opacity-90"
          >
            {categoryLabel}
          </Badge>
        </div>
      )}
      
      <div className="p-4">
        {(!mediaUrl || type === 'text') && (
          <div className="mb-3">
            <Badge variant="outline">{categoryLabel}</Badge>
          </div>
        )}
        
        <h3 className="font-semibold text-lg mb-2">{title}</h3>
        
        <div className="flex flex-wrap gap-2 text-xs text-gray-500 mb-3">
          <div className="flex items-center">
            <MapPin className="h-3 w-3 mr-1" />
            <span>{location}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="h-3 w-3 mr-1" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center">
            <FileText className="h-3 w-3 mr-1" />
            <span>
              {type === 'text' ? (language === 'en' ? 'Text' : 'نص') :
               type === 'photo' ? (language === 'en' ? 'Photo' : 'صورة') :
               type === 'video' ? (language === 'en' ? 'Video' : 'فيديو') :
               (language === 'en' ? 'Audio' : 'صوت')}
            </span>
          </div>
        </div>
        
        <p className={`text-sm text-gray-600 dark:text-gray-300 ${expanded ? '' : 'line-clamp-3'}`}>
          {summary}
        </p>
        
        <div className="flex justify-between items-center mt-4">
          <Button variant="ghost" size="sm" onClick={() => setExpanded(!expanded)}>
            {expanded 
              ? (language === 'en' ? 'Read Less' : 'عرض أقل')
              : (language === 'en' ? 'Read More' : 'عرض المزيد')
            }
          </Button>
          
          <Button variant="ghost" size="icon" onClick={handleShare}>
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
