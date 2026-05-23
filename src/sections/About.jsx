import { useEffect, useRef, useState } from 'react';
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
import { Icon } from '../lib/iconify';

const focusIcons = [LayoutPanelTop, BrainCircuit, ShieldCheck];
const snapshotIcons = [BriefcaseBusiness, BrainCircuit, MapPin, Sparkles];
const stackIcons = {
  Frontend: LayoutPanelTop,
  Programming: Code2,
  'Backend & Systems': Wrench,
  'Data Science & Engineering': Database,
  'AI / ML': BrainCircuit,
  'Model Evaluation': Gauge,
  'Cloud & DevOps': Cloud,
  'Telecom & Networking': ShieldCheck,
  'Tools & Platforms': BriefcaseBusiness,
};

export default function About() {
  const [activeCategory, setActiveCategory] = useState(techStack[0].category);
  const [scrollThumb, setScrollThumb] = useState({
    verticalHeight: 56,
    verticalOffset: 0,
    verticalVisible: false,
    horizontalWidth: 48,
    horizontalOffset: 0,
    horizontalVisible: false,
  });
  const stackListRef = useRef(null);
  const activeStack = techStack.find((group) => group.category === activeCategory) ?? techStack[0];
  const isDenseStack = activeStack.skills.length > 9;
  const isSparseStack = activeStack.skills.length <= 7;
  const snapshotItems = [
    {
      label: 'Current role',
      value: 'Project Research Associate, IIT Bombay',
    },
    {
      label: 'Core focus',
      value: 'Software engineering, ML systems, and telecom infrastructure',
    },
    {
      label: 'Location',
      value: profile.location,
    },
    {
      label: 'Currently exploring',
      value: 'Software, data, ML systems, and telecom-led builds',
    },
  ];
  const overviewTags = ['Software', 'ML Systems', 'Research'];
  const compactFocusCopy = [
    'Architecture-first thinking with attention to product details.',
    'Hands-on from training and evaluation through deployment choices.',
    'Clear communication, dependable execution, and polished delivery.',
  ];

  useEffect(() => {
    const element = stackListRef.current;

    if (!element) {
      return undefined;
    }

    const updateScrollThumb = () => {
      const { clientHeight, scrollHeight, scrollTop, clientWidth, scrollWidth, scrollLeft } = element;
      const canScrollY = scrollHeight - clientHeight > 4;
      const canScrollX = scrollWidth - clientWidth > 4;

      const nextVerticalHeight = canScrollY
        ? Math.max((clientHeight / scrollHeight) * clientHeight, 44)
        : clientHeight;
      const verticalMaxOffset = Math.max(clientHeight - nextVerticalHeight, 0);
      const verticalScrollRange = Math.max(scrollHeight - clientHeight, 1);
      const nextVerticalOffset = canScrollY ? (scrollTop / verticalScrollRange) * verticalMaxOffset : 0;

      const nextHorizontalWidth = canScrollX
        ? Math.max((clientWidth / scrollWidth) * clientWidth, 44)
        : clientWidth;
      const horizontalMaxOffset = Math.max(clientWidth - nextHorizontalWidth, 0);
      const horizontalScrollRange = Math.max(scrollWidth - clientWidth, 1);
      const nextHorizontalOffset = canScrollX
        ? (scrollLeft / horizontalScrollRange) * horizontalMaxOffset
        : 0;

      setScrollThumb({
        verticalHeight: nextVerticalHeight,
        verticalOffset: nextVerticalOffset,
        verticalVisible: canScrollY,
        horizontalWidth: nextHorizontalWidth,
        horizontalOffset: nextHorizontalOffset,
        horizontalVisible: canScrollX,
      });
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
    <section id="about" className="section-shell scroll-mt-20 pt-4 sm:scroll-mt-24 sm:pt-5 lg:scroll-mt-24 lg:pt-6">
      <div className="content-container">
        <SectionHeading
          eyebrow="About"
          title="Engineering with depth, clarity, and care."
          description="I build systems that stay rigorous underneath and feel simple on the surface."
        />

        <div className="mt-10 grid items-start gap-5 sm:mt-11 sm:gap-6 xl:grid-cols-[minmax(0,1.08fr)_320px] 2xl:grid-cols-[minmax(0,1.1fr)_360px] min-[1920px]:grid-cols-[minmax(0,1.16fr)_390px]">
          <Reveal className="surface-panel h-full overflow-hidden p-0">
            <div className="relative h-full p-5 sm:p-7">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-[linear-gradient(180deg,rgba(37,99,235,0.14),rgba(37,99,235,0.04),transparent)]" />

              <div className="relative flex h-full flex-col gap-4 sm:gap-5">
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

                <div>
                  <h3 className="max-w-3xl text-[1.85rem] font-semibold leading-[1.1] tracking-tight text-[var(--text)] sm:text-[2.35rem] sm:leading-[1.08]">
                    I like turning technically dense work into products that feel clean, usable, and dependable.
                  </h3>
                  <p className="mt-4 max-w-2xl text-[0.98rem] leading-7 text-[var(--muted)] sm:text-lg sm:leading-8">
                    {aboutParagraphs[0]}
                  </p>
                </div>

                <div className="grid gap-3 sm:gap-4 md:grid-cols-3">
                  {focusAreas.map((area, index) => {
                    const FocusIcon = focusIcons[index];

                    return (
                      <article
                        key={area.title}
                        className="flex h-full flex-col rounded-[22px] border border-[var(--surface-border)] bg-[var(--surface-strong)] p-4 sm:rounded-[24px] sm:p-5"
                      >
                        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-[var(--accent)]">
                          <FocusIcon size={18} />
                        </span>
                        <h3 className="mt-4 text-lg font-semibold text-[var(--text)]">{area.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{compactFocusCopy[index]}</p>
                      </article>
                    );
                  })}
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal className="surface-panel h-full overflow-hidden p-0" delay={0.08}>
            <div className="relative h-full p-5 sm:p-6">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-[linear-gradient(180deg,rgba(37,99,235,0.14),rgba(37,99,235,0.04),transparent)]" />

              <div className="relative flex h-full flex-col gap-4 sm:gap-5">
                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                  {snapshotItems.map((item, index) => {
                    const SnapshotIcon = snapshotIcons[index];

                    return (
                      <div
                        key={item.label}
                        className="flex items-start gap-3 rounded-[20px] border border-[var(--surface-border)] bg-[var(--surface-strong)] px-4 py-3.5 sm:gap-4 sm:rounded-[22px] sm:py-4"
                      >
                        <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-[var(--accent)]">
                          <SnapshotIcon size={16} />
                        </span>
                        <div>
                          <p className="meta-label !text-[var(--accent)]">{item.label}</p>
                          <p className="mt-2 text-sm leading-6 text-[var(--text)]">{item.value}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-auto pt-1">
                  <a href={profile.resume} download className="secondary-button w-full justify-between">
                    Resume Snapshot
                    <ArrowUpRight size={16} />
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-10 sm:mt-12">
          <Reveal className="surface-panel relative overflow-hidden p-3 sm:p-4">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-[10.5rem] bg-[linear-gradient(180deg,rgba(37,99,235,0.07)_0%,rgba(37,99,235,0.032)_42%,rgba(37,99,235,0.01)_74%,transparent_100%)]" />

            <div className="relative mb-2 px-1 pt-1 sm:px-2">
              <span className="section-eyebrow">Skills &amp; Technologies</span>
            </div>

            <div className="relative grid gap-3 sm:gap-4 xl:grid-cols-[346px_minmax(0,1fr)] xl:items-stretch 2xl:grid-cols-[380px_minmax(0,1fr)] min-[1920px]:grid-cols-[410px_minmax(0,1fr)]">
              <div className="min-w-0 self-start overflow-hidden rounded-[24px] border border-[var(--surface-border)] bg-[rgba(255,255,255,0.78)] p-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.32)] backdrop-blur-[2px] sm:p-3.5 xl:flex xl:h-[26.7rem] xl:flex-col xl:p-[0.6rem] 2xl:h-[28.2rem] min-[1920px]:h-[29.2rem] dark:bg-[rgba(13,24,41,0.82)]">
                <div className="relative max-w-full overflow-hidden pt-2 xl:flex-1 xl:min-h-0 xl:py-0 xl:pt-0">
                  <div
                    ref={stackListRef}
                    className="skill-category-rail max-w-full pb-2 xl:h-full xl:overflow-x-hidden xl:overflow-y-auto xl:pb-2 xl:pr-1"
                  >
                    <div className="inline-flex min-w-max gap-2 snap-x snap-proximity pr-3 xl:flex xl:w-full xl:min-w-0 xl:flex-col xl:items-stretch xl:gap-2.5 xl:py-2 xl:pr-0">
                      {techStack.map((group) => {
                        const StackIcon = stackIcons[group.category] ?? LayoutPanelTop;
                        const isActive = activeCategory === group.category;

                        return (
                          <button
                            key={group.category}
                            type="button"
                            onClick={() => setActiveCategory(group.category)}
                            className={`skill-category-card group snap-start h-[4rem] shrink-0 min-w-max rounded-[18px] border px-4 py-0 text-left transition sm:px-4 xl:mr-3 xl:min-w-0 xl:max-w-none xl:w-[calc(100%-0.75rem)] xl:snap-none xl:h-[4.4rem] xl:rounded-[20px] xl:px-6 ${
                              isActive
                                ? 'border-[rgba(125,211,252,0.68)] bg-[linear-gradient(135deg,rgba(37,99,235,0.16),rgba(14,165,233,0.06))] text-[var(--accent)] shadow-[0_12px_24px_rgba(37,99,235,0.08)] dark:border-[rgba(125,211,252,0.54)] dark:bg-[linear-gradient(135deg,rgba(10,132,255,0.2),rgba(14,165,233,0.12))] dark:text-sky-100 dark:shadow-[0_16px_34px_rgba(2,6,23,0.28)]'
                                : 'border-[var(--surface-border)] bg-[linear-gradient(135deg,rgba(255,255,255,0.72),rgba(255,255,255,0.54))] text-[var(--muted)] hover:border-[rgba(125,211,252,0.42)] hover:bg-[rgba(255,255,255,0.78)] hover:text-[var(--text)] dark:border-[rgba(96,165,250,0.2)] dark:bg-[linear-gradient(180deg,rgba(15,23,42,0.74),rgba(15,23,42,0.52))] dark:text-slate-300 dark:hover:border-[rgba(125,211,252,0.54)] dark:hover:!bg-[linear-gradient(135deg,rgba(16,44,84,0.92),rgba(18,67,117,0.72))] dark:hover:text-slate-50 dark:hover:shadow-[0_14px_28px_rgba(8,17,31,0.16)]'
                            }`}
                          >
                            <div className="flex items-center gap-2.5 xl:h-full xl:gap-3">
                              <span
                                className={`flex h-9 w-9 items-center justify-center rounded-2xl transition sm:h-10 sm:w-10 xl:h-[2.45rem] xl:w-[2.45rem] ${
                                  isActive
                                    ? 'bg-[rgba(255,255,255,0.82)] text-[var(--accent)] ring-1 ring-[rgba(125,211,252,0.18)] dark:bg-[linear-gradient(135deg,rgba(7,16,29,0.86),rgba(15,23,42,0.92))] dark:text-sky-100 dark:ring-[rgba(125,211,252,0.24)]'
                                    : 'bg-[var(--surface-strong)] text-[var(--muted)] ring-1 ring-transparent group-hover:bg-[rgba(255,255,255,0.94)] group-hover:text-[var(--accent)] dark:bg-[linear-gradient(135deg,rgba(10,25,49,0.88),rgba(12,31,59,0.8))] dark:text-sky-200 dark:ring-[rgba(59,130,246,0.08)] dark:group-hover:!bg-[linear-gradient(135deg,rgba(12,32,61,0.98),rgba(15,49,88,0.9))] dark:group-hover:text-sky-100'
                                }`}
                              >
                                <StackIcon size={17} />
                              </span>
                              <div className="min-w-max xl:min-w-0 xl:flex-1">
                                <p className="whitespace-nowrap text-[0.98rem] font-semibold leading-5 text-[var(--text)] xl:text-[0.92rem]">
                                  {group.category}
                                </p>
                              </div>
                            </div>
                          </button>
                        );
                      })}
                      <span aria-hidden="true" className="w-1 shrink-0 xl:hidden" />
                    </div>
                  </div>

                  <div
                    className="mt-2 h-[4px] rounded-full bg-[rgba(148,163,184,0.18)] xl:hidden"
                    aria-hidden="true"
                  >
                    <span
                      className="block h-full rounded-full transition-all duration-200"
                      style={{
                        width: `${scrollThumb.horizontalWidth}px`,
                        transform: `translateX(${scrollThumb.horizontalOffset}px)`,
                        opacity: scrollThumb.horizontalVisible ? 1 : 0.35,
                        background:
                          'linear-gradient(90deg, rgba(37, 99, 235, 0.7), rgba(14, 165, 233, 0.58))',
                      }}
                    />
                  </div>

                  <div
                    className="pointer-events-none absolute bottom-2 right-0 top-2 hidden w-[3px] rounded-full xl:block"
                    style={{ background: 'rgba(148, 163, 184, 0.18)' }}
                  >
                    <span
                      className="absolute left-0 right-0 rounded-full transition-all duration-200"
                      style={{
                        height: `${scrollThumb.verticalHeight}px`,
                        transform: `translateY(${scrollThumb.verticalOffset}px)`,
                        opacity: scrollThumb.verticalVisible ? 1 : 0.45,
                        background: 'linear-gradient(180deg, rgba(37, 99, 235, 0.68), rgba(14, 165, 233, 0.52))',
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="min-w-0 rounded-[24px] border border-[var(--surface-border)] bg-[rgba(255,255,255,0.8)] p-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.28)] backdrop-blur-[2px] sm:p-5 xl:flex xl:h-[26.7rem] xl:flex-col 2xl:h-[28.2rem] min-[1920px]:h-[29.2rem] dark:bg-[rgba(13,24,41,0.84)]">
                <div className="xl:flex-1">
                <div
                  className={`grid grid-cols-2 gap-2.5 sm:gap-3 xl:w-full ${
                    isDenseStack
                      ? 'lg:grid-cols-3 xl:grid-cols-4'
                      : isSparseStack
                        ? 'lg:grid-cols-3 xl:grid-cols-4 xl:content-start'
                        : 'lg:grid-cols-[repeat(auto-fit,minmax(172px,1fr))] xl:content-start'
                  }`}
                >
                  {activeStack.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className={`rounded-[18px] border border-[var(--surface-border)] bg-[var(--surface)] px-3.5 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] transition hover:-translate-y-[1px] hover:border-[rgba(37,99,235,0.25)] hover:shadow-[0_14px_30px_rgba(15,23,42,0.08)] sm:rounded-[20px] ${
                        isDenseStack
                          ? 'sm:min-h-[4.9rem] sm:px-3.5 sm:py-3.5'
                          : 'sm:min-h-[5.9rem] sm:px-4 sm:py-4'
                      }`}
                    >
                      <div className="flex h-full flex-col items-start gap-2.5 sm:flex-row sm:items-center sm:gap-3">
                        <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,rgba(37,99,235,0.14),rgba(14,165,233,0.08))] sm:h-10 sm:w-10">
                          <Icon icon={skill.icon} width="19" height="19" />
                        </span>
                        <span
                          className={`text-sm font-semibold leading-5 text-[var(--text)] ${
                            isDenseStack ? 'sm:text-[0.93rem]' : 'sm:text-[0.98rem]'
                          }`}
                        >
                          {skill.name}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
