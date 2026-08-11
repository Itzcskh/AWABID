import React from 'react';
import { HeritageSite, Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { MapPin, Clock, Award, ArrowRight } from 'lucide-react';

interface SiteCardProps {
  site: HeritageSite;
  lang: Language;
  onSelect: (siteId: string) => void;
}

export const SiteCard: React.FC<SiteCardProps> = ({ site, lang, onSelect }) => {
  const t = TRANSLATIONS[lang];

  return (
    <div
      onClick={() => onSelect(site.id)}
      className="group bg-[#F8F6F0] rounded-2xl border border-[#201C161a] overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col h-full hover:-translate-y-1"
      id={`site-card-${site.id}`}
    >
      {/* Photo with Arch Frame Header */}
      <div className="relative h-56 overflow-hidden bg-[#201C16] p-3 pb-0 flex justify-center items-end">
        {/* Decorative Arch Border Frame */}
        <div className="w-full h-full relative rounded-t-full border-t-2 border-x-2 border-[#C5A059]/80 overflow-hidden shadow-inner">
          <img
            src={site.imageUrl}
            alt={site.name[lang]}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#201C16]/80 via-transparent to-transparent" />
        </div>

        {/* UNESCO Badge */}
        {site.unescoStatus && (
          <div className="absolute top-5 start-5 z-10 bg-[#A54B2E] text-[#F0EEE6] text-[11px] font-semibold px-2.5 py-1 rounded-full border border-[#C5A059] shadow-sm flex items-center gap-1">
            <Award className="w-3 h-3 text-[#C5A059]" />
            <span>UNESCO {site.unescoYear}</span>
          </div>
        )}

        {/* Region Tag */}
        <div className="absolute bottom-3 start-5 z-10 flex items-center gap-1 text-xs text-[#F0EEE6] font-medium bg-[#201C16]/80 backdrop-blur-xs px-2.5 py-0.5 rounded-md border border-[#F0EEE6]/20">
          <MapPin className="w-3 h-3 text-[#C5A059]" />
          <span>{site.region[lang]}</span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h3 className="font-ruqaa text-2xl font-bold text-[#201C16] group-hover:text-[#A54B2E] transition-colors line-clamp-1">
            {site.name[lang]}
          </h3>
          <p className="text-xs font-serif-heritage text-[#A54B2E] font-medium italic mt-0.5 line-clamp-1">
            {site.tagline[lang]}
          </p>
          <p className="text-xs text-[#201C16]/80 leading-relaxed mt-2.5 line-clamp-2">
            {site.brief[lang]}
          </p>
        </div>

        {/* Meta Specs */}
        <div className="pt-3 border-t border-[#201C1615] flex items-center justify-between text-xs text-[#201C16]/70">
          <div className="flex items-center gap-1" title={t.drivingTimeLabel}>
            <Clock className="w-3.5 h-3.5 text-[#A54B2E]" />
            <span className="truncate max-w-[140px]">{site.drivingTimeFromRiyadh[lang]}</span>
          </div>
          <div className="font-bold text-[#A54B2E]">
            {site.startingPriceSar} {t.sarUnit}
          </div>
        </div>

        {/* CTA Button */}
        <div className="w-full py-2 bg-[#A54B2E]/10 hover:bg-[#A54B2E] text-[#A54B2E] hover:text-[#F0EEE6] rounded-xl font-bold text-xs transition-colors text-center flex items-center justify-center gap-1.5 group-hover:bg-[#A54B2E] group-hover:text-[#F0EEE6]">
          <span>{t.narrateButton}</span>
          <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
        </div>
      </div>
    </div>
  );
};
