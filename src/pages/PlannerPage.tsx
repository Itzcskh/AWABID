import React, { useState } from 'react';
import { HERITAGE_SITES } from '../data/sites';
import { DayPlannerPlan, Language, PrayerTimes } from '../types';
import { TRANSLATIONS } from '../data/translations';
import {
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  Utensils,
  Car,
  Compass,
  Sun,
  Moon,
  CheckCircle2,
} from 'lucide-react';

interface PlannerPageProps {
  lang: Language;
  initialSiteId?: string;
  navigate: (path: string) => void;
}

export const PlannerPage: React.FC<PlannerPageProps> = ({
  lang,
  initialSiteId,
  navigate,
}) => {
  const t = TRANSLATIONS[lang];

  // Default Riyadh Prayer Times
  const defaultPrayers: PrayerTimes = {
    fajr: '05:05',
    sunrise: '06:20',
    dhuhr: '12:15',
    asr: '15:35',
    maghrib: '18:10',
    sunset: '18:05',
    isha: '19:40',
  };

  const [selectedSiteIds, setSelectedSiteIds] = useState<string[]>(
    initialSiteId ? [initialSiteId] : ['diriyah', 'historic-jeddah']
  );

  const [prayerTimes, setPrayerTimes] = useState<PrayerTimes>(defaultPrayers);
  const [plannerResult, setPlannerResult] = useState<DayPlannerPlan | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Toggle Site Selection
  const toggleSiteSelection = (id: string) => {
    if (selectedSiteIds.includes(id)) {
      if (selectedSiteIds.length === 1) return; // Must keep at least 1 site
      setSelectedSiteIds(selectedSiteIds.filter((s) => s !== id));
    } else {
      setSelectedSiteIds([...selectedSiteIds, id]);
    }
  };

  // Generate Itinerary
  const handleGenerateItinerary = async () => {
    setIsGenerating(true);
    setErrorMsg(null);

    try {
      const siteNames = selectedSiteIds
        .map((id) => {
          const s = HERITAGE_SITES.find((x) => x.id === id);
          return s ? `${s.name[lang]} (${s.nature})` : id;
        });

      const res = await fetch('/api/planner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          siteIds: siteNames,
          prayerTimes,
          language: lang,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to generate itinerary');
      }

      setPlannerResult(data);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Error creating itinerary');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Page Header */}
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E6E1D3] text-[#8B4513] text-xs font-bold">
          <Calendar className="w-3.5 h-3.5" />
          <span>AI Itinerary Engine</span>
        </div>
        <h1 className="font-ruqaa text-4xl sm:text-5xl font-bold text-[#201C16]">
          {t.plannerTitle}
        </h1>
        <p className="text-sm font-serif-heritage text-[#8B4513]">
          {t.plannerSubtitle}
        </p>
      </div>

      {/* Inputs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* 1. Site Multi-Select */}
        <div className="lg:col-span-7 bg-[#F8F6F0] rounded-2xl border border-[#8B4513]/20 p-6 space-y-4 shadow-xs">
          <h3 className="font-ruqaa text-2xl font-bold text-[#201C16]">
            {t.selectSitesLabel}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {HERITAGE_SITES.map((site) => {
              const isSelected = selectedSiteIds.includes(site.id);
              return (
                <div
                  key={site.id}
                  onClick={() => toggleSiteSelection(site.id)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center gap-3 ${
                    isSelected
                      ? 'bg-[#8B4513] text-[#F0EEE6] border-[#D4AF37] shadow-xs'
                      : 'bg-[#F0EEE6] text-[#201C16] border-[#8B4513]/20 hover:border-[#8B4513]'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-md flex items-center justify-center border text-xs font-bold ${
                      isSelected ? 'bg-[#D4AF37] border-[#D4AF37] text-[#201C16]' : 'border-[#8B4513]/40'
                    }`}
                  >
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-[#201C16]" />}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="font-ruqaa text-lg font-bold truncate leading-tight">
                      {site.name[lang]}
                    </h4>
                    <span
                      className={`text-[11px] font-semibold block truncate ${
                        isSelected ? 'text-[#D4AF37]' : 'text-[#8B4513]'
                      }`}
                    >
                      {site.nature === 'outdoor'
                        ? t.filterOutdoor
                        : site.nature === 'indoor'
                        ? t.filterIndoor
                        : t.filterMixed}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. Prayer Times & Weather Input */}
        <div className="lg:col-span-5 bg-[#F8F6F0] rounded-2xl border border-[#8B4513]/20 p-6 space-y-4 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-ruqaa text-2xl font-bold text-[#201C16]">
                {t.enterPrayersLabel}
              </h3>
              <button
                type="button"
                onClick={() => setPrayerTimes(defaultPrayers)}
                className="text-[11px] font-bold text-[#8B4513] hover:underline"
              >
                {t.autofillPrayersBtn}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-[#8B4513] font-bold mb-1">الفجر (Fajr)</label>
                <input
                  type="time"
                  value={prayerTimes.fajr}
                  onChange={(e) => setPrayerTimes({ ...prayerTimes, fajr: e.target.value })}
                  className="w-full bg-[#F0EEE6] border border-[#8B4513]/30 rounded-lg p-2 text-[#201C16]"
                />
              </div>

              <div>
                <label className="block text-[#8B4513] font-bold mb-1">الظهر (Dhuhr)</label>
                <input
                  type="time"
                  value={prayerTimes.dhuhr}
                  onChange={(e) => setPrayerTimes({ ...prayerTimes, dhuhr: e.target.value })}
                  className="w-full bg-[#F0EEE6] border border-[#8B4513]/30 rounded-lg p-2 text-[#201C16]"
                />
              </div>

              <div>
                <label className="block text-[#8B4513] font-bold mb-1">العصر (Asr)</label>
                <input
                  type="time"
                  value={prayerTimes.asr}
                  onChange={(e) => setPrayerTimes({ ...prayerTimes, asr: e.target.value })}
                  className="w-full bg-[#F0EEE6] border border-[#8B4513]/30 rounded-lg p-2 text-[#201C16]"
                />
              </div>

              <div>
                <label className="block text-[#8B4513] font-bold mb-1">المغرب (Maghrib)</label>
                <input
                  type="time"
                  value={prayerTimes.maghrib}
                  onChange={(e) => setPrayerTimes({ ...prayerTimes, maghrib: e.target.value })}
                  className="w-full bg-[#F0EEE6] border border-[#8B4513]/30 rounded-lg p-2 text-[#201C16]"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-[#8B4513] font-bold mb-1">العشاء (Isha)</label>
                <input
                  type="time"
                  value={prayerTimes.isha}
                  onChange={(e) => setPrayerTimes({ ...prayerTimes, isha: e.target.value })}
                  className="w-full bg-[#F0EEE6] border border-[#8B4513]/30 rounded-lg p-2 text-[#201C16]"
                />
              </div>
            </div>
          </div>

          <button
            onClick={handleGenerateItinerary}
            disabled={isGenerating}
            className="w-full py-4 bg-[#8B4513] hover:bg-[#6D340E] text-[#F0EEE6] font-bold rounded-xl shadow-md transition-colors text-sm flex items-center justify-center gap-2 mt-4 disabled:opacity-50"
            id="generate-itinerary-button"
          >
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span>{isGenerating ? t.generatingItinerary : t.generateItineraryBtn}</span>
          </button>
        </div>
      </div>

      {/* Error Message */}
      {errorMsg && (
        <div className="p-4 bg-amber-50 border border-amber-300 rounded-xl text-xs text-amber-900">
          {errorMsg}
        </div>
      )}

      {/* ITINERARY RESULTS TIMELINE */}
      {plannerResult && (
        <div className="bg-[#F8F6F0] rounded-3xl border-2 border-[#8B4513]/30 p-6 sm:p-10 space-y-8 shadow-md animate-fadeIn">
          {/* Summary Banner */}
          <div className="bg-[#201C16] text-[#F0EEE6] p-6 rounded-2xl border border-[#D4AF37] space-y-3">
            <div className="flex items-center gap-2 text-[#D4AF37]">
              <div className="w-8 h-8 rounded-full bg-[#8B4513] font-ruqaa text-lg font-bold flex items-center justify-center border border-[#D4AF37]">
                أ
              </div>
              <span className="font-ruqaa text-xl font-bold">{t.itineraryResultsTitle}</span>
            </div>
            <p className="font-serif-heritage text-sm text-[#E6E1D3] leading-relaxed">
              "{plannerResult.abuFaisalSummary}"
            </p>
          </div>

          {/* Timeline Items */}
          <div className="space-y-6 relative before:absolute before:inset-0 before:start-6 before:w-0.5 before:bg-[#8B4513]/30">
            {plannerResult.timeline.map((item, index) => {
              const isPrayer = item.activityType === 'prayer';
              const isMeal = item.activityType === 'meal';
              const isTravel = item.activityType === 'travel';

              return (
                <div key={index} className="relative flex items-start gap-4 ps-12">
                  {/* Timeline Dot */}
                  <div
                    className={`absolute start-3 top-1 w-6 h-6 rounded-full border-2 flex items-center justify-center -translate-x-1/2 text-xs font-bold shadow-xs ${
                      isPrayer
                        ? 'bg-amber-800 border-amber-400 text-amber-100'
                        : isMeal
                        ? 'bg-emerald-800 border-emerald-400 text-emerald-100'
                        : isTravel
                        ? 'bg-blue-800 border-blue-400 text-blue-100'
                        : 'bg-[#8B4513] border-[#D4AF37] text-[#F0EEE6]'
                    }`}
                  >
                    {isPrayer ? (
                      <Moon className="w-3 h-3" />
                    ) : isMeal ? (
                      <Utensils className="w-3 h-3" />
                    ) : isTravel ? (
                      <Car className="w-3 h-3" />
                    ) : (
                      <Compass className="w-3 h-3" />
                    )}
                  </div>

                  {/* Timeline Card */}
                  <div
                    className={`flex-1 p-5 rounded-2xl border text-start space-y-2 shadow-xs ${
                      isPrayer
                        ? 'bg-amber-50/80 border-amber-300'
                        : isMeal
                        ? 'bg-emerald-50/80 border-emerald-300'
                        : isTravel
                        ? 'bg-blue-50/80 border-blue-300'
                        : 'bg-[#F0EEE6] border-[#8B4513]/30'
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#8B4513]/10 pb-2">
                      <span className="font-bold text-sm text-[#8B4513] flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        {item.timeSlot}
                      </span>
                      {item.location && (
                        <span className="text-xs font-semibold text-[#201C16]/70 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-[#8B4513]" />
                          {item.location}
                        </span>
                      )}
                    </div>

                    <h4 className="font-ruqaa text-2xl font-bold text-[#201C16]">{item.title}</h4>
                    <p className="text-xs text-[#201C16]/80 leading-relaxed font-serif-heritage">
                      {item.description}
                    </p>

                    {item.storytellerNotes && (
                      <div className="pt-2 text-xs text-[#8B4513] font-serif-heritage italic">
                        💡 Abu Faisal: {item.storytellerNotes}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
