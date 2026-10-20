const DAY_MS = 86_400_000;

export function alignContributionWeeks<T extends { date: string }>(days: T[]) {
  if (!days.length) return [];
  const sorted = [...days].sort((a, b) => a.date.localeCompare(b.date));
  const first = new Date(`${sorted[0].date}T00:00:00Z`);
  const origin = first.getTime() - first.getUTCDay() * DAY_MS;
  return sorted.map((day) => {
    const date = new Date(`${day.date}T00:00:00Z`);
    return { ...day, week: Math.floor((date.getTime() - origin) / (7 * DAY_MS)), weekday: date.getUTCDay() };
  });
}
