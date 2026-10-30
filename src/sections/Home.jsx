import { ArrowDown, ArrowRight, Download, MapPin } from 'lucide-react';
import { hero, profile } from '../data/portfolio';

export default function Home() {
  const [firstName, ...surname] = profile.name.split(' ');

  return (
    <section id="home" tabIndex={-1} className="hero" aria-labelledby="hero-title">
      <div className="content-container">
        <div className="hero-canvas">
          <div className="hero-topline">
            <p className="hero-eyebrow eyebrow"><span className="status-dot" aria-hidden="true" />{hero.eyebrow}</p>
            <p className="hero-location"><MapPin size={12} aria-hidden="true" />{profile.location}</p>
          </div>
          <div className="hero-grid">
            <div className="hero-heading">
              <h1 id="hero-title" className="hero-name"><span>{firstName}</span>{' '}<span className="hero-name-accent">{surname.join(' ')}<span aria-hidden="true">.</span></span></h1>
              <p className="hero-role">{profile.role}</p>
            </div>
            <div className="hero-description">
              {hero.paragraphs.map((paragraph) => (
                <p key={paragraph} className="hero-copy-beat reading-copy">{paragraph}</p>
              ))}
            </div>
            <div className="hero-actions">
              <a href="#projects" className="primary-button">{hero.primaryAction}<ArrowRight size={17} aria-hidden="true" /></a>
              <a href={profile.resume} download className="secondary-button">{hero.resumeAction}<Download size={16} aria-hidden="true" /></a>
            </div>
            <figure className="portrait">
              <div className="portrait-grid" aria-hidden="true" />
              <div className="portrait-image">
                <picture>
                  <source type="image/webp" srcSet="/profile-portrait-480.webp 480w, /profile-portrait-800.webp 800w" sizes="(min-width: 1200px) 308px, (min-width: 1024px) 280px, (min-width: 768px) 220px, (min-width: 360px) 180px, 144px" />
                  <img src="/profile-portrait.jpg" alt={hero.portraitAlt} width="1091" height="1200" fetchPriority="high" decoding="async" />
                </picture>
              </div>
              <div className="portrait-process" aria-hidden="true">
                {hero.process.map((step, index) => (
                  <span className="process-step" key={step}>
                    <span className="process-number">0{index + 1}</span>
                    <span>{step}<span className="process-period">.</span></span>
                  </span>
                ))}
              </div>
              <figcaption><span className="status-dot" aria-hidden="true" />{hero.appointment}</figcaption>
            </figure>
          </div>
          <a href="#about" className="hero-scroll"><span>A little more about my work</span><span className="hero-scroll-icon"><ArrowDown size={17} aria-hidden="true" /></span></a>
        </div>
      </div>
    </section>
  );
}
