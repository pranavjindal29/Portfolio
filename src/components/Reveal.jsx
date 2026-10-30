import { useEffect, useRef } from 'react';
import { listenToMediaQuery } from '../lib/mediaQuery';

// Content is visible before JS runs. Animation never gates reading or interaction.
export default function Reveal({ children, className = '', delay = 0 }) {
  const ref = useRef(null);
  useEffect(() => {
    const element = ref.current;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!element || reducedMotion.matches || !element.animate || typeof window.IntersectionObserver !== 'function') return undefined;
    let animation;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      if (!reducedMotion.matches) {
        animation = element.animate(
          [{ opacity: 0.7, transform: 'translateY(8px)' }, { opacity: 1, transform: 'translateY(0)' }],
          { duration: 320, delay, easing: 'ease-out', fill: 'backwards' },
        );
      }
      observer.disconnect();
    }, { threshold: 0.08 });
    const cancelForReducedMotion = () => { if (reducedMotion.matches) animation?.cancel(); };
    const stopListening = listenToMediaQuery(reducedMotion, cancelForReducedMotion);
    observer.observe(element);
    return () => {
      observer.disconnect();
      animation?.cancel();
      stopListening();
    };
  }, [delay]);
  return <div ref={ref} className={className}>{children}</div>;
}
