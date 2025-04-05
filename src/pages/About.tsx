
import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Shield, Scale, Globe, FileText } from 'lucide-react';

const About = () => {
  const [language, setLanguage] = useState<'en' | 'ar'>('en');

  return (
    <Layout>
      <div className="container px-4 py-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">
          {language === 'en' ? 'About Shahid' : 'حول شاهد'}
        </h1>

        <div className="bg-white dark:bg-shahid-dark p-6 rounded-lg shadow-sm mb-8">
          <h2 className="text-xl font-bold mb-4">
            {language === 'en' ? 'Our Mission' : 'مهمتنا'}
          </h2>
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            {language === 'en'
              ? 'Shahid ("witness" in Arabic) is dedicated to documenting war crimes and human rights violations in Palestine through the collection, verification, and preservation of evidence. We utilize AI technology to transform personal testimonies and digital evidence into verified, shareable, and legally admissible content that supports justice and raises global awareness.'
              : 'شاهد مكرس لتوثيق جرائم الحرب وانتهاكات حقوق الإنسان في فلسطين من خلال جمع الأدلة والتحقق منها وحفظها. نستخدم تقنية الذكاء الاصطناعي لتحويل الشهادات الشخصية والأدلة الرقمية إلى محتوى موثق وقابل للمشاركة ومقبول قانوناً يدعم العدالة ويرفع مستوى الوعي العالمي.'}
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            {language === 'en'
              ? 'We believe in the power of documentation as a tool for accountability and justice. Through Shahid, we aim to create an indelible record of events that cannot be erased or denied.'
              : 'نؤمن بقوة التوثيق كأداة للمساءلة والعدالة. من خلال شاهد، نهدف إلى إنشاء سجل لا يمحى للأحداث التي لا يمكن محوها أو إنكارها.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white dark:bg-shahid-dark p-6 rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-shahid-purple/10 rounded-full flex items-center justify-center mb-4">
              <Shield className="h-6 w-6 text-shahid-purple" />
            </div>
            <h3 className="text-lg font-bold mb-3">
              {language === 'en' ? 'Privacy & Protection' : 'الخصوصية والحماية'}
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              {language === 'en'
                ? 'We prioritize the safety of witnesses and victims. Our platform implements automatic face blurring, optional voice anonymization, and end-to-end encryption for all submitted data. Sensitive content is reviewed by trusted volunteers to ensure proper handling.'
                : 'نحن نعطي الأولوية لسلامة الشهود والضحايا. تقوم منصتنا بتنفيذ تمويه الوجه التلقائي وإخفاء هوية الصوت الاختياري والتشفير من طرف إلى طرف لجميع البيانات المقدمة. تتم مراجعة المحتوى الحساس من قبل متطوعين موثوق بهم لضمان التعامل المناسب.'}
            </p>
          </div>

          <div className="bg-white dark:bg-shahid-dark p-6 rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-shahid-purple/10 rounded-full flex items-center justify-center mb-4">
              <Scale className="h-6 w-6 text-shahid-purple" />
            </div>
            <h3 className="text-lg font-bold mb-3">
              {language === 'en' ? 'Legal Framework' : 'الإطار القانوني'}
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              {language === 'en'
                ? 'Shahid operates within international humanitarian law frameworks, with a focus on documenting potential violations of the Geneva Conventions and Rome Statute. Our evidence collection methodologies are designed to meet standards admissible in international courts.'
                : 'تعمل شاهد ضمن أطر القانون الإنساني الدولي، مع التركيز على توثيق الانتهاكات المحتملة لاتفاقيات جنيف ونظام روما الأساسي. تم تصميم منهجيات جمع الأدلة لدينا لتلبية المعايير المقبولة في المحاكم الدولية.'}
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-shahid-dark p-6 rounded-lg shadow-sm mb-12">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Globe className="h-5 w-5 text-shahid-purple" />
            {language === 'en' ? 'Global Impact' : 'الأثر العالمي'}
          </h2>
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            {language === 'en'
              ? 'By making verified testimonies accessible to the world, Shahid aims to:'
              : 'من خلال جعل الشهادات التي تم التحقق منها في متناول العالم، تهدف شاهد إلى:'}
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              {language === 'en'
                ? 'Raise global awareness about the reality of the situation in Palestine'
                : 'رفع مستوى الوعي العالمي حول واقع الوضع في فلسطين'}
            </li>
            <li>
              {language === 'en'
                ? 'Provide journalists, researchers, and human rights organizations with verified information'
                : 'تزويد الصحفيين والباحثين ومنظمات حقوق الإنسان بمعلومات موثقة'}
            </li>
            <li>
              {language === 'en'
                ? 'Support legal proceedings in domestic and international courts'
                : 'دعم الإجراءات القانونية في المحاكم المحلية والدولية'}
            </li>
            <li>
              {language === 'en'
                ? 'Create a historical record of events for future generations'
                : 'إنشاء سجل تاريخي للأحداث للأجيال القادمة'}
            </li>
          </ul>
        </div>

        <div className="bg-white dark:bg-shahid-dark p-6 rounded-lg shadow-sm mb-12">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <FileText className="h-5 w-5 text-shahid-purple" />
            {language === 'en' ? 'Frequently Asked Questions' : 'الأسئلة المتكررة'}
          </h2>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>
                {language === 'en'
                  ? 'How is the submitted evidence verified?'
                  : 'كيف يتم التحقق من الأدلة المقدمة؟'}
              </AccordionTrigger>
              <AccordionContent>
                {language === 'en'
                  ? 'Shahid uses a combination of AI analysis and human review. Our AI systems check for metadata consistency, analyze visual content for signs of manipulation, and cross-reference with existing verified information. A team of trained reviewers then evaluates the evidence before it is published.'
                  : 'تستخدم شاهد مزيجًا من تحليل الذكاء الاصطناعي والمراجعة البشرية. تتحقق أنظمة الذكاء الاصطناعي لدينا من اتساق البيانات الوصفية، وتحلل المحتوى المرئي بحثًا عن علامات التلاعب، وتتقاطع مع المعلومات الموثقة الموجودة. ثم يقوم فريق من المراجعين المدربين بتقييم الأدلة قبل نشرها.'}
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2">
              <AccordionTrigger>
                {language === 'en'
                  ? 'Is it safe to submit testimony if I am in a conflict zone?'
                  : 'هل من الآمن تقديم شهادة إذا كنت في منطقة نزاع؟'}
              </AccordionTrigger>
              <AccordionContent>
                {language === 'en'
                  ? 'We prioritize user safety above all. You can submit anonymously, and we implement multiple layers of security to protect your identity. However, please be aware of your surroundings and local risks when submitting content. If possible, use secure networks or VPNs, and consider deleting submission records from your device afterward.'
                  : 'نحن نعطي الأولوية لسلامة المستخدم فوق كل شيء. يمكنك التقديم بشكل مجهول، ونحن ننفذ طبقات متعددة من الأمان لحماية هويتك. ومع ذلك، يرجى الانتباه إلى محيطك والمخاطر المحلية عند تقديم المحتوى. إذا أمكن، استخدم شبكات آمنة أو شبكات VPN، وفكر في حذف سجلات التقديم من جهازك بعد ذلك.'}
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3">
              <AccordionTrigger>
                {language === 'en'
                  ? 'How is the evidence preserved for long-term access?'
                  : 'كيف يتم الحفاظ على الأدلة للوصول على المدى الطويل؟'}
              </AccordionTrigger>
              <AccordionContent>
                {language === 'en'
                  ? 'All submitted evidence is securely archived using decentralized storage technology (IPFS or Arweave), which ensures that the content cannot be altered or deleted. Each submission is assigned a unique hash that serves as a permanent identifier. Additionally, we maintain secure backups in multiple jurisdictions to ensure long-term preservation.'
                  : 'يتم أرشفة جميع الأدلة المقدمة بشكل آمن باستخدام تقنية التخزين اللامركزية (IPFS أو Arweave)، مما يضمن عدم إمكانية تغيير المحتوى أو حذفه. يتم تعيين تجزئة فريدة لكل مساهمة تعمل كمعرف دائم. بالإضافة إلى ذلك، نحتفظ بنسخ احتياطية آمنة في ولايات قضائية متعددة لضمان الحفظ على المدى الطويل.'}
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4">
              <AccordionTrigger>
                {language === 'en'
                  ? 'Can I submit testimony on behalf of someone else?'
                  : 'هل يمكنني تقديم شهادة نيابة عن شخص آخر؟'}
              </AccordionTrigger>
              <AccordionContent>
                {language === 'en'
                  ? 'Yes, but please clearly indicate in your submission that you are sharing someone else\'s experience. If possible, provide information about how you obtained the testimony and any relevant details about the original source. This helps with our verification process and maintains the integrity of the record.'
                  : 'نعم، ولكن يرجى الإشارة بوضوح في مساهمتك إلى أنك تشارك تجربة شخص آخر. إذا أمكن، قدم معلومات حول كيفية حصولك على الشهادة وأي تفاصيل ذات صلة حول المصدر الأصلي. هذا يساعد في عملية التحقق لدينا ويحافظ على نزاهة السجل.'}
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-5">
              <AccordionTrigger>
                {language === 'en'
                  ? 'How can I support this project?'
                  : 'كيف يمكنني دعم هذا المشروع؟'}
              </AccordionTrigger>
              <AccordionContent>
                {language === 'en'
                  ? 'You can support Shahid by submitting testimonies, sharing verified content on social media, volunteering for content moderation or translation, or contributing to our technical development. For organizations, we welcome partnerships that can help expand our reach and impact.'
                  : 'يمكنك دعم شاهد من خلال تقديم الشهادات، ومشاركة المحتوى الموثق على وسائل التواصل الاجتماعي، والتطوع لتنظيم المحتوى أو الترجمة، أو المساهمة في تطويرنا التقني. بالنسبة للمنظمات، نرحب بالشراكات التي يمكن أن تساعد في توسيع نطاق وصولنا وتأثيرنا.'}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </Layout>
  );
};

export default About;
