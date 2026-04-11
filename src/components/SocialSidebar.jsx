import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Code2, Github, Linkedin, Mail, Phone } from 'lucide-react';
import { profile, socialLinks } from '../data/portfolio';

const iconMap = {
  Mobile: Phone,
  Mail,
  GitHub: Github,
  LinkedIn: Linkedin,
  LeetCode: Code2,
};

export default function SocialSidebar({ visible = true }) {
  const [copied, setCopied] = useState('');

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

  return (
    <>
      <motion.div
        initial={false}
        animate={{
          x: visible ? 0 : -28,
          opacity: visible ? 1 : 0,
          scale: visible ? 1 : 0.96,
        }}
        transition={{ type: 'spring', stiffness: 210, damping: 24 }}
        style={{ pointerEvents: visible ? 'auto' : 'none' }}
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
    </>
  );
}
