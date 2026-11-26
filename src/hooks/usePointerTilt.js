import { useRef, useEffect } from 'react';
import { useReducedMotion } from './useReducedMotion.js';

/**
 * Adds subtle 3D tilt and specular lighting glare on pointer hover.
 * Automatically disabled on coarse touch screens and under reduced motion.
 */
export function usePointerTilt({ maxTilt = 8, glare = true } = {}) {
  const ref = useRef(null);
  const isReduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || isReduced || typeof window === 'undefined') return;

    // Check for fine pointer (mouse/trackpad, not touch)
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let rafId = null;

    const onPointerMove = (e) => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const xPercent = (x / rect.width) * 2 - 1;
        const yPercent = (y / rect.height) * 2 - 1;

        const tiltX = -yPercent * maxTilt;
        const tiltY = xPercent * maxTilt;

        el.style.setProperty('--rx', `${tiltX.toFixed(2)}deg`);
        el.style.setProperty('--ry', `${tiltY.toFixed(2)}deg`);
        el.style.setProperty('--mx', `${(x / rect.width * 100).toFixed(1)}%`);
        el.style.setProperty('--my', `${(y / rect.height * 100).toFixed(1)}%`);
      });
    };

    const onPointerLeave = () => {
      if (rafId) cancelAnimationFrame(rafId);
      el.style.setProperty('--rx', '0deg');
      el.style.setProperty('--ry', '0deg');
      el.style.setProperty('--mx', '50%');
      el.style.setProperty('--my', '50%');
    };

    el.addEventListener('pointermove', onPointerMove, { passive: true });
    el.addEventListener('pointerleave', onPointerLeave);

    return () => {
      el.removeEventListener('pointermove', onPointerMove);
      el.removeEventListener('pointerleave', onPointerLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [maxTilt, glare, isReduced]);

  return ref;
}
