import Reveal from './Reveal';

export default function SectionHeading({ number, title, description, id }) {
  return (
    <Reveal className="section-heading">
      <div className="flex items-baseline gap-4">
        {number && <span className="section-number" aria-hidden="true">{number} /</span>}
        <h2 id={id} className="section-title">{title}</h2>
      </div>
      {description && <p className="reading-copy mt-3 max-w-xl text-[var(--muted)]">{description}</p>}
    </Reveal>
  );
}
