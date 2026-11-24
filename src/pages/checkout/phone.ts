/** Country code (1–3 digits) + 3-digit area code + 7-digit number, e.g. "+1 (202) 555-0136". */
export const PHONE_PATTERN = /^\+\d{1,3} \(\d{3}\) \d{3}-\d{4}$/;

const MAX_DIGITS = 13; // 3-digit country code + 10 digits

/**
 * Formats whatever the user typed as "+C (AAA) PPP-PPPP" while they type.
 * The last 10 digits are always the area code and number, so the country code grows from
 * 1 to 3 digits as more digits are entered: "12025550136" -> "+1 (202) 555-0136",
 * "442071234567" -> "+44 (207) 123-4567".
 */
export function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, MAX_DIGITS);
  if (digits.length === 0) return raw.trim().startsWith('+') ? '+' : '';

  const countryCodeLength = Math.min(3, Math.max(1, digits.length - 10));
  const countryCode = digits.slice(0, countryCodeLength);
  const rest = digits.slice(countryCodeLength);
  const area = rest.slice(0, 3);
  const prefix = rest.slice(3, 6);
  const line = rest.slice(6, 10);

  let formatted = `+${countryCode}`;
  if (area) formatted += ` (${area}`;
  if (prefix) formatted += `) ${prefix}`;
  if (line) formatted += `-${line}`;
  return formatted;
}
