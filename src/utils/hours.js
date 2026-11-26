import { siteConfig } from '../data/siteConfig.js';

/**
 * Computes live open/closed status in salon's exact IANA timezone.
 * Returns { isOpen: boolean, statusText: string, todayHours: string }
 */
export function getSalonOpenStatus() {
  const timeZone = siteConfig.timeZone || "Asia/Kolkata";
  const now = new Date();

  // Get weekday and time in salon time zone
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone,
    weekday: 'long',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false
  });

  const parts = formatter.formatToParts(now);
  const weekdayStr = parts.find(p => p.type === 'weekday')?.value?.toLowerCase();
  const hour = parseInt(parts.find(p => p.type === 'hour')?.value || '0', 10);
  const minute = parseInt(parts.find(p => p.type === 'minute')?.value || '0', 10);
  const currentTimeMinutes = hour * 60 + minute;

  const todayHoursList = siteConfig.openingHours[weekdayStr] || [];

  if (todayHoursList.length === 0) {
    return {
      isOpen: false,
      statusText: "Closed today",
      todayHours: "Closed",
      nextOpen: "Opens tomorrow at 10:00 AM"
    };
  }

  const { open, close } = todayHoursList[0];
  const [openH, openM] = open.split(':').map(Number);
  const [closeH, closeM] = close.split(':').map(Number);
  const openTimeMinutes = openH * 60 + openM;
  const closeTimeMinutes = closeH * 60 + closeM;

  const format12h = (h, m) => {
    const period = h >= 12 ? 'PM' : 'AM';
    const displayH = h % 12 || 12;
    const displayM = m === 0 ? '' : `:${m < 10 ? '0' : ''}${m}`;
    return `${displayH}${displayM} ${period}`;
  };

  if (currentTimeMinutes >= openTimeMinutes && currentTimeMinutes < closeTimeMinutes) {
    return {
      isOpen: true,
      statusText: `Open now · Closes ${format12h(closeH, closeM)}`,
      todayHours: `${format12h(openH, openM)} – ${format12h(closeH, closeM)}`
    };
  }

  if (currentTimeMinutes < openTimeMinutes) {
    return {
      isOpen: false,
      statusText: `Closed · Opens today at ${format12h(openH, openM)}`,
      todayHours: `${format12h(openH, openM)} – ${format12h(closeH, closeM)}`
    };
  }

  return {
    isOpen: false,
    statusText: `Closed · Opens tomorrow at 10:00 AM`,
    todayHours: `${format12h(openH, openM)} – ${format12h(closeH, closeM)}`
  };
}

/**
 * Generates available 30-minute booking slots for a given date in the salon timezone.
 */
export function generateTimeSlots(dateString, intervalMinutes = 30) {
  if (!dateString) return [];
  const timeZone = siteConfig.timeZone || "Asia/Kolkata";
  
  // Determine day of week for selected date
  const targetDate = new Date(`${dateString}T00:00:00`);
  const dayName = new Intl.DateTimeFormat('en-US', { timeZone, weekday: 'long' })
    .format(targetDate)
    .toLowerCase();

  const dayRanges = siteConfig.openingHours[dayName] || [];
  if (dayRanges.length === 0) return [];

  const slots = [];
  const { open, close } = dayRanges[0];
  const [openH, openM] = open.split(':').map(Number);
  const [closeH, closeM] = close.split(':').map(Number);

  let current = openH * 60 + openM;
  const end = closeH * 60 + closeM;

  while (current + intervalMinutes <= end) {
    const h = Math.floor(current / 60);
    const m = current % 60;
    const period = h >= 12 ? 'PM' : 'AM';
    const displayH = h % 12 || 12;
    const displayM = m === 0 ? '00' : `${m < 10 ? '0' : ''}${m}`;
    slots.push(`${displayH}:${displayM} ${period}`);
    current += intervalMinutes;
  }

  return slots;
}
