import React, { useState, useEffect } from 'react';
import { ModalType } from './types';
import { BIBLE_VERSES, LINKS, DEVELOPER_PHONE, CLIENT_PHONE, GOOGLE_REVIEW_URL, MAP_EMBED_URL_UVARANAS, MAP_DIRECTION_URL_UVARANAS, MAP_EMBED_URL_CARA_CARA, MAP_DIRECTION_URL_CARA_CARA, MAP_EMBED_URL_VENTANIA, MAP_DIRECTION_URL_VENTANIA } from './constants';
import ProfileSection from './components/ProfileSection';
import LinkButton from './components/LinkButton';
import Footer from './components/Footer';
import Modal from './components/Modal';
import { StarIcon, XMarkIcon, PaperAirplaneIcon, MapPinIcon, ChevronRightIcon } from './components/Icons';

// Sub-component to prevent re-renders
const Fruit = ({ emoji, size, top, left, animationDelay, blur, opacity }: { emoji: string; size: string; top: string; left: string; animationDelay: string; blur: string; opacity: number }) => (
    <div
        className="absolute -z-10" // Position and z-index on the wrapper
        style={{
            top,
            left,
            opacity, // Base opacity on the wrapper
        }}
    >
        <div
            className="animate-float text-3xl md:text-5xl" // Animation on the child
            style={{
                fontSize: size,
                animationDelay,
                filter: `blur(${blur})`,
            }}
        >
            {emoji}
        </div>
    </div>
);

const INTEREST_OPTIONS = ['Frutas', 'Verduras', 'Legumes', 'Hortaliças', 'Especiarias', 'Outros'];

const App: React.FC = () => {
    const [activeModal, setActiveModal] = useState<ModalType | null>(null);
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [whatsappName, setWhatsappName] = useState('');
    const [whatsappRegion, setWhatsappRegion] = useState('');
    const [whatsappInterests, setWhatsappInterests] = useState<string[]>([]);
    const [otherInterestText, setOtherInterestText] = useState('');
    const [fruits, setFruits] = useState<any[]>([]);

    useEffect(() => {
        // Expanded list of tropical/fun fruits
        const fruitEmojis = ['🍓', '🍌', '🍇', '🍉', '🍍', '🥭', '🥝', '🥥', '🥑', '🍋', '🍑', '🍒', '🍈', '🍊', '🍐', '🍎', '🫐', '🍅', '✨'];
        const generatedFruits = Array.from({ length: 25 }).map((_, i) => ({ // Increased count
            id: i,
            emoji: fruitEmojis[Math.floor(Math.random() * fruitEmojis.length)],
            size: `${Math.random() * 2.5 + 1.5}rem`, // More size variation
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 8}s`,
            blur: `${Math.random() * 3}px`, // More blur variation
            opacity: Math.random() * 0.6 + 0.4, // Varied base opacity (0.4 to 1.0)
        }));
        setFruits(generatedFruits);
    }, []);

    useEffect(() => {
        const favicon = document.getElementById('favicon') as HTMLLinkElement;
        if (!favicon) return;

        let isLogo = true;
        const intervalId = setInterval(() => {
            isLogo = !isLogo;
            favicon.href = isLogo ? '/logo.png' : '/moeda.png';
        }, 10000); // 10 seconds

        return () => clearInterval(intervalId);
    }, []);

    const handleLinkClick = (type: ModalType) => {
        setActiveModal(type);
    };
    
    const handleCloseModal = () => {
        setActiveModal(null);
        setRating(0);
        setHoverRating(0);
        // Reset whatsapp form fields
        setWhatsappName('');
        setWhatsappRegion('');
        setWhatsappInterests([]);
        setOtherInterestText('');
    };

    const handleRatingClick = (rate: number) => {
        setRating(rate);
        if (rate === 5) {
            window.open(GOOGLE_REVIEW_URL, '_blank');
            handleCloseModal();
        } else {
            setActiveModal(ModalType.FEEDBACK);
        }
    };
    
    const handleInterestChange = (interest: string) => {
        setWhatsappInterests(prev =>
            prev.includes(interest)
                ? prev.filter(item => item !== interest)
                : [...prev, interest]
        );
    };

    const handleWhatsappSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Filter out 'Outros' if the text field is empty, to avoid sending it.
        const finalInterests = whatsappInterests.filter(i => i !== 'Outros');
        if (whatsappInterests.includes('Outros') && otherInterestText.trim()) {
            finalInterests.push(otherInterestText.trim());
        }

        if (finalInterests.length === 0) {
             alert('Por favor, selecione o que busca ou especifique no campo "Outros".');
             return;
        }

        const query = finalInterests.join(', ');

        const message = `Olá, Frutaria Benetti! Meu nome é ${whatsappName}.
Região: ${whatsappRegion}
Estou buscando: ${query}`;
        const whatsappUrl = `https://wa.me/${CLIENT_PHONE}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
        handleCloseModal();
    };

    const socialLinks = LINKS.slice(0, 3);
    const mainLinks = LINKS.slice(3);

    return (
        <>
            {fruits.map(fruit => (
                <Fruit key={fruit.id} {...fruit} />
            ))}
            <div className="fixed inset-0 -z-20 w-full h-full bg-gradient-to-br from-green-900 via-gray-900 to-black" />
            
            <div className="relative h-[100dvh] flex flex-col items-center justify-center p-2 sm:p-4 overflow-hidden">
                <main className="w-full max-w-md mx-auto">
                    <div className="relative bg-gradient-to-r from-lime-400 via-green-500 to-emerald-600 animate-gradient text-white rounded-2xl shadow-2xl p-3 md:p-6 border border-white/20">
                        
                        <div className="absolute top-2 left-2 transform -rotate-12" title="Outubro Rosa">
                            <img src="/outubrorosa.png" alt="Símbolo do Outubro Rosa" className="w-12 h-auto drop-shadow-lg" />
                        </div>
                        
                        <ProfileSection verses={BIBLE_VERSES} />
                        
                        <div className="mt-4 space-y-2">
                            <div className="flex items-center gap-2">
                                {socialLinks.map(link => (
                                    <LinkButton
                                        key={link.name}
                                        {...link}
                                        variant="small"
                                        onClick={link.type === 'modal' ? () => handleLinkClick(link.modalType!) : undefined}
                                    />
                                ))}
                            </div>
                            {mainLinks.map(link => (
                                <LinkButton 
                                    key={link.name} 
                                    {...link} 
                                    onClick={link.type === 'modal' ? () => handleLinkClick(link.modalType!) : undefined}
                                />
                            ))}
                        </div>
                    </div>
                </main>
                <Footer developerPhone={DEVELOPER_PHONE} />
            </div>

            {/* Modals */}
            <Modal isOpen={activeModal === ModalType.CATALOG} onClose={handleCloseModal}>
                <h2 className="text-2xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-700">Catálogo</h2>
                <p className="mt-4 text-center text-lg text-gray-700">Em construção...</p>
                <p className="mt-2 text-center text-3xl">🚧</p>
            </Modal>

            <Modal isOpen={activeModal === ModalType.LOCATION_CHOICE} onClose={handleCloseModal}>
                <h2 className="text-xl sm:text-2xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-700">Escolha a loja mais próxima</h2>
                <p className="text-center text-sm text-gray-600 mt-1 mb-4">Temos unidades em Ponta Grossa e Ventania para melhor te atender.</p>
                
                <div className="mt-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2 pl-1">Ponta Grossa - PR</h3>
                    <div className="space-y-3">
                        <button onClick={() => setActiveModal(ModalType.LOCATION_UVARANAS)} className="w-full flex items-center text-left p-4 rounded-lg bg-gray-100 hover:bg-green-100 hover:border-green-400 border border-transparent transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500">
                            <MapPinIcon />
                            <div className="ml-4 flex-grow">
                                <p className="font-semibold text-gray-800">Loja Uvaranas</p>
                                <p className="text-xs text-gray-500">Av. Carlos Cavalcanti, 4296</p>
                            </div>
                            <ChevronRightIcon />
                        </button>
                        <button onClick={() => setActiveModal(ModalType.LOCATION_CARA_CARA)} className="w-full flex items-center text-left p-4 rounded-lg bg-gray-100 hover:bg-green-100 hover:border-green-400 border border-transparent transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500">
                            <MapPinIcon />
                            <div className="ml-4 flex-grow">
                                <p className="font-semibold text-gray-800">Loja Nova PG (Cará-Cará)</p>
                                <p className="text-xs text-gray-500">R. Holga Holleben Mello, 165</p>
                            </div>
                            <ChevronRightIcon />
                        </button>
                    </div>
                </div>

                <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2 pl-1">Ventania - PR</h3>
                    <div className="space-y-3">
                         <button onClick={() => setActiveModal(ModalType.LOCATION_VENTANIA)} className="w-full flex items-center text-left p-4 rounded-lg bg-gray-100 hover:bg-green-100 hover:border-green-400 border border-transparent transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500">
                            <MapPinIcon />
                            <div className="ml-4 flex-grow">
                                <p className="font-semibold text-gray-800">Loja Ventania</p>
                                <p className="text-xs text-gray-500">Av. Anacleto Bueno de Camargo, 987</p>
                            </div>
                            <ChevronRightIcon />
                        </button>
                    </div>
                </div>

            </Modal>
            
            <Modal isOpen={activeModal === ModalType.LOCATION_UVARANAS} onClose={handleCloseModal}>
                 <h2 className="text-xl sm:text-2xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-700">Nossa Loja - Uvaranas</h2>
                 <div className="mt-4 aspect-video w-full rounded-lg overflow-hidden border-2 border-green-500/50">
                    <iframe
                        src={MAP_EMBED_URL_UVARANAS}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen={true}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Mapa da Frutaria Benetti em Uvaranas"
                    ></iframe>
                 </div>
                 <a href={MAP_DIRECTION_URL_UVARANAS} target="_blank" rel="noopener noreferrer" className="mt-4 w-full flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-4 rounded-lg transition-transform transform hover:scale-105">
                    <MapPinIcon />
                    Ver no Google Maps
                </a>
            </Modal>

            <Modal isOpen={activeModal === ModalType.LOCATION_CARA_CARA} onClose={handleCloseModal}>
                 <h2 className="text-xl sm:text-2xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-700">Nossa Loja - Nova PG (Cará-Cará)</h2>
                 <div className="mt-4 aspect-video w-full rounded-lg overflow-hidden border-2 border-green-500/50">
                    <iframe
                        src={MAP_EMBED_URL_CARA_CARA}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen={true}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Mapa da Frutaria Benetti em Cará-Cará"
                    ></iframe>
                 </div>
                 <a href={MAP_DIRECTION_URL_CARA_CARA} target="_blank" rel="noopener noreferrer" className="mt-4 w-full flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-4 rounded-lg transition-transform transform hover:scale-105">
                    <MapPinIcon />
                    Ver no Google Maps
                </a>
            </Modal>

            <Modal isOpen={activeModal === ModalType.LOCATION_VENTANIA} onClose={handleCloseModal}>
                 <h2 className="text-xl sm:text-2xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-700">Nossa Loja - Ventania</h2>
                 <div className="mt-4 aspect-video w-full rounded-lg overflow-hidden border-2 border-green-500/50">
                    <iframe
                        src={MAP_EMBED_URL_VENTANIA}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen={true}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Mapa da Frutaria Benetti em Ventania"
                    ></iframe>
                 </div>
                 <a href={MAP_DIRECTION_URL_VENTANIA} target="_blank" rel="noopener noreferrer" className="mt-4 w-full flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-4 rounded-lg transition-transform transform hover:scale-105">
                    <MapPinIcon />
                    Ver no Google Maps
                </a>
            </Modal>

            <Modal isOpen={activeModal === ModalType.WHATSAPP} onClose={handleCloseModal}>
                <h2 className="text-xl sm:text-2xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-700">Fale Conosco no WhatsApp</h2>
                <p className="text-center text-sm text-gray-600 mt-1 mb-4">Preencha os campos para agilizar seu atendimento.</p>
                <form onSubmit={handleWhatsappSubmit} className="space-y-4">
                    <input type="text" placeholder="Seu nome" value={whatsappName} onChange={e => setWhatsappName(e.target.value)} required className="w-full bg-gray-100 text-gray-800 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-lime-500 focus:outline-none placeholder-gray-500"/>
                    <input type="text" placeholder="Sua região/bairro" value={whatsappRegion} onChange={e => setWhatsappRegion(e.target.value)} required className="w-full bg-gray-100 text-gray-800 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-lime-500 focus:outline-none placeholder-gray-500"/>
                    
                    <fieldset>
                        <legend className="text-sm font-semibold text-gray-700 mb-2">O que você está buscando?</legend>
                        <div className="grid grid-cols-2 gap-2">
                            {INTEREST_OPTIONS.map((option) => (
                                <label key={option} className="flex items-center space-x-2 bg-gray-100 p-2 rounded-md cursor-pointer hover:bg-gray-200 transition-colors">
                                    <input
                                        type="checkbox"
                                        checked={whatsappInterests.includes(option)}
                                        onChange={() => handleInterestChange(option)}
                                        className="h-4 w-4 rounded border-gray-300 text-lime-600 focus:ring-lime-500"
                                    />
                                    <span className="text-sm text-gray-800">{option}</span>
                                </label>
                            ))}
                        </div>
                    </fieldset>

                    {whatsappInterests.includes('Outros') && (
                        <input
                            type="text"
                            placeholder="Especifique aqui"
                            value={otherInterestText}
                            onChange={e => setOtherInterestText(e.target.value)}
                            required
                            className="w-full bg-gray-100 text-gray-800 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-lime-500 focus:outline-none placeholder-gray-500 transition-all duration-300"
                            aria-label="Especifique o que você está buscando"
                        />
                    )}

                    <button type="submit" className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg transition-transform transform hover:scale-105">
                        <PaperAirplaneIcon />
                        Enviar Mensagem
                    </button>
                </form>
            </Modal>

            <Modal isOpen={activeModal === ModalType.RATING} onClose={handleCloseModal}>
                <h2 className="text-2xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-700">Sua opinião é importante!</h2>
                <p className="text-center text-sm text-gray-600 mt-1 mb-4">Como você avalia nosso serviço?</p>
                <div className="flex justify-center gap-2 text-4xl cursor-pointer">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <div key={star} onMouseEnter={() => setHoverRating(star)} onMouseLeave={() => setHoverRating(0)} onClick={() => handleRatingClick(star)}>
                           <StarIcon filled={(hoverRating || rating) >= star} />
                        </div>
                    ))}
                </div>
                <p className="text-center text-xs text-gray-500 mt-4">
                    Avaliações de 5 estrelas nos ajudam muito e serão direcionadas ao Google. <br/>
                    Avaliações inferiores nos ajudarão a melhorar.
                </p>
            </Modal>

            <Modal isOpen={activeModal === ModalType.FEEDBACK} onClose={handleCloseModal}>
                 <h2 className="text-2xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-red-600">O que podemos melhorar?</h2>
                 <p className="text-center text-sm text-gray-600 mt-1 mb-4">Seu feedback é anônimo e nos ajuda a crescer.</p>
                 <form action="https://formsubmit.co/your-email@example.com" method="POST" className="space-y-4">
                     {/* Replace your-email@example.com with the client's actual email */}
                     <input type="hidden" name="_subject" value={`Feedback ${rating} Estrelas - Frutaria Benetti`} />
                     <input type="hidden" name="_next" value={window.location.href} /> {/* Redirect back after submit */}
                     <input type="hidden" name="_captcha" value="false" /> {/* Disable captcha if desired */}
                    <textarea name="feedback" placeholder="Deixe sua sugestão ou crítica construtiva aqui..." required rows={5} className="w-full bg-gray-100 text-gray-800 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-400 focus:outline-none placeholder-gray-500"/>
                    <button type="submit" className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-4 rounded-lg transition-transform transform hover:scale-105">
                        <PaperAirplaneIcon />
                        Enviar Feedback
                    </button>
                 </form>
            </Modal>

        </>
    );
};

export default App;