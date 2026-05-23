import { AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import LoadingScreen from './components/LoadingScreen';
import SocialSidebar from './components/SocialSidebar';
import Home from './sections/Home';
import About from './sections/About';
import Resume from './sections/Resume';
import Projects from './sections/Projects';
import Contact from './sections/Contact';

const sectionIds = ['home', 'about', 'resume', 'projects', 'contact'];

const getInitialTheme = () => {
  if (typeof window === 'undefined') {
    return false;
  }

  const storedTheme = window.localStorage.getItem('theme');

  if (storedTheme) {
    return storedTheme === 'dark';
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

const getInitialLoadingState = () => {
  if (typeof window === 'undefined') {
    return true;
  }

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const loaderSeen = window.sessionStorage.getItem('pj-loader-seen') === 'true';

  return !prefersReducedMotion && !loaderSeen;
};

function App() {
  const [darkMode, setDarkMode] = useState(getInitialTheme);
  const [isLoading, setIsLoading] = useState(getInitialLoadingState);
  const [activeSection, setActiveSection] = useState('home');

  const dismissLoader = () => {
    setIsLoading(false);

    if (typeof window !== 'undefined') {
      window.sessionStorage.setItem('pj-loader-seen', 'true');
    }
  };

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    document.documentElement.style.colorScheme = darkMode ? 'dark' : 'light';
    window.localStorage.setItem('theme', darkMode ? 'dark' : 'light');

    const themeColorMeta = document.querySelector('meta[name="theme-color"]');
    const canonicalLink = document.querySelector('link[rel="canonical"]');
    const ogUrlMeta = document.querySelector('meta[property="og:url"]');
    const ogImageMeta = document.querySelector('meta[property="og:image"]');
    const twitterImageMeta = document.querySelector('meta[name="twitter:image"]');
    const baseUrl = `${window.location.origin}${window.location.pathname}`;
    const ogImage = new URL('/profile-portrait.jpg', window.location.origin).href;

    if (themeColorMeta) {
      themeColorMeta.setAttribute('content', darkMode ? '#07101d' : '#f4f7fb');
    }

    if (canonicalLink) {
      canonicalLink.setAttribute('href', baseUrl);
    }

    if (ogUrlMeta) {
      ogUrlMeta.setAttribute('content', baseUrl);
    }

    if (ogImageMeta) {
      ogImageMeta.setAttribute('content', ogImage);
    }

    if (twitterImageMeta) {
      twitterImageMeta.setAttribute('content', ogImage);
    }
  }, [darkMode]);

  useEffect(() => {
    if (!isLoading) {
      return undefined;
    }

    const timer = window.setTimeout(dismissLoader, 2000);
    const handleKeydown = (event) => {
      if (event.key === 'Escape') {
        dismissLoader();
      }
    };

    window.addEventListener('keydown', handleKeydown);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [isLoading]);

  useEffect(() => {
    document.body.style.overflow = isLoading ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isLoading]);

  useEffect(() => {
    const resolveActiveSection = () => {
      const navHeight = document.querySelector('nav')?.offsetHeight ?? 0;
      const viewportProbe = navHeight + window.innerHeight * 0.32;
      let currentSection = 'home';

      sectionIds.forEach((id) => {
        const element = document.getElementById(id);

        if (!element) {
          return;
        }

        const { top } = element.getBoundingClientRect();

        if (top <= viewportProbe) {
          currentSection = id;
        }
      });

      setActiveSection(currentSection);
    };

    resolveActiveSection();
    window.addEventListener('scroll', resolveActiveSection, { passive: true });
    window.addEventListener('resize', resolveActiveSection);

    return () => {
      window.removeEventListener('scroll', resolveActiveSection);
      window.removeEventListener('resize', resolveActiveSection);
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-clip font-sans">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[-8rem] top-[-6rem] h-72 w-72 rounded-full bg-[var(--accent-soft)] blur-3xl" />
        <div className="absolute right-[-5rem] top-[18rem] h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl dark:bg-cyan-300/10" />
        <div className="absolute bottom-[-8rem] left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-sky-400/10 blur-3xl dark:bg-sky-300/10" />
      </div>

      <AnimatePresence>{isLoading ? <LoadingScreen key="loader" onSkip={dismissLoader} /> : null}</AnimatePresence>

      <Navbar
        activeSection={activeSection}
        darkMode={darkMode}
        toggleTheme={() => setDarkMode((previous) => !previous)}
      />

      <SocialSidebar visible={!isLoading} />

      <main
        className={`layout-with-sidebar relative transition-all duration-700 ease-out ${
          isLoading ? 'translate-y-2 opacity-0' : 'translate-y-0 opacity-100'
        }`}
      >
        <Home />
        <About />
        <Resume />
        <Projects />
        <Contact />
      </main>
    </div>
  );
}

export default App;
