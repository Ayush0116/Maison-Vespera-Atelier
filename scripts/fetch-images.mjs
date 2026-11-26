import fs from 'node:fs';
import path from 'node:path';
import https from 'node:https';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

// Verified high-editorial Unsplash imagery URLs with direct parameters (WebP, max w=1200, q=80)
const imageMap = [
  // Brand Logos
  {
    dest: 'public/assets/brand/logo.svg',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 48" fill="none">
      <text x="10" y="32" font-family="'Cormorant Garamond', Georgia, serif" font-size="28" font-weight="600" letter-spacing="4" fill="#D4AF37">MAISON VESPERA</text>
      <text x="12" y="44" font-family="'Plus Jakarta Sans', sans-serif" font-size="7" font-weight="500" letter-spacing="3.5" fill="#C7C4BE">HAUTE BOTANIQUE &amp; BRIDAL</text>
    </svg>`
  },
  {
    dest: 'public/assets/brand/logo-light.svg',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 48" fill="none">
      <text x="10" y="32" font-family="'Cormorant Garamond', Georgia, serif" font-size="28" font-weight="600" letter-spacing="4" fill="#F5F3EF">MAISON VESPERA</text>
      <text x="12" y="44" font-family="'Plus Jakarta Sans', sans-serif" font-size="7" font-weight="500" letter-spacing="3.5" fill="#D4AF37">HAUTE BOTANIQUE &amp; BRIDAL</text>
    </svg>`
  },

  // Hero
  { dest: 'public/assets/hero/hero-01.webp', id: 'photo-1595959183082-7b570b7e08e2' }, // Indian bridal beauty
  { dest: 'public/assets/hero/hero-02.webp', id: 'photo-1560066984-138dadb4c035' }, // Hair atelier
  { dest: 'public/assets/hero/hero-03.webp', id: 'photo-1570172619644-dfd03ed5d881' }, // Facial skin treatment

  // About
  { dest: 'public/assets/about/about-01.webp', id: 'photo-1608248597359-5613531b264b' }, // Botanicals
  { dest: 'public/assets/about/about-02.webp', id: 'photo-1521590832167-7bcbfaa6381f' }, // Salon interior
  { dest: 'public/assets/about/about-03.webp', id: 'photo-1519741497674-611481863552' }, // Bridal details

  // Services
  { dest: 'public/assets/services/service-bridal-couture-makeup.webp', id: 'photo-1610030469983-98e550d6193c' },
  { dest: 'public/assets/services/service-botanical-glass-facial.webp', id: 'photo-1512290900672-1f0236a00dfb' },
  { dest: 'public/assets/services/service-haute-balayage-gloss.webp', id: 'photo-1522337360788-8b13dee7a37e' },
  { dest: 'public/assets/services/service-ayurvedic-scalp-spa.webp', id: 'photo-1540555700478-4be289fbecef' },
  { dest: 'public/assets/services/service-editorial-evening-glam.webp', id: 'photo-1487412720507-e7ab37603c6f' },
  { dest: 'public/assets/services/service-rosewood-luxe-pedicure.webp', id: 'photo-1519415510236-718bdfcd89c8' },
  { dest: 'public/assets/services/service-sculptural-nail-art.webp', id: 'photo-1632345031435-8727f6897d53' },
  { dest: 'public/assets/services/service-deep-serenity-body-ritual.webp', id: 'photo-1544161515-4ab6ce6db874' },
  { dest: 'public/assets/services/service-signature-couture-grooming.webp', id: 'photo-1503951914875-452162b0f3f1' },

  // Experiences
  { dest: 'public/assets/experience/experience-bridal-01.webp', id: 'photo-1583391733956-3750e0ff4e8b' },
  { dest: 'public/assets/experience/experience-bridal-02.webp', id: 'photo-1487412720507-e7ab37603c6f' },
  { dest: 'public/assets/experience/experience-bridal-03.webp', id: 'photo-1535295972055-1c762f4483e5' },

  { dest: 'public/assets/experience/experience-hair-01.webp', id: 'photo-1522337360788-8b13dee7a37e' },
  { dest: 'public/assets/experience/experience-hair-02.webp', id: 'photo-1560066984-138dadb4c035' },
  { dest: 'public/assets/experience/experience-hair-03.webp', id: 'photo-1527799820374-dcf8d9d4a388' },

  { dest: 'public/assets/experience/experience-skin-01.webp', id: 'photo-1570172619644-dfd03ed5d881' },
  { dest: 'public/assets/experience/experience-skin-02.webp', id: 'photo-1512290900672-1f0236a00dfb' },
  { dest: 'public/assets/experience/experience-skin-03.webp', id: 'photo-1608248597359-5613531b264b' },

  { dest: 'public/assets/experience/experience-party-01.webp', id: 'photo-1516914943479-89db7d9ae7f2' },
  { dest: 'public/assets/experience/experience-party-02.webp', id: 'photo-1586495777744-4413f21062fa' },
  { dest: 'public/assets/experience/experience-party-03.webp', id: 'photo-1632345031435-8727f6897d53' },

  { dest: 'public/assets/experience/experience-spa-01.webp', id: 'photo-1544161515-4ab6ce6db874' },
  { dest: 'public/assets/experience/experience-spa-02.webp', id: 'photo-1540555700478-4be289fbecef' },
  { dest: 'public/assets/experience/experience-spa-03.webp', id: 'photo-1519415510236-718bdfcd89c8' },

  // Team
  { dest: 'public/assets/team/team-ananya.webp', id: 'photo-1573496359142-b8d87734a5a2' },
  { dest: 'public/assets/team/team-rohan.webp', id: 'photo-1507003211169-0a1dd7228f2d' },
  { dest: 'public/assets/team/team-meera.webp', id: 'photo-1580489944761-15a19d654956' },
  { dest: 'public/assets/team/team-priya.webp', id: 'photo-1534528741775-53994a69daeb' },

  // Gallery (24 items)
  { dest: 'public/assets/gallery/gallery-01.webp', id: 'photo-1583391733956-3750e0ff4e8b' },
  { dest: 'public/assets/gallery/gallery-02.webp', id: 'photo-1595959183082-7b570b7e08e2' },
  { dest: 'public/assets/gallery/gallery-03.webp', id: 'photo-1535295972055-1c762f4483e5' },
  { dest: 'public/assets/gallery/gallery-04.webp', id: 'photo-1519741497674-611481863552' },
  { dest: 'public/assets/gallery/gallery-05.webp', id: 'photo-1522337360788-8b13dee7a37e' },
  { dest: 'public/assets/gallery/gallery-06.webp', id: 'photo-1527799820374-dcf8d9d4a388' },
  { dest: 'public/assets/gallery/gallery-07.webp', id: 'photo-1560066984-138dadb4c035' },
  { dest: 'public/assets/gallery/gallery-08.webp', id: 'photo-1519699047748-de8e457a634e' },
  { dest: 'public/assets/gallery/gallery-09.webp', id: 'photo-1487412720507-e7ab37603c6f' },
  { dest: 'public/assets/gallery/gallery-10.webp', id: 'photo-1586495777744-4413f21062fa' },
  { dest: 'public/assets/gallery/gallery-11.webp', id: 'photo-1516914943479-89db7d9ae7f2' },
  { dest: 'public/assets/gallery/gallery-12.webp', id: 'photo-1500840216050-2ffa16d00613' },
  { dest: 'public/assets/gallery/gallery-13.webp', id: 'photo-1512290900672-1f0236a00dfb' },
  { dest: 'public/assets/gallery/gallery-14.webp', id: 'photo-1608248597359-5613531b264b' },
  { dest: 'public/assets/gallery/gallery-15.webp', id: 'photo-1570172619644-dfd03ed5d881' },
  { dest: 'public/assets/gallery/gallery-16.webp', id: 'photo-1540555700478-4be289fbecef' },
  { dest: 'public/assets/gallery/gallery-17.webp', id: 'photo-1632345031435-8727f6897d53' },
  { dest: 'public/assets/gallery/gallery-18.webp', id: 'photo-1519014816548-bf7fe059798b' },
  { dest: 'public/assets/gallery/gallery-19.webp', id: 'photo-1604654894610-df63bc536371' },
  { dest: 'public/assets/gallery/gallery-20.webp', id: 'photo-1519415510236-718bdfcd89c8' },
  { dest: 'public/assets/gallery/gallery-21.webp', id: 'photo-1521590832167-7bcbfaa6381f' },
  { dest: 'public/assets/gallery/gallery-22.webp', id: 'photo-1560066984-138dadb4c035' },
  { dest: 'public/assets/gallery/gallery-23.webp', id: 'photo-1544161515-4ab6ce6db874' },
  { dest: 'public/assets/gallery/gallery-24.webp', id: 'photo-1527799820374-dcf8d9d4a388' },

  // Offers
  { dest: 'public/assets/offers/offer-royal-bridal.webp', id: 'photo-1583391733956-3750e0ff4e8b' },
  { dest: 'public/assets/offers/offer-solstice-glow.webp', id: 'photo-1512290900672-1f0236a00dfb' },
  { dest: 'public/assets/offers/offer-evening-soiree.webp', id: 'photo-1516914943479-89db7d9ae7f2' },

  // Misc
  { dest: 'public/assets/misc/booking.webp', id: 'photo-1521590832167-7bcbfaa6381f' },
  { dest: 'public/assets/misc/location.webp', id: 'photo-1513694203232-719a280e022f' },
  { dest: 'public/assets/misc/cta-band.webp', id: 'photo-1540555700478-4be289fbecef' },
  { dest: 'public/assets/misc/og-image.jpg', id: 'photo-1560066984-138dadb4c035', format: 'jpg' }
];

function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadFile(res.headers.location, destPath).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Status ${res.statusCode} for ${url}`));
      }
      const fileStream = fs.createWriteStream(destPath);
      res.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close();
        resolve();
      });
      fileStream.on('error', reject);
    }).on('error', reject);
  });
}

async function main() {
  console.log(`Starting asset download for ${imageMap.length} items...`);
  let success = 0;
  for (const item of imageMap) {
    const fullPath = path.resolve(root, item.dest);
    fs.mkdirSync(path.dirname(fullPath), { recursive: true });

    if (item.svg) {
      fs.writeFileSync(fullPath, item.svg, 'utf-8');
      success++;
      continue;
    }

    const fmt = item.format || 'webp';
    const width = 1200;
    const url = `https://images.unsplash.com/${item.id}?w=${width}&fm=${fmt}&q=80&auto=format&fit=crop`;
    try {
      await downloadFile(url, fullPath);
      success++;
      console.log(`[OK] ${item.dest} downloaded.`);
    } catch (err) {
      console.error(`[FAIL] ${item.dest}:`, err.message);
    }
  }
  console.log(`Finished: ${success}/${imageMap.length} assets ready.`);
}

main();
