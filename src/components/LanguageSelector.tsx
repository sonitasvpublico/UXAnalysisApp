import { useState, useEffect } from 'react';
import { Language } from '../types';
import { Globe } from 'lucide-react';

interface LanguageSelectorProps {
  currentLanguage: Language;
  onLanguageChange: (language: Language) => void;
  small?: boolean;
}

const LanguageSelector = ({ currentLanguage, onLanguageChange, small }: LanguageSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const closeDropdown = () => setIsOpen(false);
    if (isOpen) {
      document.addEventListener('click', closeDropdown);
      return () => document.removeEventListener('click', closeDropdown);
    }
  }, [isOpen]);

  const buttonClass = small
    ? 'flex items-center space-x-1 px-1 py-0.5 rounded-md text-xs'
    : 'flex items-center space-x-1.5 px-2 py-1 rounded-lg text-sm';
  const flagClass = small ? 'w-4 h-4' : 'w-5 h-5';
  const textClass = small ? 'text-xs font-medium' : 'text-sm font-medium';

  return (
    <div className="relative">
      {/* Mobile: Botón con dropdown */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className={`md:hidden ${buttonClass} bg-white shadow-sm hover:bg-gray-50 transition-colors duration-200`}
      >
        <Globe className={`h-4 w-4 text-gray-600 ${small ? 'mr-0' : 'mr-1'}`} />
        <span className={textClass}>{currentLanguage.toUpperCase()}</span>
      </button>

      {/* Mobile: Dropdown */}
      {isOpen && (
        <div className="md:hidden absolute right-0 mt-1 py-1 bg-white rounded-lg shadow-lg border border-gray-100 min-w-[120px] z-50">
          <button
            onClick={() => {
              onLanguageChange('en');
              setIsOpen(false);
            }}
            className={`w-full flex items-center space-x-2 px-3 py-2 text-sm ${currentLanguage === 'en' ? 'bg-purple-50' : 'hover:bg-gray-50'}`}
          >
            <img src="/flags/us.svg" alt="English" className={flagClass} />
            <span>English</span>
          </button>
          <button
            onClick={() => {
              onLanguageChange('es');
              setIsOpen(false);
            }}
            className={`w-full flex items-center space-x-2 px-3 py-2 text-sm ${currentLanguage === 'es' ? 'bg-purple-50' : 'hover:bg-gray-50'}`}
          >
            <img src="/flags/es.svg" alt="Español" className={flagClass} />
            <span>Español</span>
          </button>
        </div>
      )}

      {/* Desktop: Botones normales */}
      <div className="hidden md:flex items-center space-x-2">
        <button
          onClick={() => onLanguageChange('en')}
          className={`flex items-center space-x-1 px-2 py-1 rounded-lg transition-colors duration-200 ${currentLanguage === 'en' ? 'bg-purple-100' : 'hover:bg-gray-100'} ${small ? 'text-xs' : 'text-sm'}`}
        >
          <img src="/flags/us.svg" alt="English" className={flagClass} />
          <span className={textClass}>EN</span>
        </button>
        <button
          onClick={() => onLanguageChange('es')}
          className={`flex items-center space-x-1 px-2 py-1 rounded-lg transition-colors duration-200 ${currentLanguage === 'es' ? 'bg-purple-100' : 'hover:bg-gray-100'} ${small ? 'text-xs' : 'text-sm'}`}
        >
          <img src="/flags/es.svg" alt="Español" className={flagClass} />
          <span className={textClass}>ES</span>
        </button>
      </div>
    </div>
  );
};

export default LanguageSelector; 