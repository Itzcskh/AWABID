export type Language = 'ar' | 'en' | 'zh';

export type SiteNature = 'outdoor' | 'indoor' | 'mixed';

export interface HeritageSite {
  id: string;
  name: Record<Language, string>;
  region: Record<Language, string>;
  tagline: Record<Language, string>;
  brief: Record<Language, string>;
  imageUrl: string;
  nature: SiteNature;
  bestVisitTime: Record<Language, string>;
  crowdProfile: Record<Language, string>;
  drivingTimeFromRiyadh: Record<Language, string>;
  startingPriceSar: number;
  unescoStatus: boolean;
  unescoYear?: number;
  coordinates: { lat: number; lng: number };
}

export interface GroundedSource {
  title: string;
  url: string;
}

export interface StoryResponse {
  storyText: string;
  audioUrl?: string;
  sources: GroundedSource[];
  isCached: boolean;
}

export interface PrayerTimes {
  fajr: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
  sunrise: string;
  sunset: string;
}

export interface PlannerItem {
  timeSlot: string;
  activityType: 'visit' | 'prayer' | 'travel' | 'meal' | 'rest';
  title: string;
  location?: string;
  description: string;
  storytellerNotes?: string;
  isOutdoor?: boolean;
}

export interface DayPlannerPlan {
  date: string;
  sitesVisited: string[];
  timeline: PlannerItem[];
  abuFaisalSummary: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'storyteller';
  text: string;
  timestamp: string;
  sources?: GroundedSource[];
  audioUrl?: string;
}

export interface UserBooking {
  id: string;
  referenceNumber: string;
  userId: string;
  siteId: string;
  siteName: string;
  siteImageUrl: string;
  date: string;
  timeSlot: string;
  experienceType: 'guided' | 'self-guided' | 'vip';
  partySize: number;
  totalPriceSar: number;
  status: 'upcoming' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface UserSession {
  id: string;
  email: string;
  isGuest: boolean;
  name?: string;
}
