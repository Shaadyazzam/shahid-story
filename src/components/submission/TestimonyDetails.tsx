
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, Calendar } from "lucide-react";

interface TestimonyDetailsProps {
  language: 'en' | 'ar';
  location: string;
  setLocation: (location: string) => void;
  date: string;
  setDate: (date: string) => void;
  description: string;
  setDescription: (description: string) => void;
}

export const TestimonyDetails = ({
  language,
  location,
  setLocation,
  date,
  setDate,
  description,
  setDescription
}: TestimonyDetailsProps) => {
  return (
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
  );
};
