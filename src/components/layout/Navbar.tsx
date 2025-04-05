
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X, Globe } from "lucide-react";

interface NavbarProps {
  language: 'en' | 'ar';
  setLanguage: (language: 'en' | 'ar') => void;
}

export const Navbar = ({ language, setLanguage }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-white dark:bg-shahid-dark shadow-sm z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          {/* Updated Palestinian Flag Icon */}
          <div className="hidden sm:block relative navbar-flag mr-2">
            <div className="navbar-flag-black"></div>
            <div className="navbar-flag-white"></div>
            <div className="navbar-flag-green"></div>
            <div className="navbar-triangle"></div>
          </div>
          <span className="text-2xl font-bold text-palestine-green">Shahid</span>
          <span className="text-xs text-palestine-red">شهيد</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-sm font-medium text-gray-700 hover:text-palestine-green dark:text-gray-200 dark:hover:text-palestine-green">
            {language === 'en' ? 'Home' : 'الرئيسية'}
          </Link>
          <Link to="/submit" className="text-sm font-medium text-gray-700 hover:text-palestine-green dark:text-gray-200 dark:hover:text-palestine-green">
            {language === 'en' ? 'Submit Testimony' : 'تقديم شهادة'}
          </Link>
          <Link to="/testimonials" className="text-sm font-medium text-gray-700 hover:text-palestine-green dark:text-gray-200 dark:hover:text-palestine-green">
            {language === 'en' ? 'Testimonials' : 'الشهادات'}
          </Link>
          <Link to="/about" className="text-sm font-medium text-gray-700 hover:text-palestine-green dark:text-gray-200 dark:hover:text-palestine-green">
            {language === 'en' ? 'About' : 'حول'}
          </Link>
          <Button 
            variant="outline" 
            size="sm" 
            className="ml-4 flex items-center gap-2 text-gray-700 hover:text-palestine-green"
            onClick={toggleLanguage}
          >
            <Globe className="h-4 w-4" />
            {language === 'en' ? 'العربية' : 'English'}
          </Button>
          <Button 
            variant="default" 
            size="sm"
            className="bg-palestine-green hover:bg-palestine-green/90"
            asChild
          >
            <Link to="/submit">
              {language === 'en' ? 'Submit Evidence' : 'قدم الدليل'}
            </Link>
          </Button>
        </nav>

        {/* Mobile Navigation Toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-shahid-dark border-t border-gray-100 dark:border-gray-800 animate-fade-in">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-3">
            <Link 
              to="/"
              className="text-sm font-medium text-gray-700 hover:text-palestine-green dark:text-gray-200 dark:hover:text-palestine-green py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              {language === 'en' ? 'Home' : 'الرئيسية'}
            </Link>
            <Link 
              to="/submit"
              className="text-sm font-medium text-gray-700 hover:text-palestine-green dark:text-gray-200 dark:hover:text-palestine-green py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              {language === 'en' ? 'Submit Testimony' : 'تقديم شهادة'}
            </Link>
            <Link 
              to="/testimonials"
              className="text-sm font-medium text-gray-700 hover:text-palestine-green dark:text-gray-200 dark:hover:text-palestine-green py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              {language === 'en' ? 'Testimonials' : 'الشهادات'}
            </Link>
            <Link 
              to="/about"
              className="text-sm font-medium text-gray-700 hover:text-palestine-green dark:text-gray-200 dark:hover:text-palestine-green py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              {language === 'en' ? 'About' : 'حول'}
            </Link>
            <div className="flex items-center justify-between pt-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-2 text-gray-700 hover:text-palestine-green"
                onClick={toggleLanguage}
              >
                <Globe className="h-4 w-4" />
                {language === 'en' ? 'العربية' : 'English'}
              </Button>
              <Button 
                variant="default" 
                size="sm"
                className="bg-palestine-green hover:bg-palestine-green/90"
                asChild
              >
                <Link to="/submit" onClick={() => setIsMenuOpen(false)}>
                  {language === 'en' ? 'Submit Evidence' : 'قدم الدليل'}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
