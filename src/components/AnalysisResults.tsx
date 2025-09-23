import React, { useState } from 'react';
import { AlertTriangle, CheckCircle, Info, X, Eye, Download, Filter, Sparkles, ChevronDown } from 'lucide-react';
import type { AnalysisResult, Language } from '../types';
import { getTranslation } from '../utils/translations';
import ImageModal from './ImageModal';

interface AnalysisResultsProps {
  results: AnalysisResult[];
  currentLanguage: Language;
  imageName: string;
  imageUrl: string;
  onExportReport: () => void;
  targetCountry: string;
  aiResults?: any;
}

const AnalysisResults: React.FC<AnalysisResultsProps> = ({ 
  results, 
  currentLanguage, 
  imageName, 
  imageUrl,
  onExportReport,
  targetCountry,
  aiResults
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');
  const [selectedResult, setSelectedResult] = useState<AnalysisResult | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <X className="h-4 w-4" />;
      case 'high':
        return <AlertTriangle className="h-4 w-4" />;
      case 'medium':
        return <Info className="h-4 w-4" />;
      case 'low':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Info className="h-4 w-4" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-700 bg-gradient-to-r from-red-50 to-red-100 border-red-300 shadow-red-100';
      case 'high': return 'text-orange-700 bg-gradient-to-r from-orange-50 to-orange-100 border-orange-300 shadow-orange-100';
      case 'medium': return 'text-blue-700 bg-gradient-to-r from-blue-50 to-blue-100 border-blue-300 shadow-blue-100';
      case 'low': return 'text-green-700 bg-gradient-to-r from-green-50 to-green-100 border-green-300 shadow-green-100';
      default: return 'text-gray-700 bg-gradient-to-r from-gray-50 to-gray-100 border-gray-300 shadow-gray-100';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'accessibility': return '♿';
      case 'usability': return '👆';
      case 'design': return '🎨';
      case 'localization': return '🌍';
      default: return '📋';
    }
  };

  const filteredResults = results.filter(result => {
    const categoryMatch = selectedCategory === 'all' || result.category === selectedCategory;
    const severityMatch = selectedSeverity === 'all' || result.severity === selectedSeverity;
    return categoryMatch && severityMatch;
  });

  const categories = ['all', ...Array.from(new Set(results.map(r => r.category)))];
  const severities = ['all', 'critical', 'high', 'medium', 'low'];

  const severityStats = {
    critical: results.filter(r => r.severity === 'critical').length,
    high: results.filter(r => r.severity === 'high').length,
    medium: results.filter(r => r.severity === 'medium').length,
    low: results.filter(r => r.severity === 'low').length,
  };

  const handleExportClick = async () => {
    console.log('[AnalysisResults] Export button clicked');
    try {
      await onExportReport();
      console.log('[AnalysisResults] onExportReport resolved');
    } catch (error) {
      console.error('Error exporting report:', error);
      const errorMessage = currentLanguage === 'es' ? 
        'Error al exportar el reporte. Por favor intente de nuevo.' :
        currentLanguage === 'fi' ? 
        'Virhe raportin viennissä. Yritä uudelleen.' :
        'Error exporting report. Please try again.';
      alert(errorMessage);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 mb-6 sm:mb-8 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 p-4 sm:p-8 border-b border-gray-100/50">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-2 sm:p-3 rounded-xl sm:rounded-2xl shadow-lg">
                <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
              <div>
                <h2 className="font-poppins text-2xl sm:text-3xl font-black bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent mb-1 sm:mb-2">
                  {getTranslation(currentLanguage, 'results')}
                </h2>
                <p className="text-sm sm:text-base text-gray-700 font-medium">
                  Analysis of <span className="font-bold text-purple-700">{imageName}</span>
                </p>
              </div>
            </div>
            <button
              onClick={handleExportClick}
              title="Export PDF"
              className="mt-4 sm:mt-0 inline-flex items-center px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg sm:rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105 text-sm sm:text-base"
            >
              <Download className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              {getTranslation(currentLanguage, 'exportReport')}
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="p-4 sm:p-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6">
            {Object.entries(severityStats).map(([severity, count]) => (
              <div key={severity} className="text-center transform hover:scale-105 transition-transform duration-300">
                <div className={`inline-flex items-center px-2 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-2xl text-xs sm:text-sm font-bold border-2 shadow-lg ${getSeverityColor(severity)}`}>
                  {getSeverityIcon(severity)}
                  <span className="ml-1 sm:ml-2 text-sm sm:text-lg">{count}</span>
                </div>
                <p className="text-xs text-gray-600 mt-1 sm:mt-2 font-semibold capitalize">
                  {getTranslation(currentLanguage, `severity.${severity}`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Filters and Results */}
        <div className="lg:col-span-2">
          {/* Filters */}
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-4 sm:p-6 mb-6 sm:mb-8">
            <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
              <Filter className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
              <h3 className="font-bold text-gray-800 text-sm sm:text-base">
                {currentLanguage === 'en' && 'Filters'}
                {currentLanguage === 'es' && 'Filtros'}
                {currentLanguage === 'fi' && 'Suodattimet'}
              </h3>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <div className="flex-1">
                <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-1 sm:mb-2">
                  {currentLanguage === 'en' && 'Category'}
                  {currentLanguage === 'es' && 'Categoría'}
                  {currentLanguage === 'fi' && 'Kategoria'}
                </label>
                <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                    className="appearance-none w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-300 rounded-lg sm:rounded-xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 font-medium transition-all duration-300 text-sm sm:text-base"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                        {category === 'all' ? 
                          (currentLanguage === 'en' ? 'All Categories' : 
                          currentLanguage === 'es' ? 'Todas las Categorías' : 
                          'Kaikki Kategoriat') : 
                          getTranslation(currentLanguage, `categories.${category}`)}
                    </option>
                  ))}
                </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                    <ChevronDown className="h-5 w-5" />
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-1 sm:mb-2">
                  {currentLanguage === 'en' && 'Severity'}
                  {currentLanguage === 'es' && 'Gravedad'}
                  {currentLanguage === 'fi' && 'Vakavuus'}
                </label>
                <div className="relative">
                <select
                  value={selectedSeverity}
                  onChange={(e) => setSelectedSeverity(e.target.value)}
                    className="appearance-none w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-300 rounded-lg sm:rounded-xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 font-medium transition-all duration-300 text-sm sm:text-base"
                >
                  {severities.map(severity => (
                    <option key={severity} value={severity}>
                        {severity === 'all' ? 
                          (currentLanguage === 'en' ? 'All Severities' : 
                          currentLanguage === 'es' ? 'Todas las Gravedades' : 
                          'Kaikki Vakavuudet') : 
                          getTranslation(currentLanguage, `severity.${severity}`)}
                    </option>
                  ))}
                </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                    <ChevronDown className="h-5 w-5" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Results List */}
          <div className="space-y-4 sm:space-y-6">
            {filteredResults.map((result) => (
              <div
                key={result.id}
                className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 hover:scale-102"
                onClick={() => setSelectedResult(result)}
              >
                <div className="p-4 sm:p-8">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 sm:mb-4 gap-2 sm:gap-0">
                    <div className="flex items-center space-x-3 sm:space-x-4">
                      <span className="text-2xl sm:text-3xl">{getCategoryIcon(result.category)}</span>
                      <div>
                        <h3 className="font-bold text-gray-900 text-base sm:text-lg">{result.title}</h3>
                        <p className="text-xs sm:text-sm text-gray-600 font-medium capitalize">
                          {getTranslation(currentLanguage, `categories.${result.category}`)}
                        </p>
                      </div>
                    </div>
                    <div className={`inline-flex items-center px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-xs font-bold border-2 shadow-lg ${getSeverityColor(result.severity)}`}>
                      {getSeverityIcon(result.severity)}
                      <span className="ml-1 sm:ml-2 capitalize">
                        {getTranslation(currentLanguage, `severity.${result.severity}`)}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-sm sm:text-base text-gray-700 mb-3 sm:mb-4 font-medium leading-relaxed">{result.description}</p>
                  
                  <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-gray-200">
                    <p className="text-xs sm:text-sm text-gray-700">
                      <span className="font-bold text-purple-700">
                        {currentLanguage === 'en' && 'Impact:'}
                        {currentLanguage === 'es' && 'Impacto:'}
                        {currentLanguage === 'fi' && 'Vaikutus:'}
                      </span> {result.impact}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredResults.length === 0 && (
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-8 sm:p-12 text-center">
              <Eye className="h-12 w-12 sm:h-16 sm:w-16 text-gray-400 mx-auto mb-3 sm:mb-4" />
              <p className="text-gray-600 font-medium text-base sm:text-lg">
                {currentLanguage === 'en' && 'No results found for the selected filters.'}
                {currentLanguage === 'es' && 'No se encontraron resultados para los filtros seleccionados.'}
                {currentLanguage === 'fi' && 'Valituilla suodattimilla ei löytynyt tuloksia.'}
              </p>
            </div>
          )}
        </div>

        {/* Image Preview and Selected Result */}
        <div className="lg:col-span-1">
          <div className="sticky top-6">
            {/* Image Preview */}
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-4 sm:p-6 mb-6 sm:mb-8">
              <h3 className="font-bold text-gray-900 mb-3 sm:mb-4 flex items-center text-sm sm:text-base">
                <Eye className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-purple-600" />
                {currentLanguage === 'en' && 'Design Preview'}
                {currentLanguage === 'es' && 'Vista Previa del Diseño'}
                {currentLanguage === 'fi' && 'Suunnittelun Esikatselu'}
              </h3>
              <div className="relative">
                <img
                  src={imageUrl}
                  alt={imageName}
                  className="w-full h-32 sm:h-48 object-cover rounded-lg sm:rounded-xl border-2 border-gray-200 shadow-lg cursor-pointer"
                  onClick={() => setModalOpen(true)}
                />
                {selectedResult?.coordinates && (
                  <div
                    className="absolute border-3 border-red-500 bg-red-500 bg-opacity-20 rounded animate-pulse"
                    style={{
                      left: `${(selectedResult.coordinates.x / 800) * 100}%`,
                      top: `${(selectedResult.coordinates.y / 600) * 100}%`,
                      width: `${(selectedResult.coordinates.width / 800) * 100}%`,
                      height: `${(selectedResult.coordinates.height / 600) * 100}%`,
                    }}
                  />
                )}
                {/* Modal de imagen grande con overlays */}
                <ImageModal
                  isOpen={modalOpen}
                  onRequestClose={() => setModalOpen(false)}
                  imageUrl={imageUrl}
                  imageName={imageName}
                  issues={results.filter(r => r.coordinates)}
                />
              </div>
            </div>

            {/* Selected Result Details */}
            {selectedResult && (
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-4 sm:p-6">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <h3 className="font-bold text-gray-900 flex items-center text-sm sm:text-base">
                    <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-purple-600" />
                    {currentLanguage === 'en' && 'Issue Details'}
                    {currentLanguage === 'es' && 'Detalles del Problema'}
                    {currentLanguage === 'fi' && 'Ongelman Yksityiskohdat'}
                  </h3>
                  <button
                    onClick={() => setSelectedResult(null)}
                    className="text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded-lg"
                  >
                    <X className="h-4 w-4 sm:h-5 sm:w-5" />
                  </button>
                </div>
                
                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">{selectedResult.title}</h4>
                    <div className={`inline-flex items-center px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-xs font-bold border-2 shadow-lg ${getSeverityColor(selectedResult.severity)}`}>
                      {getSeverityIcon(selectedResult.severity)}
                      <span className="ml-1 sm:ml-2 capitalize">
                        {getTranslation(currentLanguage, `severity.${selectedResult.severity}`)}
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="font-bold text-gray-700 mb-1 sm:mb-2 text-xs sm:text-sm">
                      {currentLanguage === 'en' && 'Description:'}
                      {currentLanguage === 'es' && 'Descripción:'}
                      {currentLanguage === 'fi' && 'Kuvaus:'}
                    </h5>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{selectedResult.description}</p>
                  </div>
                  
                  <div>
                    <h5 className="font-bold text-gray-700 mb-1 sm:mb-2 text-xs sm:text-sm">
                      {currentLanguage === 'en' && 'Suggestion:'}
                      {currentLanguage === 'es' && 'Sugerencia:'}
                      {currentLanguage === 'fi' && 'Ehdotus:'}
                    </h5>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{selectedResult.suggestion}</p>
                  </div>
                  
                  <div>
                    <h5 className="font-bold text-gray-700 mb-1 sm:mb-2 text-xs sm:text-sm">
                      {currentLanguage === 'en' && 'Impact:'}
                      {currentLanguage === 'es' && 'Impacto:'}
                      {currentLanguage === 'fi' && 'Vaikutus:'}
                    </h5>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{selectedResult.impact}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResults;