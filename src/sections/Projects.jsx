import { Github } from 'lucide-react';
import Reveal from '../components/Reveal';
import SectionHeading from '../components/SectionHeading';
import { projects } from '../data/portfolio';

export default function Projects() {
  return (
    <section id="projects" className="section-shell scroll-mt-6 lg:scroll-mt-8">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-10 h-44 w-72 -translate-x-1/2 rounded-full bg-sky-400/12 blur-3xl dark:bg-cyan-300/12" />
      </div>

      <div className="content-container relative">
        <SectionHeading
          eyebrow="Projects"
          title="Selected work built around real datasets, deployment constraints, and measurable outcomes."
          description="The projects below highlight how I approach problem framing, model quality, and usable implementation instead of stopping at experimentation."
          align="center"
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {projects.map((project, index) => (
            <Reveal key={project.title} delay={index * 0.08}>
              <article className="surface-panel flex h-full flex-col overflow-hidden p-6 sm:p-7">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="section-eyebrow">{project.period}</span>
                    <h3 className="mt-4 text-2xl font-semibold text-[var(--text)]">{project.title}</h3>
                  </div>
                </div>

                <p className="mt-5 text-sm leading-7 text-[var(--muted)] sm:text-base">{project.description}</p>

                <ul className="mt-6 space-y-3 text-sm leading-7 text-[var(--muted)] sm:text-base">
                  {project.highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-3">
                      <span className="mt-2 h-2 w-2 rounded-full bg-[var(--accent)]" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap gap-2">
                  {project.stack.map((tag) => (
                    <span key={tag} className="chip">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="primary-button"
                  >
                    GitHub Repository
                    <Github size={16} />
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
