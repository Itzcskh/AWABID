import React, { useState, useEffect } from 'react';
import { Language, UserSession } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LandingPage } from './pages/LandingPage';
import { CatalogPage } from './pages/CatalogPage';
import { SiteDetailPage } from './pages/SiteDetailPage';
import { PlannerPage } from './pages/PlannerPage';
import { ChatPage } from './pages/ChatPage';
import { AuthPage } from './pages/AuthPage';
import { DashboardPage } from './pages/DashboardPage';
import { NotFoundPage } from './pages/NotFoundPage';

export default function App() {
  const [lang, setLang] = useState<Language>('ar');
  const [user, setUser] = useState<UserSession | null>({
    id: 'usr_demo',
    email: 'visitor@awabid.sa',
    isGuest: true,
    name: 'زائر أوابد',
  });

  const [currentPath, setCurrentPath] = useState<string>(
    window.location.pathname || '/'
  );

  // Handle URL history state
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Update HTML dir attribute for RTL support when language changes
  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  // Parse Query Parameters
  const searchParams = new URLSearchParams(window.location.search);
  const paramSiteId = searchParams.get('siteId') || undefined;
  const paramReturnTo = searchParams.get('returnTo') || undefined;

  // Render main page content
  const renderContent = () => {
    if (currentPath === '/') {
      return <LandingPage lang={lang} navigate={navigate} />;
    }

    if (currentPath === '/sites') {
      return <CatalogPage lang={lang} navigate={navigate} />;
    }

    if (currentPath.startsWith('/sites/')) {
      const siteId = currentPath.replace('/sites/', '');
      return (
        <SiteDetailPage
          siteId={siteId}
          lang={lang}
          user={user}
          navigate={navigate}
        />
      );
    }

    if (currentPath === '/planner') {
      return (
        <PlannerPage
          lang={lang}
          initialSiteId={paramSiteId}
          navigate={navigate}
        />
      );
    }

    if (currentPath === '/chat') {
      return (
        <ChatPage
          lang={lang}
          initialSiteId={paramSiteId}
          navigate={navigate}
        />
      );
    }

    if (currentPath === '/auth') {
      return (
        <AuthPage
          lang={lang}
          returnTo={paramReturnTo}
          onLoginSuccess={(loggedInUser, returnToPath) => {
            setUser(loggedInUser);
            if (returnToPath) {
              navigate(returnToPath);
            } else {
              navigate('/dashboard');
            }
          }}
          navigate={navigate}
        />
      );
    }

    if (currentPath === '/dashboard') {
      return <DashboardPage lang={lang} user={user} navigate={navigate} />;
    }

    return <NotFoundPage lang={lang} navigate={navigate} />;
  };

  return (
    <div className="min-h-screen flex flex-col justify-between font-sans selection:bg-[#8B4513]/20 selection:text-[#201C16]">
      <div>
        <Navbar
          currentPath={currentPath}
          navigate={navigate}
          lang={lang}
          setLang={setLang}
          user={user}
          onSignOut={() => setUser(null)}
        />
        <main>{renderContent()}</main>
      </div>

      <Footer lang={lang} navigate={navigate} />
    </div>
  );
}
