
import { useState, useEffect } from 'react';
import { toast } from "@/components/ui/use-toast";
import { StoredTestimony, LOCAL_STORAGE_KEY, MAX_TESTIMONIES, MAX_STORAGE_SIZE_MB } from '@/components/submission/types';

export const useTestimonyStorage = (language: 'en' | 'ar') => {
  const [storedTestimonies, setStoredTestimonies] = useState<StoredTestimony[]>([]);
  
  // Load testimonies from local storage on component mount
  useEffect(() => {
    try {
      const data = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (data) {
        setStoredTestimonies(JSON.parse(data));
      }
    } catch (error) {
      console.error('Error loading testimonies from localStorage:', error);
    }
  }, []);
  
  // Calculate the current storage usage from localStorage
  const calculateStorageUsage = (): number => {
    try {
      const data = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (!data) return 0;
      
      // Approximate size in MB (length * 2 bytes per character / 1024^2 bytes per MB)
      return (data.length * 2) / (1024 * 1024);
    } catch (error) {
      console.error('Error calculating storage size:', error);
      return 0;
    }
  };
  
  // Save testimony to localStorage
  const saveTestimony = (testimony: StoredTestimony): boolean => {
    try {
      // Add new testimony
      const updatedTestimonies = [testimony, ...storedTestimonies].slice(0, MAX_TESTIMONIES);
      
      // Check size before saving
      const dataToSave = JSON.stringify(updatedTestimonies);
      const sizeMB = (dataToSave.length * 2) / (1024 * 1024);
      
      if (sizeMB > MAX_STORAGE_SIZE_MB) {
        throw new Error(`Storage limit of ${MAX_STORAGE_SIZE_MB}MB exceeded`);
      }
      
      // Save to localStorage
      localStorage.setItem(LOCAL_STORAGE_KEY, dataToSave);
      setStoredTestimonies(updatedTestimonies);
      return true;
    } catch (error) {
      console.error('Error saving to localStorage:', error);
      if (error instanceof Error && error.name === 'QuotaExceededError') {
        toast({
          title: language === 'en' ? "Storage Limit Reached" : "تم الوصول إلى حد التخزين",
          description: language === 'en' 
            ? "Please clear some space before submitting more testimonies." 
            : "يرجى إخلاء بعض المساحة قبل تقديم المزيد من الشهادات.",
          variant: "destructive",
        });
      }
      return false;
    }
  };
  
  const clearStorage = () => {
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      setStoredTestimonies([]);
      return true;
    } catch (error) {
      console.error('Error clearing localStorage:', error);
      return false;
    }
  };
  
  return {
    calculateStorageUsage,
    saveTestimony,
    clearStorage,
    storedTestimonies,
  };
};
