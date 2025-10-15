import React, { useState, useEffect } from 'react';
import { Smartphone, Download, X, ChevronUp, ChevronDown } from 'lucide-react';
import type { Language } from '../types';
import { getTranslation } from '../utils/translations';

interface FloatingSidebarProps {
  currentLanguage: Language;
  isVisible: boolean;
  onClose: () => void;
}

const FloatingSidebar: React.FC<FloatingSidebarProps> = ({ 
  currentLanguage, 
  isVisible, 
  onClose 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const appStoreUrl = 'https://apps.apple.com/fi/app/nitida-ai/id6753171284';
  const playStoreUrl = 'https://play.google.com/store/apps/details?id=com.sonitasv.uxanalysisapp&hl=en';

  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true);
      
      // Play notification sound when sidebar appears
      const playNotificationSound = () => {
        try {
          // Create a subtle notification sound using Web Audio API
          const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();
          
          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);
          
          // Gentle notification sound (C5 to E5)
          oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
          oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // E5
          
          oscillator.type = 'sine';
          gainNode.gain.setValueAtTime(0, audioContext.currentTime);
          gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.01);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
          
          oscillator.start(audioContext.currentTime);
          oscillator.stop(audioContext.currentTime + 0.3);
        } catch (error) {
          // Fallback: silent if audio context fails
          console.log('Audio notification not available');
        }
      };
      
      // Play sound after a small delay to sync with animation
      const soundTimer = setTimeout(playNotificationSound, 200);
      
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 300);
      
      return () => {
        clearTimeout(timer);
        clearTimeout(soundTimer);
      };
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Floating Sidebar */}
      <div 
        className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 sm:left-auto sm:right-6 sm:transform-none z-50 transition-all duration-500 ${
          isVisible 
            ? 'translate-y-0 opacity-100 scale-100' 
            : 'translate-y-full opacity-0 scale-95'
        } ${isAnimating ? 'animate-bounce' : ''}`}
      >
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden w-80 sm:max-w-sm">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-4 text-white relative">
            <button
              onClick={onClose}
              className="absolute top-3 right-3 p-1 rounded-full hover:bg-white/20 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
            
            <div className="flex items-center space-x-3 pr-8">
              <div className="bg-white/20 p-2 rounded-xl">
                <Smartphone className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg leading-tight">
                  {currentLanguage === 'es' ? 'Obtén Nitida AI' : 
                   currentLanguage === 'fi' ? 'Hanki Nitida AI' : 
                   'Get Nitida AI'}
                </h3>
                <p className="text-blue-100 text-sm mt-2">
                  {currentLanguage === 'es' ? 'Características mejoradas en la app' : 
                   currentLanguage === 'fi' ? 'Parannetut ominaisuudet sovelluksessa' : 
                   'Enhanced features in the app'}
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            <p className="text-gray-600 text-sm mb-4 leading-relaxed">
              {getTranslation(currentLanguage, 'downloadAppDescription')}
            </p>

            {/* App Store Buttons */}
            <div className="space-y-3">
              {/* App Store */}
              <a
                href={appStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center space-x-3 bg-black text-white px-4 py-3 rounded-xl hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 hover:shadow-lg w-full h-14"
              >
                <svg className="w-7 h-7 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <div className="text-left">
                  <div className="text-base font-semibold">App Store</div>
                </div>
              </a>

              {/* Google Play */}
              <a
                href={playStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center space-x-3 bg-black text-white px-4 py-3 rounded-xl hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 hover:shadow-lg w-full h-14"
              >
                <svg className="w-7 h-7 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                </svg>
                <div className="text-left">
                  <div className="text-base font-semibold">Google Play Store</div>
                </div>
              </a>
            </div>

            {/* Footer note */}
            <div className="mt-4 pt-3 border-t border-gray-200">
              <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
                <Download className="h-3 w-3" />
                <span>Enhanced mobile experience</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FloatingSidebar;
