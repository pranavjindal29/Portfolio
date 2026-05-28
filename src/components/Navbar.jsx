import { useEffect, useState } from 'react';
import { Code2, Github, Linkedin, Moon, Sun } from 'lucide-react';
import { navigationItems, profile } from '../data/portfolio';

export default function Navbar({ darkMode, toggleTheme, activeSection }) {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigation = (event, sectionId, shouldCloseMenu = false) => {
    event.preventDefault();

    if (shouldCloseMenu) {
      setIsMenuOpen(false);
    }

    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const section = document.getElementById(sectionId);

    if (!section) {
      return;
    }

    const navHeight = document.querySelector('nav')?.offsetHeight ?? 0;
    const sectionTop = section.getBoundingClientRect().top + window.scrollY;
    const top = Math.max(sectionTop - navHeight + 10, 0);

    window.scrollTo({ top, behavior: 'smooth' });
  };

  useEffect(() => {
    const updateScrolled = () => setScrolled(window.scrollY > 24);

    updateScrolled();
    window.addEventListener('scroll', updateScrolled, { passive: true });

    return () => window.removeEventListener('scroll', updateScrolled);
  }, []);

  useEffect(() => {
    const closeMenu = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', closeMenu);
    return () => window.removeEventListener('resize', closeMenu);
  }, []);

  return (
    <nav
      className={`layout-with-sidebar fixed top-0 z-50 w-full px-3 py-3 transition-all duration-300 sm:px-6 sm:py-4 lg:px-8 ${
        scrolled ? 'backdrop-blur-xl' : 'backdrop-blur-none'
      }`}
    >
      <div
        className={`content-container flex items-center justify-between rounded-full border px-3.5 py-2.5 shadow-sm transition-all duration-300 sm:px-6 sm:py-3 ${
          scrolled
            ? 'border-[var(--surface-border)] bg-[rgba(255,255,255,0.96)] shadow-[var(--shadow)] dark:bg-[rgba(7,16,29,0.98)]'
            : 'border-[var(--surface-border)] bg-[rgba(255,255,255,0.96)] shadow-[0_10px_28px_rgba(15,23,42,0.08)] dark:bg-[rgba(7,16,29,0.98)] dark:shadow-[0_12px_32px_rgba(2,6,23,0.24)] md:border-transparent md:bg-transparent md:shadow-none dark:md:border-transparent dark:md:bg-transparent dark:md:shadow-none'
        }`}
      >
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="focus:outline-none"
          aria-label="Back to top"
        >
          <div className="font-mono text-[1.7rem] font-semibold tracking-[0.24em] text-[var(--accent)] transition-transform duration-300 hover:scale-[1.02] sm:text-2xl sm:tracking-[0.28em]">
            &lt;/{profile.initials}&gt;
          </div>
        </button>

        <div className="hidden items-center gap-2 md:flex">
          {navigationItems.map((item) => {
            const href = item.toLowerCase();
            const isActive = activeSection === href;

            return (
              <a
                key={item}
                href={`#${href}`}
                onClick={(event) => handleNavigation(event, href)}
                aria-current={isActive ? 'page' : undefined}
                className={`relative inline-flex items-center rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? 'bg-[var(--accent-soft)] text-[var(--accent)]'
                    : 'text-[var(--muted)] hover:bg-[var(--surface-strong)] hover:text-[var(--text)]'
                }`}
              >
                {item}
              </a>
            );
          })}
          <button
            type="button"
            onClick={toggleTheme}
            className="relative ml-2 flex h-11 w-[74px] items-center rounded-full border border-[var(--surface-border)] bg-[var(--surface-strong)] px-1"
            aria-label="Toggle theme"
            aria-pressed={darkMode}
          >
            <span
              className="absolute left-1 top-1 h-8 w-8 rounded-full bg-[var(--accent)] shadow-lg transition-transform duration-300"
              style={{ transform: `translateX(${darkMode ? '34px' : '0px'})` }}
            />
            <span className="relative z-10 flex w-full items-center justify-between px-1.5 text-white">
              <Moon size={15} />
              <Sun size={15} />
            </span>
          </button>
        </div>

        <button
          type="button"
          className="rounded-full border border-[var(--surface-border)] bg-[var(--surface-strong)] px-3 py-1.5 text-xl text-[var(--text)] shadow-[0_6px_18px_rgba(15,23,42,0.12)] transition hover:bg-[var(--surface)] md:hidden dark:shadow-[0_8px_20px_rgba(2,6,23,0.26)]"
          onClick={() => setIsMenuOpen((previous) => !previous)}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
        >
          ☰
        </button>
      </div>

      {isMenuOpen && (
        <div
          id="mobile-navigation"
          className="absolute right-3 top-[4.95rem] z-50 w-[calc(100%-1.5rem)] rounded-[24px] border border-[var(--surface-border)] bg-[rgba(255,255,255,0.98)] p-3.5 shadow-[0_20px_40px_rgba(15,23,42,0.14)] dark:bg-[rgba(7,16,29,0.99)] dark:shadow-[0_24px_44px_rgba(2,6,23,0.32)] sm:right-6 sm:top-[5.5rem] sm:w-80 sm:rounded-[28px] sm:p-4 md:hidden"
        >
          <div className="space-y-2">
            {navigationItems.map((item) => {
              const href = item.toLowerCase();
              const isActive = activeSection === href;

              return (
                <a
                  key={item}
                  href={`#${href}`}
                  onClick={(event) => handleNavigation(event, href, true)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`block rounded-2xl px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? 'bg-[var(--accent-soft)] text-[var(--accent)]'
                      : 'text-[var(--muted)] hover:bg-[var(--surface-strong)] hover:text-[var(--text)]'
                  }`}
                >
                  {item}
                </a>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => {
              toggleTheme();
              setIsMenuOpen(false);
            }}
            className="mt-4 flex w-full items-center justify-between rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-strong)] px-4 py-3 text-sm font-medium text-[var(--text)]"
          >
            <span>Switch appearance</span>
            {darkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <div className="mt-4 flex items-center justify-center gap-3 border-t border-[var(--surface-border)] pt-4">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--surface-border)] bg-[var(--surface-strong)] text-[var(--text)] shadow-sm transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              <Github size={18} />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--surface-border)] bg-[var(--surface-strong)] text-[var(--text)] shadow-sm transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              <Linkedin size={18} />
            </a>
            <a
              href={profile.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LeetCode"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--surface-border)] bg-[var(--surface-strong)] text-[var(--text)] shadow-sm transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              <Code2 size={18} />
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
