
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { CheckIcon, Filter, ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface TestimonyFiltersProps {
  onFilterChange: (filters: {
    type?: string[];
    category?: string[];
    location?: string[];
  }) => void;
  language: 'en' | 'ar';
}

export const TestimonyFilters = ({ onFilterChange, language }: TestimonyFiltersProps) => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);

  const typeOptions = [
    { value: 'text', label: language === 'en' ? 'Text' : 'نص' },
    { value: 'photo', label: language === 'en' ? 'Photo' : 'صورة' },
    { value: 'video', label: language === 'en' ? 'Video' : 'فيديو' },
    { value: 'audio', label: language === 'en' ? 'Audio' : 'صوت' },
  ];

  const categoryOptions = [
    { value: 'bombing', label: language === 'en' ? 'Bombing' : 'قصف' },
    { value: 'medical', label: language === 'en' ? 'Medical' : 'طبي' },
    { value: 'displacement', label: language === 'en' ? 'Displacement' : 'نزوح' },
  ];

  const locationOptions = [
    { value: 'gaza-city', label: language === 'en' ? 'Gaza City' : 'مدينة غزة' },
    { value: 'rafah', label: language === 'en' ? 'Rafah' : 'رفح' },
    { value: 'khan-younis', label: language === 'en' ? 'Khan Younis' : 'خان يونس' },
    { value: 'jabalia', label: language === 'en' ? 'Jabalia' : 'جباليا' },
  ];

  const toggleType = (value: string) => {
    setSelectedTypes((prev) => {
      const newSelection = prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value];

      onFilterChange({
        type: newSelection.length > 0 ? newSelection : undefined,
        category: selectedCategories.length > 0 ? selectedCategories : undefined,
        location: selectedLocations.length > 0 ? selectedLocations : undefined,
      });

      return newSelection;
    });
  };

  const toggleCategory = (value: string) => {
    setSelectedCategories((prev) => {
      const newSelection = prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value];

      onFilterChange({
        type: selectedTypes.length > 0 ? selectedTypes : undefined,
        category: newSelection.length > 0 ? newSelection : undefined,
        location: selectedLocations.length > 0 ? selectedLocations : undefined,
      });

      return newSelection;
    });
  };

  const toggleLocation = (value: string) => {
    setSelectedLocations((prev) => {
      const newSelection = prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value];

      onFilterChange({
        type: selectedTypes.length > 0 ? selectedTypes : undefined,
        category: selectedCategories.length > 0 ? selectedCategories : undefined,
        location: newSelection.length > 0 ? newSelection : undefined,
      });

      return newSelection;
    });
  };

  const clearAllFilters = () => {
    setSelectedTypes([]);
    setSelectedCategories([]);
    setSelectedLocations([]);
    onFilterChange({});
  };

  return (
    <div className="bg-white dark:bg-shahid-dark p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-800 mb-6">
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex items-center mr-2">
          <Filter className="h-4 w-4 mr-2" />
          <span className="font-medium text-sm">
            {language === 'en' ? 'Filters:' : 'الفلاتر:'}
          </span>
        </div>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <span>{language === 'en' ? 'Type' : 'النوع'}</span>
              <ChevronDown className="h-3 w-3" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0" align="start">
            <Command>
              <CommandInput placeholder={language === 'en' ? 'Search types...' : 'البحث عن الأنواع...'} />
              <CommandEmpty>{language === 'en' ? 'No results found.' : 'لم يتم العثور على نتائج.'}</CommandEmpty>
              <CommandGroup>
                {typeOptions.map((option) => (
                  <CommandItem
                    key={option.value}
                    onSelect={() => toggleType(option.value)}
                    className="flex items-center justify-between"
                  >
                    <span>{option.label}</span>
                    {selectedTypes.includes(option.value) && (
                      <CheckIcon className="h-4 w-4" />
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <span>{language === 'en' ? 'Category' : 'الفئة'}</span>
              <ChevronDown className="h-3 w-3" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0" align="start">
            <Command>
              <CommandInput placeholder={language === 'en' ? 'Search categories...' : 'البحث عن الفئات...'} />
              <CommandEmpty>{language === 'en' ? 'No results found.' : 'لم يتم العثور على نتائج.'}</CommandEmpty>
              <CommandGroup>
                {categoryOptions.map((option) => (
                  <CommandItem
                    key={option.value}
                    onSelect={() => toggleCategory(option.value)}
                    className="flex items-center justify-between"
                  >
                    <span>{option.label}</span>
                    {selectedCategories.includes(option.value) && (
                      <CheckIcon className="h-4 w-4" />
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <span>{language === 'en' ? 'Location' : 'الموقع'}</span>
              <ChevronDown className="h-3 w-3" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0" align="start">
            <Command>
              <CommandInput placeholder={language === 'en' ? 'Search locations...' : 'البحث عن المواقع...'} />
              <CommandEmpty>{language === 'en' ? 'No results found.' : 'لم يتم العثور على نتائج.'}</CommandEmpty>
              <CommandGroup>
                {locationOptions.map((option) => (
                  <CommandItem
                    key={option.value}
                    onSelect={() => toggleLocation(option.value)}
                    className="flex items-center justify-between"
                  >
                    <span>{option.label}</span>
                    {selectedLocations.includes(option.value) && (
                      <CheckIcon className="h-4 w-4" />
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>

        {(selectedTypes.length > 0 || selectedCategories.length > 0 || selectedLocations.length > 0) && (
          <Button variant="ghost" size="sm" onClick={clearAllFilters}>
            {language === 'en' ? 'Clear all' : 'مسح الكل'}
          </Button>
        )}
      </div>

      {/* Active filters */}
      {(selectedTypes.length > 0 || selectedCategories.length > 0 || selectedLocations.length > 0) && (
        <div className="flex flex-wrap gap-2 mt-4">
          {selectedTypes.map((type) => (
            <Badge key={type} variant="outline" className="flex items-center gap-1">
              {typeOptions.find((opt) => opt.value === type)?.label}
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 ml-1 p-0"
                onClick={() => toggleType(type)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
          {selectedCategories.map((category) => (
            <Badge key={category} variant="outline" className="flex items-center gap-1">
              {categoryOptions.find((opt) => opt.value === category)?.label}
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 ml-1 p-0"
                onClick={() => toggleCategory(category)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
          {selectedLocations.map((location) => (
            <Badge key={location} variant="outline" className="flex items-center gap-1">
              {locationOptions.find((opt) => opt.value === location)?.label}
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 ml-1 p-0"
                onClick={() => toggleLocation(location)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};

import { X } from "lucide-react";
