import { ArrowUpRight } from 'lucide-react';
import Reveal from '../components/Reveal';
import SectionHeading from '../components/SectionHeading';
import SkillGroup from '../components/SkillGroup';
import { about, skills } from '../data/portfolio';

export default function About() {
  return (
    <section id="about" tabIndex={-1} className="section-shell" aria-labelledby="about-title">
      <div className="content-container">
        <SectionHeading number="01" title={about.title} id="about-title" />
        <Reveal className="about-grid" delay={60}>
          <div className="space-y-4 text-[var(--muted)]">
            {about.paragraphs.map((paragraph) => <p key={paragraph} className="reading-copy">{paragraph}</p>)}
          </div>
          <div className="core-areas">
            <h3 className="eyebrow">{about.areasTitle}</h3>
            <ul className="core-area-list reading-copy mt-5">
              {about.areas.map((area) => (
                <li key={area} className="flex items-start gap-3 text-sm">
                  <ArrowUpRight size={16} strokeWidth={2} className="mt-0.5 shrink-0 text-[var(--accent)]" aria-hidden="true" focusable="false" />
                  <span className="min-w-0">{area}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
        <Reveal className="skills-block">
          <h3 className="mb-7 text-lg font-semibold">{skills.title}</h3>
          <div className="skills-grid">
            {skills.groups.map((group) => <SkillGroup key={group.title} {...group} />)}
          </div>
          <p className="domain-exposure"><span>{skills.domainLabel}:</span> {skills.domain.join(' · ')}</p>
        </Reveal>
      </div>
    </section>
  );
}
