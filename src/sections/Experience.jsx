import ExperienceEntry from '../components/ExperienceEntry';
import Reveal from '../components/Reveal';
import SectionHeading from '../components/SectionHeading';
import { certifications, education, experience, leadership } from '../data/portfolio';

export default function Experience() {
  return (
    <section id="experience" tabIndex={-1} className="section-shell experience-section" aria-labelledby="experience-title">
      <div className="content-container">
        <SectionHeading number="02" title={experience.title} id="experience-title" />
        <div className="experience-list">
          {experience.entries.map((entry) => <Reveal key={entry.organization} delay={60}><ExperienceEntry entry={entry} /></Reveal>)}
        </div>
        <Reveal className="earlier-experience">
          <h3 className="eyebrow">{experience.earlierTitle}</h3>
          <div className="mt-6 grid gap-7 md:grid-cols-2 md:gap-12">
            {experience.earlier.map((entry) => (
              <article key={entry.organization}>
                <p className="text-xs text-[var(--muted)]">{entry.period}</p>
                <h4 className="mt-2 font-semibold">{entry.organization}</h4>
                <p className="text-sm text-[var(--accent)]">{entry.title}</p>
                <p className="reading-copy mt-3 text-base leading-7 text-[var(--muted)]">{entry.summary}</p>
              </article>
            ))}
          </div>
        </Reveal>
        <Reveal className="credentials">
          <div>
            <h3 className="eyebrow">Education</h3>
            <p className="mt-4 font-semibold">{education.institution}</p>
            <p className="reading-copy mt-1 text-[15px] text-[var(--muted)]">{education.credential}</p>
            <p className="mt-2 font-mono text-xs text-[var(--muted)]">{education.period} <span className="px-2" aria-hidden="true">/</span> {education.grade}</p>
          </div>
          <div>
            <h3 className="eyebrow">Certifications</h3>
            <ul className="mt-4 space-y-3 text-[15px]">
              {certifications.map((item) => <li key={item.title}><span className="font-medium">{item.title}</span><span className="mt-0.5 block text-xs text-[var(--muted)]">Issued {item.issued}{item.expires ? ` · Valid through ${item.expires}` : ''}</span></li>)}
            </ul>
          </div>
        </Reveal>
        <p className="leadership-line reading-copy"><span className="font-semibold text-[var(--text)]">Beyond engineering.</span> {leadership}</p>
      </div>
    </section>
  );
}
