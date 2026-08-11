import React, { useState } from 'react';
import { Language, UserSession } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { Mail, KeyRound, UserCheck, Shield, ArrowRight } from 'lucide-react';

interface AuthPageProps {
  lang: Language;
  returnTo?: string;
  onLoginSuccess: (user: UserSession, returnToPath?: string) => void;
  navigate: (path: string) => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({
  lang,
  returnTo,
  onLoginSuccess,
  navigate,
}) => {
  const t = TRANSLATIONS[lang];

  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/auth/otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to send OTP');

      setStep('otp');
      setCode('123456'); // Pre-fill for seamless instant testing
    } catch (err: any) {
      setErrorMsg(err.message || 'Error sending code');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code, isGuest: false }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Verification failed');

      onLoginSuccess(data.user, returnTo);
    } catch (err: any) {
      setErrorMsg(err.message || 'Invalid code');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGuestLogin = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isGuest: true }),
      });

      const data = await res.json();
      if (res.ok && data.user) {
        onLoginSuccess(data.user, returnTo);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 space-y-8">
      {/* Brand Emblem */}
      <div className="text-center space-y-3">
        <div className="w-16 h-16 rounded-t-full border-2 border-[#8B4513] bg-[#F8F6F0] mx-auto flex items-center justify-center shadow-md">
          <span className="font-ruqaa text-3xl font-bold text-[#8B4513]">أ</span>
        </div>
        <h1 className="font-ruqaa text-3xl font-bold text-[#201C16]">
          {t.authTitle}
        </h1>
        <p className="text-xs font-serif-heritage text-[#8B4513]">
          {t.authSubtitle}
        </p>
      </div>

      <div className="bg-[#F8F6F0] rounded-3xl border-2 border-[#8B4513]/20 p-8 space-y-6 shadow-md">
        {errorMsg && (
          <div className="p-3 bg-amber-50 border border-amber-300 rounded-xl text-xs text-amber-900">
            {errorMsg}
          </div>
        )}

        {step === 'email' ? (
          <form onSubmit={handleSendCode} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#201C16] mb-1.5 flex items-center gap-1">
                <Mail className="w-4 h-4 text-[#8B4513]" />
                {t.emailLabel}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@domain.com"
                className="w-full bg-[#F0EEE6] border border-[#8B4513]/30 rounded-xl px-4 py-3 text-sm text-[#201C16] focus:outline-hidden focus:border-[#8B4513]"
                required
                id="auth-email-input"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading || !email}
              className="w-full py-3.5 bg-[#8B4513] hover:bg-[#6D340E] text-[#F0EEE6] font-bold rounded-xl shadow-md transition-colors text-sm flex items-center justify-center gap-2 disabled:opacity-50"
              id="send-otp-button"
            >
              <span>{isLoading ? '...' : t.sendCodeBtn}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerify} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#201C16] mb-1.5 flex items-center gap-1">
                <KeyRound className="w-4 h-4 text-[#8B4513]" />
                {t.otpLabel}
              </label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                maxLength={6}
                className="w-full bg-[#F0EEE6] border border-[#8B4513]/30 rounded-xl px-4 py-3 text-center text-lg font-bold tracking-widest text-[#201C16] focus:outline-hidden focus:border-[#8B4513]"
                required
                id="auth-otp-input"
              />
              <p className="text-[11px] text-[#8B4513] font-serif-heritage mt-1.5 text-center">
                {t.otpSentNotice}
              </p>
            </div>

            <button
              type="submit"
              disabled={isLoading || !code}
              className="w-full py-3.5 bg-[#8B4513] hover:bg-[#6D340E] text-[#F0EEE6] font-bold rounded-xl shadow-md transition-colors text-sm flex items-center justify-center gap-2 disabled:opacity-50"
              id="verify-otp-button"
            >
              <UserCheck className="w-4 h-4" />
              <span>{isLoading ? '...' : t.verifyBtn}</span>
            </button>
          </form>
        )}

        <div className="pt-4 border-t border-[#8B4513]/15 text-center space-y-3">
          <button
            onClick={handleGuestLogin}
            disabled={isLoading}
            className="w-full py-2.5 bg-[#E6E1D3] hover:bg-[#8B4513]/20 text-[#201C16] text-xs font-bold rounded-xl border border-[#8B4513]/20 transition-colors flex items-center justify-center gap-1.5"
            id="guest-login-button"
          >
            <Shield className="w-4 h-4 text-[#8B4513]" />
            <span>{t.guestBtn}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
