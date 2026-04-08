import { useEffect, useRef, useState } from 'react';
import { Icon } from '@iconify/react';
import {
  ArrowUpRight,
  BrainCircuit,
  BriefcaseBusiness,
  Cloud,
  Code2,
  Database,
  Gauge,
  LayoutPanelTop,
  MapPin,
  ShieldCheck,
  Sparkles,
  Wrench,
} from 'lucide-react';
import Reveal from '../components/Reveal';
import SectionHeading from '../components/SectionHeading';
import { aboutParagraphs, focusAreas, profile, techStack } from '../data/portfolio';

const focusIcons = [LayoutPanelTop, BrainCircuit, ShieldCheck];
const snapshotIcons = [BriefcaseBusiness, BrainCircuit, MapPin, Sparkles];
const stackIcons = {
  Frontend: LayoutPanelTop,
  Programming: Code2,
  'AI / ML': BrainCircuit,
  'Data Science': Database,
  'Model Evaluation': Gauge,
  'Cloud & Tools': Cloud,
  Tools: Wrench,
};

export default function About() {
  const [activeCategory, setActiveCategory] = useState(techStack[0].category);
  const [scrollThumb, setScrollThumb] = useState({ height: 56, offset: 0, visible: false });
  const stackListRef = useRef(null);
  const activeStack = techStack.find((group) => group.category === activeCategory) ?? techStack[0];
  const ActiveStackIcon = stackIcons[activeStack.category] ?? LayoutPanelTop;
  const snapshotItems = [
    {
      label: 'Current role',
      value: 'Project Research Assistant at IIT Bombay',
    },
    {
      label: 'Core focus',
      value: 'Software engineering, ML systems, and data-heavy products',
    },
    {
      label: 'Location',
      value: profile.location,
    },
    {
      label: 'Open to',
      value: 'SDE, ML, data, and platform roles',
    },
  ];
  const recentEnvironments = ['IIT Bombay', 'IIT Roorkee', 'DRDO', 'SVGS IT'];
  const overviewTags = ['Software', 'ML Systems', 'Research'];

  const totalSkills = techStack.reduce((count, group) => count + group.skills.length, 0);

  useEffect(() => {
    const element = stackListRef.current;

    if (!element) {
      return undefined;
    }

    const updateScrollThumb = () => {
      const { clientHeight, scrollHeight, scrollTop } = element;
      const canScroll = scrollHeight - clientHeight > 4;

      if (!canScroll) {
        setScrollThumb({ height: clientHeight, offset: 0, visible: false });
        return;
      }

      const nextHeight = Math.max((clientHeight / scrollHeight) * clientHeight, 44);
      const maxOffset = Math.max(clientHeight - nextHeight, 0);
      const scrollRange = Math.max(scrollHeight - clientHeight, 1);
      const nextOffset = (scrollTop / scrollRange) * maxOffset;

      setScrollThumb({ height: nextHeight, offset: nextOffset, visible: true });
    };

    updateScrollThumb();
    element.addEventListener('scroll', updateScrollThumb, { passive: true });
    window.addEventListener('resize', updateScrollThumb);

    return () => {
      element.removeEventListener('scroll', updateScrollThumb);
      window.removeEventListener('resize', updateScrollThumb);
    };
  }, []);

  return (
    <section id="about" className="section-shell scroll-mt-24">
      <div className="content-container">
        <SectionHeading
          eyebrow="About"
          title="Engineering with depth, polish, and a strong bias for clarity."
          description="I like building products that feel considered from both sides: rigorous systems underneath and clean experience on the surface."
        />

        <div className="mt-14 grid items-stretch gap-8 xl:grid-cols-[minmax(0,1.08fr)_360px]">
          <Reveal className="surface-panel h-full overflow-hidden p-0">
            <div className="relative h-full p-6 sm:p-8">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.18),transparent_60%)]" />

              <div className="relative flex h-full flex-col">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="section-eyebrow">Overview</span>
                  <div className="flex flex-wrap gap-2">
                    {overviewTags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-[var(--surface-border)] bg-[var(--surface-strong)] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_250px] lg:items-start">
                  <div>
                    <h3 className="max-w-3xl text-3xl font-semibold tracking-tight text-[var(--text)] sm:text-[2.6rem] sm:leading-[1.05]">
                      I like making technically hard work feel clear, usable, and dependable.
                    </h3>
                    <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--muted)] sm:text-lg">
                      {aboutParagraphs[0]}
                    </p>
                  </div>

                  <div className="rounded-[24px] border border-[var(--surface-border)] bg-[var(--surface-strong)] p-5">
                    <p className="meta-label">Recent Environments</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {recentEnvironments.map((item) => (
                        <span key={item} className="chip !rounded-full !px-3 !py-1.5 !text-[11px] !tracking-[0.18em]">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-7 rounded-[24px] border border-[var(--surface-border)] bg-[var(--surface-strong)] p-5">
                  <p className="meta-label">How I Approach Work</p>
                  <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--muted)] sm:text-base">
                    {aboutParagraphs[2]}
                  </p>
                </div>

                <div className="mt-8 grid gap-4 md:grid-cols-3">
                  {focusAreas.map((area, index) => {
                    const FocusIcon = focusIcons[index];

                    return (
                      <article
                        key={area.title}
                        className="flex h-full flex-col rounded-[24px] border border-[var(--surface-border)] bg-[var(--surface-strong)] p-5"
                      >
                        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-[var(--accent)]">
                          <FocusIcon size={18} />
                        </span>
                        <h3 className="mt-4 text-lg font-semibold text-[var(--text)]">{area.title}</h3>
                        <p className="mt-2 text-sm leading-7 text-[var(--muted)]">{area.description}</p>
                      </article>
                    );
                  })}
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal className="surface-panel h-full overflow-hidden p-0" delay={0.08}>
            <div className="relative h-full p-6 sm:p-8">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-[linear-gradient(180deg,rgba(37,99,235,0.12),transparent)]" />

              <div className="relative flex h-full flex-col">
                <div className="rounded-[24px] border border-[var(--surface-border)] bg-[var(--surface-strong)] p-5">
                  <p className="meta-label">At A Glance</p>
                  <h3 className="mt-3 text-2xl font-semibold text-[var(--text)] sm:text-[2rem] sm:leading-[1.1]">
                    A quick high-signal view.
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
                    {profile.availability}
                  </p>
                </div>

                <div className="mt-5 space-y-3">
                  {snapshotItems.map((item, index) => {
                    const SnapshotIcon = snapshotIcons[index];

                    return (
                      <div
                        key={item.label}
                        className="flex items-start gap-4 rounded-[22px] border border-[var(--surface-border)] bg-[var(--surface-strong)] px-4 py-4"
                      >
                        <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-[var(--accent)]">
                          <SnapshotIcon size={16} />
                        </span>
                        <div>
                          <p className="meta-label !text-[var(--accent)]">{item.label}</p>
                          <p className="mt-2 text-sm leading-7 text-[var(--text)]">{item.value}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-auto pt-6">
                  <a href={profile.resume} download className="secondary-button w-full justify-between">
                    Resume Snapshot
                    <ArrowUpRight size={16} />
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-16">
          <Reveal className="surface-panel p-3 sm:p-4">
            <div className="grid gap-4 xl:grid-cols-[250px_minmax(0,1fr)]">
              <div className="rounded-[24px] border border-[var(--surface-border)] bg-[var(--surface-strong)] p-3">
                <div className="px-2 pb-3">
                  <p className="meta-label">Skills &amp; Tools</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                    Compact, organized, and easy to scan.
                  </p>
                </div>

                <div className="relative">
                  <div
                    ref={stackListRef}
                    className="minimal-scrollbar flex gap-2 overflow-x-auto pb-1 xl:max-h-[18.75rem] xl:flex-col xl:overflow-x-hidden xl:overflow-y-scroll xl:pb-0 xl:pr-4"
                  >
                    {techStack.map((group) => {
                      const StackIcon = stackIcons[group.category] ?? LayoutPanelTop;
                      const isActive = activeCategory === group.category;

                      return (
                        <button
                          key={group.category}
                          type="button"
                          onClick={() => setActiveCategory(group.category)}
                          className={`min-w-fit rounded-[20px] border px-4 py-3 text-left transition xl:min-w-0 ${
                            isActive
                              ? 'border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)]'
                              : 'border-[var(--surface-border)] bg-[var(--surface)] text-[var(--muted)] hover:border-[var(--accent)] hover:text-[var(--text)]'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span
                              className={`flex h-10 w-10 items-center justify-center rounded-2xl ${
                                isActive
                                  ? 'bg-[var(--surface-strong)] text-[var(--accent)]'
                                  : 'bg-[var(--surface-strong)] text-[var(--muted)]'
                              }`}
                            >
                              <StackIcon size={18} />
                            </span>
                            <div>
                              <p className="text-sm font-semibold">{group.category}</p>
                              <p className="mt-1 text-xs uppercase tracking-[0.22em] opacity-70">
                                {group.skills.length} tools
                              </p>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <div
                    className="pointer-events-none absolute bottom-0 right-0 top-0 hidden w-[3px] rounded-full xl:block"
                    style={{ background: 'rgba(148, 163, 184, 0.18)' }}
                  >
                    <span
                      className="absolute left-0 right-0 rounded-full transition-all duration-200"
                      style={{
                        height: `${scrollThumb.height}px`,
                        transform: `translateY(${scrollThumb.offset}px)`,
                        opacity: scrollThumb.visible ? 1 : 0.45,
                        background: 'linear-gradient(180deg, rgba(37, 99, 235, 0.68), rgba(14, 165, 233, 0.52))',
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="rounded-[24px] border border-[var(--surface-border)] bg-[var(--surface-strong)] p-5 sm:p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="max-w-2xl">
                    <span className="section-eyebrow">Skills &amp; Technologies</span>
                    <div className="mt-4 flex items-center gap-3">
                      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-[var(--accent)]">
                        <ActiveStackIcon size={20} />
                      </span>
                      <div>
                        <h3 className="text-2xl font-semibold text-[var(--text)] sm:text-3xl">
                          {activeStack.category}
                        </h3>
                        <p className="mt-1 text-sm text-[var(--muted)]">
                          {activeStack.skills.length} tools in this stack
                        </p>
                      </div>
                    </div>
                    <p className="mt-4 text-sm leading-7 text-[var(--muted)] sm:text-base">
                      {activeStack.description}
                    </p>
                  </div>

                  <div className="rounded-[22px] border border-[var(--surface-border)] bg-[var(--surface)] px-4 py-4 sm:min-w-[132px]">
                    <p className="meta-label">Overall</p>
                    <p className="mt-2 text-2xl font-semibold text-[var(--text)]">{totalSkills}+</p>
                    <p className="mt-1 text-xs leading-5 text-[var(--muted)]">
                      technologies across {techStack.length} categories
                    </p>
                  </div>
                </div>

                <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {activeStack.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="rounded-[20px] border border-[var(--surface-border)] bg-[var(--surface)] px-4 py-4"
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-[var(--accent)]">
                          <Icon icon={skill.icon} width="20" height="20" />
                        </span>
                        <span className="text-sm font-semibold text-[var(--text)] sm:text-base">
                          {skill.name}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
