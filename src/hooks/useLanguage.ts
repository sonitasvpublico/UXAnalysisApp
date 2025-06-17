import { useState, useCallback } from 'react';
import type { Language } from '../types';

export const useLanguage = (defaultLang: Language = 'en') => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(defaultLang);

  const changeLanguage = useCallback((lang: Language) => {
    setCurrentLanguage(lang);
  }, []);

  return {
    currentLanguage,
    changeLanguage,
  };
};