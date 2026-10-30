export default function SkillGroup({ title, items }) {
  return (
    <div className="skill-group">
      <h4 className="text-sm font-semibold text-[var(--text)]">{title}</h4>
      <ul className="skill-list">
        {items.map((item) => <li key={item}>{item}</li>)}
      </ul>
    </div>
  );
}
