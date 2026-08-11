import React from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface FooterProps {
  lang: Language;
  navigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ lang, navigate }) => {
  const t = TRANSLATIONS[lang];

  return (
    <footer className="bg-[#201C16] text-[#F0EEE6] border-t-4 border-[#A54B2E] pt-12 pb-8 px-4 sm:px-6 lg:px-8 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        {/* Brand */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-12 relative flex items-center justify-center">
              <svg viewBox="0 0 100 120" className="w-full h-full">
                <path
                  d="M15 110 V50 C15 22, 85 22, 85 50 V110 Z"
                  fill="#201C16"
                  stroke="#C5A059"
                  strokeWidth="4"
                />
                <polygon points="22,22 30,8 38,22" fill="#C5A059" />
                <polygon points="42,16 50,2 58,16" fill="#A54B2E" />
                <polygon points="62,22 70,8 78,22" fill="#C5A059" />
                <g transform="translate(50, 60)">
                  <polygon
                    points="0,-18 5,-5 18,0 5,5 0,18 -5,5 -18,0 -5,-5"
                    fill="#C5A059"
                  />
                  <circle cx="0" cy="0" r="3" fill="#A54B2E" />
                </g>
              </svg>
            </div>
            <div>
              <span className="font-ruqaa text-3xl font-bold text-[#F0EEE6] tracking-wide block">
                أوابد — <span className="font-sans font-extrabold text-[#C5A059] tracking-widest text-2xl">AWABID</span>
              </span>
              <span className="text-xs font-serif-heritage text-[#C5A059] tracking-widest block">
                Where heritage is told | حيث يُحكى التراث | 听遗迹诉说历史
              </span>
            </div>
          </div>
          <p className="text-sm text-[#E6E1D3]/80 leading-relaxed max-w-md font-serif-heritage">
            {t.quoteText}
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-ruqaa text-lg font-bold text-[#C5A059] mb-3">
            {t.navCatalog}
          </h4>
          <ul className="space-y-2 text-sm text-[#E6E1D3]/80">
            <li>
              <button onClick={() => navigate('/sites')} className="hover:text-[#C5A059] transition-colors">
                {t.heroCtaExplore}
              </button>
            </li>
            <li>
              <button onClick={() => navigate('/planner')} className="hover:text-[#C5A059] transition-colors">
                {t.navPlanner}
              </button>
            </li>
            <li>
              <button onClick={() => navigate('/chat')} className="hover:text-[#C5A059] transition-colors">
                {t.navChat}
              </button>
            </li>
            <li>
              <button onClick={() => navigate('/dashboard')} className="hover:text-[#C5A059] transition-colors">
                {t.navDashboard}
              </button>
            </li>
          </ul>
        </div>

        {/* UNESCO & Verification Note */}
        <div>
          <h4 className="font-ruqaa text-lg font-bold text-[#C5A059] mb-3">
            {t.whyDifferentTitle}
          </h4>
          <p className="text-xs text-[#E6E1D3]/70 leading-relaxed font-serif-heritage mb-3">
            {t.diff1Desc}
          </p>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C5A059]/40 bg-[#A54B2E]/30 text-xs text-[#C5A059]">
            <span>✦</span>
            <span>Ministry of Culture & UNESCO Verified Data</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-6 border-t border-[#F0EEE6]/10 flex flex-col sm:flex-row items-center justify-between text-xs text-[#E6E1D3]/50 gap-4">
        <p>© {new Date().getFullYear()} AWABID (أوابد). {t.storytellerRole}.</p>
        <p className="font-serif-heritage">المملكة العربية السعودية | Kingdom of Saudi Arabia</p>
      </div>
    </footer>
  );
};
