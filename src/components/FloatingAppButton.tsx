import React, { useState, useEffect } from 'react';
import { Smartphone } from 'lucide-react';

interface FloatingAppButtonProps {
  isVisible: boolean;
  onOpenSidebar: () => void;
}

const FloatingAppButton: React.FC<FloatingAppButtonProps> = ({ 
  isVisible, 
  onOpenSidebar 
}) => {
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    if (isVisible) {
      // Hide the button when sidebar is open
      setShouldShow(false);
    } else {
      // Show the button 2 seconds after sidebar is closed
      const timer = setTimeout(() => {
        setShouldShow(true);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  if (!shouldShow) return null;

  return (
    <button
      onClick={onOpenSidebar}
      className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 animate-pulse hover:animate-none group"
      aria-label="Download mobile app"
    >
      <div className="relative">
        <Smartphone className="h-6 w-6" />
        
        {/* Subtle notification dot */}
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
      </div>
      
      {/* Tooltip */}
      <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
        Get Nitida AI App
        <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
      </div>
    </button>
  );
};

export default FloatingAppButton;
