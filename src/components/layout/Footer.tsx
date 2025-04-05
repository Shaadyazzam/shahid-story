
import { Link } from 'react-router-dom';
import { Shield, Heart } from "lucide-react";

interface FooterProps {
  language: 'en' | 'ar';
}

export const Footer = ({ language }: FooterProps) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-shahid-dark text-white mt-20">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-xl font-bold text-palestine-green">Shahid</span>
              <span className="text-xs">شهيد</span>
            </div>
            <p className="text-sm text-gray-300 mb-4">
              {language === 'en' 
                ? 'Documenting war crimes and human rights violations through AI-powered testimonials and evidence collection.'
                : 'توثيق جرائم الحرب وانتهاكات حقوق الإنسان من خلال الشهادات وجمع الأدلة المدعومة بالذكاء الاصطناعي.'}
            </p>
            <div className="flex items-center space-x-2">
              <Shield className="h-4 w-4 text-palestine-green" />
              <span className="text-xs text-gray-300">
                {language === 'en' 
                  ? 'Secure, Private, Anonymous'
                  : 'آمن، خاص، مجهول'}
              </span>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold mb-4">
              {language === 'en' ? 'LINKS' : 'روابط'}
            </h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link to="/" className="hover:text-palestine-green transition-colors">
                  {language === 'en' ? 'Home' : 'الرئيسية'}
                </Link>
              </li>
              <li>
                <Link to="/submit" className="hover:text-palestine-green transition-colors">
                  {language === 'en' ? 'Submit Testimony' : 'تقديم شهادة'}
                </Link>
              </li>
              <li>
                <Link to="/testimonials" className="hover:text-palestine-green transition-colors">
                  {language === 'en' ? 'Testimonials' : 'الشهادات'}
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-palestine-green transition-colors">
                  {language === 'en' ? 'About' : 'حول'}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold mb-4">
              {language === 'en' ? 'LEGAL & PRIVACY' : 'القانونية والخصوصية'}
            </h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link to="/privacy" className="hover:text-palestine-green transition-colors">
                  {language === 'en' ? 'Privacy Policy' : 'سياسة الخصوصية'}
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-palestine-green transition-colors">
                  {language === 'en' ? 'Terms of Service' : 'شروط الخدمة'}
                </Link>
              </li>
              <li>
                <Link to="/security" className="hover:text-palestine-green transition-colors">
                  {language === 'en' ? 'Security Measures' : 'إجراءات الأمان'}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-gray-400">
            {language === 'en' 
              ? `© ${currentYear} Shahid. All rights reserved.`
              : `© ${currentYear} شهيد. جميع الحقوق محفوظة.`}
          </p>
          <div className="flex items-center space-x-1 mt-4 md:mt-0">
            <span className="text-xs text-gray-400">
              {language === 'en' 
                ? 'Created with'
                : 'تم الإنشاء بواسطة'}
            </span>
            <Heart className="h-3 w-3 text-palestine-red mx-1" />
            <span className="text-xs text-gray-400">
              {language === 'en' 
                ? 'for humanity'
                : 'للإنسانية'}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
