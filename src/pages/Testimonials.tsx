
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
  
  // Mock testimonies data
  const testimoniesData = [
    {
      id: '1',
      type: 'photo' as const,
      title: language === 'en' ? 'Hospital Damage in Gaza City' : 'أضرار المستشفى في مدينة غزة',
      summary: language === 'en' ? 
        'On March 10, 2023, the Al-Shifa Hospital in Gaza City was severely damaged by an airstrike. Medical equipment was destroyed and patients had to be evacuated under dangerous conditions.' : 
        'في 10 مارس 2023، تضرر مستشفى الشفاء في مدينة غزة بشدة من غارة جوية. تم تدمير المعدات الطبية وكان لا بد من إجلاء المرضى في ظروف خطيرة.',
      location: language === 'en' ? 'Gaza City' : 'مدينة غزة',
      date: '2023-03-10',
      mediaUrl: '/placeholder.svg',
      category: 'Medical'
    },
    {
      id: '2',
      type: 'text' as const,
      title: language === 'en' ? 'Residential Building Collapse in Khan Younis' : 'انهيار مبنى سكني في خان يونس',
      summary: language === 'en' ? 
        'I witnessed the collapse of a six-story residential building in Khan Younis after heavy shelling. Many families were trapped under the rubble, and rescue teams struggled to reach them due to continued attacks in the area.' : 
        'شهدت انهيار مبنى سكني من ستة طوابق في خان يونس بعد قصف عنيف. علقت العديد من العائلات تحت الأنقاض، وكافحت فرق الإنقاذ للوصول إليهم بسبب استمرار الهجمات في المنطقة.',
      location: language === 'en' ? 'Khan Younis' : 'خان يونس',
      date: '2023-03-15',
      category: 'Bombing'
    },
    {
      id: '3',
      type: 'video' as const,
      title: language === 'en' ? 'Food Shortage in Rafah' : 'نقص الغذاء في رفح',
      summary: language === 'en' ? 
        'This video shows hundreds of people waiting in line for food distribution in Rafah. Many have been displaced from their homes and have not had adequate food supplies for weeks.' : 
        'يظهر هذا الفيديو مئات الأشخاص ينتظرون في طابور لتوزيع الطعام في رفح. لقد نزح الكثيرون من منازلهم ولم يحصلوا على إمدادات غذائية كافية لأسابيع.',
      location: language === 'en' ? 'Rafah' : 'رفح',
      date: '2023-03-20',
      mediaUrl: '/placeholder.svg',
      category: 'Displacement'
    },
    {
      id: '4',
      type: 'audio' as const,
      title: language === 'en' ? 'Air Raid Sirens in Jabalia' : 'صفارات الإنذار في جباليا',
      summary: language === 'en' ? 
        'Audio recording of air raid sirens followed by explosions in Jabalia refugee camp. The recording captures the panic and chaos as people seek shelter.' : 
        'تسجيل صوتي لصفارات الإنذار من الغارات الجوية تليها انفجارات في مخيم جباليا للاجئين. يلتقط التسجيل الذعر والفوضى مع سعي الناس للحصول على مأوى.',
      location: language === 'en' ? 'Jabalia' : 'جباليا',
      date: '2023-03-25',
      mediaUrl: '/placeholder.svg',
      category: 'Bombing'
    },
    {
      id: '5',
      type: 'photo' as const,
      title: language === 'en' ? 'Destroyed School in Gaza City' : 'مدرسة مدمرة في مدينة غزة',
      summary: language === 'en' ? 
        'This school was hit by airstrikes on March 30, 2023. It was being used as a shelter for displaced families at the time of the attack. The classrooms and facilities were completely destroyed.' : 
        'تعرضت هذه المدرسة لضربات جوية في 30 مارس 2023. كانت تُستخدم كملجأ للعائلات النازحة وقت الهجوم. تم تدمير الفصول الدراسية والمرافق بالكامل.',
      location: language === 'en' ? 'Gaza City' : 'مدينة غزة',
      date: '2023-03-30',
      mediaUrl: '/placeholder.svg',
      category: 'Bombing'
    },
    {
      id: '6',
      type: 'text' as const,
      title: language === 'en' ? 'Medical Supplies Shortage in Khan Younis' : 'نقص الإمدادات الطبية في خان يونس',
      summary: language === 'en' ? 
        'As a doctor at Khan Younis Central Hospital, I can attest to the critical shortage of medical supplies. We are unable to properly treat patients with severe injuries. Basic items like antibiotics, anesthetics, and surgical equipment are depleted.' : 
        'بصفتي طبيبًا في مستشفى خان يونس المركزي، يمكنني أن أشهد على النقص الحاد في الإمدادات الطبية. نحن غير قادرين على علاج المرضى الذين يعانون من إصابات خطيرة بشكل صحيح. العناصر الأساسية مثل المضادات الحيوية والمخدرات ومعدات الجراحة استُنفذت.',
      location: language === 'en' ? 'Khan Younis' : 'خان يونس',
      date: '2023-04-05',
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
