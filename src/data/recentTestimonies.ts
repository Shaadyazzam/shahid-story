
export type TestimonyType = 'text' | 'photo' | 'video' | 'audio';

export interface Testimony {
  id: string;
  type: TestimonyType;
  title: string;
  summary: string;
  location: string;
  date: string;
  mediaUrl?: string;
  category: string;
}

export const getRecentTestimonies = (language: 'en' | 'ar'): Testimony[] => {
  return [
    {
      id: '1',
      type: 'photo',
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
      type: 'text',
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
      type: 'video',
      title: language === 'en' ? 'Food Distribution Crisis in Rafah' : 'أزمة توزيع الغذاء في رفح',
      summary: language === 'en' ? 
        'This video documents thousands of displaced people waiting for food aid in Rafah on December 12, 2023. Many have fled from northern Gaza and have not had adequate food supplies for weeks as humanitarian corridors have been intermittently closed.' : 
        'يوثق هذا الفيديو آلاف النازحين الذين ينتظرون المساعدات الغذائية في رفح في 12 ديسمبر 2023. فر الكثيرون من شمال غزة ولم يحصلوا على إمدادات غذائية كافية لأسابيع حيث تم إغلاق الممرات الإنسانية بشكل متقطع.',
      location: language === 'en' ? 'Rafah' : 'رفح',
      date: '2023-12-12',
      mediaUrl: '/placeholder.svg',
      category: 'Displacement'
    }
  ];
};
