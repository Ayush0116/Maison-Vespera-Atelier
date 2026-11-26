import fs from 'node:fs';
import path from 'node:path';
import https from 'node:https';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

// Reliable alternative Unsplash IDs for beauty, facials, skin elixirs, and salon details
const replacements = [
  { dest: 'public/assets/about/about-01.webp', id: 'photo-1556760544-74068565f05c' }, // natural skincare bottles
  { dest: 'public/assets/services/service-botanical-glass-facial.webp', id: 'photo-1570172619644-dfd03ed5d881' }, // facial treatment
  { dest: 'public/assets/experience/experience-skin-02.webp', id: 'photo-1519415510236-718bdfcd89c8' }, // treatment detail
  { dest: 'public/assets/experience/experience-skin-03.webp', id: 'photo-1556760544-74068565f05c' }, // botanical serum
  { dest: 'public/assets/gallery/gallery-12.webp', id: 'photo-1516914943479-89db7d9ae7f2' }, // editorial portrait
  { dest: 'public/assets/gallery/gallery-13.webp', id: 'photo-1570172619644-dfd03ed5d881' }, // cryo facial
  { dest: 'public/assets/gallery/gallery-14.webp', id: 'photo-1556760544-74068565f05c' }, // botanical tincture
  { dest: 'public/assets/gallery/gallery-18.webp', id: 'photo-1632345031435-8727f6897d53' }, // glazed nail art
  { dest: 'public/assets/offers/offer-solstice-glow.webp', id: 'photo-1540555700478-4be289fbecef' } // spa ritual
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

async function run() {
  console.log('Downloading replacements...');
  for (const item of replacements) {
    const fullPath = path.resolve(root, item.dest);
    const url = `https://images.unsplash.com/${item.id}?w=1200&fm=webp&q=80&auto=format&fit=crop`;
    try {
      await downloadFile(url, fullPath);
      console.log(`[OK] ${item.dest} resolved.`);
    } catch (e) {
      console.error(`[FAIL] ${item.dest}:`, e.message);
    }
  }
}

run();
