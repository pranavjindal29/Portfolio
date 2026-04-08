import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { navigationItems, profile } from '../data/portfolio';

export default function Navbar({ darkMode, toggleTheme, activeSection }) {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
      className={`fixed top-0 z-50 w-full px-4 py-4 transition-all duration-300 sm:px-6 lg:px-8 ${
        scrolled ? 'backdrop-blur-xl' : 'backdrop-blur-none'
      }`}
    >
      <div
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-full border px-4 py-3 shadow-sm transition-all duration-300 sm:px-6 ${
          scrolled
            ? 'border-[var(--surface-border)] bg-[var(--surface)] shadow-[var(--shadow)]'
            : 'border-transparent bg-transparent shadow-none'
        }`}
      >
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="focus:outline-none"
          aria-label="Back to top"
        >
          <div className="font-mono text-2xl font-semibold tracking-[0.28em] text-[var(--accent)] transition-transform duration-300 hover:scale-[1.02]">
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
          className="rounded-full border border-[var(--surface-border)] bg-[var(--surface)] px-3 py-1.5 text-2xl text-[var(--text)] transition hover:bg-[var(--surface-strong)] md:hidden"
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
          className="absolute right-4 top-[5.5rem] z-50 w-[calc(100%-2rem)] rounded-[28px] border border-[var(--surface-border)] bg-[var(--surface)] p-4 shadow-[var(--shadow)] backdrop-blur-xl sm:right-6 sm:w-80 md:hidden"
        >
          <div className="space-y-2">
            {navigationItems.map((item) => {
              const href = item.toLowerCase();
              const isActive = activeSection === href;

              return (
                <a
                  key={item}
                  href={`#${href}`}
                  onClick={() => setIsMenuOpen(false)}
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
        </div>
      )}
    </nav>
  );
}
