import { ArrowUpRight, Github } from 'lucide-react';

export default function ProjectCard({ project, index }) {
  return (
    <article className="project-card">
      <div className="project-meta">
        <p className="eyebrow text-[10px]">{project.category}</p>
        <span className="font-mono text-xs text-[var(--muted)]" aria-hidden="true">{String(index + 2).padStart(2, '0')}</span>
      </div>
      <h3 className="project-title text-xl font-semibold leading-snug tracking-tight">{project.title}</h3>
      <div className="project-body reading-copy">
        <p className="text-base leading-7 text-[var(--muted)]">{project.description}</p>
        {project.impact && <p className="project-impact">{project.impact}</p>}
      </div>
      <ul className="project-tags" aria-label="Technologies">{project.stack.map((tag) => <li key={tag}>{tag}</li>)}</ul>
      <div className="project-links">
        <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-link" aria-label={`${project.title} on GitHub`}><Github size={15} aria-hidden="true" />GitHub<ArrowUpRight size={13} aria-hidden="true" /></a>
        {project.live && <a href={project.live} target="_blank" rel="noopener noreferrer" className="text-link" aria-label={`${project.title} live demo`}>Live demo<ArrowUpRight size={15} aria-hidden="true" /></a>}
      </div>
    </article>
  );
}
