import React from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { Compass } from 'lucide-react';

interface NotFoundPageProps {
  lang: Language;
  navigate: (path: string) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ lang, navigate }) => {
  const t = TRANSLATIONS[lang];

  return (
    <div className="max-w-md mx-auto px-4 py-24 text-center space-y-6">
      <div className="w-20 h-20 rounded-full bg-[#8B4513]/10 text-[#8B4513] border-2 border-[#8B4513] mx-auto flex items-center justify-center font-ruqaa text-4xl font-bold">
        🐪
      </div>

      <h1 className="font-ruqaa text-3xl font-bold text-[#201C16]">
        {t.notFoundTitle}
      </h1>

      <p className="text-xs font-serif-heritage text-[#8B4513] leading-relaxed">
        {t.notFoundDesc}
      </p>

      <button
        onClick={() => navigate('/')}
        className="px-6 py-3 bg-[#8B4513] hover:bg-[#6D340E] text-[#F0EEE6] rounded-full text-xs font-bold transition-colors inline-flex items-center gap-2"
      >
        <Compass className="w-4 h-4" />
        <span>{t.backHomeBtn}</span>
      </button>
    </div>
  );
};
