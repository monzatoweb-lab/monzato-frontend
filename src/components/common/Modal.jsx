import React, { useEffect } from 'react';
import { X } from 'lucide-react';

/**
 * Reusable Modal component for MONZATO design system.
 *
 * @param {boolean} isOpen
 * @param {function} onClose
 * @param {string} title
 * @param {React.ReactNode} children
 * @param {string} maxWidth
 * @param {string} className
 */
export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = 'max-w-3xl',
  className = ''
}) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen && onClose) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity cursor-pointer"
      />

      {/* Modal Box */}
      <div className={`relative bg-white w-full ${maxWidth} shadow-2xl overflow-hidden z-10 p-6 sm:p-10 my-8 ${className}`}>
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-400 hover:text-black transition-colors p-1.5 cursor-pointer z-20"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {title && (
          <h2 className="text-xl font-bold tracking-[0.15em] text-neutral-900 uppercase mb-6 pr-8 font-serif-luxury">
            {title}
          </h2>
        )}

        {children}
      </div>
    </div>
  );
};
