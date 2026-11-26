/**
 * Checks whether a contact value is a dummy placeholder.
 * Used to trigger a helpful agency demo toast instead of broken dials/links.
 */
export function isDummyValue(value) {
  if (!value) return true;
  const str = String(value).trim().toLowerCase();
  return (
    str.includes("0000000000") ||
    str.includes("00000") ||
    str.includes("example.com") ||
    str.includes("salon street address") ||
    str === "https://instagram.com" ||
    str === "https://facebook.com" ||
    str === "https://youtube.com" ||
    str === "https://pinterest.com"
  );
}
