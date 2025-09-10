
import React from 'react';

interface LinkButtonProps {
    name: string;
    url?: string;
    icon: React.ReactNode;
    type: 'link' | 'modal';
    variant?: 'default' | 'small';
    onClick?: () => void;
}

const LinkButton: React.FC<LinkButtonProps> = ({ name, url, icon, type, variant = 'default', onClick }) => {
    
    const baseClasses = "relative flex items-center rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-green-500/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-green-500 bg-white/50 border border-green-400/40 hover:border-green-500 overflow-hidden text-green-900";

    const variantClasses = {
        default: "w-full p-2",
        small: "flex-1 justify-center p-2.5"
    };

    const commonClasses = `${baseClasses} ${variantClasses[variant]}`;
    
    const content = variant === 'small' ? (
        <>{icon}</>
    ) : (
        <>
            <div className="absolute left-4">{icon}</div>
            <span className="flex-1 text-center font-semibold text-sm">{name}</span>
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
