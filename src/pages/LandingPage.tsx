import React from 'react';
import { HERITAGE_SITES } from '../data/sites';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { SiteCard } from '../components/SiteCard';
import { Compass, Calendar, ArrowRight, ShieldCheck, Sparkles, BookOpen, Volume2 } from 'lucide-react';

interface LandingPageProps {
  lang: Language;
  navigate: (path: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ lang, navigate }) => {
  const t = TRANSLATIONS[lang];
  const featuredSites = HERITAGE_SITES.slice(0, 3);

  return (
    <div className="space-y-24 pb-12">
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center space-y-6 max-w-4xl mx-auto">
          {/* Tagline Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E6E1D3] border border-[#8B4513]/30 text-[#8B4513] text-xs font-bold tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>{t.appName} — {t.tagline}</span>
          </div>

          {/* Hero Main Heading */}
          <h1 className="font-ruqaa text-5xl sm:text-6xl md:text-7xl font-bold text-[#201C16] leading-tight">
            {t.heroTitle}
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-[#201C16]/80 font-serif-heritage leading-relaxed max-w-2xl mx-auto">
            {t.heroSubtitle}
          </p>

          {/* CTA Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigate('/sites')}
              className="w-full sm:w-auto px-8 py-4 bg-[#8B4513] hover:bg-[#6D340E] text-[#F0EEE6] rounded-full font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group"
              id="hero-cta-explore"
            >
              <Compass className="w-4 h-4 text-[#D4AF37]" />
              <span>{t.heroCtaExplore}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => navigate('/planner')}
              className="w-full sm:w-auto px-8 py-4 bg-[#F8F6F0] hover:bg-[#E6E1D3] text-[#8B4513] border-2 border-[#8B4513]/40 rounded-full font-bold text-sm transition-all flex items-center justify-center gap-2"
              id="hero-cta-planner"
            >
              <Calendar className="w-4 h-4 text-[#8B4513]" />
              <span>{t.heroCtaPlanner}</span>
            </button>
          </div>
        </div>

        {/* Stats Banner */}
        <div className="mt-16 bg-[#F8F6F0] rounded-2xl border border-[#8B4513]/20 p-6 max-w-4xl mx-auto shadow-xs grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="space-y-1">
            <span className="font-ruqaa text-3xl font-bold text-[#8B4513] block">6</span>
            <span className="text-xs font-serif-heritage text-[#201C16]/80 font-medium block">
              {t.statSitesCount}
            </span>
          </div>

          <div className="space-y-1 sm:border-x border-[#8B4513]/20">
            <span className="font-ruqaa text-3xl font-bold text-[#8B4513] block">3</span>
            <span className="text-xs font-serif-heritage text-[#201C16]/80 font-medium block">
              {t.statLanguages}
            </span>
          </div>

          <div className="space-y-1">
            <span className="font-ruqaa text-3xl font-bold text-[#8B4513] block">100%</span>
            <span className="text-xs font-serif-heritage text-[#201C16]/80 font-medium block">
              {t.statGrounded}
            </span>
          </div>
        </div>
      </section>

      {/* Featured Sites Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="font-ruqaa text-3xl sm:text-4xl font-bold text-[#201C16]">
              {t.catalogTitle}
            </h2>
            <p className="text-sm font-serif-heritage text-[#8B4513] mt-1">
              {t.catalogSubtitle}
            </p>
          </div>

          <button
            onClick={() => navigate('/sites')}
            className="text-xs font-bold text-[#8B4513] hover:text-[#201C16] flex items-center gap-1 group transition-colors"
          >
            <span>{t.heroCtaExplore}</span>
            <ArrowRight className="w-4 h-4 rtl:rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredSites.map((site) => (
            <SiteCard
              key={site.id}
              site={site}
              lang={lang}
              onSelect={(id) => navigate(`/sites/${id}`)}
            />
          ))}
        </div>
      </section>

      {/* Storyteller Quote Banner */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#201C16] text-[#F0EEE6] rounded-3xl p-8 sm:p-12 border-2 border-[#D4AF37] relative overflow-hidden shadow-xl text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-[#8B4513] border-2 border-[#D4AF37] mx-auto flex items-center justify-center text-3xl font-ruqaa text-[#D4AF37]">
            أ
          </div>
          <span className="text-xs font-serif-heritage text-[#D4AF37] tracking-widest uppercase block">
            {t.storytellerName} — {t.storytellerRole}
          </span>
          <blockquote className="font-ruqaa text-2xl sm:text-3xl text-[#F0EEE6] leading-relaxed max-w-3xl mx-auto">
            {t.quoteText}
          </blockquote>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-12">
          <h2 className="font-ruqaa text-3xl sm:text-4xl font-bold text-[#201C16]">
            {t.howItWorksTitle}
          </h2>
          <p className="text-sm font-serif-heritage text-[#8B4513]">
            {t.howItWorksSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#F8F6F0] p-8 rounded-2xl border border-[#8B4513]/20 space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-[#8B4513]/10 text-[#8B4513] mx-auto flex items-center justify-center">
              <Volume2 className="w-6 h-6" />
            </div>
            <h3 className="font-ruqaa text-xl font-bold text-[#201C16]">{t.step1Title}</h3>
            <p className="text-xs text-[#201C16]/80 leading-relaxed font-serif-heritage">{t.step1Desc}</p>
          </div>

          <div className="bg-[#F8F6F0] p-8 rounded-2xl border border-[#8B4513]/20 space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-[#8B4513]/10 text-[#8B4513] mx-auto flex items-center justify-center">
              <Calendar className="w-6 h-6" />
            </div>
            <h3 className="font-ruqaa text-xl font-bold text-[#201C16]">{t.step2Title}</h3>
            <p className="text-xs text-[#201C16]/80 leading-relaxed font-serif-heritage">{t.step2Desc}</p>
          </div>

          <div className="bg-[#F8F6F0] p-8 rounded-2xl border border-[#8B4513]/20 space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-[#8B4513]/10 text-[#8B4513] mx-auto flex items-center justify-center">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="font-ruqaa text-xl font-bold text-[#201C16]">{t.step3Title}</h3>
            <p className="text-xs text-[#201C16]/80 leading-relaxed font-serif-heritage">{t.step3Desc}</p>
          </div>
        </div>
      </section>

      {/* Why It's Different */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#E6E1D3]/60 rounded-3xl p-8 sm:p-12 border border-[#8B4513]/20">
          <div className="text-center space-y-2 mb-10">
            <h2 className="font-ruqaa text-3xl font-bold text-[#201C16]">
              {t.whyDifferentTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2 p-4 bg-[#F8F6F0] rounded-xl border border-[#8B4513]/15">
              <ShieldCheck className="w-6 h-6 text-[#8B4513]" />
              <h4 className="font-bold text-sm text-[#201C16]">{t.diff1Title}</h4>
              <p className="text-xs text-[#201C16]/80 leading-relaxed">{t.diff1Desc}</p>
            </div>

            <div className="space-y-2 p-4 bg-[#F8F6F0] rounded-xl border border-[#8B4513]/15">
              <Calendar className="w-6 h-6 text-[#8B4513]" />
              <h4 className="font-bold text-sm text-[#201C16]">{t.diff2Title}</h4>
              <p className="text-xs text-[#201C16]/80 leading-relaxed">{t.diff2Desc}</p>
            </div>

            <div className="space-y-2 p-4 bg-[#F8F6F0] rounded-xl border border-[#8B4513]/15">
              <Sparkles className="w-6 h-6 text-[#8B4513]" />
              <h4 className="font-bold text-sm text-[#201C16]">{t.diff3Title}</h4>
              <p className="text-xs text-[#201C16]/80 leading-relaxed">{t.diff3Desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <h2 className="font-ruqaa text-4xl font-bold text-[#201C16]">
          {t.closingCtaTitle}
        </h2>
        <p className="text-sm font-serif-heritage text-[#8B4513] max-w-xl mx-auto">
          {t.closingCtaSub}
        </p>
        <button
          onClick={() => navigate('/sites')}
          className="px-8 py-4 bg-[#8B4513] hover:bg-[#6D340E] text-[#F0EEE6] rounded-full font-bold text-sm shadow-md transition-all inline-flex items-center gap-2"
        >
          <span>{t.heroCtaExplore}</span>
          <ArrowRight className="w-4 h-4 rtl:rotate-180" />
        </button>
      </section>
    </div>
  );
};
