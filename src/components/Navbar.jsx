import { useEffect, useRef, useState } from 'react';
import { ArrowDownToLine, Menu, Moon, Sun, X } from 'lucide-react';
import { navigation, profile } from '../data/portfolio';
import { listenToMediaQuery } from '../lib/mediaQuery';

export default function Navbar({ darkMode, toggleTheme, activeSection }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButton = useRef(null);
  const navRef = useRef(null);

  useEffect(() => {
    if (!isMenuOpen) return undefined;
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    const closeOnOutsideClick = (event) => {
      if (!navRef.current?.contains(event.target)) setIsMenuOpen(false);
    };
    const desktop = window.matchMedia('(min-width: 768px)');
    const closeOnDesktop = () => { if (desktop.matches) setIsMenuOpen(false); };
    document.addEventListener('keydown', closeOnEscape);
    document.addEventListener('pointerdown', closeOnOutsideClick);
    const stopListening = listenToMediaQuery(desktop, closeOnDesktop);
    return () => {
      document.removeEventListener('keydown', closeOnEscape);
      document.removeEventListener('pointerdown', closeOnOutsideClick);
      stopListening();
    };
  }, [isMenuOpen]);

  return (
    <header className="site-header">
      <nav ref={navRef} className="content-container nav-shell" aria-label="Main navigation" onBlur={(event) => {
        if (isMenuOpen && !event.currentTarget.contains(event.relatedTarget)) setIsMenuOpen(false);
      }}>
        <a href="#home" className="brand" aria-label={`</${profile.initials}> ${profile.name}, back to top`} onClick={() => setIsMenuOpen(false)}>
          <span aria-hidden="true" className="font-mono text-[var(--accent)]">&lt;/{profile.initials}&gt;</span>
        </a>
        <div className="hidden items-center gap-6 md:flex lg:gap-8">
          {navigation.map(({ label, id }) => (
            <a key={id} href={`#${id}`} aria-current={activeSection === id ? 'location' : undefined} className="nav-link">{label}</a>
          ))}
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <a href={profile.resume} download className="nav-resume">Resume <ArrowDownToLine size={14} aria-hidden="true" /></a>
          <button type="button" onClick={toggleTheme} className="icon-button" aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'} aria-pressed={darkMode}>
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button ref={menuButton} type="button" className="icon-button mobile-menu-button" onClick={() => setIsMenuOpen((previous) => !previous)} aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} aria-expanded={isMenuOpen} aria-controls="mobile-navigation">
            {isMenuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
        {isMenuOpen && (
          <div id="mobile-navigation" className="mobile-navigation md:hidden">
            {navigation.map(({ label, id }) => (
              <a key={id} href={`#${id}`} className="nav-link" aria-current={activeSection === id ? 'location' : undefined} onClick={() => setIsMenuOpen(false)}>{label}</a>
            ))}
            <a href={profile.resume} download className="nav-link mobile-resume" onClick={() => setIsMenuOpen(false)}>
              Download Resume <ArrowDownToLine size={15} aria-hidden="true" />
            </a>
          </div>
        )}
      </nav>
    </header>
  );
}
