import { ArrowUpRight, Check } from 'lucide-react';
import Reveal from '../components/Reveal';
import SectionHeading from '../components/SectionHeading';
import ProjectCard from '../components/ProjectCard';
import { projects } from '../data/portfolio';

export default function Projects() {
  const featured = projects.featured;
  return (
    <section id="projects" tabIndex={-1} className="section-shell projects-section" aria-labelledby="projects-title">
      <div className="content-container">
        <SectionHeading number="03" title={projects.title} description={projects.description} id="projects-title" />
        <Reveal delay={60}>
          <article className="featured-project">
            <div className="featured-copy">
              <p className="eyebrow">{featured.category}</p>
              <h3 className="mt-4 max-w-lg font-display text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">{featured.title}</h3>
              <p className="reading-copy mt-5 max-w-xl text-base leading-7 text-[var(--muted)]">{featured.description}</p>
              <ul className="reading-copy mt-5 grid gap-x-5 gap-y-2 sm:grid-cols-2">
                {featured.highlights.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm leading-6 text-[var(--muted)]">
                    <Check size={13} strokeWidth={2} className="mt-1 shrink-0 text-[var(--accent)]" aria-hidden="true" focusable="false" />
                    <span className="min-w-0">{item}</span>
                  </li>
                ))}
              </ul>
              <ul className="project-tags" aria-label="Technologies">{featured.stack.map((tag) => <li key={tag}>{tag}</li>)}</ul>
            </div>
            <div className="benchmark-panel" aria-label={featured.result}>
              <p className="eyebrow">Measured under sustained load</p>
              <p className="benchmark-cycles">{featured.benchmark.cycles}</p>
              <p className="text-sm text-[var(--muted)]">complete cycles / {featured.benchmark.duration}</p>
              <div className="benchmark-throughput">
                <span className="font-mono text-3xl font-medium text-[var(--accent)]">~{featured.benchmark.throughput}</span>
                <span className="text-xs text-[var(--muted)]">cycles per second</span>
              </div>
              <p className="reading-copy mt-6 text-sm leading-6 text-[var(--muted)]">Throughput and operation-level latency profiled during the benchmark.</p>
            </div>
          </article>
        </Reveal>
        <div className="projects-grid">
          {projects.items.map((project, index) => <Reveal key={project.title} className="project-reveal" delay={index * 60}><ProjectCard project={project} index={index} /></Reveal>)}
        </div>
        <div className="more-projects">
          <h3 className="eyebrow">{projects.moreTitle}</h3>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-10">
            {projects.more.map((project) => (
              <a key={project.title} href={project.github} target="_blank" rel="noopener noreferrer" className="more-project-link">
                <span className="text-sm font-medium">{project.title}</span>
                <ArrowUpRight size={17} className="shrink-0 text-[var(--accent)]" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
