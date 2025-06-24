/**
 * UXAnalysisApp - UI/UX Analysis Tool
 * Copyright (c) 2025 Sonia Zavaleta Toukkari
 * 
 * This software is provided for educational, personal, and non-commercial use only.
 * Commercial use requires explicit written permission from the copyright holder.
 * Attribution required: "Sonia Zavaleta Toukkari - UXAnalysisApp"
 */

import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import FileUpload from './components/FileUpload';
import LoadingSpinner from './components/LoadingSpinner';
import AnalysisResults from './components/AnalysisResults';
import LocalizationAdvice from './components/LocalizationAdvice';
import AIDetectedElements from './components/AIDetectedElements';
import { useLanguage } from './hooks/useLanguage';
import { 
  generateAnalysisResultsFromAI, 
  getLocalizationAdviceOnly,
  getLocalizedAnalysisResults
} from './utils/analysisEngine';
import type { 
  UploadedImage, 
  AnalysisResult, 
  LocalizationAdvice as LocalizationAdviceType,
  AIDetectionResult,
  Language
} from './types';
import { RefreshCw, Sparkles, ChevronDown } from 'lucide-react';
import { getTranslation } from './utils/translations';
import { localizationRules } from './utils/localizationRules';
import { generateBeautifulPDF } from './utils/pdfGenerator.ts';

type AppState = 'upload' | 'analyzing' | 'results';

function App() {
  const { currentLanguage, changeLanguage } = useLanguage();
  const [appState, setAppState] = useState<AppState>('upload');
  const [uploadedImage, setUploadedImage] = useState<UploadedImage | null>(null);
  const [imageDimensions, setImageDimensions] = useState<{ width: number; height: number } | null>(null);
  const [analysisResults, setAnalysisResults] = useState<AnalysisResult[]>([]);
  const [aiResults, setAiResults] = useState<any>(null);
  const [localizationAdvice, setLocalizationAdvice] = useState<LocalizationAdviceType[]>([]);
  const [activeTab, setActiveTab] = useState<'results' | 'localization'>('results');
  const analysisRequestId = useRef(0);
  const [targetCountry, setTargetCountry] = useState('ES'); // Default to Spain
  const [error, setError] = useState<string | null>(null);

  // Nueva función para iniciar análisis
  const handleStartAnalysis = () => {
    setAppState('analyzing');
  };

  const handleFileUpload = async (
    image: UploadedImage,
    aiResultsFromUpload: any,
    imgDims?: { width: number; height: number }
  ) => {
    setAppState('analyzing');
    setUploadedImage(image);
    if (imgDims) {
      setImageDimensions(imgDims);
    }
    setAiResults(aiResultsFromUpload);

    try {
      let finalAnalysis: AnalysisResult[];

      if (aiResultsFromUpload && Object.keys(aiResultsFromUpload).length > 0 && aiResultsFromUpload.responses && aiResultsFromUpload.responses.length > 0) {
        console.log("Generando resultados desde la IA...", aiResultsFromUpload);
        const visionData = aiResultsFromUpload.responses[0];
        finalAnalysis = generateAnalysisResultsFromAI(visionData, imgDims?.width, imgDims?.height);
        
        // Si la IA no produjo ningún resultado procesable, usar fallback para no mostrar una pantalla vacía.
        if (finalAnalysis.length === 0) {
          console.log("La IA no generó resultados, usando fallback.");
          finalAnalysis = getLocalizedAnalysisResults(currentLanguage as Language);
        }

      } else {
        console.warn("No se recibieron resultados de la IA o la respuesta estaba vacía. Usando fallback.");
        // Usamos los resultados genéricos como fallback
        finalAnalysis = getLocalizedAnalysisResults(currentLanguage as Language);
      }
      
      setAnalysisResults(finalAnalysis);

      // La localización siempre se obtiene de forma independiente y dinámica.
      const localizationData = getLocalizationAdviceOnly(currentLanguage as Language, targetCountry);
      setLocalizationAdvice(localizationData);

      setAppState('results');
    } catch (error) {
      console.error('Error during analysis processing:', error);
      setError(error instanceof Error ? error.message : 'An unknown error occurred');
      // Importante: Volver a la pantalla de subida si hay un error crítico
      setAppState('upload'); 
    }
  };

  const handleExportReport = async () => {
    if (uploadedImage && imageDimensions) {
      try {
        await generateBeautifulPDF({
          results: analysisResults,
          localizationAdvice,
          imageName: uploadedImage.name,
          imageUrl: uploadedImage.url,
          imageDimensions,
          currentLanguage,
          targetCountry,
          aiResults
        });
      } catch (error) {
        console.error('Error exporting report:', error);
        // Mostrar un mensaje de error al usuario
        alert(currentLanguage === 'es' ? 
          'Error al exportar el reporte. Por favor intente de nuevo.' :
          currentLanguage === 'fi' ? 
          'Virhe raportin viennissä. Yritä uudelleen.' :
          'Error exporting report. Please try again.');
      }
    }
  };

  const handleNewAnalysis = () => {
    setAppState('upload');
    setUploadedImage(null);
    setAnalysisResults([]);
    setLocalizationAdvice([]);
    setActiveTab('results');
    setImageDimensions(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <Header 
        currentLanguage={currentLanguage} 
        onLanguageChange={changeLanguage} 
      />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {appState === 'upload' && (
          <div className="animate-fade-in">
            <div className="max-w-2xl mx-auto mb-8 text-center">
              <label htmlFor="country-selector" className="inline-block text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-3">
                  {getTranslation(currentLanguage, 'target_market_label')}
              </label>
              <div className="relative">
                <select
                    id="country-selector"
                    value={targetCountry}
                    onChange={(e) => setTargetCountry(e.target.value)}
                    className="appearance-none w-full bg-white/80 backdrop-blur-sm border-2 border-slate-200/70 rounded-xl shadow-lg hover:border-purple-300/80 transition-all duration-300 py-3 pl-4 pr-10 text-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-800/80 dark:border-slate-700 dark:text-white dark:hover:border-purple-500"
                >
                    {Object.keys(localizationRules).map((code) => (
                        <option key={code} value={code} className="font-medium text-gray-900 dark:bg-gray-900 dark:text-white">
                            {localizationRules[code].countryName[currentLanguage as Language] || localizationRules[code].countryName.en}
                        </option>
                    ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-600 dark:text-gray-400">
                  <ChevronDown className="h-6 w-6" />
                </div>
              </div>
            </div>
            <FileUpload 
              onFileUpload={handleFileUpload} 
              currentLanguage={currentLanguage}
              isAnalyzing={false}
              onStartAnalysis={handleStartAnalysis}
            />
          </div>
        )}

        {appState === 'analyzing' && (
          <div className="animate-fade-in">
            <LoadingSpinner 
              currentLanguage={currentLanguage}
              imageName={uploadedImage?.name}
            />
          </div>
        )}

        {appState === 'results' && (
          <div className="animate-fade-in">
            {/* Results Navigation */}
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 mb-6 sm:mb-8 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 p-4 sm:p-6 border-b border-gray-100/50">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-2 sm:space-y-0">
                    <button
                      onClick={() => setActiveTab('results')}
                      className={`pb-2 sm:pb-3 px-2 text-base sm:text-lg font-bold border-b-3 transition-all duration-300 transform hover:scale-105 ${
                        activeTab === 'results'
                          ? 'text-blue-700 border-blue-600 shadow-lg'
                          : 'text-gray-600 border-transparent hover:text-gray-800 hover:border-gray-300'
                      }`}
                    >
                      <span className="flex items-center space-x-1 sm:space-x-2">
                        <Sparkles className="h-4 w-4 sm:h-5 sm:w-5" />
                        <span>{getTranslation(currentLanguage, 'results')} ({analysisResults.length})</span>
                      </span>
                    </button>
                    <button
                      onClick={() => setActiveTab('localization')}
                      className={`pb-2 sm:pb-3 px-2 text-base sm:text-lg font-bold border-b-3 transition-all duration-300 transform hover:scale-105 ${
                        activeTab === 'localization'
                          ? 'text-purple-700 border-purple-600 shadow-lg'
                          : 'text-gray-600 border-transparent hover:text-gray-800 hover:border-gray-300'
                      }`}
                    >
                      <span className="flex items-center space-x-1 sm:space-x-2">
                        <span className="text-lg sm:text-xl">🌍</span>
                        <span>{getTranslation(currentLanguage, 'localization')} ({localizationAdvice.length})</span>
                      </span>
                    </button>
                  </div>
                  <button
                    onClick={handleNewAnalysis}
                    className="mt-4 sm:mt-0 inline-flex items-center px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-lg sm:rounded-xl hover:from-gray-700 hover:to-gray-800 transition-all duration-300 font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105 text-sm sm:text-base"
                  >
                    <RefreshCw className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                    {getTranslation(currentLanguage, 'newAnalysis')}
                  </button>
                </div>
              </div>
            </div>

            {/* Tab Content */}
            {activeTab === 'results' && uploadedImage && (
              <>
                {/* AI Detected Elements section - visible if aiResults exist */}
                {aiResults && aiResults.responses && aiResults.responses[0] && (
                  <AIDetectedElements
                    results={aiResults.responses[0]}
                    isLoading={false}
                  />
                )}
                <div className="mt-8">
                  <AnalysisResults
                    results={analysisResults}
                    currentLanguage={currentLanguage}
                    imageName={uploadedImage.name}
                    imageUrl={uploadedImage.url}
                    onExportReport={handleExportReport}
                    targetCountry={targetCountry}
                    aiResults={aiResults}
                  />
                </div>
              </>
            )}

            {activeTab === 'localization' && (
              <LocalizationAdvice
                advice={localizationAdvice}
                currentLanguage={currentLanguage}
              />
            )}
          </div>
        )}
      </main>

      {/* Enhanced Footer */}
      <footer className="bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 text-white mt-12 sm:mt-16 relative z-10">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="max-w-7xl mx-auto py-8 sm:py-12 px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 sm:p-3 rounded-lg sm:rounded-xl">
                <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
              <h3 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
                Professional UI/UX Analysis Tool
              </h3>
            </div>
            <p className="text-blue-100 text-sm sm:text-lg font-medium mb-1 sm:mb-2">
              Powered by Advanced AI Technology
            </p>
            <p className="text-blue-200/80 text-xs sm:text-sm">
              Supporting accessibility, usability, and global localization standards
            </p>
            <div className="mt-4 sm:mt-6 flex flex-wrap justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-blue-200/60">
              <span>🎨 Design Analysis</span>
              <span>♿ Accessibility</span>
              <span>🌍 Localization</span>
              <span>📱 Mobile-First</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;