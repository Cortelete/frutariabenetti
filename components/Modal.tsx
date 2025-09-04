
import React from 'react';
import { XMarkIcon } from './Icons';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={onClose}
        >
            <div
                className="relative bg-white border border-gray-200 w-full max-w-md p-6 rounded-2xl shadow-2xl text-gray-800 transform transition-all duration-300 scale-95 opacity-0 animate-fade-in-scale"
                onClick={e => e.stopPropagation()}
                style={{
                    animation: 'fadeInScale 0.3s ease-out forwards',
                }}
            >
                <style>{`
                    @keyframes fadeInScale {
                        from { transform: scale(0.95); opacity: 0; }
                        to { transform: scale(1); opacity: 1; }
                    }
                    .animate-fade-in-scale { animation: fadeInScale 0.3s ease-out forwards; }
                `}</style>
                <button 
                    onClick={onClose} 
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-900 transition-colors"
                    aria-label="Close modal"
                >
                    <XMarkIcon />
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;