import React, { useState } from 'react';
import Modal from 'react-modal';
import type { AnalysisResult } from '../types';

interface ImageModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  imageUrl: string;
  imageName: string;
  issues: AnalysisResult[];
}

const IMAGE_WIDTH = 800;
const IMAGE_HEIGHT = 600;

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, onRequestClose, imageUrl, imageName, issues }) => {
  const [hoveredBox, setHoveredBox] = useState<string | null>(null);
  const [selectedBox, setSelectedBox] = useState<string | null>(null);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Image Preview"
      ariaHideApp={false}
      className="fixed inset-0 flex items-center justify-center z-50 outline-none"
      overlayClassName="fixed inset-0 bg-black bg-opacity-60 z-40"
      shouldCloseOnOverlayClick={true}
    >
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-3xl w-full p-4 sm:p-8 flex flex-col items-center">
        <button
          onClick={onRequestClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 bg-gray-100 rounded-full p-2 z-20"
          aria-label="Close"
        >
          <span className="text-xl">×</span>
        </button>
        <div className="w-full flex flex-col items-center">
          <div className="relative w-full max-w-2xl mx-auto" style={{ aspectRatio: '4/3' }}>
            <img
              src={imageUrl}
              alt={imageName}
              className="w-full h-auto rounded-xl border-2 border-gray-200 shadow-lg"
              style={{ maxHeight: 480, objectFit: 'contain', background: '#f9fafb' }}
            />
            {/* Overlays de bounding boxes */}
            {issues.filter(i => i.coordinates).map(issue => {
              const { x, y, width, height } = issue.coordinates!;
              return (
                <div
                  key={issue.id}
                  className={`absolute border-2 rounded-lg transition-all duration-200 cursor-pointer ${
                    hoveredBox === issue.id || selectedBox === issue.id
                      ? 'border-pink-500 bg-pink-500/20'
                      : 'border-blue-500 bg-blue-500/10'
                  }`}
                  style={{
                    left: `${(x / IMAGE_WIDTH) * 100}%`,
                    top: `${(y / IMAGE_HEIGHT) * 100}%`,
                    width: `${(width / IMAGE_WIDTH) * 100}%`,
                    height: `${(height / IMAGE_HEIGHT) * 100}%`,
                  }}
                  onMouseEnter={() => setHoveredBox(issue.id)}
                  onMouseLeave={() => setHoveredBox(null)}
                  onClick={() => setSelectedBox(issue.id)}
                >
                  {/* Tooltip o panel de detalles */}
                  {(hoveredBox === issue.id || selectedBox === issue.id) && (
                    <div className="absolute left-0 top-full mt-2 w-64 bg-white border border-gray-200 rounded-xl shadow-xl p-4 z-30 text-xs sm:text-sm animate-fade-in">
                      <div className="font-bold text-gray-900 mb-1">{issue.title}</div>
                      <div className="text-gray-700 mb-1">{issue.description}</div>
                      <div className="text-purple-700 font-semibold">{issue.suggestion}</div>
                      <div className="text-gray-500 mt-1">{issue.impact}</div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <div className="mt-4 text-center text-gray-600 text-xs sm:text-sm">
          Click on a highlighted area to see details. Close the modal to return.
        </div>
      </div>
    </Modal>
  );
};

export default ImageModal; 