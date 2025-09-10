
import React from 'react';
import { WhatsappIcon } from './Icons';

interface FooterProps {
    developerPhone: string;
}

const Footer: React.FC<FooterProps> = ({ developerPhone }) => {
    const ctaMessage = "Olá, vi o link da Frutaria Benetti e quero um site incrível como esse! 🚀";
    const ctaUrl = `https://wa.me/${developerPhone}?text=${encodeURIComponent(ctaMessage)}`;

    return (
        <footer className="w-full max-w-md mx-auto text-center mt-4 pb-2 px-4">
            <a 
                href={ctaUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-teal-500 to-green-500 hover:from-teal-600 hover:to-green-600 text-white font-bold py-2 px-4 rounded-lg transition-transform transform hover:scale-105 text-xs sm:text-sm"
            >
                <WhatsappIcon />
                Quer um site incrível como esse? Fale comigo!
            </a>
            <p className="text-xs text-white/80 mt-4">
                Desenvolvido por {' '}
                <a href="https://www.instagram.com/inteligenciarte.ia" target="_blank" rel="noopener noreferrer" className="font-semibold text-white hover:text-lime-200">
                    InteligenciArte.IA ✨
                </a>
            </p>
        </footer>
    );
};

export default Footer;
