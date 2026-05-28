import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Download } from 'lucide-react';
import { heroRoles, heroStats, heroStrengths, profile } from '../data/portfolio';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function Home() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [typedRole, setTypedRole] = useState(heroRoles[0]);
  const shouldReduceMotion = useReducedMotion();
  const longestRole = heroRoles.reduce(
    (longest, role) => (role.length > longest.length ? role : longest),
    heroRoles[0]
  );
  const shouldTypeRole = !shouldReduceMotion;

  useEffect(() => {
    if (shouldReduceMotion) {
      return undefined;
    }

    const rotation = window.setInterval(() => {
      setRoleIndex((previous) => (previous + 1) % heroRoles.length);
    }, 3200);

    return () => window.clearInterval(rotation);
  }, [shouldReduceMotion]);

  const currentRole = shouldReduceMotion ? heroRoles[0] : heroRoles[roleIndex];

  useEffect(() => {
    if (!shouldTypeRole) {
      setTypedRole(currentRole);
      return undefined;
    }

    const role = heroRoles[roleIndex];
    let characterIndex = 0;

    setTypedRole('');

    const typing = window.setInterval(() => {
      characterIndex += 1;
      setTypedRole(role.slice(0, characterIndex));

      if (characterIndex >= role.length) {
        window.clearInterval(typing);
      }
    }, 70);

    return () => window.clearInterval(typing);
  }, [currentRole, roleIndex, shouldTypeRole]);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);

    if (!section) {
      return;
    }

    const navHeight = document.querySelector('nav')?.offsetHeight ?? 0;
    const sectionTop = section.getBoundingClientRect().top + window.scrollY;
    const top = Math.max(sectionTop - navHeight + 28, 0);

    window.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen scroll-mt-0 px-4 pb-8 pt-[6.55rem] sm:px-6 sm:pb-10 sm:pt-[7.25rem] lg:px-8 lg:pb-8 lg:pt-[6.95rem] xl:pb-9 xl:pt-[7.15rem]"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[6%] top-28 h-52 w-52 rounded-full bg-[var(--accent-soft)] blur-3xl" />
        <div className="absolute left-[18%] top-[48%] h-40 w-40 rounded-full bg-sky-400/6 blur-3xl dark:bg-cyan-300/8" />
        <div className="absolute right-[10%] top-[24%] h-40 w-40 rounded-full bg-sky-400/10 blur-3xl dark:bg-cyan-300/10" />
        <div className="absolute bottom-[14%] right-[8%] h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl dark:bg-cyan-300/10" />
      </div>

      <div className="content-container grid gap-4 lg:grid-cols-[minmax(0,1.02fr)_408px] lg:items-start lg:gap-x-3 lg:gap-y-2 xl:grid-cols-[minmax(0,1fr)_428px] xl:gap-x-4 xl:gap-y-2.5 2xl:grid-cols-[minmax(0,1.02fr)_500px] min-[1920px]:grid-cols-[minmax(0,1.08fr)_560px] min-[1920px]:gap-x-8">
        <motion.div
          className="relative z-10 order-1 flex h-full min-w-0 flex-col gap-4 lg:-mt-1 lg:gap-2"
          variants={containerVariants}
          initial={shouldReduceMotion ? false : 'hidden'}
          animate="visible"
        >
          <div className="space-y-4 sm:space-y-5 lg:max-w-[41.25rem] lg:space-y-4 xl:max-w-[42.25rem] 2xl:max-w-[47rem] min-[1920px]:max-w-[52rem]">
            <motion.span
              variants={itemVariants}
              className="section-eyebrow w-fit shadow-[0_10px_24px_rgba(37,99,235,0.08)] transition-all duration-300 hover:border-[var(--surface-border)] hover:bg-[color:rgba(37,99,235,0.12)] hover:text-[var(--accent)] hover:shadow-[0_12px_28px_rgba(37,99,235,0.10)]"
            >
              Currently at IIT Bombay
            </motion.span>

            <motion.div variants={itemVariants} className="space-y-2 pt-0.5 sm:pt-1 lg:pt-0.5">
              <h1 className="font-display text-4xl font-semibold tracking-tight text-[var(--text)] sm:text-5xl lg:text-[3.42rem] lg:leading-[0.95] xl:text-[3.7rem]">
                {profile.name}
                <span className="mt-1.5 block text-[var(--accent)] lg:text-[0.91em] xl:text-[0.89em] xl:leading-[0.99]">
                  {profile.headline}
                </span>
              </h1>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex min-h-[1.6rem] max-w-full flex-nowrap items-center gap-2 overflow-hidden text-[10px] uppercase tracking-[0.18em] text-[var(--muted)] sm:gap-3.5 sm:text-sm sm:tracking-[0.32em]"
            >
              <span className="shrink-0 leading-none">Now shipping as</span>
              <span aria-hidden="true" className="shrink-0 text-[var(--surface-border)] sm:hidden">
                --
              </span>
              <span className="hidden h-px w-10 bg-[var(--surface-border)] sm:block" />
              <span className="font-mono text-[10px] uppercase leading-none tracking-[0.2em] text-[var(--accent)] sm:text-sm sm:tracking-[0.32em]">
                <span className="relative inline-flex min-h-[1.3rem] w-[18ch] max-w-full items-center whitespace-nowrap sm:w-[20ch]">
                  <span className="invisible">
                    {longestRole}
                    {!shouldReduceMotion ? '|' : ''}
                  </span>
                  {!shouldTypeRole ? (
                    <span className="absolute inset-0 flex items-center">{currentRole}</span>
                  ) : (
                    <span className="absolute inset-0 flex items-center">
                      <span>{typedRole}</span>
                      <span className="ml-1 animate-blink">|</span>
                    </span>
                  )}
                </span>
              </span>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-3 pt-0 lg:gap-2.5">
              <button type="button" onClick={() => scrollToSection('projects')} className="primary-button">
                View Projects
                <ArrowRight size={17} />
              </button>
              <a href={profile.resume} download className="secondary-button">
                Download Resume
                <Download size={16} />
              </a>
              <button type="button" onClick={() => scrollToSection('contact')} className="ghost-button">
                Contact
              </button>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 order-2 min-w-0 w-full lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:max-w-[444px] lg:justify-self-end lg:-mt-[0.75rem] xl:max-w-[460px] xl:-mt-[1rem] 2xl:max-w-[520px] min-[1920px]:max-w-[580px]"
        >
          <div className="surface-panel relative flex h-full min-w-0 flex-col overflow-hidden p-4 sm:p-4.5">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(96,165,250,0.22),transparent_38%)]" />
            <div className="relative overflow-hidden rounded-[24px] border border-[var(--surface-border)] bg-[var(--bg-muted)] lg:mt-0 xl:mt-0">
              <img
                src="/profile-portrait.jpg"
                alt="Pranav Jindal portrait"
                width="1091"
                height="1200"
                sizes="(min-width: 1536px) 456px, (min-width: 1280px) 440px, (min-width: 1024px) 420px, (min-width: 640px) 480px, 100vw"
                decoding="async"
                className="h-[332px] w-full object-cover object-top sm:h-[378px] lg:h-[392px] xl:h-[418px] 2xl:h-[470px] min-[1920px]:h-[520px]"
              />
            </div>
            <div className="relative mt-3 grid gap-3 lg:mt-2.5 lg:gap-2">
              <motion.div
                whileHover={shouldReduceMotion ? undefined : { y: -4, scale: 1.01 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
                className="group flex items-center justify-between rounded-[22px] border border-[var(--surface-border)] bg-[var(--surface-strong)] px-4 py-2.5 shadow-sm transition-all duration-300 hover:border-[var(--accent)] hover:shadow-[0_18px_36px_rgba(37,99,235,0.12)]"
              >
                <div>
                  <p className="meta-label">Current focus</p>
                  <p className="mt-1 text-sm font-medium text-[var(--text)] transition-colors duration-300 group-hover:text-[var(--accent)]">
                    5G/6G core systems and intelligent infrastructure
                  </p>
                </div>
                <CheckCircle2 size={18} className="text-[var(--accent)] transition-transform duration-300 group-hover:scale-110" />
              </motion.div>

              <div className="rounded-[22px] border border-[var(--surface-border)] bg-[var(--surface-strong)] px-4 py-3.5">
                <p className="meta-label">What I bring</p>
                <div className="mt-3.5 grid auto-rows-fr grid-cols-2 gap-2.5">
                  {heroStrengths.map((item) => (
                    <motion.div
                      key={item.title}
                      whileHover={shouldReduceMotion ? undefined : { y: -2 }}
                      transition={{ duration: 0.18, ease: 'easeOut' }}
                      className="flex h-full items-center justify-center rounded-[18px] border border-[var(--surface-border)] bg-[var(--surface)] px-3 py-3 text-center transition-all duration-300 hover:border-[var(--accent)] hover:bg-[var(--accent-soft)]"
                    >
                      <p className="text-sm font-semibold leading-5 text-[var(--text)] transition-colors duration-300 group-hover:text-[var(--accent)] sm:text-[0.93rem]">
                        {item.title}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          initial={shouldReduceMotion ? false : 'hidden'}
          animate="visible"
          className="surface-panel relative order-3 overflow-hidden px-3.5 pb-3 pt-3 lg:col-start-1 lg:mt-[1.05rem] lg:flex lg:min-h-[168px] lg:max-w-none lg:flex-col lg:pt-2.5 xl:mt-[1.2rem] xl:min-h-[178px]"
        >
          <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[var(--accent-soft)]/70 to-transparent" />
          <div className="relative grid auto-rows-fr gap-3 sm:grid-cols-2 lg:h-full lg:grid-cols-4 lg:content-stretch">
            {heroStats.map((stat) => (
              <motion.div
                key={stat.label}
                whileHover={shouldReduceMotion ? undefined : { y: -5, scale: 1.01 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
                className="group grid h-full min-h-[7.15rem] grid-rows-[0.72rem_2rem_minmax(0,1fr)] rounded-[24px] border border-[var(--surface-border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(255,255,255,0.9))] px-3.5 pb-2.5 pt-3 shadow-[0_10px_24px_rgba(15,23,42,0.06)] transition-all duration-300 hover:border-[var(--accent)] hover:shadow-[0_18px_36px_rgba(37,99,235,0.12)] dark:bg-[linear-gradient(180deg,rgba(13,24,41,0.98),rgba(13,24,41,0.92))]"
              >
                <div className="mx-auto h-1.5 w-12 self-start rounded-full bg-[var(--accent-soft)] transition-all duration-300 group-hover:w-14 group-hover:bg-[var(--accent)]" />
                <p className="self-center text-center text-[1.72rem] font-semibold leading-none text-[var(--text)] transition-colors duration-300 group-hover:text-[var(--accent)]">
                  {stat.value}
                </p>
                <p className="mt-1 mx-auto max-w-[12ch] self-start text-center text-[0.85rem] leading-[1.3] text-[var(--muted)] transition-colors duration-300 group-hover:text-[var(--text)]">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

    </section>
  );
}
