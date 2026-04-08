import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  CheckCircle2,
  Code2,
  Download,
  Github,
  Linkedin,
  Mail,
  Phone,
} from 'lucide-react';
import { heroRoles, heroStats, heroStrengths, profile, socialLinks } from '../data/portfolio';

const iconMap = {
  Mobile: Phone,
  Mail,
  GitHub: Github,
  LinkedIn: Linkedin,
  LeetCode: Code2,
};

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

export default function Home({ sidebarVisible = false }) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [copied, setCopied] = useState('');
  const shouldReduceMotion = useReducedMotion();

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

  const handleCopy = async (type) => {
    const value = type === 'Mobile' ? profile.phone : profile.email;

    try {
      await navigator.clipboard.writeText(value);
      setCopied(type);
      window.setTimeout(() => setCopied(''), 1800);
    } catch (error) {
      setCopied('');
    }
  };

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative flex min-h-screen scroll-mt-24 items-center px-4 pb-12 pt-24 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[6%] top-28 h-52 w-52 rounded-full bg-[var(--accent-soft)] blur-3xl" />
        <div className="absolute bottom-[14%] right-[8%] h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl dark:bg-cyan-300/10" />
      </div>

      <div className="content-container grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_420px] lg:items-stretch">
        <motion.div
          className="relative z-10 flex h-full flex-col"
          variants={containerVariants}
          initial={shouldReduceMotion ? false : 'hidden'}
          animate="visible"
        >
          <div className="space-y-6">
            <motion.span variants={itemVariants} className="section-eyebrow">
              Currently at IIT Bombay
            </motion.span>

            <motion.div variants={itemVariants} className="space-y-4">
              <h1 className="font-display text-4xl font-semibold tracking-tight text-[var(--text)] sm:text-5xl lg:text-[3.7rem] lg:leading-[0.98] xl:text-[4rem]">
                {profile.name}
                <span className="mt-3 block text-[var(--accent)] lg:text-[0.92em] xl:text-[0.9em] xl:leading-[1.02]">
                  {profile.headline}
                </span>
              </h1>
              <p className="max-w-2xl text-lg leading-7 text-[var(--muted)] sm:text-xl">
                {profile.subheadline} {profile.summary}
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-4 text-sm uppercase tracking-[0.32em] text-[var(--muted)]"
            >
              <span>Now shipping as</span>
              <span className="h-px w-10 bg-[var(--surface-border)]" />
              <span className="font-mono text-[var(--accent)]">
                {shouldReduceMotion ? (
                  currentRole
                ) : (
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={currentRole}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      className="inline-block"
                    >
                      {currentRole}
                    </motion.span>
                  </AnimatePresence>
                )}
              </span>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
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

          <motion.div variants={itemVariants} className="mt-6 grid gap-4 sm:grid-cols-2 xl:mt-auto xl:grid-cols-4">
            {heroStats.map((stat) => (
              <div key={stat.label} className="surface-panel px-5 py-5">
                <p className="text-2xl font-semibold text-[var(--text)]">{stat.value}</p>
                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 lg:h-full lg:justify-self-end"
        >
          <div className="surface-panel relative flex h-full flex-col overflow-hidden p-4 sm:p-6">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(96,165,250,0.22),transparent_38%)]" />
            <div className="relative flex-1 overflow-hidden rounded-[24px] border border-[var(--surface-border)] bg-[var(--bg-muted)]">
              <img
                src="/profile-portrait.jpg"
                alt="Pranav Jindal portrait"
                width="1091"
                height="1200"
                sizes="(min-width: 1024px) 420px, (min-width: 640px) 480px, 100vw"
                fetchPriority="high"
                decoding="async"
                className="h-[420px] w-full object-cover object-top sm:h-[480px] lg:h-full"
              />
            </div>
            <div className="relative mt-6 grid gap-4">
              <div className="flex items-center justify-between rounded-[22px] border border-[var(--surface-border)] bg-[var(--surface-strong)] px-4 py-3">
                <div>
                  <p className="meta-label">Current focus</p>
                  <p className="mt-1 text-sm font-medium text-[var(--text)]">
                    5G/6G core systems and intelligent infrastructure
                  </p>
                </div>
                <CheckCircle2 size={18} className="text-[var(--accent)]" />
              </div>
              <div className="rounded-[22px] border border-[var(--surface-border)] bg-[var(--surface-strong)] px-4 py-4">
                <p className="meta-label">What I bring</p>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {heroStrengths.map((item) => (
                    <div
                      key={item.title}
                      className="rounded-[18px] border border-[var(--surface-border)] bg-[var(--surface)] px-3 py-3"
                    >
                      <p className="text-sm font-semibold text-[var(--text)]">{item.title}</p>
                      <p className="mt-1 text-xs leading-5 text-[var(--muted)]">{item.caption}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={false}
        animate={{
          x: sidebarVisible ? 0 : -28,
          opacity: sidebarVisible ? 1 : 0,
          scale: sidebarVisible ? 1 : 0.96,
        }}
        transition={{ type: 'spring', stiffness: 210, damping: 24 }}
        style={{ pointerEvents: sidebarVisible ? 'auto' : 'none' }}
        className="fixed bottom-0 left-3 z-40 hidden flex-col items-center gap-4 md:flex lg:left-[1.1rem]"
      >
        {socialLinks.map((link) => {
          const IconComponent = iconMap[link.name];
          const isCopyAction = !link.href;

          return (
            <motion.div
              key={link.name}
              whileHover={{ scale: 1.06, y: -2 }}
              className="group relative inline-flex"
            >
              {isCopyAction ? (
                <button
                  type="button"
                  onClick={() => handleCopy(link.name)}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--surface-border)] bg-[var(--surface)] text-[var(--text)] shadow-sm backdrop-blur-xl transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
                  aria-label={link.name}
                >
                  <IconComponent size={18} />
                </button>
              ) : (
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--surface-border)] bg-[var(--surface)] text-[var(--text)] shadow-sm backdrop-blur-xl transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
                  aria-label={link.name}
                >
                  <IconComponent size={18} />
                </a>
              )}

              <div className="pointer-events-none absolute left-14 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-[var(--surface-border)] bg-[var(--surface-strong)] px-3 py-1.5 text-xs font-medium text-[var(--text)] opacity-0 shadow-sm backdrop-blur-xl transition group-hover:opacity-100">
                {link.value}
                {isCopyAction ? <span className="ml-1 text-[var(--muted)]">copy</span> : null}
              </div>
            </motion.div>
          );
        })}
        <div className="mt-1 h-24 w-px bg-[var(--surface-border)]" />
      </motion.div>

      <AnimatePresence>
        {copied ? (
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
            className="fixed bottom-8 right-4 z-50 rounded-full bg-emerald-500 px-4 py-2 text-sm font-medium text-white shadow-lg sm:right-6"
          >
            {copied === 'Mobile' ? 'Phone number copied' : 'Email copied'}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
