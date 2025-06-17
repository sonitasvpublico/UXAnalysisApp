import React, { useCallback, useState } from 'react';
import { Upload, FileImage, AlertCircle, Sparkles, Zap } from 'lucide-react';
import type { UploadedImage, Language } from '../types';
import { getTranslation } from '../utils/translations';

interface FileUploadProps {
  onFileUpload: (image: UploadedImage) => void;
  currentLanguage: Language;
  isAnalyzing: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload, currentLanguage, isAnalyzing }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState<string>('');

  const validateFile = (file: File): boolean => {
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

    if (!allowedTypes.includes(file.type)) {
      setError('Please upload a valid image file (JPEG, PNG, GIF, or WebP)');
      return false;
    }

    if (file.size > maxSize) {
      setError('File size must be less than 10MB');
      return false;
    }

    setError('');
    return true;
  };

  const handleFile = useCallback((file: File) => {
    if (!validateFile(file)) return;

    const uploadedImage: UploadedImage = {
      id: Date.now().toString(),
      file,
      url: URL.createObjectURL(file),
      name: file.name,
      size: file.size,
      uploadDate: new Date(),
    };

    onFileUpload(uploadedImage);
  }, [onFileUpload]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFile(files[0]);
    }
  }, [handleFile]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="text-center mb-8 sm:mb-12">
        <div className="flex items-center justify-center mb-4 sm:mb-6">
          <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-3 sm:p-4 rounded-2xl sm:rounded-3xl shadow-2xl transform hover:scale-110 transition-transform duration-300">
            <Sparkles className="h-8 w-8 sm:h-12 sm:w-12 text-white" />
          </div>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black bg-gradient-to-r from-blue-700 via-purple-700 to-pink-700 bg-clip-text text-transparent mb-4 sm:mb-6">
          {getTranslation(currentLanguage, 'uploadTitle')}
        </h2>
        <p className="text-base sm:text-xl text-gray-700 font-medium max-w-2xl mx-auto leading-relaxed px-4 sm:px-0">
          {getTranslation(currentLanguage, 'uploadDescription')}
        </p>
        
        {/* Feature highlights */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mt-6 sm:mt-8 px-4 sm:px-0">
          <div className="flex items-center space-x-2 bg-blue-50 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full">
            <Zap className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
            <span className="text-xs sm:text-sm font-semibold text-blue-700">AI-Powered Analysis</span>
          </div>
          <div className="flex items-center space-x-2 bg-purple-50 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full">
            <span className="text-purple-600 text-sm sm:text-base">♿</span>
            <span className="text-xs sm:text-sm font-semibold text-purple-700">Accessibility Check</span>
          </div>
          <div className="flex items-center space-x-2 bg-pink-50 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full">
            <span className="text-pink-600 text-sm sm:text-base">🌍</span>
            <span className="text-xs sm:text-sm font-semibold text-pink-700">Global Localization</span>
          </div>
        </div>
      </div>

      <div
        className={`
          relative border-3 border-dashed rounded-2xl sm:rounded-3xl p-6 sm:p-12 transition-all duration-500 cursor-pointer transform
          ${isDragOver 
            ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-purple-50 scale-105 shadow-2xl' 
            : 'border-gray-300 hover:border-purple-400 hover:bg-gradient-to-br hover:from-gray-50 hover:to-purple-50/30 hover:scale-102 hover:shadow-xl'
          }
          ${isAnalyzing ? 'opacity-50 pointer-events-none' : ''}
        `}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => !isAnalyzing && document.getElementById('file-input')?.click()}
      >
        <input
          id="file-input"
          type="file"
          accept="image/*"
          onChange={handleFileInput}
          className="hidden"
          disabled={isAnalyzing}
        />

        <div className="text-center">
          <div className={`
            mx-auto w-16 h-16 sm:w-24 sm:h-24 mb-6 sm:mb-8 rounded-full flex items-center justify-center transition-all duration-500 transform
            ${isDragOver 
              ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white scale-125 shadow-2xl' 
              : 'bg-gradient-to-br from-gray-100 to-gray-200 text-gray-500 hover:from-purple-100 hover:to-blue-100 hover:text-purple-600 hover:scale-110'
            }
          `}>
            {isDragOver ? <FileImage className="h-8 w-8 sm:h-12 sm:w-12" /> : <Upload className="h-8 w-8 sm:h-12 sm:w-12" />}
          </div>

          <p className="text-lg sm:text-2xl font-bold text-gray-800 mb-2 sm:mb-3">
            {getTranslation(currentLanguage, 'dragText')}
          </p>
          
          <p className="text-gray-600 mb-6 sm:mb-8 text-base sm:text-lg">
            {getTranslation(currentLanguage, 'orText')}
          </p>

          <button
            type="button"
            disabled={isAnalyzing}
            className="
              inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 border border-transparent text-base sm:text-lg font-bold rounded-xl sm:rounded-2xl
              text-white bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 
              hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 
              focus:outline-none focus:ring-4 focus:ring-purple-500/50
              disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300
              shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 hover:scale-105
            "
          >
            <Upload className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3" />
            {getTranslation(currentLanguage, 'uploadButton')}
          </button>

          <div className="mt-6 sm:mt-8 flex flex-wrap justify-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-500">
            <span className="flex items-center space-x-1">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full"></span>
              <span>Maximum: 10MB</span>
            </span>
            <span className="flex items-center space-x-1">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full"></span>
              <span>JPEG, PNG, GIF, WebP</span>
            </span>
            <span className="flex items-center space-x-1">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-500 rounded-full"></span>
              <span>Instant Analysis</span>
            </span>
          </div>
        </div>
      </div>

      {error && (
        <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 rounded-xl sm:rounded-2xl animate-slide-up shadow-lg">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 sm:h-6 sm:w-6 text-red-600 mr-2 sm:mr-3" />
            <p className="text-red-700 font-semibold text-sm sm:text-base">{error}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;