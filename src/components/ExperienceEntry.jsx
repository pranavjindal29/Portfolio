export default function ExperienceEntry({ entry }) {
  return (
    <article className={`experience-entry${entry.current ? ' is-current' : ''}`}>
      <div className="experience-period">
        <p>{entry.period}</p>
        {entry.current && <span className="current-label"><span className="status-dot" aria-hidden="true" />Current role</span>}
      </div>
      <div className="min-w-0">
        <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">{entry.organization}</h3>
        <p className="mt-1 text-sm font-medium text-[var(--accent)]">{entry.title}</p>
        <p className="reading-copy mt-4 text-base leading-7 text-[var(--muted)]">{entry.summary}</p>
        <ul className="experience-highlights reading-copy">
          {entry.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
        </ul>
        <p className="experience-stack"><span className="sr-only">Technologies: </span>{entry.stack.join(' · ')}</p>
      </div>
    </article>
  );
}
