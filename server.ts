import express from 'express';
import path from 'path';
import crypto from 'crypto';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type, Modality } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

// Initialize Gemini Client
const geminiApiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || '';
const ai = new GoogleGenAI({
  apiKey: geminiApiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Helper: Wrap raw 16-bit PCM audio in a valid WAV header (24kHz, 1 channel, 16-bit)
function pcmToWav(pcmBuffer: Buffer, sampleRate = 24000, numChannels = 1, bitsPerSample = 16): Buffer {
  const header = Buffer.alloc(44);
  const byteRate = (sampleRate * numChannels * bitsPerSample) / 8;
  const blockAlign = (numChannels * bitsPerSample) / 8;
  const dataSize = pcmBuffer.length;
  const chunkSize = 36 + dataSize;

  header.write('RIFF', 0);
  header.writeUInt32LE(chunkSize, 4);
  header.write('WAVE', 8);
  header.write('fmt ', 12);
  header.writeUInt32LE(16, 16);
  header.writeUInt16LE(1, 20); // PCM format
  header.writeUInt16LE(numChannels, 22);
  header.writeUInt32LE(sampleRate, 24);
  header.writeUInt32LE(byteRate, 28);
  header.writeUInt16LE(blockAlign, 32);
  header.writeUInt16LE(bitsPerSample, 34);
  header.write('data', 36);
  header.writeUInt32LE(dataSize, 40);

  return Buffer.concat([header, pcmBuffer]);
}

// In-Memory Database Stores (Persistent during server lifetime)
interface StoryCacheItem {
  siteId: string;
  language: string;
  storyText: string;
  sources: { title: string; url: string }[];
  createdAt: number;
}

interface BookingStore {
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

const storyCache: Map<string, StoryCacheItem> = new Map();
const bookingsStore: Map<string, BookingStore> = new Map();

// Helper: Strip [cite: n] or [1] citation markers
function stripCitations(text: string): string {
  return text.replace(/\[cite:\s*\d+\]|\[\d+\]/g, '').trim();
}

import { getFallbackStory } from './src/data/fallbackStories';

// Helper: Parse Gemini Retry Delay from 429 error messages
function parseRetryDelayMs(errorMsg: string): number {
  const match = errorMsg.match(/retry\s*after\s*(\d+(?:\.\d+)?)\s*s/i) || errorMsg.match(/(\d+(?:\.\d+)?)\s*s/i);
  if (match && match[1]) {
    return Math.ceil(parseFloat(match[1]) * 1000) + 500;
  }
  return 2000; // Default 2s delay
}

// Helper: Multi-model Flash Fallback for Gemini Generation
async function generateGeminiContentWithFlashFallback(params: {
  prompt: string;
  systemInstruction: string;
  useSearch?: boolean;
  config?: any;
}) {
  const flashModels = ['gemini-2.5-flash', 'gemini-2.5-pro', 'gemini-3.6-flash'];
  let lastError: any = null;

  for (const modelName of flashModels) {
    try {
      console.log(`[Gemini Flash] Attempting request with model: ${modelName}`);
      const mergedConfig: any = {
        systemInstruction: params.systemInstruction,
        ...(params.config || {}),
      };
      if (params.useSearch) {
        mergedConfig.tools = [{ googleSearch: {} }];
      }

      const response = await ai.models.generateContent({
        model: modelName,
        contents: params.prompt,
        config: mergedConfig,
      });
      return response;
    } catch (err: any) {
      console.warn(`[Gemini Flash] Model ${modelName} encountered error:`, err?.message || err);
      lastError = err;
    }
  }
  throw lastError || new Error('All Gemini Flash models failed');
}

// ==========================================
// 1. STORYTELLER NARRATIVE GENERATION API
// ==========================================
app.post('/api/story', async (req, res) => {
  const { siteId, siteName, region, brief, language = 'ar' } = req.body;

  if (!siteId) {
    return res.status(400).json({ error: 'siteId is required' });
  }

  const cacheKey = `${siteId}_${language}`;
  if (storyCache.has(cacheKey)) {
    const cached = storyCache.get(cacheKey)!;
    return res.json({
      storyText: cached.storyText,
      sources: cached.sources,
      isCached: true,
    });
  }

  const langNames: Record<string, string> = {
    ar: 'Saudi Arabic dialect in a warm, welcoming storyteller style (Abu Faisal / أبو فيصل)',
    en: 'English with a warm Saudi cultural storyteller persona (Abu Faisal)',
    zh: 'Chinese with a warm Saudi storyteller persona (Abu Faisal)',
  };

  const prompt = `You are "Abu Faisal" (أبو فيصل), a virtual Saudi Hakawati / storyteller.
Narrate an authentic heritage story for the monument "${siteName}" located in "${region}".
Context brief: ${brief}

STRICT REQUIREMENTS:
1. Length: 150 to 190 words (approximately 60 to 90 seconds spoken).
2. Style: Warm, engaging, honorable Saudi storytelling in ${langNames[language] || 'Arabic'}.
3. Content:
   - Open with a warm greeting from Abu Faisal.
   - Mention the original people, tribe, or builders of the site.
   - Detail its historical significance and famous architectural/cultural landmarks.
   - Conclude with a warm personal invitation to visit.
4. Grounding: You MUST state accurate, search-verified facts, dates, and historical details. Never invent facts.`;

  try {
    const response = await generateGeminiContentWithFlashFallback({
      prompt,
      systemInstruction: 'أنت راوي قصص سعودي، قم بصياغة القصة وإلقائها صوتياً بلهجة سعودية عامية بليغة ودافئة',
      useSearch: true,
    });

    let rawText = response.text || '';
    const cleanText = stripCitations(rawText);

    // Extract Grounding Sources
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const sources = groundingChunks
      .filter((c: any) => c.web?.uri && c.web?.title)
      .map((c: any) => ({
        title: c.web.title,
        url: c.web.uri,
      }))
      .slice(0, 4);

    // If no sources returned from search grounding, provide primary official heritage references
    if (sources.length === 0) {
      sources.push(
        { title: 'Ministry of Culture - Saudi Heritage Commission', url: 'https://heritage.moc.gov.sa/' },
        { title: 'UNESCO World Heritage Centre', url: 'https://whc.unesco.org/' }
      );
    }

    // Store in Cache
    const cacheEntry: StoryCacheItem = {
      siteId,
      language,
      storyText: cleanText,
      sources,
      createdAt: Date.now(),
    };
    storyCache.set(cacheKey, cacheEntry);

    return res.json({
      storyText: cleanText,
      sources,
      isCached: false,
    });
  } catch (err: any) {
    console.warn('Gemini temporary error/rate limit. Serving authentic curated story fallback for:', siteId);
    
    // Fallback to curated authentic story
    const fallback = getFallbackStory(siteId, language);
    const cleanText = fallback.text;
    const sources = fallback.sources;

    const cacheEntry: StoryCacheItem = {
      siteId,
      language,
      storyText: cleanText,
      sources,
      createdAt: Date.now(),
    };
    storyCache.set(cacheKey, cacheEntry);

    return res.json({
      storyText: cleanText,
      sources,
      isCached: false,
      isFallback: true,
    });
  }
});

// ==========================================
// 2. DAY PLANNER API (PRAYER & HEAT AWARE)
// ==========================================
app.post('/api/planner', async (req, res) => {
  const { siteIds, prayerTimes, language = 'ar' } = req.body;

  if (!siteIds || !Array.isArray(siteIds) || siteIds.length === 0) {
    return res.status(400).json({ error: 'Please select at least one site to visit.' });
  }

  const prompt = `Create a prayer-aware, heat-aware day trip itinerary for Saudi heritage sites: ${siteIds.join(', ')}.
Today's Prayer Times:
- Sunrise: ${prayerTimes.sunrise || '06:00'}
- Fajr: ${prayerTimes.fajr || '05:00'}
- Dhuhr: ${prayerTimes.dhuhr || '12:15'}
- Asr: ${prayerTimes.asr || '15:30'}
- Maghrib: ${prayerTimes.maghrib || '18:15'}
- Isha: ${prayerTimes.isha || '19:45'}
- Sunset: ${prayerTimes.sunset || '18:10'}

CRITICAL RULES:
1. Schedule NO visits or travel during prayer times (+20 minute buffer). Mark prayer stops explicitly.
2. Schedule outdoor sites strictly in cool morning hours or late afternoon/evening.
3. Schedule shaded or indoor sites during midday heat.
4. Include travel time and a local Saudi meal stop.
5. Language for titles & descriptions: ${language === 'ar' ? 'Arabic' : language === 'zh' ? 'Chinese' : 'English'}.
6. Provide storyteller Abu Faisal's custom advice in "abuFaisalSummary".`;

  try {
    const response = await generateGeminiContentWithFlashFallback({
      prompt,
      systemInstruction: 'أنت راوي قصص سعودي وخبير رحلات ثقافة وتراث، صمّم خطة يوم متوازنة تحترم مواعيد الصلاة وأوقات الحرارة.',
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            date: { type: Type.STRING },
            abuFaisalSummary: { type: Type.STRING },
            timeline: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  timeSlot: { type: Type.STRING },
                  activityType: { type: Type.STRING }, // visit | prayer | travel | meal | rest
                  title: { type: Type.STRING },
                  location: { type: Type.STRING },
                  description: { type: Type.STRING },
                  storytellerNotes: { type: Type.STRING },
                  isOutdoor: { type: Type.BOOLEAN },
                },
                required: ['timeSlot', 'activityType', 'title', 'description'],
              },
            },
          },
          required: ['timeline', 'abuFaisalSummary'],
        },
      },
    });

    const jsonText = response.text || '{}';
    const plan = JSON.parse(jsonText);
    return res.json(plan);
  } catch (err: any) {
    console.warn('Error/rate limit generating planner itinerary. Serving fallback itinerary.');
    const fallbackPlan = {
      date: new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
      abuFaisalSummary: language === 'ar'
        ? 'أهلاً بكم! جرى تنظيم مسار رحلتكم ليكون متوافقاً تماماً مع أوقات الصلوات وتفادي حرارة الظهيرة، مع استغلال الأجواء اللطيفة في الصباح الباكر وبعد العصر.'
        : language === 'zh'
        ? '欢迎！为您精心规划了避开午间酷热与祈祷时间的文化之旅。'
        : 'Welcome! Your day trip itinerary is optimized for prayer times and midday heat.',
      timeline: [
        {
          timeSlot: '08:30 - 10:30',
          activityType: 'visit',
          title: language === 'ar' ? 'جولة الصباح الباكر في المعالم التاريخية' : 'Early Morning Heritage Walk',
          location: siteIds[0] || 'الموقع التاريخي الأول',
          description: language === 'ar' ? 'استكشاف المباني الأثرية واستغلال نسمات الصباح الباردة والتصوير المعماري.' : 'Explore outdoor landmarks in cool morning weather.',
          storytellerNotes: language === 'ar' ? 'نوصي بارتداء حذاء مريح وحمل كمية كافية من الماء.' : 'Wear comfortable shoes.',
          isOutdoor: true,
        },
        {
          timeSlot: '11:45 - 12:45',
          activityType: 'prayer',
          title: language === 'ar' ? 'استراحة وصلاة الظهر' : 'Dhuhr Prayer & Rest',
          location: 'المسجد التراثي المحلي',
          description: language === 'ar' ? `أداء صلاة الظهر (${prayerTimes?.dhuhr || '12:15'}) والاستراحة في الظل الداخلي.` : 'Perform Dhuhr prayer and relax in shade.',
          isOutdoor: false,
        },
        {
          timeSlot: '13:00 - 14:30',
          activityType: 'meal',
          title: language === 'ar' ? 'غداء سعودي أصيل (كبسة نجدية / حنيذ)' : 'Traditional Saudi Lunch',
          location: 'مطعم تراثي مجاور',
          description: language === 'ar' ? 'تذوق المأكولات السعودية التقليدية وتناول القهوة السعودية بالشعير والهيل.' : 'Savor authentic Saudi cuisine and coffee.',
          isOutdoor: false,
        },
        {
          timeSlot: '15:15 - 16:00',
          activityType: 'prayer',
          title: language === 'ar' ? 'صلاة العصر' : 'Asr Prayer',
          location: 'جامع المنطقة',
          description: language === 'ar' ? `أداء صلاة العصر (${prayerTimes?.asr || '15:30'}).` : 'Perform Asr prayer.',
          isOutdoor: false,
        },
        {
          timeSlot: '16:15 - 18:00',
          activityType: 'visit',
          title: language === 'ar' ? 'الجولة المسائية والأسواق التراثية' : 'Late Afternoon Walk & Souk Visit',
          location: siteIds[1] || siteIds[0],
          description: language === 'ar' ? 'جولة في الأسواق الحرفية وشراء الهدايا التذكارية مع غروب الشمس.' : 'Visit traditional craft shops and enjoy sunset views.',
          isOutdoor: true,
        },
        {
          timeSlot: '18:15 - 19:00',
          activityType: 'prayer',
          title: language === 'ar' ? 'صلاة المغرب وجلسة الشاي' : 'Maghrib Prayer & Saudi Coffee Session',
          location: 'مقهى تراثي',
          description: language === 'ar' ? `أداء صلاة المغرب (${prayerTimes?.maghrib || '18:15'}) والاستمتاع بالقهوة والتمر.` : 'Perform Maghrib prayer and enjoy dates & coffee.',
          isOutdoor: false,
        }
      ]
    };
    return res.json(fallbackPlan);
  }
});

// ==========================================
// 3. ASK THE STORYTELLER (FREE CHAT API)
// ==========================================
app.post('/api/chat', async (req, res) => {
  const { question, siteId, language = 'ar' } = req.body;

  if (!question) {
    return res.status(400).json({ error: 'Question is required' });
  }

  const prompt = `User question to Abu Faisal: "${question}".
Target language: ${language === 'ar' ? 'Arabic' : language === 'zh' ? 'Chinese' : 'English'}.
Context: Virtual Saudi Hakawati/storyteller answering questions about Saudi heritage, historical sites, tribes, traditions, local food, and travel advice.
Respond in a warm, polite storyteller tone (under 120 words). Ensure facts are search-grounded and accurate.`;

  try {
    const response = await generateGeminiContentWithFlashFallback({
      prompt,
      systemInstruction: 'أنت راوي قصص سعودي، قم بصياغة القصة وإلقائها صوتياً بلهجة سعودية عامية بليغة ودافئة',
      useSearch: true,
    });

    let rawText = response.text || '';
    const cleanText = stripCitations(rawText);

    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const sources = groundingChunks
      .filter((c: any) => c.web?.uri && c.web?.title)
      .map((c: any) => ({
        title: c.web.title,
        url: c.web.uri,
      }))
      .slice(0, 3);

    return res.json({
      text: cleanText,
      sources,
    });
  } catch (err: any) {
    console.warn('Error in storyteller chat. Serving fallback response.');
    const fallbackText = language === 'ar'
      ? `أهلاً وسهلاً بك يا غالي! أبو فيصل يحييك ويعدك بالإجابة الشافية. المملكة تراثها عريق وتاريخها مجيد، سواءً كنت تسأل عن المعالم الأثرية كالحِجر والدرعية والبلد، أو التقاليد والقهوة السعودية. يسرني دائماً إرشادك وخدمتك!`
      : language === 'zh'
      ? `热烈欢迎您！阿布·费萨尔很高兴为您解答关于沙特世界遗产、文化传统与旅行建议的问题。愿为您提供贴心指导！`
      : `Welcome! Abu Faisal is happy to help you with insights about Saudi heritage, UNESCO sites, and culture. Feel free to ask any question!`;

    return res.json({
      text: fallbackText,
      sources: [
        { title: 'Ministry of Culture - Saudi Heritage Commission', url: 'https://heritage.moc.gov.sa/' },
        { title: 'Saudi Tourism Authority - Visit Saudi', url: 'https://www.visitsaudi.com/' }
      ]
    });
  }
});

// ==========================================
// 4. GOOGLE GEMINI NATIVE AUDIO TTS ENDPOINT
// ==========================================

// Endpoint to check active TTS engine status
app.get('/api/tts/provider', (req, res) => {
  const geminiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
  return res.json({
    engine: 'Google Gemini Native Audio (Google AI Studio)',
    model: 'gemini-3.1-flash-tts-preview',
    hasApiKey: !!geminiKey,
    systemInstruction: 'أنت راوي قصص سعودي، قم بصياغة القصة وإلقائها صوتياً بلهجة سعودية عامية بليغة ودافئة',
  });
});

// Primary TTS Endpoint (Google Gemini Native Audio Generation)
app.get('/api/tts', async (req, res) => {
  const { text, lang = 'ar', voiceId } = req.query;

  if (!text || typeof text !== 'string') {
    return res.status(400).json({ error: 'Text query parameter is required' });
  }

  const cleanText = stripCitations(text).substring(0, 350);
  const targetLang = typeof lang === 'string' && lang ? lang : 'ar';
  const activeApiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || '';

  const systemInstruction = 'أنت راوي قصص سعودي، قم بصياغة القصة وإلقائها صوتياً بلهجة سعودية عامية بليغة ودافئة';

  console.log(`[Gemini Native TTS] Generating speech audio for: "${cleanText.substring(0, 35)}..." using Google AI Studio`);

  // 1. Generate Native Speech using Google Gemini Native Audio Model (gemini-3.1-flash-tts-preview)
  if (activeApiKey) {
    try {
      const activeAi = new GoogleGenAI({
        apiKey: activeApiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });

      const selectedVoice = (typeof voiceId === 'string' && voiceId) ? voiceId : 'Puck';
      console.log(`[Gemini Native TTS] Requesting speech synthesis with voice: ${selectedVoice}`);

      const response = await activeAi.models.generateContent({
        model: 'gemini-3.1-flash-tts-preview',
        contents: [{ parts: [{ text: cleanText }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: selectedVoice },
            },
          },
        },
      });

      const candidate = response.candidates?.[0];
      const part = candidate?.content?.parts?.[0];

      if (part?.inlineData?.data) {
        const base64Data = part.inlineData.data;
        const mimeType = part.inlineData.mimeType || 'audio/mp3';
        const rawBuffer = Buffer.from(base64Data, 'base64');

        if (mimeType.includes('pcm')) {
          const wavBuffer = pcmToWav(rawBuffer, 24000, 1, 16);
          res.setHeader('Content-Type', 'audio/wav');
          res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
          res.setHeader('X-TTS-Engine', 'GoogleGeminiNativeAudio');
          return res.send(wavBuffer);
        } else {
          const contentType = (mimeType.includes('mp3') || mimeType.includes('mpeg')) ? 'audio/mpeg' : (mimeType || 'audio/wav');
          res.setHeader('Content-Type', contentType);
          res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
          res.setHeader('X-TTS-Engine', 'GoogleGeminiNativeAudio');
          return res.send(rawBuffer);
        }
      }
    } catch (e: any) {
      console.warn('[Gemini Native TTS] Native TTS request exceeded quota or failed, falling back to Google Translate Audio:', e?.message || e);
    }
  } else {
    console.warn('[Gemini Native TTS] API key missing, falling back to Google Translate audio proxy.');
  }

  // 2. Fallback to Google Translate Audio Proxy if native audio model is temporarily busy/rate limited
  const encodedText = encodeURIComponent(cleanText.substring(0, 180));
  const ttsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodedText}&tl=${targetLang}&client=tw-ob`;

  try {
    const fetchResponse = await fetch(ttsUrl, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
      },
    });

    if (!fetchResponse.ok) {
      throw new Error(`Google TTS response status: ${fetchResponse.status}`);
    }

    const arrayBuffer = await fetchResponse.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.setHeader('X-TTS-Engine', 'GoogleTranslateFallback');
    return res.send(buffer);
  } catch (err: any) {
    console.error('TTS Audio Proxy Error:', err);
    return res.status(500).json({ error: 'TTS audio synthesis failed' });
  }
});

// ==========================================
// 5. AUTH & BOOKINGS API
// ==========================================
app.post('/api/auth/otp', (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email is required' });

  return res.json({
    message: 'Verification OTP sent to ' + email,
    testCode: '123456',
  });
});

app.post('/api/auth/verify', (req, res) => {
  const { email, code, isGuest } = req.body;

  if (isGuest) {
    const guestId = `guest_${Date.now()}`;
    return res.json({
      user: { id: guestId, email: 'guest@awaabid.sa', isGuest: true, name: 'Guest Explorer' },
    });
  }

  if (code === '123456' || code?.length === 6) {
    const userId = `usr_${crypto.createHash('md5').update(email).digest('hex').substring(0, 8)}`;
    return res.json({
      user: { id: userId, email, isGuest: false, name: email.split('@')[0] },
    });
  }

  return res.status(400).json({ error: 'Invalid verification code. Please use 123456.' });
});

app.get('/api/bookings', (req, res) => {
  const userId = (req.query.userId as string) || 'default_user';
  const bookings = Array.from(bookingsStore.values()).filter(
    (b) => b.userId === userId || userId === 'guest' || b.userId.startsWith('usr_')
  );
  return res.json({ bookings });
});

app.post('/api/bookings', (req, res) => {
  const { userId, siteId, siteName, siteImageUrl, date, timeSlot, experienceType, partySize, totalPriceSar } =
    req.body;

  if (!siteId || !date) {
    return res.status(400).json({ error: 'Site and Date are required for booking.' });
  }

  const id = `bkg_${Date.now()}`;
  const referenceNumber = `AWA-${Math.floor(1000 + Math.random() * 9000)}`;

  const booking: BookingStore = {
    id,
    referenceNumber,
    userId: userId || 'usr_guest',
    siteId,
    siteName,
    siteImageUrl,
    date,
    timeSlot: timeSlot || 'slotAfternoon',
    experienceType: experienceType || 'guided',
    partySize: partySize || 1,
    totalPriceSar: totalPriceSar || 50,
    status: 'upcoming',
    createdAt: new Date().toISOString(),
  };

  bookingsStore.set(id, booking);
  return res.json({ booking });
});

app.delete('/api/bookings/:id', (req, res) => {
  const bookingId = req.params.id;
  const booking = bookingsStore.get(bookingId);

  if (!booking) {
    return res.status(404).json({ error: 'Booking not found' });
  }

  booking.status = 'cancelled';
  bookingsStore.set(bookingId, booking);
  return res.json({ message: 'Booking cancelled successfully', booking });
});

// ==========================================
// 6. VITE MIDDLEWARE & STATIC SERVING
// ==========================================
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Awaabid Server] Running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
