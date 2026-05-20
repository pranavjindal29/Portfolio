import { motion } from 'framer-motion';

const glyphs = ['<', '/', 'P', 'J', '>'];

export default function LoadingScreen({ onSkip }) {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[var(--bg)]"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1] } }}
      onClick={onSkip}
    >
      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-[20%] h-64 w-64 -translate-x-1/2 rounded-full bg-[var(--accent-soft)] blur-3xl" />
        <div className="absolute bottom-[18%] right-[18%] h-56 w-56 rounded-full bg-sky-400/10 blur-3xl dark:bg-sky-300/10" />
        <div className="absolute left-[18%] top-[62%] h-48 w-48 rounded-full bg-[var(--surface-border)] blur-3xl" />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-6 px-6 text-center">
        <div className="flex items-center gap-1 font-mono text-5xl font-semibold tracking-[0.32em] text-[var(--text)] md:text-7xl md:tracking-[0.38em]">
          {glyphs.map((glyph, index) => (
            <motion.span
              key={`${glyph}-${index}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.12, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              {glyph}
            </motion.span>
          ))}
        </div>

        <motion.div
          className="h-px w-28 bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />

        <motion.p
          className="text-sm uppercase tracking-[0.35em] text-[var(--muted)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.05, duration: 0.4 }}
        >
          Engineering portfolio loading
        </motion.p>

        <motion.button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onSkip?.();
          }}
          className="rounded-full border border-[var(--surface-border)] bg-[var(--surface)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.26em] text-[var(--muted)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.15, duration: 0.35 }}
        >
          Skip Intro
        </motion.button>
      </div>
    </motion.div>
  );
}
