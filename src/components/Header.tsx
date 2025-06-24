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
      <div className="max-w-7xl mx-auto px-3 py-2 md:px-6 md:py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          {/* Logo y título */}
          <div className="flex flex-col items-center md:flex-row md:items-center md:space-x-4 w-full md:w-auto">
            <div className="flex items-center space-x-2 md:space-x-4 justify-center w-full md:w-auto">
              <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-1.5 md:p-3 rounded-lg md:rounded-2xl shadow-lg transform hover:scale-110 transition-transform duration-300">
                <Eye className="h-4 w-4 md:h-8 md:w-8 text-white" />
              </div>
              <div className="flex items-center space-x-1.5 md:space-x-2">
                <Sparkles className="h-3.5 w-3.5 md:h-5 md:w-5 text-purple-500" />
                <h1 className="font-poppins text-sm md:text-2xl font-bold bg-gradient-to-r from-blue-700 via-purple-700 to-pink-700 bg-clip-text text-transparent text-center md:text-left">
                  {getTranslation(currentLanguage, 'title')}
                </h1>
              </div>
            </div>
            {/* Subtítulo oculto en mobile */}
            <p className="hidden md:block text-sm md:text-lg text-gray-600 font-semibold leading-normal mt-1 md:mt-0 md:ml-2">
              {getTranslation(currentLanguage, 'subtitle')}
            </p>
          </div>

          {/* Selector de idioma */}
          <div className="flex items-center justify-center md:justify-end mt-2 md:mt-0">
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