import Reveal from './Reveal';

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className = '',
  descriptionClassName = '',
}) {
  const alignment = align === 'center' ? 'text-center mx-auto' : 'text-left';

  return (
    <Reveal className={`max-w-4xl 2xl:max-w-5xl ${alignment} ${className}`.trim()}>
      <span className="section-eyebrow">{eyebrow}</span>
      <h2 className="section-title mt-4">{title}</h2>
      {description ? <p className={`section-copy mt-4 ${descriptionClassName}`.trim()}>{description}</p> : null}
    </Reveal>
  );
}
