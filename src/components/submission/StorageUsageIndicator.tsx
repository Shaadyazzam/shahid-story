
import { LOCAL_STORAGE_KEY, MAX_STORAGE_SIZE_MB } from './types';
import { toast } from "@/components/ui/use-toast";

interface StorageUsageIndicatorProps {
  language: 'en' | 'ar';
  calculateStorageUsage: () => number;
  clearStorage: () => boolean;
}

export const StorageUsageIndicator = ({ 
  language, 
  calculateStorageUsage,
  clearStorage
}: StorageUsageIndicatorProps) => {
  const storageUsage = calculateStorageUsage();
  
  const handleClearStorage = () => {
    if (window.confirm(language === 'en' 
      ? 'Are you sure you want to clear all stored testimonies?' 
      : 'هل أنت متأكد أنك تريد مسح جميع الشهادات المخزنة؟')) {
      if (clearStorage()) {
        toast({
          title: language === 'en' ? "Storage Cleared" : "تم مسح التخزين",
          description: language === 'en' 
            ? "All stored testimonies have been removed."
            : "تمت إزالة جميع الشهادات المخزنة.",
        });
      }
    }
  };

  return (
    <div className="text-xs text-gray-500 flex justify-between items-center">
      <span>
        {language === 'en' 
          ? `Local storage: ${storageUsage.toFixed(2)}/${MAX_STORAGE_SIZE_MB}MB` 
          : `التخزين المحلي: ${storageUsage.toFixed(2)}/${MAX_STORAGE_SIZE_MB}MB`}
      </span>
      {storageUsage > 0 && (
        <button 
          type="button" 
          className="text-xs text-shahid-purple hover:underline"
          onClick={handleClearStorage}
        >
          {language === 'en' ? 'Clear storage' : 'مسح التخزين'}
        </button>
      )}
    </div>
  );
};
