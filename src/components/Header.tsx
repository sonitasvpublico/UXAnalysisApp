import React, { useState } from 'react';
import { Eye, Globe, Sparkles, Menu, X, Info, FileText } from 'lucide-react';
import type { Language } from '../types';
import { getTranslation } from '../utils/translations';
import AboutModal from './AboutModal';

interface HeaderProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
}

const Header: React.FC<HeaderProps> = ({ currentLanguage, onLanguageChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'en', label: 'EN', flag: '🇺🇸' },
    { code: 'es', label: 'ES', flag: '🇪🇸' },
    { code: 'fi', label: 'FI', flag: '🇫🇮' },
  ];

  return (
    <>
      <header className="px-4 sm:px-6 lg:px-8 pb-4 bg-white/80 backdrop-blur-xl sticky top-0 z-30 shadow-md pt-iphone">
        <div className="container mx-auto flex items-center justify-between">
          {/* Logo and Title */}
           <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg">
                <Eye className="h-6 w-6 text-white" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center space-x-1.5">
                <Sparkles className="h-4 w-4 text-purple-500" />
                <h1 className="font-poppins text-xl font-bold bg-gradient-to-r from-blue-700 via-purple-700 to-pink-700 bg-clip-text text-transparent">
                {getTranslation(currentLanguage, 'title')}
              </h1>
              </div>
              <p className="hidden md:block text-sm text-gray-500 font-extralight -mt-1 font-poppins">
                {getTranslation(currentLanguage, 'subtitle')}
              </p>
              {/* Development Banner */}
              <div className="mt-1 px-2 py-1 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-md">
                <p className="text-xs text-blue-600 font-medium font-poppins flex items-center">
                  {/* Icono solo visible en desktop */}
                  <Sparkles className="h-3 w-3 mr-1 hidden md:block" />
                  {/* Texto completo en ambos dispositivos */}
                  {currentLanguage === 'en' && (
                    <>
                      <span className="hidden md:inline">⚡ </span>
                      Development Phase - Advanced AI Analysis Coming Soon
                    </>
                  )}
                  {currentLanguage === 'es' && (
                    <>
                      <span className="hidden md:inline">⚡ </span>
                      Fase de Desarrollo - Análisis IA Avanzado Próximamente
                    </>
                  )}
                  {currentLanguage === 'fi' && (
                    <>
                      <span className="hidden md:inline">⚡ </span>
                      Kehitysvaihe - Edistynyt tekoälyanalyysi tulossa pian
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>


          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-1 bg-gray-200 rounded-full p-1">
              {languages.map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => onLanguageChange(lang.code)}
                  className={`px-4 py-1.5 text-base font-bold rounded-full transition-all duration-300 flex items-center space-x-2 ${
                    currentLanguage === lang.code
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow'
                      : 'text-gray-600 hover:bg-gray-300'
                  }`}
                >
                  <span>{lang.flag}</span>
                  <span>{lang.label}</span>
                </button>
              ))}
            </div>
            <button
              onClick={() => setIsAboutModalOpen(true)}
              className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors"
            >
              <Info className="h-5 w-5" />
              <span className="font-semibold text-base font-poppins">{getTranslation(currentLanguage, 'about')}</span>
            </button>
            <a href="https://sonitasv.com/" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors">
              <FileText className="h-5 w-5" />
              <span className="font-semibold text-base font-poppins">{
                getTranslation(currentLanguage, 'aboutModal.footer.creator')
              }</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="text-gray-700 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {isMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 bg-white rounded-lg shadow-xl p-4 space-y-4 animate-fade-in-down">
            <div className="flex flex-col space-y-3">
               <h3 className="font-bold text-gray-500 text-sm px-3">Language</h3>
                <div className="flex items-center justify-around bg-gray-100 rounded-full p-1">
                    {languages.map(lang => (
                        <button
                        key={lang.code}
                        onClick={() => { onLanguageChange(lang.code); setIsMenuOpen(false); }}
                        className={`w-full px-3 py-1.5 text-sm font-bold rounded-full transition-all duration-300 flex items-center justify-center space-x-2 ${
                      currentLanguage === lang.code
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow'
                            : 'text-gray-600'
                    }`}
                  >
                      <span>{lang.flag}</span>
                      <span>{lang.label}</span>
                  </button>
                ))}
              </div>
            </div>
            <button
              onClick={() => { setIsAboutModalOpen(true); setIsMenuOpen(false); }}
              className="w-full flex items-center space-x-3 text-gray-700 font-semibold p-3 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Info className="h-5 w-5 text-purple-600" />
              <span>{getTranslation(currentLanguage, 'aboutModal.title')}</span>
            </button>
            <a href="https://sonitasv.com/" target="_blank" rel="noopener noreferrer" className="w-full flex items-center space-x-3 text-gray-700 font-semibold p-3 hover:bg-gray-100 rounded-lg transition-colors">
              <FileText className="h-5 w-5 text-purple-600" />
              <span>{getTranslation(currentLanguage, 'aboutModal.footer.creator')}</span>
            </a>
          </div>
        )}
    </header>

      <AboutModal
        isOpen={isAboutModalOpen}
        onRequestClose={() => setIsAboutModalOpen(false)}
        currentLanguage={currentLanguage}
      />
    </>
  );
};

export default Header;