import { theme } from '../data/theme.js';

/**
 * Universal smooth in-page navigation utility.
 * Used by Header, Footer, MobileMenu, MobileActionBar, Hero CTAs, "Book this", and Back-to-top.
 * 
 * @param {string} sectionId - target section id without hash (e.g. 'services', 'top')
 * @param {Object} [options]
 * @param {boolean} [options.updateHash=true]
 */
export function scrollToSection(sectionId, { updateHash = true } = {}) {
  if (typeof window === 'undefined') return;

  const isReduced = 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches || 
    document.documentElement.getAttribute('data-motion') === 'minimal' ||
    theme.motionIntensity === 'minimal';

  const behavior = isReduced ? 'auto' : 'smooth';

  if (sectionId === 'top' || sectionId === 'hero') {
    window.scrollTo({ top: 0, behavior });
    if (updateHash && window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
    return;
  }

  const targetElement = document.getElementById(sectionId);
  if (!targetElement) {
    console.warn(`[Navigation] Target section with id "${sectionId}" not found in DOM.`);
    return;
  }

  // Use native scrollIntoView if supported, or calculate header offset fallback
  try {
    targetElement.scrollIntoView({ behavior, block: 'start' });
  } catch {
    const headerHeight = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) || 80;
    const elementTop = targetElement.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: Math.max(0, elementTop - headerHeight - 16),
      behavior
    });
  }

  // Update hash cleanly without reload or history stack pollution
  if (updateHash) {
    window.history.replaceState(null, '', `#${sectionId}`);
  }

  // Manage accessibility focus: move focus to section heading
  const heading = targetElement.querySelector('h1, h2, h3, [tabindex="-1"]');
  if (heading) {
    if (!heading.hasAttribute('tabindex')) {
      heading.setAttribute('tabindex', '-1');
    }
    // Prevent browser auto-jump on focus
    heading.focus({ preventScroll: true });
  }
}
