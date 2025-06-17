import React from 'react';
import { Eye, Globe, Sparkles } from 'lucide-react';
import type { Language } from '../types';
import { getTranslation } from '../utils/translations';

interface HeaderProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
}

const Header: React.FC<HeaderProps> = ({ currentLanguage, onLanguageChange }) => {
  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'en', label: 'EN', flag: '🇺🇸' },
    { code: 'es', label: 'ES', flag: '🇪🇸' },
    { code: 'fi', label: 'FI', flag: '🇫🇮' },
  ];

  return (
    <header className="bg-white/80 backdrop-blur-xl border-b border-white/20 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-3 sm:py-0 sm:h-20 gap-3 sm:gap-0">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-2 sm:p-3 rounded-xl sm:rounded-2xl shadow-lg transform hover:scale-110 transition-transform duration-300">
              <Eye className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
            </div>
            <div>
              <h1 className="text-lg sm:text-2xl font-black bg-gradient-to-r from-blue-700 via-purple-700 to-pink-700 bg-clip-text text-transparent">
                {getTranslation(currentLanguage, 'title')}
              </h1>
              <p className="text-xs sm:text-sm text-gray-600 font-medium hidden sm:block flex items-center">
                <Sparkles className="h-4 w-4 mr-1 text-purple-500" />
                {getTranslation(currentLanguage, 'subtitle')}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center sm:justify-end">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <Globe className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
              <div className="flex bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg sm:rounded-xl p-1 sm:p-1.5 shadow-inner">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => onLanguageChange(lang.code)}
                    className={`px-2 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-bold rounded-md sm:rounded-lg transition-all duration-300 transform hover:scale-105 ${
                      currentLanguage === lang.code
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                        : 'text-gray-700 hover:text-gray-900 hover:bg-white/50'
                    }`}
                  >
                    <span className="flex items-center space-x-1">
                      <span className="text-sm sm:text-base">{lang.flag}</span>
                      <span>{lang.label}</span>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;