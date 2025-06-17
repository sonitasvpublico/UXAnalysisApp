import React from 'react';
import { Globe, TrendingUp, Users, AlertCircle, Sparkles, Target } from 'lucide-react';
import type { LocalizationAdvice as LocalizationAdviceType, Language } from '../types';
import { getTranslation } from '../utils/translations';

interface LocalizationAdviceProps {
  advice: LocalizationAdviceType[];
  currentLanguage: Language;
}

const LocalizationAdvice: React.FC<LocalizationAdviceProps> = ({ advice, currentLanguage }) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-700 bg-gradient-to-r from-red-50 to-red-100 border-red-300 shadow-red-100';
      case 'medium': return 'text-orange-700 bg-gradient-to-r from-orange-50 to-orange-100 border-orange-300 shadow-orange-100';
      case 'low': return 'text-green-700 bg-gradient-to-r from-green-50 to-green-100 border-green-300 shadow-green-100';
      default: return 'text-gray-700 bg-gradient-to-r from-gray-50 to-gray-100 border-gray-300 shadow-gray-100';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return <TrendingUp className="h-4 w-4" />;
      case 'medium': return <AlertCircle className="h-4 w-4" />;
      case 'low': return <Users className="h-4 w-4" />;
      default: return <Globe className="h-4 w-4" />;
    }
  };

  const getMarketFlag = (market: string) => {
    switch (market.toLowerCase()) {
      case 'spain':
      case 'españa':
      case 'espanja':
        return '🇪🇸';
      case 'mexico':
      case 'méxico':
      case 'meksiko':
        return '🇲🇽';
      case 'finland':
      case 'finlandia':
      case 'suomi':
        return '🇫🇮';
      default:
        return '🌍';
    }
  };

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
        {advice.map((item, index) => (
          <div key={index} className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105">
            {/* Header */}
            <div className="p-4 sm:p-8 bg-gradient-to-br from-purple-50/50 via-pink-50/50 to-blue-50/50 border-b border-gray-100/50">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 sm:mb-3 gap-2 sm:gap-0">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <span className="text-2xl sm:text-3xl">{getMarketFlag(item.market)}</span>
                  <h3 className="text-lg sm:text-2xl font-black text-gray-900">{item.market}</h3>
                </div>
                <div className={`inline-flex items-center px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-xs font-bold border-2 shadow-lg ${getPriorityColor(item.priority)}`}>
                  {getPriorityIcon(item.priority)}
                  <span className="ml-1 sm:ml-2 capitalize">
                    {currentLanguage === 'en' && `${item.priority} Priority`}
                    {currentLanguage === 'es' && `Prioridad ${item.priority}`}
                    {currentLanguage === 'fi' && `${item.priority} Prioriteetti`}
                  </span>
                </div>
              </div>
              <p className="text-sm sm:text-lg text-gray-700 font-bold">{item.language}</p>
            </div>

            {/* Content */}
            <div className="p-4 sm:p-8">
              {/* Technical Suggestions */}
              <div className="mb-6 sm:mb-8">
                <h4 className="font-black text-gray-900 mb-3 sm:mb-4 flex items-center text-sm sm:text-base">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mr-2 sm:mr-3"></div>
                  <Target className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-blue-600" />
                  {currentLanguage === 'en' && 'Technical Recommendations'}
                  {currentLanguage === 'es' && 'Recomendaciones Técnicas'}
                  {currentLanguage === 'fi' && 'Tekniset Suositukset'}
                </h4>
                <ul className="space-y-2 sm:space-y-3">
                  {item.suggestions.map((suggestion, idx) => (
                    <li key={idx} className="text-xs sm:text-sm text-gray-700 flex items-start leading-relaxed">
                      <span className="text-blue-600 mr-2 sm:mr-3 mt-0.5 sm:mt-1 font-bold">•</span>
                      <span className="font-medium">{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Cultural Notes */}
              <div>
                <h4 className="font-black text-gray-900 mb-3 sm:mb-4 flex items-center text-sm sm:text-base">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mr-2 sm:mr-3"></div>
                  <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-purple-600" />
                  {currentLanguage === 'en' && 'Cultural Considerations'}
                  {currentLanguage === 'es' && 'Consideraciones Culturales'}
                  {currentLanguage === 'fi' && 'Kulttuuriset Huomioitavat'}
                </h4>
                <ul className="space-y-2 sm:space-y-3">
                  {item.culturalNotes.map((note, idx) => (
                    <li key={idx} className="text-xs sm:text-sm text-gray-700 flex items-start leading-relaxed">
                      <span className="text-purple-600 mr-2 sm:mr-3 mt-0.5 sm:mt-1 font-bold">•</span>
                      <span className="font-medium">{note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      {advice.length === 0 && (
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-8 sm:p-12 text-center">
          <Globe className="h-12 w-12 sm:h-16 sm:w-16 text-gray-400 mx-auto mb-3 sm:mb-4" />
          <p className="text-gray-600 font-medium text-base sm:text-lg">
            {currentLanguage === 'en' && 'No localization advice available.'}
            {currentLanguage === 'es' && 'No hay consejos de localización disponibles.'}
            {currentLanguage === 'fi' && 'Lokalisointineuvot eivät ole saatavilla.'}
          </p>
        </div>
      )}
    </div>
  );
};

export default LocalizationAdvice;