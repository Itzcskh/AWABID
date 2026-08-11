import React, { useState } from 'react';
import { HeritageSite, Language, UserSession } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { Calendar, Users, ShieldCheck, Sun, Moon, Clock, X } from 'lucide-react';

interface BookingModalProps {
  site: HeritageSite;
  lang: Language;
  user: UserSession | null;
  onClose: () => void;
  onSuccess: (bookingRef: string) => void;
  onNeedAuth: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  site,
  lang,
  user,
  onClose,
  onSuccess,
  onNeedAuth,
}) => {
  const t = TRANSLATIONS[lang];

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const defaultDateStr = tomorrow.toISOString().split('T')[0];

  const [date, setDate] = useState(defaultDateStr);
  const [timeSlot, setTimeSlot] = useState<'slotMorning' | 'slotAfternoon' | 'slotEvening'>('slotAfternoon');
  const [experienceType, setExperienceType] = useState<'guided' | 'self-guided' | 'vip'>('guided');
  const [partySize, setPartySize] = useState<number>(2);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Price calculations
  const expMultipliers = {
    'self-guided': 1,
    guided: 1.5,
    vip: 3,
  };

  const unitPrice = Math.round(site.startingPriceSar * expMultipliers[experienceType]);
  const totalPrice = unitPrice * partySize;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      onNeedAuth();
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          siteId: site.id,
          siteName: site.name[lang],
          siteImageUrl: site.imageUrl,
          date,
          timeSlot,
          experienceType,
          partySize,
          totalPriceSar: totalPrice,
        }),
      });

      const data = await res.json();
      if (res.ok && data.booking) {
        onSuccess(data.booking.referenceNumber);
      } else {
        alert(data.error || 'Failed to create booking.');
      }
    } catch (err) {
      console.error(err);
      alert('Network error while booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#201C16]/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#F0EEE6] w-full max-w-lg rounded-2xl border-2 border-[#8B4513] shadow-2xl p-6 relative my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 end-4 w-8 h-8 rounded-full bg-[#E6E1D3] hover:bg-[#8B4513] hover:text-[#F0EEE6] flex items-center justify-center transition-colors text-[#201C16]"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6 pb-4 border-b border-[#8B4513]/20 text-center">
          <h3 className="font-ruqaa text-3xl font-bold text-[#201C16]">
            {t.bookingTitle}
          </h3>
          <p className="text-sm font-serif-heritage text-[#8B4513] font-semibold mt-1">
            {site.name[lang]}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Date Picker */}
          <div>
            <label className="block text-xs font-bold text-[#201C16] mb-1.5 flex items-center gap-1">
              <Calendar className="w-4 h-4 text-[#8B4513]" />
              {t.dateLabel}
            </label>
            <input
              type="date"
              value={date}
              min={defaultDateStr}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-[#F8F6F0] border border-[#8B4513]/30 rounded-xl px-3 py-2 text-sm text-[#201C16] focus:outline-hidden focus:border-[#8B4513]"
              required
            />
          </div>

          {/* Time Slot (Heat-Aware) */}
          <div>
            <label className="block text-xs font-bold text-[#201C16] mb-1.5 flex items-center gap-1">
              <Clock className="w-4 h-4 text-[#8B4513]" />
              {t.timeSlotLabel}
            </label>
            <div className="grid grid-cols-1 gap-2">
              <button
                type="button"
                onClick={() => setTimeSlot('slotMorning')}
                className={`p-3 rounded-xl border text-start flex items-center justify-between text-xs transition-all ${
                  timeSlot === 'slotMorning'
                    ? 'border-[#8B4513] bg-[#8B4513]/10 font-bold text-[#8B4513]'
                    : 'border-[#8B4513]/20 bg-[#F8F6F0] text-[#201C16]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Sun className="w-4 h-4 text-[#D4AF37]" />
                  <span>07:00 - 10:00 AM</span>
                </div>
                <span className="text-[11px] opacity-80">{t.slotMorning}</span>
              </button>

              <button
                type="button"
                onClick={() => setTimeSlot('slotAfternoon')}
                className={`p-3 rounded-xl border text-start flex items-center justify-between text-xs transition-all ${
                  timeSlot === 'slotAfternoon'
                    ? 'border-[#8B4513] bg-[#8B4513]/10 font-bold text-[#8B4513]'
                    : 'border-[#8B4513]/20 bg-[#F8F6F0] text-[#201C16]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Sun className="w-4 h-4 text-[#8B4513]" />
                  <span>16:00 - 18:30 PM</span>
                </div>
                <span className="text-[11px] opacity-80">{t.slotAfternoon}</span>
              </button>

              <button
                type="button"
                onClick={() => setTimeSlot('slotEvening')}
                className={`p-3 rounded-xl border text-start flex items-center justify-between text-xs transition-all ${
                  timeSlot === 'slotEvening'
                    ? 'border-[#8B4513] bg-[#8B4513]/10 font-bold text-[#8B4513]'
                    : 'border-[#8B4513]/20 bg-[#F8F6F0] text-[#201C16]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Moon className="w-4 h-4 text-[#201C16]" />
                  <span>19:30 - 22:00 PM</span>
                </div>
                <span className="text-[11px] opacity-80">{t.slotEvening}</span>
              </button>
            </div>
          </div>

          {/* Experience Type */}
          <div>
            <label className="block text-xs font-bold text-[#201C16] mb-1.5 flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-[#8B4513]" />
              {t.expTypeLabel}
            </label>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setExperienceType('self-guided')}
                className={`p-2.5 rounded-xl border text-center transition-all ${
                  experienceType === 'self-guided'
                    ? 'border-[#8B4513] bg-[#8B4513] text-[#F0EEE6] font-bold'
                    : 'border-[#8B4513]/20 bg-[#F8F6F0] text-[#201C16]'
                }`}
              >
                {t.expSelf}
              </button>
              <button
                type="button"
                onClick={() => setExperienceType('guided')}
                className={`p-2.5 rounded-xl border text-center transition-all ${
                  experienceType === 'guided'
                    ? 'border-[#8B4513] bg-[#8B4513] text-[#F0EEE6] font-bold'
                    : 'border-[#8B4513]/20 bg-[#F8F6F0] text-[#201C16]'
                }`}
              >
                {t.expGuided}
              </button>
              <button
                type="button"
                onClick={() => setExperienceType('vip')}
                className={`p-2.5 rounded-xl border text-center transition-all ${
                  experienceType === 'vip'
                    ? 'border-[#8B4513] bg-[#8B4513] text-[#F0EEE6] font-bold'
                    : 'border-[#8B4513]/20 bg-[#F8F6F0] text-[#201C16]'
                }`}
              >
                {t.expVip}
              </button>
            </div>
          </div>

          {/* Party Size */}
          <div>
            <label className="block text-xs font-bold text-[#201C16] mb-1.5 flex items-center gap-1">
              <Users className="w-4 h-4 text-[#8B4513]" />
              {t.partySizeLabel}
            </label>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setPartySize(Math.max(1, partySize - 1))}
                className="w-10 h-10 rounded-xl bg-[#E6E1D3] border border-[#8B4513]/30 text-lg font-bold text-[#201C16]"
              >
                -
              </button>
              <span className="font-bold text-lg text-[#201C16] w-8 text-center">{partySize}</span>
              <button
                type="button"
                onClick={() => setPartySize(Math.min(10, partySize + 1))}
                className="w-10 h-10 rounded-xl bg-[#E6E1D3] border border-[#8B4513]/30 text-lg font-bold text-[#201C16]"
              >
                +
              </button>
            </div>
          </div>

          {/* Pricing Total */}
          <div className="pt-4 border-t border-[#8B4513]/20 flex items-center justify-between">
            <span className="text-sm font-bold text-[#201C16]">{t.totalPriceLabel}</span>
            <span className="font-ruqaa text-3xl font-bold text-[#8B4513]">
              {totalPrice} {t.sarUnit}
            </span>
          </div>

          {!user && (
            <p className="text-xs text-amber-800 bg-amber-50 p-2.5 rounded-lg border border-amber-200">
              {t.loginToBookNotice}
            </p>
          )}

          {/* Confirm Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 bg-[#8B4513] hover:bg-[#6D340E] text-[#F0EEE6] font-bold rounded-xl shadow-md transition-colors text-sm disabled:opacity-50"
          >
            {isSubmitting ? '...' : t.confirmBookingBtn}
          </button>
        </form>
      </div>
    </div>
  );
};
