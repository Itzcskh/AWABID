import React from 'react';
import { Language, UserSession } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { Compass, Calendar, MessageSquare, BookmarkCheck, User, Globe, Sparkles } from 'lucide-react';

interface NavbarProps {
  currentPath: string;
  navigate: (path: string) => void;
  lang: Language;
  setLang: (lang: Language) => void;
  user: UserSession | null;
  onSignOut: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPath,
  navigate,
  lang,
  setLang,
  user,
  onSignOut,
}) => {
  const t = TRANSLATIONS[lang];

  const isRtl = lang === 'ar';

  return (
    <header className="sticky top-0 z-40 bg-[#F0EEE6]/95 backdrop-blur-md border-b border-[#201C1622] shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Deep Heritage Brand Logo Emblem */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-3.5 group text-start focus:outline-hidden"
          id="nav-logo-button"
        >
          {/* Authentic Monument Emblem SVG */}
          <div className="w-11 h-14 relative flex items-center justify-center transition-transform group-hover:scale-105 filter drop-shadow-xs">
            <svg viewBox="0 0 100 120" className="w-full h-full">
              {/* Outer Parchment Shield / Monument Gateway */}
              <path
                d="M15 110 V50 C15 22, 85 22, 85 50 V110 Z"
                fill="#F8F6F0"
                stroke="#A54B2E"
                strokeWidth="4"
              />
              {/* Najdi Battlements / Crenellations at Top */}
              <polygon points="22,22 30,8 38,22" fill="#A54B2E" />
              <polygon points="42,16 50,2 58,16" fill="#C5A059" />
              <polygon points="62,22 70,8 78,22" fill="#A54B2E" />

              {/* Inner Arch Line */}
              <path
                d="M26 110 V54 C26 32, 74 32, 74 54 V110"
                fill="none"
                stroke="#C5A059"
                strokeWidth="2"
                strokeDasharray="3 3"
              />

              {/* Central 8-Point Star of Storytelling & Heritage */}
              <g transform="translate(50, 60)">
                <polygon
                  points="0,-18 5,-5 18,0 5,5 0,18 -5,5 -18,0 -5,-5"
                  fill="#C5A059"
                />
                <polygon
                  points="0,-12 3,-3 12,0 3,3 0,12 -3,3 -12,0 -3,-3"
                  fill="#A54B2E"
                />
                <circle cx="0" cy="0" r="3" fill="#F8F6F0" />
              </g>

              {/* Base Dune Line */}
              <path
                d="M15 102 Q 50 94 85 102"
                fill="none"
                stroke="#201C16"
                strokeWidth="3"
              />
            </svg>
          </div>

          <div className="flex flex-col">
            <div className="flex items-baseline gap-2">
              <span className="font-ruqaa text-3xl font-bold text-[#201C16] tracking-wide leading-none group-hover:text-[#A54B2E] transition-colors">
                أوابد
              </span>
              <span className="text-sm font-extrabold text-[#A54B2E] tracking-widest font-sans uppercase">
                AWABID
              </span>
            </div>
            <span className="text-[10px] uppercase tracking-widest text-[#201C16]/70 font-semibold mt-0.5">
              حيث يُحكى التراث • Where Heritage Lives
            </span>
          </div>
        </button>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-[#201C160d] p-1.5 rounded-full border border-[#201C1615]">
          <button
            onClick={() => navigate('/')}
            className={`px-4 py-2 rounded-full text-xs uppercase tracking-widest font-sans font-semibold transition-all flex items-center gap-1.5 ${
              currentPath === '/'
                ? 'bg-[#A54B2E] text-[#F0EEE6] shadow-xs'
                : 'text-[#201C16] hover:bg-[#F0EEE6]'
            }`}
            id="nav-link-home"
          >
            <Compass className="w-4 h-4" />
            {t.navHome}
          </button>

          <button
            onClick={() => navigate('/sites')}
            className={`px-4 py-2 rounded-full text-xs uppercase tracking-widest font-sans font-semibold transition-all flex items-center gap-1.5 ${
              currentPath.startsWith('/sites')
                ? 'bg-[#A54B2E] text-[#F0EEE6] shadow-xs'
                : 'text-[#201C16] hover:bg-[#F0EEE6]'
            }`}
            id="nav-link-catalog"
          >
            <Sparkles className="w-4 h-4 text-[#C5A059]" />
            {t.navCatalog}
          </button>

          <button
            onClick={() => navigate('/planner')}
            className={`px-4 py-2 rounded-full text-xs uppercase tracking-widest font-sans font-semibold transition-all flex items-center gap-1.5 ${
              currentPath === '/planner'
                ? 'bg-[#A54B2E] text-[#F0EEE6] shadow-xs'
                : 'text-[#201C16] hover:bg-[#F0EEE6]'
            }`}
            id="nav-link-planner"
          >
            <Calendar className="w-4 h-4" />
            {t.navPlanner}
          </button>

          <button
            onClick={() => navigate('/chat')}
            className={`px-4 py-2 rounded-full text-xs uppercase tracking-widest font-sans font-semibold transition-all flex items-center gap-1.5 ${
              currentPath === '/chat'
                ? 'bg-[#A54B2E] text-[#F0EEE6] shadow-xs'
                : 'text-[#201C16] hover:bg-[#F0EEE6]'
            }`}
            id="nav-link-chat"
          >
            <MessageSquare className="w-4 h-4" />
            {t.navChat}
          </button>

          <button
            onClick={() => navigate('/dashboard')}
            className={`px-4 py-2 rounded-full text-xs uppercase tracking-widest font-sans font-semibold transition-all flex items-center gap-1.5 ${
              currentPath === '/dashboard'
                ? 'bg-[#A54B2E] text-[#F0EEE6] shadow-xs'
                : 'text-[#201C16] hover:bg-[#F0EEE6]'
            }`}
            id="nav-link-dashboard"
          >
            <BookmarkCheck className="w-4 h-4" />
            {t.navDashboard}
          </button>
        </nav>

        {/* Trilingual Switcher & Auth */}
        <div className="flex items-center gap-3">
          {/* Language Selector */}
          <div className="flex items-center bg-[#201C1611] rounded-full px-3 py-1 text-[10px] uppercase font-bold tracking-wider">
            <Globe className="w-3.5 h-3.5 text-[#A54B2E] me-1" />
            <button
              onClick={() => setLang('ar')}
              className={`px-2 py-0.5 rounded-full transition-all ${
                lang === 'ar'
                  ? 'bg-[#A54B2E] text-[#F0EEE6]'
                  : 'text-[#201C16] opacity-70 hover:opacity-100'
              }`}
              id="lang-ar-button"
            >
              AR
            </button>
            <span className="opacity-30 mx-0.5">|</span>
            <button
              onClick={() => setLang('en')}
              className={`px-2 py-0.5 rounded-full transition-all ${
                lang === 'en'
                  ? 'bg-[#A54B2E] text-[#F0EEE6]'
                  : 'text-[#201C16] opacity-70 hover:opacity-100'
              }`}
              id="lang-en-button"
            >
              EN
            </button>
            <span className="opacity-30 mx-0.5">|</span>
            <button
              onClick={() => setLang('zh')}
              className={`px-2 py-0.5 rounded-full transition-all ${
                lang === 'zh'
                  ? 'bg-[#A54B2E] text-[#F0EEE6]'
                  : 'text-[#201C16] opacity-70 hover:opacity-100'
              }`}
              id="lang-zh-button"
            >
              ZH
            </button>
          </div>

          {/* User Session Profile or Auth Button */}
          {user ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate('/dashboard')}
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#A54B2E]/30 bg-[#F8F6F0] text-xs font-medium text-[#201C16]"
              >
                <User className="w-3.5 h-3.5 text-[#A54B2E]" />
                <span className="max-w-[100px] truncate">{user.name || user.email}</span>
              </button>
              <button
                onClick={onSignOut}
                className="px-3 py-1.5 rounded-full text-xs font-medium text-[#A54B2E] hover:bg-[#A54B2E]/10 border border-[#A54B2E]/30 transition-colors"
                id="sign-out-button"
              >
                {t.navSignOut}
              </button>
            </div>
          ) : (
            <button
              onClick={() => navigate('/auth')}
              className="px-6 py-2 rounded-full bg-[#201C16] hover:bg-[#A54B2E] text-[#F0EEE6] text-xs font-sans uppercase tracking-widest transition-colors flex items-center gap-1.5"
              id="sign-in-button"
            >
              <User className="w-3.5 h-3.5" />
              {t.navSignIn}
            </button>
          )}
        </div>
      </div>

      {/* Mobile Sub-Nav */}
      <div className="md:hidden flex items-center justify-around py-2 border-t border-[#8B4513]/10 bg-[#F0EEE6] text-xs">
        <button
          onClick={() => navigate('/')}
          className={`px-2 py-1 flex flex-col items-center gap-0.5 ${
            currentPath === '/' ? 'text-[#8B4513] font-bold' : 'text-[#201C16]'
          }`}
        >
          <Compass className="w-4 h-4" />
          {t.navHome}
        </button>
        <button
          onClick={() => navigate('/sites')}
          className={`px-2 py-1 flex flex-col items-center gap-0.5 ${
            currentPath.startsWith('/sites') ? 'text-[#8B4513] font-bold' : 'text-[#201C16]'
          }`}
        >
          <Sparkles className="w-4 h-4 text-[#D4AF37]" />
          {t.navCatalog}
        </button>
        <button
          onClick={() => navigate('/planner')}
          className={`px-2 py-1 flex flex-col items-center gap-0.5 ${
            currentPath === '/planner' ? 'text-[#8B4513] font-bold' : 'text-[#201C16]'
          }`}
        >
          <Calendar className="w-4 h-4" />
          {t.navPlanner}
        </button>
        <button
          onClick={() => navigate('/chat')}
          className={`px-2 py-1 flex flex-col items-center gap-0.5 ${
            currentPath === '/chat' ? 'text-[#8B4513] font-bold' : 'text-[#201C16]'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          {t.navChat}
        </button>
        <button
          onClick={() => navigate('/dashboard')}
          className={`px-2 py-1 flex flex-col items-center gap-0.5 ${
            currentPath === '/dashboard' ? 'text-[#8B4513] font-bold' : 'text-[#201C16]'
          }`}
        >
          <BookmarkCheck className="w-4 h-4" />
          {t.navDashboard}
        </button>
      </div>
    </header>
  );
};
