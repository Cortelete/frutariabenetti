
import React from 'react';

interface LinkButtonProps {
    name: string;
    url?: string;
    icon: React.ReactNode;
    type: 'link' | 'modal';
    onClick?: () => void;
}

const LinkButton: React.FC<LinkButtonProps> = ({ name, url, icon, type, onClick }) => {
    const commonClasses = "relative w-full flex items-center p-3 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-green-500/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-green-500 bg-white/50 border border-green-400/40 hover:border-green-500 overflow-hidden text-green-900";
    
    const content = (
        <>
            <div className="absolute left-4">{icon}</div>
            <span className="flex-1 text-center font-semibold text-sm sm:text-base">{name}</span>
            <div className="absolute right-4 w-6 h-6"></div> {/* Spacer to balance icon */}
        </>
    );

    if (type === 'link') {
        return (
            <a href={url} target="_blank" rel="noopener noreferrer" className={commonClasses}>
                {content}
            </a>
        );
    }

    return (
        <button onClick={onClick} className={commonClasses}>
            {content}
        </button>
    );
};

export default LinkButton;
