import React from 'react';
import Modal from 'react-modal';
import { X, Sparkles, Zap, Globe, Palette } from 'lucide-react';
import { getTranslation } from '../utils/translations';
import type { Language } from '../types';

interface AboutModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  currentLanguage: Language;
}

const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onRequestClose, currentLanguage }) => {
  const t = (key: string) => getTranslation(currentLanguage, `aboutModal.${key}`);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel={t('title')}
      ariaHideApp={false}
      className="fixed inset-0 flex items-center justify-center z-50 p-4"
      overlayClassName="fixed inset-0 bg-black bg-opacity-70 z-40"
    >
      <div className="bg-gradient-to-br from-slate-900 via-gray-900 to-blue-900 text-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 sm:p-12 relative border border-blue-500/20">
        <button
          onClick={onRequestClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white bg-gray-700/50 hover:bg-red-500/80 rounded-full p-2 transition-all duration-300 transform hover:scale-110"
          aria-label="Close"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="flex items-center space-x-4 mb-6">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-xl shadow-lg">
            <Sparkles className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
            {t('title')}
          </h2>
        </div>
        
        <p className="text-gray-300 text-base sm:text-lg mb-8 leading-relaxed">
          {t('description')}
        </p>

        <div className="space-y-6">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <Zap className="h-6 w-6 text-blue-300" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-white">{t('feature1Title')}</h3>
              <p className="text-gray-400">{t('feature1Desc')}</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <Globe className="h-6 w-6 text-purple-300" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-white">{t('feature2Title')}</h3>
              <p className="text-gray-400">{t('feature2Desc')}</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-12 h-12 bg-pink-500/20 rounded-lg flex items-center justify-center">
              <Palette className="h-6 w-6 text-pink-300" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-white">{t('feature3Title')}</h3>
              <p className="text-gray-400">{t('feature3Desc')}</p>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <p className="text-sm text-gray-500">
            {t('footer.prefix')}
            <a href="https://sonitasv.com/" target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-400 hover:text-blue-300 underline">
              SonitaSV
            </a>
            {t('footer.suffix')}
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default AboutModal; 