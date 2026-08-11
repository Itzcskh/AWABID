import React, { useState, useMemo } from 'react';
import { HERITAGE_SITES } from '../data/sites';
import { Language, SiteNature } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { SiteCard } from '../components/SiteCard';
import { Search, Award, Sparkles } from 'lucide-react';

interface CatalogPageProps {
  lang: Language;
  navigate: (path: string) => void;
}

export const CatalogPage: React.FC<CatalogPageProps> = ({ lang, navigate }) => {
  const t = TRANSLATIONS[lang];

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [selectedNature, setSelectedNature] = useState<string>('all');
  const [unescoOnly, setUnescoOnly] = useState(false);

  // Region options
  const regions = [
    { id: 'all', label: t.filterRegionAll },
    { id: 'Riyadh Region', label: lang === 'ar' ? 'الرياض' : lang === 'zh' ? '利雅得' : 'Riyadh' },
    { id: 'AlUla', label: lang === 'ar' ? 'العلا' : lang === 'zh' ? '埃尔奥拉' : 'AlUla' },
    { id: 'Makkah Region (Jeddah)', label: lang === 'ar' ? 'مكة / جدة' : lang === 'zh' ? '麦加/吉达' : 'Makkah/Jeddah' },
    { id: 'Asir Region', label: lang === 'ar' ? 'عسير' : lang === 'zh' ? '阿西尔' : 'Asir' },
    { id: 'Eastern Province', label: lang === 'ar' ? 'الشرقية' : lang === 'zh' ? '东部省' : 'Eastern' },
  ];

  // Filter logic
  const filteredSites = useMemo(() => {
    return HERITAGE_SITES.filter((site) => {
      // Text Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const nameMatch = Object.values(site.name).some((n) => n.toLowerCase().includes(q));
        const regionMatch = Object.values(site.region).some((r) => r.toLowerCase().includes(q));
        const briefMatch = Object.values(site.brief).some((b) => b.toLowerCase().includes(q));
        if (!nameMatch && !regionMatch && !briefMatch) return false;
      }

      // Region Filter
      if (selectedRegion !== 'all' && site.region.en !== selectedRegion) {
        return false;
      }

      // Nature Filter
      if (selectedNature !== 'all' && site.nature !== selectedNature) {
        return false;
      }

      // UNESCO Filter
      if (unescoOnly && !site.unescoStatus) {
        return false;
      }

      return true;
    });
  }, [searchQuery, selectedRegion, selectedNature, unescoOnly]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <h1 className="font-ruqaa text-4xl sm:text-5xl font-bold text-[#201C16]">
          {t.catalogTitle}
        </h1>
        <p className="text-sm font-serif-heritage text-[#8B4513]">
          {t.catalogSubtitle}
        </p>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-[#F8F6F0] rounded-2xl border border-[#8B4513]/20 p-5 space-y-4 shadow-xs">
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-5 h-5 text-[#8B4513] absolute top-3.5 start-4" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full bg-[#F0EEE6] border border-[#8B4513]/30 rounded-xl ps-12 pe-4 py-3 text-sm text-[#201C16] placeholder-[#201C16]/50 focus:outline-hidden focus:border-[#8B4513]"
            id="catalog-search-input"
          />
        </div>

        {/* Region Chips & Nature/UNESCO Toggles */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-2 border-t border-[#8B4513]/10">
          {/* Region Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {regions.map((reg) => (
              <button
                key={reg.id}
                onClick={() => setSelectedRegion(reg.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                  selectedRegion === reg.id
                    ? 'bg-[#8B4513] text-[#F0EEE6] font-bold shadow-xs'
                    : 'bg-[#E6E1D3]/80 text-[#201C16] hover:bg-[#8B4513]/20'
                }`}
              >
                {reg.label}
              </button>
            ))}
          </div>

          {/* Filters: Site Nature & UNESCO */}
          <div className="flex items-center gap-3">
            {/* Nature Selector */}
            <select
              value={selectedNature}
              onChange={(e) => setSelectedNature(e.target.value)}
              className="bg-[#E6E1D3]/80 border border-[#8B4513]/30 rounded-full px-3 py-1.5 text-xs font-bold text-[#201C16] focus:outline-hidden"
              id="nature-filter-select"
            >
              <option value="all">{t.filterTypeAll}</option>
              <option value="outdoor">{t.filterOutdoor}</option>
              <option value="mixed">{t.filterMixed}</option>
              <option value="indoor">{t.filterIndoor}</option>
            </select>

            {/* UNESCO Toggle */}
            <button
              onClick={() => setUnescoOnly(!unescoOnly)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 border ${
                unescoOnly
                  ? 'bg-[#8B4513] text-[#F0EEE6] border-[#D4AF37]'
                  : 'bg-[#E6E1D3]/80 text-[#201C16] border-[#8B4513]/20 hover:bg-[#8B4513]/20'
              }`}
              id="unesco-toggle-button"
            >
              <Award className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{t.unescoOnlyToggle}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Match Counter */}
      <div className="flex items-center justify-between text-xs text-[#8B4513] font-semibold px-2">
        <span>{t.matchCount.replace('{count}', String(filteredSites.length))}</span>
      </div>

      {/* Grid Results */}
      {filteredSites.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSites.map((site) => (
            <SiteCard
              key={site.id}
              site={site}
              lang={lang}
              onSelect={(id) => navigate(`/sites/${id}`)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-[#F8F6F0] rounded-2xl border border-[#8B4513]/20 p-8 space-y-4">
          <Sparkles className="w-10 h-10 text-[#8B4513] mx-auto opacity-50" />
          <p className="text-sm font-serif-heritage text-[#201C16] font-semibold">
            {t.noSitesFound}
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedRegion('all');
              setSelectedNature('all');
              setUnescoOnly(false);
            }}
            className="px-4 py-2 bg-[#8B4513] text-[#F0EEE6] rounded-full text-xs font-bold hover:bg-[#6D340E] transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};
