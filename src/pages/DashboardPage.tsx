import React, { useState, useEffect } from 'react';
import { Language, UserBooking, UserSession } from '../types';
import { TRANSLATIONS } from '../data/translations';
import {
  BookmarkCheck,
  Calendar,
  Clock,
  Trash2,
  AlertTriangle,
  Compass,
} from 'lucide-react';

interface DashboardPageProps {
  lang: Language;
  user: UserSession | null;
  navigate: (path: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  lang,
  user,
  navigate,
}) => {
  const t = TRANSLATIONS[lang];

  const [bookings, setBookings] = useState<UserBooking[]>([]);
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const [isLoading, setIsLoading] = useState(true);

  // Cancellation Modal State
  const [cancelBookingId, setCancelBookingId] = useState<string | null>(null);
  const [isCancelling, setIsCancelling] = useState(false);

  useEffect(() => {
    fetchBookings();
  }, [user]);

  const fetchBookings = async () => {
    setIsLoading(true);
    try {
      const userId = user ? user.id : 'guest';
      const res = await fetch(`/api/bookings?userId=${userId}`);
      const data = await res.json();
      if (res.ok && data.bookings) {
        setBookings(data.bookings);
      }
    } catch (err) {
      console.error('Error fetching bookings:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmCancel = async () => {
    if (!cancelBookingId) return;

    setIsCancelling(true);
    try {
      const res = await fetch(`/api/bookings/${cancelBookingId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setCancelBookingId(null);
        fetchBookings();
      } else {
        alert('Failed to cancel booking.');
      }
    } catch (err) {
      console.error(err);
      alert('Error cancelling booking.');
    } finally {
      setIsCancelling(false);
    }
  };

  const upcomingList = bookings.filter((b) => b.status === 'upcoming');
  const pastList = bookings.filter((b) => b.status !== 'upcoming');

  const displayedList = activeTab === 'upcoming' ? upcomingList : pastList;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E6E1D3] text-[#8B4513] text-xs font-bold">
          <BookmarkCheck className="w-3.5 h-3.5" />
          <span>{user?.name || 'Explorer'}'s Portal</span>
        </div>
        <h1 className="font-ruqaa text-4xl font-bold text-[#201C16]">
          {t.dashboardTitle}
        </h1>
        <p className="text-xs font-serif-heritage text-[#8B4513]">
          {t.dashboardSubtitle}
        </p>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#F8F6F0] p-4 rounded-2xl border border-[#8B4513]/20 text-center">
          <span className="text-xs font-serif-heritage text-[#8B4513] font-bold block">إجمالي الحجوزات</span>
          <span className="font-ruqaa text-3xl font-bold text-[#201C16] block">{bookings.length}</span>
        </div>

        <div className="bg-[#F8F6F0] p-4 rounded-2xl border border-[#8B4513]/20 text-center">
          <span className="text-xs font-serif-heritage text-[#8B4513] font-bold block">الرحلات القادمة</span>
          <span className="font-ruqaa text-3xl font-bold text-[#8B4513] block">{upcomingList.length}</span>
        </div>

        <div className="bg-[#F8F6F0] p-4 rounded-2xl border border-[#8B4513]/20 text-center">
          <span className="text-xs font-serif-heritage text-[#8B4513] font-bold block">المبلغ التقديري</span>
          <span className="font-ruqaa text-3xl font-bold text-[#201C16] block">
            {bookings.reduce((sum, b) => sum + (b.status === 'upcoming' ? b.totalPriceSar : 0), 0)} {t.sarUnit}
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#8B4513]/20 gap-4">
        <button
          onClick={() => setActiveTab('upcoming')}
          className={`pb-3 text-sm font-bold transition-all border-b-2 ${
            activeTab === 'upcoming'
              ? 'border-[#8B4513] text-[#8B4513]'
              : 'border-transparent text-[#201C16]/60 hover:text-[#201C16]'
          }`}
        >
          {t.tabUpcoming} ({upcomingList.length})
        </button>

        <button
          onClick={() => setActiveTab('past')}
          className={`pb-3 text-sm font-bold transition-all border-b-2 ${
            activeTab === 'past'
              ? 'border-[#8B4513] text-[#8B4513]'
              : 'border-transparent text-[#201C16]/60 hover:text-[#201C16]'
          }`}
        >
          {t.tabPast} ({pastList.length})
        </button>
      </div>

      {/* Bookings List */}
      {isLoading ? (
        <div className="text-center py-12 text-sm text-[#8B4513]">Loading bookings...</div>
      ) : displayedList.length > 0 ? (
        <div className="space-y-4">
          {displayedList.map((b) => (
            <div
              key={b.id}
              className="bg-[#F8F6F0] rounded-2xl border border-[#8B4513]/20 p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs"
            >
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <img
                  src={b.siteImageUrl}
                  alt={b.siteName}
                  className="w-20 h-20 rounded-xl object-cover border border-[#8B4513]/30 shrink-0"
                />
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#D4AF37] bg-[#8B4513] px-2 py-0.5 rounded-md">
                      {b.referenceNumber}
                    </span>
                    <span
                      className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                        b.status === 'upcoming'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {b.status}
                    </span>
                  </div>
                  <h3 className="font-ruqaa text-xl font-bold text-[#201C16]">{b.siteName}</h3>
                  <div className="flex items-center gap-4 text-xs text-[#201C16]/70">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#8B4513]" />
                      {b.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#8B4513]" />
                      {b.timeSlot}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 border-[#8B4513]/10 pt-3 sm:pt-0">
                <div className="text-end">
                  <span className="text-xs text-[#201C16]/60 block">{b.partySize} Guests</span>
                  <span className="font-ruqaa text-2xl font-bold text-[#8B4513] block">
                    {b.totalPriceSar} {t.sarUnit}
                  </span>
                </div>

                {b.status === 'upcoming' && (
                  <button
                    onClick={() => setCancelBookingId(b.id)}
                    className="p-2.5 rounded-xl text-rose-700 hover:bg-rose-100 transition-colors border border-rose-200"
                    title={t.cancelBookingBtn}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-[#F8F6F0] rounded-2xl border border-[#8B4513]/20 p-8 space-y-4">
          <Compass className="w-10 h-10 text-[#8B4513] mx-auto opacity-50" />
          <p className="text-sm font-serif-heritage text-[#201C16] font-semibold">
            {t.noBookings}
          </p>
          <button
            onClick={() => navigate('/sites')}
            className="px-6 py-2.5 bg-[#8B4513] text-[#F0EEE6] rounded-full text-xs font-bold hover:bg-[#6D340E] transition-colors"
          >
            {t.heroCtaExplore}
          </button>
        </div>
      )}

      {/* Cancellation Confirmation Modal */}
      {cancelBookingId && (
        <div className="fixed inset-0 z-50 bg-[#201C16]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#F0EEE6] p-6 rounded-2xl border-2 border-rose-700 max-w-sm w-full space-y-4 text-center">
            <AlertTriangle className="w-10 h-10 text-rose-600 mx-auto" />
            <h3 className="font-ruqaa text-2xl font-bold text-[#201C16]">{t.confirmCancelTitle}</h3>
            <p className="text-xs text-[#201C16]/80 font-serif-heritage leading-relaxed">
              {t.confirmCancelBody}
            </p>
            <div className="flex gap-2 pt-2">
              <button
                onClick={handleConfirmCancel}
                disabled={isCancelling}
                className="flex-1 py-2.5 bg-rose-700 text-[#F0EEE6] rounded-xl font-bold text-xs hover:bg-rose-800 transition-colors"
              >
                {isCancelling ? '...' : t.confirmCancelYes}
              </button>
              <button
                onClick={() => setCancelBookingId(null)}
                className="flex-1 py-2.5 bg-[#E6E1D3] text-[#201C16] rounded-xl font-bold text-xs hover:bg-[#C2B8A3] transition-colors"
              >
                {t.confirmCancelNo}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
