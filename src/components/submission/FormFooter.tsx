
import { Button } from "@/components/ui/button";
import { Shield, Check } from "lucide-react";

interface FormFooterProps {
  language: 'en' | 'ar';
  isSubmitting: boolean;
}

export const FormFooter = ({ language, isSubmitting }: FormFooterProps) => {
  return (
    <>
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
    </>
  );
};
