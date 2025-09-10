
import React, { useState, useEffect } from 'react';

interface ProfileSectionProps {
    verses: string[];
}

const fruitEmojis = ['🍓', '🍌', '🍇', '🍉', '🍍', '🥭', '🥝', '🥥', '🥑', '🍋', '🍑', '🍒'];

// Using a direct path to the image file as requested.
// This will work once 'moeda.png' is added to the public assets folder.
const coinImageSrc = "/moeda.png";

const ProfileSection: React.FC<ProfileSectionProps> = ({ verses }) => {
    const [verseIndex, setVerseIndex] = useState(0);
    const [isFlipping, setIsFlipping] = useState(false);
    const [fruitEmoji, setFruitEmoji] = useState('🍓');

    useEffect(() => {
        const intervalId = setInterval(() => {
            setVerseIndex(prevIndex => (prevIndex + 1) % verses.length);
        }, 7000);

        return () => clearInterval(intervalId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [verses.length]);

    const handleLogoClick = () => {
        if (isFlipping) return;

        const randomFruit = fruitEmojis[Math.floor(Math.random() * fruitEmojis.length)];
        setFruitEmoji(randomFruit);

        setIsFlipping(true);

        setTimeout(() => {
            setIsFlipping(false);
        }, 2000); // Corresponds to the CSS transition duration
    };

    return (
        <div className="flex flex-col items-center text-center">
            <div 
                className="w-20 h-20 md:w-28 md:h-28 coin-container" 
                onClick={handleLogoClick} 
                title="Clique para girar!"
                role="button"
                aria-pressed={isFlipping}
                tabIndex={0}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleLogoClick()}
            >
                <div className={`coin ${isFlipping ? 'flipping' : ''}`}>
                    <div className="coin-face coin-front">
                        <img 
                            src={coinImageSrc} 
                            alt="Moeda Frutaria Benetti, clique para girar" 
                        />
                    </div>
                    <div className="coin-face coin-back">
                        <span className="text-5xl md:text-6xl" role="img" aria-label="Fruit emoji">{fruitEmoji}</span>
                    </div>
                </div>
            </div>
            
            <img 
                src="/logo.png" 
                alt="Frutaria Benetti Logo"
                className="mt-2 w-full max-w-[300px]"
            />

            <p className="mt-1 text-xs md:text-sm text-green-950 font-bold min-h-[30px] transition-opacity duration-1000 flex items-center justify-center [text-shadow:_0_1px_2px_rgb(255_255_255_/_60%)]">
                "{verses[verseIndex]}"
            </p>
        </div>
    );
};

export default ProfileSection;
