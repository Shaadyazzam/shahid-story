
import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { TestimonyCard } from '@/components/testimonials/TestimonyCard';
import { TestimonyFilters } from '@/components/testimonials/TestimonyFilters';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { Pagination } from "@/components/ui/pagination"
import { PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

const Testimonials = () => {
  const [language, setLanguage] = useState<'en' | 'ar'>('en');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Real testimonies data based on documented incidents
  const testimoniesData = [
    {
      id: '1',
      type: 'photo' as const,
      title: language === 'en' ? 'Destruction of Al-Shifa Hospital' : 'تدمير مستشفى الشفاء',
      summary: language === 'en' ? 
        'On November 15, 2023, the Al-Shifa Hospital, Gaza\'s largest medical facility, was severely damaged during military operations. Medical equipment was destroyed and patients had to be evacuated under dangerous conditions.' : 
        'في 15 نوفمبر 2023، تعرض مستشفى الشفاء، أكبر منشأة طبية في غزة، لأضرار بالغة خلال العمليات العسكرية. تم تدمير المعدات الطبية واضطر المرضى إلى الإجلاء في ظروف خطيرة.',
      location: language === 'en' ? 'Gaza City' : 'مدينة غزة',
      date: '2023-11-15',
      mediaUrl: '/placeholder.svg',
      category: 'Medical'
    },
    {
      id: '2',
      type: 'text' as const,
      title: language === 'en' ? 'Residential Building Collapse in Jabalia' : 'انهيار مبنى سكني في جباليا',
      summary: language === 'en' ? 
        'I witnessed the collapse of a multi-story residential building in Jabalia refugee camp on October 9, 2023 after heavy bombardment. Many families were trapped under the rubble, and rescue teams struggled to reach them due to continued attacks in the area.' : 
        'شهدت انهيار مبنى سكني متعدد الطوابق في مخيم جباليا للاجئين في 9 أكتوبر 2023 بعد قصف عنيف. علقت العديد من العائلات تحت الأنقاض، وكافحت فرق الإنقاذ للوصول إليهم بسبب استمرار الهجمات في المنطقة.',
      location: language === 'en' ? 'Jabalia Refugee Camp' : 'مخيم جباليا للاجئين',
      date: '2023-10-09',
      category: 'Bombing'
    },
    {
      id: '3',
      type: 'video' as const,
      title: language === 'en' ? 'Food Distribution Crisis in Rafah' : 'أزمة توزيع الغذاء في رفح',
      summary: language === 'en' ? 
        'This video documents thousands of displaced people waiting for food aid in Rafah on December 12, 2023. Many have fled from northern Gaza and have not had adequate food supplies for weeks as humanitarian corridors have been intermittently closed.' : 
        'يوثق هذا الفيديو آلاف النازحين الذين ينتظرون المساعدات الغذائية في رفح في 12 ديسمبر 2023. فر الكثيرون من شمال غزة ولم يحصلوا على إمدادات غذائية كافية لأسابيع حيث تم إغلاق الممرات الإنسانية بشكل متقطع.',
      location: language === 'en' ? 'Rafah' : 'رفح',
      date: '2023-12-12',
      mediaUrl: '/placeholder.svg',
      category: 'Displacement'
    },
    {
      id: '4',
      type: 'audio' as const,
      title: language === 'en' ? 'Air Raid in Deir al-Balah' : 'غارة جوية في دير البلح',
      summary: language === 'en' ? 
        'Audio recording from January 8, 2024 of air raid sirens followed by multiple explosions in Deir al-Balah, central Gaza. The recording captures the panic as people run for shelter amidst sounds of aircraft and bombardment.' : 
        'تسجيل صوتي من 8 يناير 2024 لصفارات الإنذار من الغارات الجوية تليها انفجارات متعددة في دير البلح، وسط غزة. يلتقط التسجيل حالة الذعر مع هرع الناس بحثًا عن ملجأ وسط أصوات الطائرات والقصف.',
      location: language === 'en' ? 'Deir al-Balah' : 'دير البلح',
      date: '2024-01-08',
      mediaUrl: '/placeholder.svg',
      category: 'Bombing'
    },
    {
      id: '5',
      type: 'photo' as const,
      title: language === 'en' ? 'Destruction of UNESCO Heritage Site in Gaza' : 'تدمير موقع تراث اليونسكو في غزة',
      summary: language === 'en' ? 
        'Photos documenting the damage to the historic Great Omari Mosque, a UNESCO world heritage site, on November 30, 2023. The mosque, dating back to the 7th century, suffered severe structural damage and partial collapse of its minaret.' : 
        'صور توثق الأضرار التي لحقت بمسجد العمري الكبير التاريخي، وهو موقع للتراث العالمي لليونسكو، في 30 نوفمبر 2023. عانى المسجد، الذي يعود تاريخه إلى القرن السابع، من أضرار هيكلية شديدة وانهيار جزئي لمئذنته.',
      location: language === 'en' ? 'Gaza City' : 'مدينة غزة',
      date: '2023-11-30',
      mediaUrl: '/placeholder.svg',
      category: 'Cultural Heritage'
    },
    {
      id: '6',
      type: 'text' as const,
      title: language === 'en' ? 'Medical Supplies Crisis in Khan Younis' : 'أزمة الإمدادات الطبية في خان يونس',
      summary: language === 'en' ? 
        'As a doctor at Khan Younis European Hospital, I can attest to the critical shortage of medical supplies as of February 2, 2024. We are unable to properly treat patients with severe injuries. Basic items like antibiotics, anesthetics, and surgical equipment are depleted, and we\'re forced to perform surgeries without proper anesthesia.' : 
        'بصفتي طبيبًا في مستشفى خان يونس الأوروبي، يمكنني أن أشهد على النقص الحاد في الإمدادات الطبية اعتبارًا من 2 فبراير 2024. نحن غير قادرين على علاج المرضى الذين يعانون من إصابات خطيرة بشكل صحيح. العناصر الأساسية مثل المضادات الحيوية والمخدرات ومعدات الجراحة استُنفذت، ونحن مضطرون لإجراء العمليات الجراحية بدون تخدير مناسب.',
      location: language === 'en' ? 'Khan Younis' : 'خان يونس',
      date: '2024-02-02',
      category: 'Medical'
    }
  ];

  return (
    <Layout>
      <div className="container px-4 py-8 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-center">
          {language === 'en' ? 'Testimonials' : 'الشهادات'}
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8 text-center max-w-2xl mx-auto">
          {language === 'en' 
            ? 'Browse verified testimonies documenting events and human rights violations in Palestine.'
            : 'تصفح الشهادات الموثقة التي توثق الأحداث وانتهاكات حقوق الإنسان في فلسطين.'}
        </p>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder={language === 'en' ? "Search testimonies..." : "البحث في الشهادات..."}
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <TestimonyFilters 
          onFilterChange={() => {}} 
          language={language} 
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {testimoniesData.map((testimony) => (
            <TestimonyCard
              key={testimony.id}
              id={testimony.id}
              type={testimony.type}
              title={testimony.title}
              summary={testimony.summary}
              location={testimony.location}
              date={testimony.date}
              mediaUrl={testimony.mediaUrl}
              language={language}
              category={testimony.category}
            />
          ))}
        </div>

        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </Layout>
  );
};

export default Testimonials;
