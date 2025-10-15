import React from 'react';
import { ModalType } from './types';
import { InstagramIcon, FacebookIcon, TiktokIcon, CatalogIcon, WhatsappIcon, LocationIcon, RatingIcon } from './components/Icons';

export const BIBLE_VERSES: string[] = [
    "E disse Deus: Eis que vos tenho dado toda a erva que dá semente... e toda a árvore, em que há fruto que dê semente, ser-vos-á para mantimento. (Gênesis 1:29)",
    "Ele será como a árvore plantada junto a ribeiros de águas, a qual dá o seu fruto no seu tempo. (Salmos 1:3)",
    "Honra ao Senhor com os teus bens, e com a primeira parte de todos os teus ganhos; e se encherão os teus celeiros. (Provérbios 3:9-10)",
    "O fruto do justo é árvore de vida. (Provérbios 11:30)",
    "Junto do rio, nascerá toda a sorte de árvore que dá fruto para se comer; não cairá a sua folha, nem acabará o seu fruto; e o seu fruto servirá de alimento. (Ezequiel 47:12)",
    "A terra deu o seu fruto; e Deus, o nosso Deus, nos abençoará. (Salmos 67:6)",
    "Louvai ao Senhor desde a terra... árvores frutíferas e todos os cedros. (Salmos 148:7,9)",
    "Mas o fruto do Espírito é amor, alegria, paz, longanimidade, benignidade, bondade, fé. (Gálatas 5:22)",
    "Eu sou a videira, vós as varas; quem está em mim, и eu nele, esse dá muito fruto. (João 15:5)",
    "Pelo seu fruto se conhece a árvore. (Mateus 12:33)",
    "E a terra produzirá o seu fruto, e comereis a fartar. (Levítico 25:19)",
    "Bendito o fruto da tua terra. (Deuteronômio 28:4)",
    "Nisto é glorificado meu Pai: que deis muito fruto. (João 15:8)",
    "As árvores do campo darão o seu fruto, e a terra dará a sua novidade. (Ezequiel 34:27)",
    "E o que foi semeado em boa terra é o que ouve e compreende a palavra; e dá fruto, e produz a cem, a sessenta e a trinta por um. (Mateus 13:23)",
    "Para que possais andar dignamente diante do Senhor, agradando-lhe em tudo, frutificando em toda a boa obra. (Colossenses 1:10)",
    "Os teus renovos são um pomar de romãs, com frutos excelentes. (Cânticos 4:13)",
    "E no meio da sua praça... estava a árvore da vida, que produz doze frutos, dando o seu fruto de mês em mês. (Apocalipse 22:2)",
    "Os campos se revestem de rebanhos, e os vales se cobrem de trigo; eles exultam e cantam. (Salmos 65:13)",
    "O Senhor mandará que a bênção esteja contigo nos teus celeiros, e em tudo o que puseres a tua mão. (Deuteronômio 28:8)",
];


// FIX: Used `as const` to ensure TypeScript infers the narrowest possible type for the LINKS array.
// This preserves the literal types 'link' and 'modal' for the 'type' property,
// resolving the type error in App.tsx where 'string' was not assignable to '"link" | "modal"'.
export const LINKS = [
    { name: 'Instagram', url: 'https://www.instagram.com/frutariabenetti/', icon: React.createElement(InstagramIcon), type: 'link' },
    { name: 'Facebook', url: 'https://www.facebook.com/frutariabenetti1', icon: React.createElement(FacebookIcon), type: 'link' },
    { name: 'TikTok', url: 'https://www.tiktok.com/@frutariabenetti', icon: React.createElement(TiktokIcon), type: 'link' },
    { name: 'Catálogo', icon: React.createElement(CatalogIcon), type: 'modal', modalType: ModalType.CATALOG },
    { name: 'WhatsApp', icon: React.createElement(WhatsappIcon), type: 'modal', modalType: ModalType.WHATSAPP },
    { name: 'Nossas Lojas', icon: React.createElement(LocationIcon), type: 'modal', modalType: ModalType.LOCATION_CHOICE },
    { name: 'Avalie-nos', icon: React.createElement(RatingIcon), type: 'modal', modalType: ModalType.RATING },
] as const;

export const DEVELOPER_PHONE = '5541988710303';
export const CLIENT_PHONE = '5542991666452';
export const GOOGLE_REVIEW_URL = 'https://search.google.com/local/writereview?placeid=ChIJrbCTLOYd6JQRePKfoPOdXyc';

// Location Uvaranas
export const MAP_EMBED_URL_UVARANAS = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3612.90530360312!2d-50.102784799999995!3d-25.1050667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94e81de62c93b0ad%3A0x275f9df3a09ff278!2sFrutaria%20Benetti!5e0!3m2!1spt-BR!2sbr!4v1756963521951!5m2!1spt-BR!2sbr';
export const MAP_DIRECTION_URL_UVARANAS = 'https://www.google.com/maps/dir/?api=1&destination=Frutaria+Benetti';

// Location Cará-Cará
export const MAP_EMBED_URL_CARA_CARA = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3612.3295903580292!2d-50.127430788351774!3d-25.124545677665008!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94e81b3ec51d35f9%3A0x92d09f7e25c92081!2sR.%20Holga%20Holleben%20Mello%2C%20165%20-%20Car%C3%A1-Car%C3%A1%2C%20Ponta%20Grossa%20-%20PR%2C%2084033-897!5e0!3m2!1spt-BR!2sbr!4v1757610903467!5m2!1spt-BR!2sbr';
export const MAP_DIRECTION_URL_CARA_CARA = 'https://www.google.com/maps/dir/?api=1&destination=R.+Holga+Holleben+Mello,+165+-+Cará-Cará,+Ponta+Grossa+-+PR';

// Location Ventania
export const MAP_EMBED_URL_VENTANIA = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3637.7838128710864!2d-50.244581000000004!3d-24.24933889999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94e9ee401b26677f%3A0xe1020ec3ee15982f!2sAv.%20Anacleto%20Bueno%20de%20Camargo%2C%20987%20-%20Ventania%2C%20PR%2C%2084345-000!5e0!3m2!1spt-BR!2sbr!4v1760557388483!5m2!1spt-BR!2sbr';
export const MAP_DIRECTION_URL_VENTANIA = 'https://www.google.com/maps/dir/?api=1&destination=Av.+Anacleto+Bueno+de+Camargo,+987+-+Ventania,+PR';