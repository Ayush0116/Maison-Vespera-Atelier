import { useState, useEffect } from 'react';

/**
 * Tracks which section currently occupies the main viewport reading zone below the header.
 * 
 * @param {string[]} sectionIds - list of visible section ids
 * @returns {string} active section id
 */
export function useActiveSection(sectionIds = []) {
  const [activeId, setActiveId] = useState(sectionIds[0] || 'top');

  useEffect(() => {
    if (typeof window === 'undefined' || sectionIds.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find visible section with highest intersection ratio
        const visible = entries.filter(e => e.isIntersecting);
        if (visible.length > 0) {
          // Sort by visible area or top positioning
          visible.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: '-20% 0px -55% 0px', // Target reading zone below sticky header
        threshold: [0.1, 0.3, 0.6]
      }
    );

    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sectionIds]);

  return activeId;
}
