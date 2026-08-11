import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { splitTextIntoChunks, SequentialAudioPlayer } from '../lib/ttsUtils';
import {
  MessageSquare,
  Send,
  Volume2,
  ExternalLink,
  Sparkles,
  Bot,
  User,
} from 'lucide-react';

interface ChatPageProps {
  lang: Language;
  initialSiteId?: string;
  navigate: (path: string) => void;
}

export const ChatPage: React.FC<ChatPageProps> = ({ lang, navigate }) => {
  const t = TRANSLATIONS[lang];

  const suggestedQuestions = [t.q1, t.q2, t.q3, t.q4];

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'storyteller',
      text:
        lang === 'ar'
          ? 'يا أهلاً وسهلاً بك في مجلس أبو فيصل التراثي. سلني عن تاريخ المعالم، سيرة القبائل، أو المأكولات التاريخية ويسعدني إجابتك بكل حراوة وأصالة.'
          : lang === 'zh'
          ? '欢迎来到阿布·法伊萨尔的说书茶室。请询问关于历史遗迹、部落故事或传统美食的任何问题，我将诚挚为您解答。'
          : 'Welcome to Abu Faisal\'s storyteller majlis. Ask me about historic monuments, tribal histories, or traditional cuisine, and I shall share with you with warmth and truth.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [inputText, setInputText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Audio player ref for Listen Aloud
  const playerRef = useRef<SequentialAudioPlayer | null>(null);
  const [playingMsgId, setPlayingMsgId] = useState<string | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || inputText).trim();
    if (!query || isSending) return;

    const userMsg: ChatMessage = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsSending(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: query, language: lang }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Chat request failed');
      }

      const botMsg: ChatMessage = {
        id: `bot_${Date.now()}`,
        sender: 'storyteller',
        text: data.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sources: data.sources,
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err: any) {
      console.error(err);
      const errMsg: ChatMessage = {
        id: `err_${Date.now()}`,
        sender: 'storyteller',
        text: 'أعتذر منك، يبدو أن القهوة أبطأت وصول الرد قليلاً. يرجى محاولة السؤال مرة أخرى.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errMsg]);
    } finally {
      setIsSending(false);
    }
  };

  const handleListenAloud = (msg: ChatMessage) => {
    if (playerRef.current) {
      playerRef.current.stop();
    }

    if (playingMsgId === msg.id) {
      setPlayingMsgId(null);
      return;
    }

    const chunks = splitTextIntoChunks(msg.text);
    const urls = chunks.map((c) => `/api/tts?text=${encodeURIComponent(c)}&lang=${lang}&voiceId=wyC6KvCMTAXGbiCKlfSx&t=${Date.now()}`);

    const player = new SequentialAudioPlayer(
      urls,
      () => setPlayingMsgId(null),
      () => {}
    );

    playerRef.current = player;
    player.play();
    setPlayingMsgId(msg.id);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-full bg-[#8B4513] text-[#D4AF37] font-ruqaa text-2xl font-bold mx-auto flex items-center justify-center border-2 border-[#D4AF37] shadow-md">
          أ
        </div>
        <h1 className="font-ruqaa text-3xl sm:text-4xl font-bold text-[#201C16]">
          {t.chatTitle}
        </h1>
        <p className="text-xs font-serif-heritage text-[#8B4513]">
          {t.chatSubtitle}
        </p>
      </div>

      {/* Suggested Chips */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-[#8B4513] block">{t.suggestedQuestionsLabel}</span>
        <div className="flex flex-wrap gap-2">
          {suggestedQuestions.map((q, i) => (
            <button
              key={i}
              onClick={() => handleSend(q)}
              className="px-3 py-1.5 bg-[#F8F6F0] hover:bg-[#8B4513] hover:text-[#F0EEE6] text-[#201C16] text-xs rounded-full border border-[#8B4513]/20 transition-colors text-start"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Box */}
      <div className="bg-[#F8F6F0] rounded-3xl border-2 border-[#8B4513]/30 p-4 sm:p-6 h-[480px] overflow-y-auto space-y-4 shadow-inner">
        {messages.map((msg) => {
          const isStoryteller = msg.sender === 'storyteller';
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${
                isStoryteller ? 'justify-start' : 'justify-end'
              }`}
            >
              {isStoryteller && (
                <div className="w-8 h-8 rounded-full bg-[#8B4513] text-[#D4AF37] font-ruqaa text-sm font-bold flex items-center justify-center shrink-0 border border-[#D4AF37]">
                  أ
                </div>
              )}

              <div
                className={`max-w-[80%] p-4 rounded-2xl space-y-2 shadow-xs ${
                  isStoryteller
                    ? 'bg-[#F0EEE6] border border-[#8B4513]/20 text-[#201C16]'
                    : 'bg-[#8B4513] text-[#F0EEE6]'
                }`}
              >
                <div className="flex items-center justify-between gap-4 text-[10px] opacity-75">
                  <span className="font-bold">
                    {isStoryteller ? t.storytellerName : 'You'}
                  </span>
                  <span>{msg.timestamp}</span>
                </div>

                <p className="text-xs sm:text-sm leading-relaxed font-serif-heritage whitespace-pre-line">
                  {msg.text}
                </p>

                {/* Grounding Sources */}
                {msg.sources && msg.sources.length > 0 && (
                  <div className="pt-2 border-t border-[#8B4513]/10 space-y-1">
                    <span className="text-[10px] font-bold text-[#8B4513] block">
                      {t.sourcesLabel}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {msg.sources.map((s, idx) => (
                        <a
                          key={idx}
                          href={s.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] bg-[#E6E1D3] text-[#201C16] px-2 py-0.5 rounded-md hover:underline flex items-center gap-1"
                        >
                          <span className="truncate max-w-[120px]">{s.title}</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Listen Aloud Button for Storyteller */}
                {isStoryteller && (
                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={() => handleListenAloud(msg)}
                      className="px-2.5 py-1 bg-[#8B4513]/10 hover:bg-[#8B4513] hover:text-[#F0EEE6] text-[#8B4513] rounded-full text-[11px] font-bold transition-colors flex items-center gap-1"
                    >
                      <Volume2 className="w-3 h-3" />
                      <span>
                        {playingMsgId === msg.id ? 'Playing...' : t.listenAloudBtn}
                      </span>
                    </button>
                  </div>
                )}
              </div>

              {!isStoryteller && (
                <div className="w-8 h-8 rounded-full bg-[#201C16] text-[#F0EEE6] flex items-center justify-center shrink-0 text-xs">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}

        {isSending && (
          <div className="flex items-center gap-2 text-xs font-serif-heritage text-[#8B4513] p-2">
            <div className="w-3 h-3 border-2 border-[#8B4513] border-t-transparent rounded-full animate-spin" />
            <span>Abu Faisal is contemplating your question...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="flex items-center gap-2 bg-[#F8F6F0] p-2 rounded-2xl border border-[#8B4513]/30 shadow-xs"
      >
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={t.chatPlaceholder}
          className="flex-1 bg-transparent px-4 py-2 text-sm text-[#201C16] placeholder-[#201C16]/50 focus:outline-hidden"
          id="chat-input-text"
        />

        <button
          type="submit"
          disabled={!inputText.trim() || isSending}
          className="w-10 h-10 rounded-xl bg-[#8B4513] text-[#F0EEE6] hover:bg-[#6D340E] flex items-center justify-center transition-colors disabled:opacity-40 shrink-0"
          id="chat-send-button"
        >
          <Send className="w-4 h-4 rtl:rotate-180" />
        </button>
      </form>
    </div>
  );
};
