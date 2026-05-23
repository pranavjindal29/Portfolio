import { Award, BriefcaseBusiness, Download, GraduationCap, Sparkles } from 'lucide-react';
import Reveal from '../components/Reveal';
import SectionHeading from '../components/SectionHeading';
import {
  certifications,
  educationItems,
  experience,
  leadershipHighlights,
  profile,
} from '../data/portfolio';

export default function Resume() {
  return (
    <section id="resume" className="section-shell scroll-mt-6 pt-2 lg:scroll-mt-8 lg:pt-3">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute right-[8%] top-8 h-44 w-44 rounded-full bg-emerald-400/10 blur-3xl dark:bg-sky-300/10" />
      </div>

      <div className="content-container relative">
        <div className="flex flex-col gap-5 sm:gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Resume"
            title="Work across research, systems, and applied machine learning."
            description="From telecom networks and computer vision to geospatial pipelines and software delivery."
          />

          <Reveal className="w-full sm:w-auto">
            <a href={profile.resume} download className="secondary-button w-full sm:w-fit">
              Download Resume
              <Download size={16} />
            </a>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-5 sm:mt-12 sm:gap-6 xl:grid-cols-[minmax(0,1.35fr)_380px] 2xl:grid-cols-[minmax(0,1.42fr)_420px] min-[1920px]:grid-cols-[minmax(0,1.5fr)_450px]">
          <div className="space-y-4 sm:space-y-5">
            {experience.map((item, index) => (
              <Reveal key={`${item.organization}-${item.title}`} delay={index * 0.06}>
                <article className="surface-panel overflow-hidden p-5 sm:p-7">
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-[var(--accent)]">
                        <BriefcaseBusiness size={16} />
                        <span className="meta-label !text-[var(--accent)]">{item.mode}</span>
                      </div>
                      <h3 className="mt-3 text-xl font-semibold text-[var(--text)] sm:text-2xl">{item.title}</h3>
                      <p className="mt-1 text-base font-medium text-[var(--muted)]">{item.organization}</p>
                    </div>
                    <span className="chip w-fit whitespace-nowrap">{item.period}</span>
                  </div>

                  <p className="mt-5 text-sm leading-7 text-[var(--muted)] sm:text-base">{item.summary}</p>

                  <ul className="mt-5 space-y-3 text-sm leading-7 text-[var(--muted)] sm:text-base">
                    {item.highlights.map((highlight) => (
                      <li key={highlight} className="flex gap-3">
                        <span className="mt-2 h-2 w-2 rounded-full bg-[var(--accent)]" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {item.stack.map((tag) => (
                      <span key={tag} className="chip">
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <div className="space-y-5 sm:space-y-6">
            <Reveal>
              <article className="surface-panel p-5 sm:p-7">
                <div className="flex items-center gap-2 text-[var(--accent)]">
                  <GraduationCap size={17} />
                  <span className="meta-label !text-[var(--accent)]">Education</span>
                </div>
                <div className="mt-5 space-y-4">
                  {educationItems.map((item) => (
                    <div
                      key={item.institution}
                      className="rounded-[22px] border border-[var(--surface-border)] bg-[var(--surface-strong)] p-4"
                    >
                      <h3 className="text-base font-semibold text-[var(--text)] sm:text-lg">{item.institution}</h3>
                      <p className="mt-1 text-sm leading-7 text-[var(--muted)]">{item.credential}</p>
                      <div className="mt-4 grid grid-cols-2 gap-3">
                        <div>
                          <p className="meta-label">Timeline</p>
                          <p className="mt-1 text-sm text-[var(--text)]">{item.period}</p>
                        </div>
                        <div>
                          <p className="meta-label">Grade</p>
                          <p className="mt-1 text-sm text-[var(--text)]">{item.grade}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            </Reveal>

            <Reveal>
              <article className="surface-panel p-5 sm:p-7">
                <div className="flex items-center gap-2 text-[var(--accent)]">
                  <Award size={17} />
                  <span className="meta-label !text-[var(--accent)]">Certifications</span>
                </div>
                <div className="mt-5 space-y-4">
                  {certifications.map((item) => (
                    <div
                      key={item.title}
                      className="rounded-[22px] border border-[var(--surface-border)] bg-[var(--surface-strong)] p-4"
                    >
                      <h4 className="text-base font-semibold text-[var(--text)]">{item.title}</h4>
                      <p className="mt-1 text-sm font-medium text-[var(--muted)]">{item.issuer}</p>
                      <div className="mt-4 grid grid-cols-2 gap-3">
                        <div>
                          <p className="meta-label">Issued</p>
                          <p className="mt-1 text-sm text-[var(--text)]">{item.issued}</p>
                        </div>
                        {item.expires ? (
                          <div>
                            <p className="meta-label">Expires</p>
                            <p className="mt-1 text-sm text-[var(--text)]">{item.expires}</p>
                          </div>
                        ) : item.credentialId ? (
                          <div>
                            <p className="meta-label">Credential ID</p>
                            <p className="mt-1 text-sm text-[var(--text)]">{item.credentialId}</p>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            </Reveal>

            {leadershipHighlights.map((highlight, index) => (
              <Reveal key={highlight.title} delay={index * 0.08}>
                <article className="surface-panel p-5 sm:p-6">
                  <div className="flex items-center gap-2 text-[var(--accent)]">
                    <Sparkles size={16} />
                    <span className="meta-label !text-[var(--accent)]">Leadership</span>
                  </div>
                  <h4 className="mt-4 text-lg font-semibold text-[var(--text)]">{highlight.title}</h4>
                  <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{highlight.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
