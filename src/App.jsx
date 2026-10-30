import { useEffect, useRef, useState } from 'react';
import { CheckCircle2, CircleAlert } from 'lucide-react';
import Navbar from './components/Navbar';
import SocialSidebar from './components/SocialSidebar';
import Home from './sections/Home';
import About from './sections/About';
import Experience from './sections/Experience';
import Projects from './sections/Projects';
import Contact from './sections/Contact';
import { navigation, profile } from './data/portfolio';

async function copyTextToClipboard(text) {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return;
    } catch { /* Plain HTTP and browser permissions can require selection copying. */ }
  }

  const previousFocus = document.activeElement;
  const selection = window.getSelection();
  const previousRanges = selection ? Array.from({ length: selection.rangeCount }, (_, index) => selection.getRangeAt(index).cloneRange()) : [];
  const field = document.createElement('textarea');
  field.value = text;
  field.readOnly = true;
  field.tabIndex = -1;
  field.style.cssText = 'position:fixed;top:0;left:-9999px;font-size:16px;';
  document.body.append(field);
  try {
    field.select();
    field.setSelectionRange(0, text.length);
    if (!document.execCommand?.('copy')) throw new Error('Clipboard access unavailable');
  } finally {
    field.remove();
    previousFocus?.focus({ preventScroll: true });
    if (selection) {
      selection.removeAllRanges();
      previousRanges.forEach((range) => selection.addRange(range));
    }
  }
}

function getInitialTheme() {
  try {
    const stored = window.localStorage.getItem('theme');
    if (stored === 'dark' || stored === 'light') return stored === 'dark';
  } catch { /* Browsing with storage disabled still supports themes. */ }
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export default function App() {
  const [darkMode, setDarkMode] = useState(getInitialTheme);
  const [activeSection, setActiveSection] = useState('');
  const [clipboardToast, setClipboardToast] = useState(null);
  const clipboardTimer = useRef(null);

  const copyEmail = async () => {
    let message = 'Email copied to clipboard';
    let isError = false;
    try {
      await copyTextToClipboard(profile.email);
    } catch {
      message = 'Unable to copy. Please select and copy the email address.';
      isError = true;
    }
    window.clearTimeout(clipboardTimer.current);
    setClipboardToast({ message, isError });
    clipboardTimer.current = window.setTimeout(() => setClipboardToast(null), 3500);
  };

  useEffect(() => () => window.clearTimeout(clipboardTimer.current), []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    document.documentElement.style.colorScheme = darkMode ? 'dark' : 'light';
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', darkMode ? '#0b1220' : '#f8fafc');
    try { window.localStorage.setItem('theme', darkMode ? 'dark' : 'light'); } catch { /* Optional persistence. */ }
  }, [darkMode]);

  useEffect(() => {
    let atPageEnd = false;
    let currentSection = '';
    const updateActiveSection = () => setActiveSection(atPageEnd ? 'contact' : currentSection);
    const canObserve = typeof window.IntersectionObserver === 'function';
    const observer = canObserve ? new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) currentSection = entry.target.id === 'home' ? '' : entry.target.id;
      });
      updateActiveSection();
    }, { rootMargin: '-15% 0px -60% 0px' }) : null;
    ['home', ...navigation.map(({ id }) => id)].forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer?.observe(section);
    });
    // The final section cannot always reach the observation band on tall screens.
    const footerObserver = canObserve ? new IntersectionObserver(([entry]) => {
      atPageEnd = entry.isIntersecting;
      updateActiveSection();
    }) : null;
    footerObserver?.observe(document.querySelector('footer'));
    // React mounts after the browser's initial anchor lookup. Wait for local
    // fonts so deep links land accurately, including the previous section name.
    let cancelled = false;
    const initialHash = window.location.hash;
    const target = initialHash === '#resume' ? 'experience' : initialHash.slice(1);
    if (!observer) setActiveSection(navigation.some(({ id }) => id === target) ? target : '');
    if (['home', ...navigation.map(({ id }) => id)].includes(target)) {
      Promise.resolve(document.fonts?.ready).then(() => {
        if (!cancelled && window.location.hash === initialHash) {
          document.getElementById(target)?.scrollIntoView({ behavior: 'auto' });
        }
      });
    }
    const resolveLegacyHash = () => {
      if (window.location.hash === '#resume') document.getElementById('experience')?.scrollIntoView();
      if (!observer) {
        const id = window.location.hash === '#resume' ? 'experience' : window.location.hash.slice(1);
        setActiveSection(navigation.some((item) => item.id === id) ? id : '');
      }
    };
    window.addEventListener('hashchange', resolveLegacyHash);
    return () => {
      cancelled = true;
      observer?.disconnect();
      footerObserver?.disconnect();
      window.removeEventListener('hashchange', resolveLegacyHash);
    };
  }, []);

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Navbar activeSection={activeSection} darkMode={darkMode} toggleTheme={() => setDarkMode((previous) => !previous)} />
      <SocialSidebar onCopyEmail={copyEmail} />
      <main id="main-content" tabIndex={-1}>
        <Home />
        <About />
        <Experience />
        <Projects />
        <Contact onCopyEmail={copyEmail} />
      </main>
      <footer className="site-footer-shell">
        <div className="content-container site-footer">
          <a href="#home" title="Back to top">{profile.name}<span className="text-[var(--muted)]"> · {profile.role}</span></a>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </footer>
      <div className="clipboard-toast-region" role="status" aria-live="polite" aria-atomic="true">
        {clipboardToast && (
          <div className={`clipboard-toast${clipboardToast.isError ? ' is-error' : ''}`}>
            {clipboardToast.isError ? <CircleAlert size={18} aria-hidden="true" /> : <CheckCircle2 size={18} aria-hidden="true" />}
            <span>{clipboardToast.message}</span>
          </div>
        )}
      </div>
    </>
  );
}
