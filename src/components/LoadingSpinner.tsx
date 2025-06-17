import React from 'react';
import { Eye, Zap, Globe, Sparkles, Brain, Target } from 'lucide-react';
import type { Language } from '../types';
import { getTranslation } from '../utils/translations';

interface LoadingSpinnerProps {
  currentLanguage: Language;
  imageName?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ currentLanguage, imageName }) => {
  const steps = [
    { icon: Eye, text: 'Analyzing visual elements...', color: 'text-blue-600', bg: 'bg-blue-100' },
    { icon: Brain, text: 'Processing AI insights...', color: 'text-purple-600', bg: 'bg-purple-100' },
    { icon: Target, text: 'Checking accessibility...', color: 'text-green-600', bg: 'bg-green-100' },
    { icon: Globe, text: 'Preparing localization advice...', color: 'text-pink-600', bg: 'bg-pink-100' },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto text-center">
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-12 border border-white/20 relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/50 to-pink-50/50"></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-pulse"></div>
        
        <div className="relative z-10">
          {/* Main spinner */}
          <div className="relative mx-auto w-16 h-16 sm:w-24 sm:h-24 mb-6 sm:mb-8">
            <div className="absolute inset-0 border-4 border-purple-200 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-transparent border-t-blue-600 border-r-purple-600 rounded-full animate-spin"></div>
            <div className="absolute inset-2 border-4 border-transparent border-t-purple-600 border-r-pink-600 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
            <div className="absolute inset-0 m-auto w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
              <Sparkles className="h-4 w-4 sm:h-6 sm:w-6 text-white animate-pulse" />
            </div>
          </div>

          <h3 className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-blue-700 via-purple-700 to-pink-700 bg-clip-text text-transparent mb-2 sm:mb-3">
            {getTranslation(currentLanguage, 'analyzing')}
          </h3>
          
          {imageName && (
            <p className="text-sm sm:text-lg text-gray-700 mb-6 sm:mb-8 font-medium">
              Processing: <span className="font-bold text-purple-700">{imageName}</span>
            </p>
          )}

          {/* Progress steps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div 
                  key={index}
                  className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 bg-white/50 rounded-xl sm:rounded-2xl border border-white/30 shadow-lg"
                  style={{ 
                    animationDelay: `${index * 0.5}s`,
                  }}
                >
                  <div className={`flex-shrink-0 w-8 h-8 sm:w-12 sm:h-12 ${step.bg} rounded-lg sm:rounded-xl flex items-center justify-center animate-pulse-soft shadow-lg`}>
                    <Icon className={`h-4 w-4 sm:h-6 sm:w-6 ${step.color}`} />
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-gray-700 animate-pulse-soft">{step.text}</span>
                </div>
              );
            })}
          </div>

          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3 mb-4 sm:mb-6 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full animate-pulse" style={{ width: '75%' }}></div>
          </div>

          <div className="text-xs sm:text-sm text-gray-600 font-medium">
            <div className="flex items-center justify-center space-x-2">
              <Zap className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-500" />
              <span>AI analysis in progress... This usually takes 10-15 seconds</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;