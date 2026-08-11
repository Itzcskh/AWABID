import React, { useState, useEffect, useRef } from 'react';
import { HERITAGE_SITES } from '../data/sites';
import { Language, StoryResponse, UserSession } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { BookingModal } from '../components/BookingModal';
import { splitTextIntoChunks, SequentialAudioPlayer } from '../lib/ttsUtils';
import {
  MapPin,
  Clock,
  Award,
  Calendar,
  MessageSquare,
  BookmarkPlus,
  Play,
  Pause,
  Volume2,
  ExternalLink,
  ChevronRight,
  Globe,
  Sparkles,
} from 'lucide-react';

interface SiteDetailPageProps {
  siteId: string;
  lang: Language;
  user: UserSession | null;
  navigate: (path: string) => void;
}

export const SiteDetailPage: React.FC<SiteDetailPageProps> = ({
  siteId,
  lang,
  user,
  navigate,
}) => {
  const t = TRANSLATIONS[lang];
  const site = HERITAGE_SITES.find((s) => s.id === siteId) || HERITAGE_SITES[0];

  const [narrationLang, setNarrationLang] = useState<Language>(lang);
  const [storyData, setStoryData] = useState<StoryResponse | null>(null);
  const [isLoadingStory, setIsLoadingStory] = useState(false);
  const [storyError, setStoryError] = useState<string | null>(null);

  // Audio Player State
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const playerRef = useRef<SequentialAudioPlayer | null>(null);

  const [ttsProvider, setTtsProvider] = useState<{ hasElevenLabs: boolean; defaultEngine: string } | null>(null);

  // Check active TTS Provider on mount
  useEffect(() => {
    fetch('/api/tts/provider')
      .then((res) => res.json())
      .then((data) => setTtsProvider(data))
      .catch((err) => console.warn('TTS provider check failed:', err));
  }, []);

  // Booking Modal State
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingRefSuccess, setBookingRefSuccess] = useState<string | null>(null);

  // Synchronize narration language when global language changes
  useEffect(() => {
    setNarrationLang(lang);
  }, [lang]);

  // Clean up audio player on unmount or site change
  useEffect(() => {
    return () => {
      if (playerRef.current) {
        playerRef.current.stop();
      }
    };
  }, [siteId]);

  // Handle "Tell me the story" fetch
  const handleGenerateStory = async (selectedLang: Language = narrationLang) => {
    if (playerRef.current) {
      playerRef.current.stop();
      setIsPlaying(false);
    }

    setIsLoadingStory(true);
    setStoryError(null);
    setStoryData(null);

    try {
      const res = await fetch('/api/story', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          siteId: site.id,
          siteName: site.name[selectedLang],
          region: site.region[selectedLang],
          brief: site.brief[selectedLang],
          language: selectedLang,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to fetch story');
      }

      setStoryData(data);

      // Prepare instant chunked TTS Audio
      const chunks = splitTextIntoChunks(data.storyText);
      const audioUrls = chunks.map(
        (chunk) => `/api/tts?text=${encodeURIComponent(chunk)}&lang=${selectedLang}&voiceId=wyC6KvCMTAXGbiCKlfSx&t=${Date.now()}`
      );

      const player = new SequentialAudioPlayer(
        audioUrls,
        () => setIsPlaying(false),
        (percent) => setAudioProgress(percent)
      );
      playerRef.current = player;

      // Auto play story
      player.play();
      setIsPlaying(true);
    } catch (err: any) {
      console.error(err);
      setStoryError(err.message || 'Error generating story');
    } finally {
      setIsLoadingStory(false);
    }
  };

  // Toggle Audio Play / Pause
  const togglePlayPause = () => {
    if (!playerRef.current) return;
    if (isPlaying) {
      playerRef.current.pause();
      setIsPlaying(false);
    } else {
      playerRef.current.play();
      setIsPlaying(true);
    }
  };

  // Get Next Site index
  const currentIndex = HERITAGE_SITES.findIndex((s) => s.id === site.id);
  const nextSite = HERITAGE_SITES[(currentIndex + 1) % HERITAGE_SITES.length];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Top Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-[#8B4513] font-medium">
        <button onClick={() => navigate('/sites')} className="hover:underline">
          {t.navCatalog}
        </button>
        <ChevronRight className="w-3.5 h-3.5 rtl:rotate-180" />
        <span className="text-[#201C16] font-bold">{site.name[lang]}</span>
      </div>

      {/* Main Arch-Framed Header Banner */}
      <div className="bg-[#201C16] rounded-3xl p-6 sm:p-10 border-2 border-[#D4AF37] relative overflow-hidden shadow-xl text-[#F0EEE6]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Arch Frame Photo Container */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-sm h-80 rounded-t-full border-4 border-[#D4AF37] overflow-hidden relative shadow-2xl bg-[#201C16]">
              <img
                src={site.imageUrl}
                alt={site.name[lang]}
                className="w-full h-full object-cover"
              />
              {site.unescoStatus && (
                <div className="absolute top-4 start-4 z-10 bg-[#8B4513] text-[#F0EEE6] text-xs font-bold px-3 py-1 rounded-full border border-[#D4AF37] shadow-sm flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-[#D4AF37]" />
                  <span>UNESCO {site.unescoYear}</span>
                </div>
              )}
            </div>
          </div>

          {/* Site Overview */}
          <div className="lg:col-span-7 space-y-4 text-center lg:text-start">
            <div className="inline-flex items-center gap-1.5 bg-[#8B4513]/40 border border-[#D4AF37]/50 px-3 py-1 rounded-full text-xs text-[#D4AF37] font-semibold">
              <MapPin className="w-3.5 h-3.5" />
              <span>{site.region[lang]}</span>
            </div>

            <h1 className="font-ruqaa text-4xl sm:text-5xl font-bold text-[#F0EEE6] leading-tight">
              {site.name[lang]}
            </h1>

            <p className="font-serif-heritage text-base text-[#D4AF37] italic">
              "{site.tagline[lang]}"
            </p>

            <p className="text-sm text-[#E6E1D3]/90 leading-relaxed max-w-xl">
              {site.brief[lang]}
            </p>

            {/* Quick Action Buttons */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <button
                onClick={() => setIsBookingOpen(true)}
                className="px-6 py-3 bg-[#8B4513] hover:bg-[#6D340E] text-[#F0EEE6] rounded-full font-bold text-xs sm:text-sm border border-[#D4AF37] shadow-md transition-colors flex items-center gap-2"
                id="btn-book-visit"
              >
                <BookmarkPlus className="w-4 h-4 text-[#D4AF37]" />
                <span>{t.btnBookVisit}</span>
              </button>

              <button
                onClick={() => navigate(`/planner?siteId=${site.id}`)}
                className="px-5 py-3 bg-[#F0EEE6]/10 hover:bg-[#F0EEE6]/20 text-[#F0EEE6] border border-[#F0EEE6]/30 rounded-full font-semibold text-xs sm:text-sm transition-colors flex items-center gap-2"
                id="btn-plan-day"
              >
                <Calendar className="w-4 h-4" />
                <span>{t.btnPlanDay}</span>
              </button>

              <button
                onClick={() => navigate(`/chat?siteId=${site.id}`)}
                className="px-5 py-3 bg-[#F0EEE6]/10 hover:bg-[#F0EEE6]/20 text-[#F0EEE6] border border-[#F0EEE6]/30 rounded-full font-semibold text-xs sm:text-sm transition-colors flex items-center gap-2"
                id="btn-ask-storyteller"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{t.btnAskStoryteller}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Spec Sheet Grid */}
      <div className="bg-[#F8F6F0] rounded-2xl border border-[#8B4513]/20 p-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center shadow-xs">
        <div className="space-y-1">
          <span className="text-xs font-serif-heritage text-[#8B4513] font-semibold block">{t.bestTimeLabel}</span>
          <span className="text-xs font-bold text-[#201C16] block">{site.bestVisitTime[lang]}</span>
        </div>

        <div className="space-y-1 md:border-s border-[#8B4513]/15">
          <span className="text-xs font-serif-heritage text-[#8B4513] font-semibold block">{t.crowdLabel}</span>
          <span className="text-xs font-bold text-[#201C16] block">{site.crowdProfile[lang]}</span>
        </div>

        <div className="space-y-1 border-s border-[#8B4513]/15">
          <span className="text-xs font-serif-heritage text-[#8B4513] font-semibold block">{t.drivingTimeLabel}</span>
          <span className="text-xs font-bold text-[#201C16] block">{site.drivingTimeFromRiyadh[lang]}</span>
        </div>

        <div className="space-y-1 border-s border-[#8B4513]/15">
          <span className="text-xs font-serif-heritage text-[#8B4513] font-semibold block">{t.startingPriceLabel}</span>
          <span className="font-ruqaa text-2xl font-bold text-[#8B4513] block">
            {site.startingPriceSar} {t.sarUnit}
          </span>
        </div>
      </div>

      {/* STORYTELLER NARRATION SECTION */}
      <div className="bg-[#F8F6F0] rounded-3xl border-2 border-[#8B4513]/30 p-6 sm:p-10 space-y-6 shadow-md relative">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#8B4513]/20 pb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#8B4513] text-[#D4AF37] font-ruqaa text-2xl font-bold flex items-center justify-center border border-[#D4AF37]">
              أ
            </div>
            <div>
              <h2 className="font-ruqaa text-2xl sm:text-3xl font-bold text-[#201C16]">
                {t.storytellerName}
              </h2>
              <p className="text-xs font-serif-heritage text-[#8B4513] font-semibold">
                {t.storytellerRole}
              </p>
            </div>
          </div>

          {/* Narration Language Switcher & Trigger Button */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center bg-[#E6E1D3] rounded-full p-1 border border-[#8B4513]/20 text-xs">
              <Globe className="w-3.5 h-3.5 text-[#8B4513] mx-1.5" />
              <button
                onClick={() => setNarrationLang('ar')}
                className={`px-2.5 py-1 rounded-full font-bold ${
                  narrationLang === 'ar' ? 'bg-[#8B4513] text-[#F0EEE6]' : 'text-[#201C16]'
                }`}
              >
                العربية
              </button>
              <button
                onClick={() => setNarrationLang('en')}
                className={`px-2.5 py-1 rounded-full font-bold ${
                  narrationLang === 'en' ? 'bg-[#8B4513] text-[#F0EEE6]' : 'text-[#201C16]'
                }`}
              >
                English
              </button>
              <button
                onClick={() => setNarrationLang('zh')}
                className={`px-2.5 py-1 rounded-full font-bold ${
                  narrationLang === 'zh' ? 'bg-[#8B4513] text-[#F0EEE6]' : 'text-[#201C16]'
                }`}
              >
                中文
              </button>
            </div>

            <button
              onClick={() => handleGenerateStory(narrationLang)}
              disabled={isLoadingStory}
              className="px-6 py-3 bg-[#8B4513] hover:bg-[#6D340E] text-[#F0EEE6] rounded-full font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 disabled:opacity-50"
              id="tell-me-story-button"
            >
              <Volume2 className="w-4 h-4 text-[#D4AF37]" />
              <span>{isLoadingStory ? t.narrateLoading : t.narrateButton}</span>
            </button>
          </div>
        </div>

        {/* Loading Indicator */}
        {isLoadingStory && (
          <div className="text-center py-12 space-y-3">
            <div className="w-10 h-10 border-4 border-[#8B4513] border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-sm font-serif-heritage text-[#8B4513] font-semibold animate-pulse">
              {t.narrateLoading}
            </p>
          </div>
        )}

        {/* Story Error */}
        {storyError && (
          <div className="p-4 bg-amber-50 border border-amber-300 rounded-xl text-xs text-amber-900 leading-relaxed">
            {storyError}
          </div>
        )}

        {/* Story Content & Audio Player */}
        {storyData && !isLoadingStory && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* Audio Player Bar */}
            <div className="bg-[#E6E1D3]/80 rounded-2xl border border-[#8B4513]/20 p-4 space-y-3">
              <div className="flex items-center justify-between gap-4">
                <button
                  onClick={togglePlayPause}
                  className="w-12 h-12 rounded-full bg-[#8B4513] hover:bg-[#6D340E] text-[#F0EEE6] flex items-center justify-center transition-transform active:scale-95 shadow-md shrink-0"
                  id="audio-play-pause-button"
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 text-[#D4AF37] ms-0.5" />}
                </button>

                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between text-xs text-[#8B4513] font-bold">
                    <span className="flex items-center gap-1.5">
                      <Volume2 className="w-3.5 h-3.5" />
                      {t.storytellerName} ({narrationLang.toUpperCase()})
                    </span>
                    <span>{audioProgress}%</span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-[#F0EEE6] h-2 rounded-full overflow-hidden border border-[#8B4513]/20">
                    <div
                      className="bg-[#8B4513] h-full transition-all duration-300"
                      style={{ width: `${audioProgress}%` }}
                    />
                  </div>
                </div>

                {/* Voice Badges */}
                <div className="shrink-0 flex items-center gap-2">
                  {ttsProvider?.hasElevenLabs ? (
                    <span className="px-3 py-1 rounded-full bg-[#201C16] text-[#D4AF37] text-xs font-bold flex items-center gap-1.5 border border-[#D4AF37]/60 shadow-xs">
                      <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>صوت ElevenLabs (wyC6KvCMTAXGbiCKlfSx)</span>
                    </span>
                  ) : (
                    <span className="text-[11px] bg-[#8B4513]/10 text-[#8B4513] px-2.5 py-1 rounded-full font-semibold">
                      {t.instantVoiceBadge}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Narrative Text */}
            <div className="p-6 bg-[#F0EEE6] rounded-2xl border border-[#8B4513]/20 shadow-inner">
              <p className="font-serif-heritage text-lg sm:text-xl text-[#201C16] leading-loose whitespace-pre-line">
                {storyData.storyText}
              </p>
            </div>

            {/* Verified Sources Grounding List */}
            {storyData.sources.length > 0 && (
              <div className="pt-4 border-t border-[#8B4513]/20 space-y-2">
                <span className="text-xs font-bold text-[#8B4513] block">
                  {t.sourcesLabel}
                </span>
                <div className="flex flex-wrap gap-2">
                  {storyData.sources.map((src, i) => (
                    <a
                      key={i}
                      href={src.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#E6E1D3] hover:bg-[#8B4513] hover:text-[#F0EEE6] text-[#201C16] text-xs rounded-full border border-[#8B4513]/20 transition-colors"
                    >
                      <span>{src.title}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Next Story Navigation Banner */}
      <div className="bg-[#E6E1D3]/80 rounded-2xl p-6 border border-[#8B4513]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs font-serif-heritage text-[#8B4513] font-bold block">{t.btnNextStory}:</span>
          <span className="font-ruqaa text-2xl font-bold text-[#201C16]">{nextSite.name[lang]}</span>
        </div>
        <button
          onClick={() => navigate(`/sites/${nextSite.id}`)}
          className="px-6 py-3 bg-[#8B4513] text-[#F0EEE6] font-bold rounded-full text-xs shadow-xs hover:bg-[#6D340E] transition-colors flex items-center gap-1.5"
          id="btn-next-story"
        >
          <span>{t.btnNextStory}</span>
          <ChevronRight className="w-4 h-4 rtl:rotate-180" />
        </button>
      </div>

      {/* Booking Modal */}
      {isBookingOpen && (
        <BookingModal
          site={site}
          lang={lang}
          user={user}
          onClose={() => setIsBookingOpen(false)}
          onSuccess={(refNum) => {
            setIsBookingOpen(false);
            setBookingRefSuccess(refNum);
          }}
          onNeedAuth={() => {
            setIsBookingOpen(false);
            navigate(`/auth?returnTo=${encodeURIComponent(`/sites/${site.id}`)}`);
          }}
        />
      )}

      {/* Booking Success Toast */}
      {bookingRefSuccess && (
        <div className="fixed bottom-6 end-6 z-50 bg-[#201C16] text-[#F0EEE6] border-2 border-[#D4AF37] p-5 rounded-2xl shadow-2xl space-y-2 max-w-md animate-slideUp">
          <div className="flex items-center gap-2 text-[#D4AF37] font-bold text-sm">
            <Sparkles className="w-5 h-5" />
            <span>Booking Confirmed!</span>
          </div>
          <p className="text-xs text-[#E6E1D3]">
            {t.bookingSuccess} <strong className="text-[#D4AF37]">{bookingRefSuccess}</strong>
          </p>
          <div className="pt-2 flex justify-end">
            <button
              onClick={() => navigate('/dashboard')}
              className="px-3 py-1 bg-[#8B4513] text-[#F0EEE6] rounded-md text-xs font-bold"
            >
              {t.navDashboard}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
