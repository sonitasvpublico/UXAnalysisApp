import React from 'react';
import { Globe, Type, Palette, AlertCircle } from 'lucide-react';
import type { LocalizationAdvice as LocalizationAdviceType, Language } from '../types';
import { getTranslation } from '../utils/translations';

interface LocalizationAdviceProps {
  advice: LocalizationAdviceType[];
  currentLanguage: Language;
}

const getCategoryIcon = (category: 'format' | 'tone' | 'general') => {
  switch (category) {
    case 'format':
      return <Palette className="h-6 w-6 text-blue-500" />;
    case 'tone':
      return <Type className="h-6 w-6 text-purple-500" />;
    case 'general':
      return <Globe className="h-6 w-6 text-green-500" />;
    default:
      return <AlertCircle className="h-6 w-6 text-gray-500" />;
    }
  };

const getCategoryTitle = (category: 'format' | 'tone' | 'general', lang: Language) => {
    const titles = {
        en: { format: "Formatting & Standards", tone: "Tone & Formality", general: "General Advice" },
        es: { format: "Formatos y Estándares", tone: "Tono y Formalidad", general: "Consejos Generales" },
        fi: { format: "Formaatit ja Standardit", tone: "Sävy ja Muodollisuus", general: "Yleisohjeet" }
    };
    return titles[lang][category] || titles.en[category];
}

const LocalizationAdvice: React.FC<LocalizationAdviceProps> = ({ advice, currentLanguage }) => {
  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 mb-6 sm:mb-8 overflow-hidden">
        <div className="bg-gradient-to-r from-purple-600/10 via-pink-600/10 to-blue-600/10 p-4 sm:p-8 border-b border-gray-100/50">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-2 sm:p-3 rounded-xl sm:rounded-2xl shadow-lg">
              <Globe className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-purple-700 to-pink-700 bg-clip-text text-transparent mb-1 sm:mb-2">
                {getTranslation(currentLanguage, 'localization')}
              </h2>
              <p className="text-sm sm:text-base text-gray-700 font-medium">
                {currentLanguage === 'en' && 'Market-specific recommendations for your design'}
                {currentLanguage === 'es' && 'Recomendaciones específicas del mercado para tu diseño'}
                {currentLanguage === 'fi' && 'Markkinakohtaiset suositukset suunnitelmallesi'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
        {advice.map((item) => (
          <div key={item.id} className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-lg border border-white/30 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="p-5 sm:p-6">
              <div className="flex items-center mb-3">
                <div className="p-2 bg-slate-100 rounded-lg mr-4">
                  {getCategoryIcon(item.category)}
                </div>
                <h3 className="text-lg font-bold text-gray-800">
                  {getCategoryTitle(item.category, currentLanguage)}
                </h3>
              </div>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                {item.advice}
              </p>
            </div>
          </div>
        ))}
      </div>

      {advice.length === 0 && (
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-8 sm:p-12 text-center">
          <Globe className="h-12 w-12 sm:h-16 sm:w-16 text-gray-400 mx-auto mb-3 sm:mb-4" />
          <p className="text-gray-600 font-medium text-base sm:text-lg">
            {currentLanguage === 'en' && 'No localization advice to show for this market.'}
            {currentLanguage === 'es' && 'No hay consejos de localización para mostrar para este mercado.'}
            {currentLanguage === 'fi' && 'Ei lokalisointineuvoja näytettäväksi tälle markkinalle.'}
          </p>
        </div>
      )}
    </div>
  );
};

export default LocalizationAdvice;