import { ArrowUpRight, ExternalLink, Github } from 'lucide-react';
import Reveal from '../components/Reveal';
import SectionHeading from '../components/SectionHeading';
import { projects } from '../data/portfolio';

export default function Projects() {
  return (
    <section id="projects" className="section-shell scroll-mt-6 lg:scroll-mt-8">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-12 h-44 w-72 -translate-x-1/2 rounded-full bg-sky-400/12 blur-3xl dark:bg-cyan-300/12" />
      </div>

      <div className="content-container relative">
        <SectionHeading
          eyebrow="Projects"
          title="A tighter selection of shipped work across ML, data engineering, and product workflows."
          description="Each card stays intentionally brief so the section scans quickly while still covering the full set of highlighted repositories."
          align="center"
        />

        <div className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, index) => (
            <Reveal key={project.title} delay={index * 0.06}>
              <article className="group surface-panel flex h-full flex-col overflow-hidden p-5 transition-all duration-300 hover:-translate-y-1.5 hover:border-[var(--accent)] hover:shadow-[0_24px_50px_rgba(37,99,235,0.14)] sm:p-6">
                <div className="flex items-start justify-between gap-3">
                  <span className="section-eyebrow">{project.category}</span>
                  <span className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                <div className="mt-5">
                  <h3 className="text-[1.2rem] font-semibold leading-tight text-[var(--text)] sm:text-[1.35rem]">
                    {project.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--muted)] sm:text-[0.96rem]">
                    {project.description}
                  </p>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.stack.map((tag) => (
                    <span key={tag} className="chip">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-auto flex flex-wrap gap-2 pt-6">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-[var(--surface-border)] bg-[var(--surface-strong)] px-4 py-2.5 text-sm font-semibold text-[var(--text)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
                  >
                    <Github size={16} />
                    GitHub
                    <ArrowUpRight size={15} />
                  </a>

                  {project.live ? (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-[var(--surface-border)] bg-transparent px-4 py-2.5 text-sm font-semibold text-[var(--muted)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
                    >
                      <ExternalLink size={16} />
                      Live
                    </a>
                  ) : null}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
