function pad(value: number) {
  return String(value).padStart(2, "0");
}

function mountainParts(ms: number) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Denver",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date(ms));
  const get = (type: string) => parts.find((part) => part.type === type)?.value ?? "0";
  return {
    year: Number(get("year")),
    month: Number(get("month")),
    day: Number(get("day")),
    hour: Number(get("hour")),
  };
}

function fromUtcDate(ms: number) {
  const date = new Date(ms);
  return `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(date.getUTCDate())}`;
}

export function triviaDayKey(ms = Date.now()) {
  const parts = mountainParts(ms);
  const calendar = Date.UTC(parts.year, parts.month - 1, parts.day);
  const shifted = parts.hour < 6 ? calendar - 86_400_000 : calendar;
  return fromUtcDate(shifted);
}

export function nextTriviaDayKey(ms = Date.now()) {
  const today = triviaDayKey(ms);
  const [year, month, day] = today.split("-").map(Number);
  return fromUtcDate(Date.UTC(year, month - 1, day) + 86_400_000);
}

export function weekendSaturdayKey(dayKey: string) {
  const [year, month, day] = dayKey.split("-").map(Number);
  const utc = Date.UTC(year, month - 1, day);
  const dow = new Date(utc).getUTCDay();
  if (dow !== 0 && dow !== 6) return null;
  const saturday = dow === 0 ? utc - 86_400_000 : utc;
  return fromUtcDate(saturday);
}
