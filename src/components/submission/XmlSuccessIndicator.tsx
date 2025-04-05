
interface XmlSuccessIndicatorProps {
  language: 'en' | 'ar';
}

export const XmlSuccessIndicator = ({ language }: XmlSuccessIndicatorProps) => {
  return (
    <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900 rounded-md">
      <p className="text-sm font-medium text-green-800 dark:text-green-400">
        {language === 'en' ? 'XML File Processed Successfully' : 'تمت معالجة ملف XML بنجاح'}
      </p>
      <p className="text-xs text-green-600 dark:text-green-500">
        {language === 'en' 
          ? 'Relevant data has been extracted and populated in the form.' 
          : 'تم استخراج البيانات ذات الصلة وتعبئتها في النموذج.'}
      </p>
    </div>
  );
};
