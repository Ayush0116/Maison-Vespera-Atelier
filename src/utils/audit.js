import { siteConfig } from '../data/siteConfig.js';
import { services } from '../data/services.js';
import { teamMembers } from '../data/teamMembers.js';
import { galleryImages } from '../data/galleryImages.js';
import { offers } from '../data/offers.js';
import { navigationItems } from '../data/navigation.js';
import { imageRegistry } from '../data/images.js';
import { isDummyValue } from './demo.js';

/**
 * Runs in development mode only (import.meta.env.DEV).
 * Inspects all client data contracts and logs a single collapsed group warning
 * with items requiring confirmation before production client handover.
 */
export function runDevAudit() {
  if (!import.meta.env.DEV) return;

  const warnings = [];

  // Check contact details
  if (isDummyValue(siteConfig.phone)) warnings.push("Dummy phone number configured (+91 00000 00000).");
  if (isDummyValue(siteConfig.whatsapp)) warnings.push("Dummy WhatsApp configured.");
  if (isDummyValue(siteConfig.address.full)) warnings.push("Dummy street address configured.");

  // Check sample flags
  const sampleTeam = teamMembers.filter(m => m.isSample).length;
  if (sampleTeam > 0) warnings.push(`${sampleTeam} team members marked with isSample: true.`);

  const sampleGallery = galleryImages.filter(g => g.isSample).length;
  if (sampleGallery > 0) warnings.push(`${sampleGallery} gallery photos marked with isSample: true.`);

  // Check image registry resolution
  const missingAlt = Object.entries(imageRegistry).filter(([_, data]) => !data.alt);
  if (missingAlt.length > 0) warnings.push(`${missingAlt.length} images missing descriptive alt text.`);

  // Check section navigation integrity
  const enabledSections = Object.entries(siteConfig.sections.enabled)
    .filter(([_, enabled]) => enabled)
    .map(([id]) => id);

  navigationItems.forEach(item => {
    if (item.id !== 'top' && !enabledSections.includes(item.id)) {
      warnings.push(`Navigation item "${item.id}" references a disabled section.`);
    }
  });

  if (warnings.length > 0) {
    console.groupCollapsed(`[Maison Vespera Demo Audit] ${warnings.length} items to configure before client launch:`);
    warnings.forEach(w => console.warn(`• ${w}`));
    console.info("Set siteConfig.demoMode to false when client details and photos are verified.");
    console.groupEnd();
  }
}
