import React from 'react';
import { Sparkles, Tag, Type, Box, Cpu } from 'lucide-react';
import type { AIDetectionResult } from '../types';
import { getTranslation } from '../utils/translations';
import type { Language } from '../types';

interface AIDetectedElementsProps {
  results: {
    labelAnnotations?: AIDetectionResult[];
    textAnnotations?: AIDetectionResult[];
    localizedObjectAnnotations?: AIDetectionResult[];
  } | null;
  isLoading: boolean;
  currentLanguage?: Language;
  isTesseractMode?: boolean;
}

const AIDetectedElements: React.FC<AIDetectedElementsProps> = ({ 
  results, 
  isLoading, 
  currentLanguage = 'en', 
  isTesseractMode = false 
}) => {
  if (isLoading) {
    return (
      <div className="w-full max-w-4xl mx-auto mt-8 p-6 bg-white/50 backdrop-blur-sm rounded-2xl shadow-xl border border-purple-100">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-48 bg-purple-100 rounded-lg mb-4"></div>
          <div className="flex flex-wrap gap-3 justify-center">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-10 w-32 bg-purple-50 rounded-full"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!results || (
    (!results.labelAnnotations || results.labelAnnotations.length === 0) &&
    (!results.textAnnotations || results.textAnnotations.length === 0) &&
    (!results.localizedObjectAnnotations || results.localizedObjectAnnotations.length === 0)
  )) {
    return null;
  }

  const renderSection = (title: string, icon: React.ReactNode, items: AIDetectionResult[] = []) => {
    if (!items || items.length === 0) return null;

    return (
      <div className="mb-6 last:mb-0">
        <div className="flex items-center mb-4">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-2 rounded-xl shadow-lg mr-3">
            {icon}
          </div>
          <h4 className="text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            {title}
          </h4>
        </div>

        <div className="flex flex-wrap gap-3">
          {items.map((item, index) => (
            <div
              key={index}
              className="
                group flex items-center px-4 py-2 rounded-full
                bg-gradient-to-r from-purple-50 to-blue-50
                hover:from-purple-100 hover:to-blue-100
                border border-purple-100 hover:border-purple-200
                transition-all duration-300 transform hover:-translate-y-1
                cursor-default
              "
            >
              <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                {item.description}
              </span>
              {item.score !== undefined && (
                <span className="ml-2 px-2 py-0.5 text-xs font-semibold rounded-full bg-purple-100 text-purple-700">
                  {Math.round(item.score * 100)}%
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <div className="bg-white/50 backdrop-blur-sm rounded-2xl shadow-xl border border-purple-100 p-6 transition-all duration-500 hover:shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-center mb-6">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-2 rounded-xl shadow-lg mr-3">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <h3 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            AI Detected Elements
          </h3>
          {isTesseractMode && (
            <div className="ml-4 flex items-center px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
              <Cpu className="h-4 w-4 mr-1" />
              {getTranslation(currentLanguage, 'aiAnalysis.tesseractMode')}
            </div>
          )}
        </div>

        {/* Results Sections */}
        {renderSection('Labels', <Tag className="h-5 w-5 text-white" />, results.labelAnnotations)}
        {renderSection('Text', <Type className="h-5 w-5 text-white" />, results.textAnnotations?.slice(1))}
        {results.localizedObjectAnnotations && results.localizedObjectAnnotations.length > 0 && (
          <div className="mb-6 last:mb-0">
            <div className="flex items-center mb-4">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-2 rounded-xl shadow-lg mr-3">
                <Box className="h-5 w-5 text-white" />
              </div>
              <h4 className="text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Objects
              </h4>
            </div>
            <div className="flex flex-wrap gap-3">
              {results.localizedObjectAnnotations.map((item, index) => (
                <div
                  key={index}
                  className="group flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-50 to-blue-50 hover:from-purple-100 hover:to-blue-100 border border-purple-100 hover:border-purple-200 transition-all duration-300 transform hover:-translate-y-1 cursor-default"
                >
                  <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                    {item.name || item.description || 'Object'}
                  </span>
                  {item.score !== undefined && (
                    <span className="ml-2 px-2 py-0.5 text-xs font-semibold rounded-full bg-purple-100 text-purple-700">
                      {Math.round(item.score * 100)}%
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIDetectedElements; 